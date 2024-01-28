import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Message, Sender} from '../../shared/models/models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messageMap = new BehaviorSubject<Map<string, Message>>(new Map([
    ['1', {
      content: 'Hi👋, hast du schon eine Ahnung, wohin es bei dir geht?',
      sender: Sender.BOT,
      timestamp: new Date(),
      responseType: 'options',
      responseOptions: [
        {
          messageKey: '2',
          text: 'Ja, ich habe schon ein genaues Ziel!',
        },
        {
          messageKey: '3',
          text: 'Noch nicht, aber ich bin für alles offen!',
        },
      ],
    }],
  ]));

  getMessages() {
    return this.messageMap.asObservable();
  }

  addMessage(key: string, value: Message) {
    const currentMap = this.messageMap.getValue(); // Step 1

    const newMap = new Map(currentMap); // Step 2
    newMap.set(key, value); // Step 3

    this.messageMap.next(newMap); // Step 4
    console.log(this.messageMap)

  }
}
