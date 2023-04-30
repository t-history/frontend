import { IMessage } from './Message';

export interface IChat {
  id: number;
  title: string;
  lastMessage: IMessage;
  status: ChatStatus;
  isSynchronizable: boolean
}

export type ChatStatus = 'queued' | 'in_progress' | 'idle';
