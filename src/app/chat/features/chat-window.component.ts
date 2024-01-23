import { Component } from '@angular/core';
import { Sender, Message, ResponseOption, selectedResponseOption } from 'src/app/shared/models/models';
import { ChatService } from '../data-access/chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule],
  template: `    
  <div style="margin: 30px auto 30px auto; width: 800px; background: #F7F7F7; padding: 30px; border-radius: 10px">
  <div class="panel" id="chat">
    <div class="panel-body">
      <div class="chats">
        <div class="chat-window">
          <div *ngFor="let message of messages" class="message">
            <div [ngClass]="message.sender === senderEnum.BOT ? 'bot-message' : 'user-message'">
              {{ message.content }}
            </div>
            <div *ngIf="message.sender === senderEnum.BOT && message.responseType === 'options'">
              <button *ngFor="let option of message.responses" (click)="onUserResponse(message.id, option)" type="button" class="btn btn-secondary" style="margin: 6px">
                {{ option.text }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-footer">
      <form>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Say something">
          <span class="input-group-btn">
            <button class="btn btn-primary" type="button">Send</button>
          </span>
        </div>
      </form>
    </div>
  </div>
</div>
    
  `,
  styles: ``,
})
export class ChatWindowComponent {
  senderEnum = Sender;
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
