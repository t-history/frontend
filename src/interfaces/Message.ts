export interface IMessage {
  id: number;
  content: string;
  sender: number;
  unixtime: number;
  type: string;
  removed?: boolean;
}