import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from './models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messages = new BehaviorSubject<Message[]>([]);

  getMessages() {
    return this.messages.asObservable();
  }

  sendMessage(message: Message) {
    const currentMessages = this.messages.value;
    this.messages.next([...currentMessages, message]);
  }
}
