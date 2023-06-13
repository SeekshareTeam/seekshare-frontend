import NextAuth from 'next-auth';

NextAuth;

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: string;
  }
}
