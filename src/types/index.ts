// types/userTypes.ts
export enum UserStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}
export interface UserState {
  user: User | null;
  status: UserStatus;
  error: string | null;
}

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  picture?: string | null;
  name?: string | null;
}

export interface Event {
  address: string;
  createDateTime: string;
  date: string;
  moderator: string;
  title: string;
  description: string;
}

export interface Feedback {
  anonymous: string;
  addressee: string;
  createDateTime: string;
  eventId: string;
  good: string;
  improve: string;
  sender: string;
  suggestion: string;
}
