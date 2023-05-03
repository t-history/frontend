import { ChatStatus } from './Chat';

export interface IQueueState {
  wait: number;
  completed?: number;
  failed?: number;
  chatsStatus: {
    [key: number]: ChatStatus;
  }
}