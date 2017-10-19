import BaseWorker from './BaseWorker';
import { USER_REGISTERED } from '../../constants/JobTypes';
import EmailService from '../../services/EmailService';

interface OnUserRegisteredDataType {
    email: string;
}

export class EmailWorker extends BaseWorker {
    public static run(data: any, type: string): Promise<any> {
        switch (type) {
            case USER_REGISTERED:
                return EmailWorker.onUserRegistered(data);
            default:
                console.error('Job with such type cannot be handled');
                return Promise.resolve();
        }
    }

    private static onUserRegistered(data: OnUserRegisteredDataType): Promise<any> {
        return EmailService.sendEmail({
            to: data.email,
            message: 'Dear friend, you are registered.',
            subject: 'You are registered!'
        })
        .catch(err => {
            console.error(err);
        });
    }
}
