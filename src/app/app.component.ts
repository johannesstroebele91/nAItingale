import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';
import { Message, ResponseOption, Sender, selectedResponseOption } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'nAItingale';

  senderEnum = Sender

  messages: Message[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });

    // Initial bot message
    this.chatService.sendMessage({
      id: 'msg1',
      content: 'Hast du schon eine Ahnung, wohin es bei dir geht?',
      sender: Sender.BOT,
      timestamp: new Date(),
      responseType: 'options',
      responses: [
        {
          id: 'a',
          text: 'Ja, ich habe schon ein genaues Ziel!',
        },
        {
          id: 'b',
          text: 'Noch nicht, aber ich bin für alles offen!',
        },
        {
          id: 'c',
          text: 'Noch nicht, aber ich habe schon einen groben Plan!',
        },
      ],
    });
  }

  onUserResponse(messageId: string, option: ResponseOption) {
    // Add user's choice to the conversation
    this.chatService.sendMessage({
      id: `user_${new Date().getTime()}`,
      content: option.text,
      sender: Sender.USER,
      timestamp: new Date(),
    });

    // Logic to handle the user's response and continue the conversation
    // This could involve sending another message from the bot, making API calls, etc.

    const newMessage = selectedResponseOption(messageId, option);
    const errorMessage = {
      id: `user_${new Date().getTime()}`,
      content: 'There was an error',
      sender: Sender.BOT,
      timestamp: new Date(),
    };

    // Add user's choice to the conversation
    if (!newMessage) {
      this.chatService.sendMessage(errorMessage);
    } else {
      this.chatService.sendMessage(newMessage);
    }
  }
}
