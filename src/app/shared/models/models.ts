export interface Message {
  content: string;
  sender: Sender;
  timestamp: Date;
  responseType: 'input' | 'options'; // Indicates if the response is a text input or selection from options
  responseOptions?: Response[]; // Array of possible responses or response options
  responseInput?: Response
}

export interface Response {
  messageKey: string;
  text: string; // Display text of the option
}


// TODO fraglich ob wir das brauchen
export enum Sender {
  BOT = 'Bot',
  USER = 'User',
}
