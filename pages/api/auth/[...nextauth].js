import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

import { ssrUserLoginWithHash } from 'src/generated/page';

const providers = [
  CredentialsProvider({
    id: 'seekshare-backend',
    name: 'credentials',
    credentials: {
      email: {
        label: 'email',
        type: 'email',
        placeholder: 'sample@email.com',
      },
      password: {
        label: 'password',
        type: 'password',

      }
    },
    authorize: async (credentials) => {
      const user = await axios.post(process.env.NEXT_PUBLIC_LOGIN_API_URL,
        {
          password: credentials.password,
          email: credentials.email
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        })
        // ssrUserLoginWithHash.getServerPage({ variables: { email: credentials } });

      if (user.status === 200 && user.statusText === 'OK') {
        return user.data
      } else {
        return null
      }
    }
  })
]

const callbacks = {
  // Getting the JWT token from API response
  async jwt({ token, user }) {
    if (user) {
      token.accessToken = user.token
    }

    return token
  },

  async session({ session, token }) {
    session.accessToken = token.accessToken
    return session
  }
}

const options = {
  providers,
  callbacks,
  pages: {
    signIn: '/login'
  },
  secret: process.env.SECRET,
}

export default (req, res) => NextAuth(req, res, options);
