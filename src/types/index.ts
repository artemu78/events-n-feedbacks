// types/userTypes.ts
export enum LoadStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}
export interface UserState {
  user: UserClient | null;
  status: LoadStatus;
  joinstatus: LoadStatus;
  error: string | null;
  organization: string | null;
  joiningorganization: string;
}

export interface UserStorage {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  picture?: string | null;
  name?: string | null;
  registerdate?: string;
  lastlogin?: string;
  organizations: string[];
  organizationsObj: Organization[];
}

export interface UserClient {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  picture?: string | null;
  name?: string | null;
  registerdate?: string;
  lastlogin?: string;
  organizationsObj: Organization[];
}

export interface Event {
  address: string;
  organization: string;
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
  user?: UserStorage;
}

export interface Organization {
  id?: string;
  title: string;
  description: string;
  site: string;
  instagram: string;
  facebook: string;
  createUserId: string;
  createDateTime: string;
  logoUrl: string;
}
