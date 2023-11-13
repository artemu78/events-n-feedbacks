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
  