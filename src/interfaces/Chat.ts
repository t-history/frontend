import { IMessage } from './Message';

export interface IChat {
  id: number;
  title: string;
  lastMessage: IMessage;
  status: ChatStatus;
}

export type ChatStatus = 'wait' | 'in_progress' | 'idle';
