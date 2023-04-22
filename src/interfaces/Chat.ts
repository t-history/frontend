import { IMessage } from './Message';

export interface IChat {
  id: number;
  title: string;
  lastMessage: IMessage;
}
