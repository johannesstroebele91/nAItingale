export interface Message {
  id: string;
  content: string;
  sender: Sender;
  timestamp: Date;
  responseType?: 'text' | 'options'; // Indicates if the response is a text input or selection from options
  responses?: ResponseOption[]; // Array of possible responses or response options
}

export interface ResponseOption {
  id: string;
  text: string; // Display text of the option
}

export enum Sender {
  BOT = 'Bot',
  USER = 'User',
}

export const selectedResponseOption = (messageId: string, responseOption: ResponseOption) => {
  // example: msg1 + b -> response id 3
  const searchId = messageId + responseOption.id
  return messageMap.get(searchId);
}

export const messageMap = new Map<string, Message>([
  [
    'msg1a',
    {
      id: '2',
      content: 'Super. Wohin soll es denn gehen?',
      sender: Sender.BOT,
      timestamp: new Date(),
      responseType: 'text',
    },
  ],
  [
    'msg1b',
    {
      id: '3',
      content: 'Alles klar, dann stelle ich dir gleich mal ein paar Fragen!',
      sender: Sender.BOT,
      timestamp: new Date(),
      responseType: 'text',
    },
  ],
]);


