import { Injectable, EventEmitter } from '@angular/core';
import Message from './message';

@Injectable()

export class NotificationService {

  public newMessageReceived: EventEmitter<Message>;

  constructor() {
    this.newMessageReceived = new EventEmitter();
  }

  notify(message: string, type: string) {
    const newMessage = new Message(message, type);

    this.newMessageReceived.emit(newMessage);
  }
}
