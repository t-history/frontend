import { ChatStatus } from './Chat';

export interface IQueueState {
  wait: number;
  inProgress?: number;
  completed?: number;
  failed?: number;
  chatsStatus: {
    [key: number]: ChatStatus;
  }
}