export type TokenType = 'Bearer' | 'Basic';

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
  tokenType: TokenType;
  expiresIn?: number;
  expiresAt?: Date;
};

export type UserProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatarUrl?: string;
  roles?: string[];
  permissions?: string[];
};

export type SessionState = 'authenticated' | 'unauthenticated' | 'loading';

export interface Session {
  state: SessionState;
  tokens?: AuthTokens;
  user?: UserProfile;
  error?: {
    code: string;
    message: string;
  };
}
