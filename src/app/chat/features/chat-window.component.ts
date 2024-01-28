import {Component} from '@angular/core';
import {Message, Sender} from 'src/app/shared/models/models';
import {ChatService} from '../data-access/chat.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="margin: 30px auto 30px auto; width: 800px; background: #F7F7F7; padding: 30px; border-radius: 10px">
      <div class="panel" id="chat">
        <div class="panel-body">
          <div class="chats">
            <div class="chat-window">
              <div *ngFor="let messageEntry of messageMap | keyvalue" class="message">
                <div [ngClass]="messageEntry.value.sender === senderEnum.BOT ? 'bot-message' : 'user-message'">
                  {{ messageEntry.value.content }}
                </div>
                <div
                  *ngIf="messageEntry.value.responseType === 'options'">
                  <button *ngFor="let option of messageEntry.value.responseOptions"
                          (click)="onSelectResponseOption(option.messageKey, option.text)"
                          type="button" class="btn btn-secondary" style="margin: 6px">
                    {{ option.text }}
                  </button>
                </div>
                <div *ngIf="messageEntry.value.responseType === 'input'">
                  <form>
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Say something" [(ngModel)]="userInput"
                             name="userInput" [ngModelOptions]="{standalone: true}">
                      <span class="input-group-btn">
                  <!--TODO improve later so no strange rerender occurs-->
            <button class="btn btn-primary" type="button"
                    (click)="onInputResponse(messageEntry.value.responseInput?.messageKey, userInput)">Send</button>
                </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  `,
  styles: [],
})
export class ChatWindowComponent {
  senderEnum = Sender;
  public messageMap!: Map<string, Message>;
  userInput: string = '';

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.getMessages().subscribe((messageMap) => {
      this.messageMap = new Map<string, Message>(messageMap);
    });

    // Initial bot message
    // You may want to trigger an initial bot message here
  }

  onInputResponse(key: string | undefined, text: string) {
    console.log('onInputResponse')
    console.log(key)
    console.log(text)

    if (key !== undefined) {
      this.chatService.addMessage(key, {
        content: 'An welchen Zeitraum hast du gedacht?',
        sender: Sender.BOT,
        timestamp: new Date(),
        responseType: 'input',
        responseInput:
          {
            messageKey: '6',
            text: ''
          },
      });
    }
  }

  onSelectResponseOption(key: string, text: string) {
    this.chatService.addMessage(key, {
      content: 'Super. Wohin soll\'s denn gehen?',
      sender: Sender.BOT,
      timestamp: new Date(),
      responseType: 'input',
      responseInput:
        {
          messageKey: '4',
          text: text
        },
    });
  }
}

