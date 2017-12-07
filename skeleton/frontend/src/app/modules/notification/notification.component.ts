import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import Message from './message';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css']
})
export class NotificationComponent implements OnInit {
  message: Message;

  constructor(private notificationService: NotificationService) {
    this.message = new Message('', '');
  }

  ngOnInit() {
    this.notificationService.newMessageReceived.subscribe((message) => this.newMessageReceived(message))
  }

  newMessageReceived(message: Message) {
    this.message = message;

    setTimeout(() => { this.message = new Message('', '') }, 2000)
  }
}
