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
  registerdate?: string;
  lastlogin?: string;
}

export interface Event {
  address: string;
  date: string;
  moderator: string;
  title: string;
  description: string;
  createUserId: string;
  createDateTime: string;
  logoUrl: string;
  topic: string;
}

export interface Feedback {
  anonymous: string;
  addressee: string;
  createUserId: string;
  createDateTime: string;
  eventId: string;
  good: string;
  improve: string;
  sender: string;
  suggestion: string;
  user?: User;
}

export interface Organization {
  title: string;
  description: string;
  site: string;
  instagram: string;
  facebook: string;
  createUserId: string;
  createDateTime: string;
}
