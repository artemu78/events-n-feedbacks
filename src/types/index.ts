// types/userTypes.ts
export interface UserState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  export interface User {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  }
  