import { Component, ErrorHandler } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Route, RouterOutlet, provideRouter } from '@angular/router';
import { ChatWindowComponent } from './app/chat/features/chat-window.component';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';


// App component can be directly placed in main.ts with a router-outlet
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatWindowComponent],
  template: ` <app-chat-window /> `,
  styles: [
    `
      body {
        background: #ddd;
        margin-top: 10px;
      }

      .bot-message {
        text-align: left;
        background-color: #eeeeee;
        margin: 10px;
        padding: 15px;
        border-radius: 15px;
        color: #252525;
        display: inline-block;
        max-width: 100%;
        word-wrap: break-word;
      }

      .user-message {
        text-align: right;
        background-color: #535cdc;
        padding: 15px;
        margin: 10px;
        border-radius: 15px;
        color: white;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: stretch;
        align-content: stretch;
      }

      .chat-box {
        height: 100%;
        width: 100%;
        background-color: #fff;
        overflow: hidden;
      }

      .chats {
        padding: 30px 15px;
      }

      .chat-avatar .avatar {
        width: 30px;
        -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2),
          0 6px 10px 0 rgba(0, 0, 0, 0.3);
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2),
          0 6px 10px 0 rgba(0, 0, 0, 0.3);
      }

      .chat-body {
        display: block;
        margin: 10px 30px 0 0;
        overflow: hidden;
      }

      .chat-body:first-child {
        margin-top: 0;
      }

      .chat-content {
        position: relative;
        display: block;
        float: right;
        padding: 8px 15px;
        margin: 0 20px 10px 0;
        clear: both;
        color: #fff;
        background-color: #62a8ea;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
      }

      .chat-content:before {
        position: absolute;
        top: 10px;
        right: -10px;
        width: 0;
        height: 0;
        content: '';
        border: 5px solid transparent;
        border-left-color: #62a8ea;
      }

      .chat-content > p:last-child {
        margin-bottom: 0;
      }

      .chat-content + .chat-content:before {
        border-color: transparent;
      }

      .chat-time {
        display: block;
        margin-top: 8px;
        color: rgba(255, 255, 255, 0.6);
      }

      .chat-left .chat-body {
        margin-right: 0;
        margin-left: 30px;
      }

      .chat-left .chat-content {
        float: left;
        margin: 0 0 10px 20px;
        color: #76838f;
        background-color: #dfe9ef;
      }

      .chat-left .chat-content:before {
        right: auto;
        left: -10px;
        border-right-color: #dfe9ef;
        border-left-color: transparent;
      }

      .chat-left .chat-content + .chat-content:before {
        border-color: transparent;
      }

      .chat-left .chat-time {
        color: #a3afb7;
      }

      .panel-footer {
        padding: 0 30px 15px;
        background-color: transparent;
        border-top: 1px solid transparent;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
      }
    `,
  ],
})
export class App {}

const appRoutes: Route[] = []

// since Angular v15 we provideHttpClient() is needed to provide HttpClient to standalone projects! https://blog.ninja-squad.com/2022/11/09/angular-http-in-standalone-applications/
bootstrapApplication(
  App,
  {
    providers: [
      provideRouter(appRoutes),
      provideHttpClient(),
    ],
  }
).catch((err) => console.error('err caught in main.ts: ', err));
