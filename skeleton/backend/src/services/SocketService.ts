import * as SocketIO from 'socket.io';
import { Server } from 'http';
import SocketClient = SocketIO.Socket;

import DbConnector from '../utils/db/DbConnector';
import User from '../entities/User';
import * as SocketEvents from '../constants/SocketEvents';

interface Client extends SocketClient {
    user: User;
}

interface SocketToTokenMap {
    socketId: string;
    token: string;
}

const SOCKETS_DB_KEY = 'userSockets';

export default class SocketService {
    private static io: any;
    private static userToSocket: {
        [userId: string]: Array<SocketToTokenMap>
    } = {};

    public static init(server: Server): void {
        SocketService.io = SocketIO(server);
        SocketService.io.on('connection', SocketService.onConnection);
        SocketService.restoreUserSockets();
        SocketService.subscribeStoreUpdate();
    }

    public static emitByUserId(userId: number, event: string, data: any): void {
        const socketIds = SocketService.userToSocket[userId] || [];
        socketIds.forEach((item: SocketToTokenMap) => {
            SocketService.emitBySocketId(item.socketId, event, data);
        });
    }

    public static emit(event: string, data: any): void {
        SocketService.io.sockets.emit(event, data);
    }

    private static emitBySocketId(socketId: string, event: string, data: any): void {
        SocketService.io.sockets.connected[socketId].emit(event, data);
    }

    private static onConnection(client: Client): void {
        client.on(SocketEvents.REGISTRATION, SocketService.onRegistration.bind(SocketService, client));
        client.on(SocketEvents.MESSAGE, SocketService.onMessage);
        client.on('disconnect', SocketService.onDisconnect.bind(SocketService, client));
    }

    private static async onRegistration(client: Client, data: { token: string }): Promise<void> {
        const socketId = client.id;
        const token = data.token;

        let userStr: string = await DbConnector.getRedisConnection().get(token);
        if (!userStr) {
            SocketService.emitBySocketId(client.id, SocketEvents.REGISTERED, { error: 'Cannot find user by token' });
            return;
        }
        try {
            const user = JSON.parse(userStr);
            client.user = user;
            SocketService.userToSocket[user.id] = SocketService.userToSocket[user.id] || [];
            SocketService.userToSocket[user.id].push({
                socketId,
                token
            });
            await DbConnector.getRedisConnection().set(SOCKETS_DB_KEY, JSON.stringify(SocketService.userToSocket));
            SocketService.emitBySocketId(client.id, SocketEvents.REGISTERED, { message: 'Registered' });
        } catch (err) {
            SocketService.emitBySocketId(client.id, SocketEvents.REGISTERED, { error: 'Cannot handle user' });
        }
    }

    private static onMessage(data: any): void {
        console.log(data);
    }

    private static onDisconnect(client: Client): void {
        if (!client.user) {
            console.error('Cannot find user object');
            return;
        }

        const userSockets: Array<SocketToTokenMap>|undefined = SocketService.userToSocket[client.user.id];
        if (userSockets) {
            SocketService.userToSocket[client.user.id] = userSockets.filter(item => item.socketId !== client.id);
        }
    }

    private static async restoreUserSockets(): Promise<void> {
        let userSockets = await DbConnector.getRedisConnection().get(SOCKETS_DB_KEY);

        if (userSockets) {
            try {
                SocketService.userToSocket = JSON.parse(userSockets);
            } catch (error) {
                console.error('Cannot restore user socket connections');
            }
        }
    }

    private static async subscribeStoreUpdate(): Promise<void> {
        DbConnector.getRedisConnection().subscribe(SOCKETS_DB_KEY, () => {
            SocketService.restoreUserSockets();
        });
    }
}
