import { ChatStatus } from './Chat';

export interface IQueueState {
  queued: number;
  in_progress?: number;
  completed?: number;
  failed?: number;
  wait?: number;
  chatsStatus: {
    [key: number]: ChatStatus;
  }
  chatsCount: number;
  nextChatListJob: number | null;
  periodChatListJob: number | null;
}