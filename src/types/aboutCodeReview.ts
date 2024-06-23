export interface codeDataType {
  codeId: number;
  detail: string[];
  language: string;
  codeLine: number;
  reviewId: number;
}

export interface messagesEntireType {
  codeId: number;
  content: string;
  memberId: number;
  messageId: string;
  nickname: string;
  reviewId: number;
  timestamp: string;
}

export interface reviewListType {
  codeLine: number;
  reviewId: number;
}
