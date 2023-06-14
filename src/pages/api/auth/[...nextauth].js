import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

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
      },
    },
    authorize: async (credentials) => {
      let user;
      try {
        user = await axios.post(
          process.env.NEXT_PUBLIC_LOGIN_API_URL,
          {
            password: credentials.password,
            email: credentials.email,
          },
          {
            headers: {
              accept: '*/*',
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (err) {
        throw new Error(err.response.data.error.message);
      }

      if (user.status === 200 && user.statusText === 'OK') {
        return user.data;
      } else {
        return null;
      }
    },
  }),
];

const refreshAccessToken = async (token) => {
  try {
    const curDate = Date.now();
    const refreshToken = await axios.post(
      process.env.NEXT_PUBLIC_REFRESH_API_URL,
      {
        refreshToken: token.refreshToken,
      },
      {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
      }
    );

    const refreshTokenLiteral = refreshToken.data;
    return {
      accessToken: refreshTokenLiteral.token,
      accessTokenExpiry: curDate + refreshTokenLiteral.tokenExpiry * 1000,
      refreshToken: refreshTokenLiteral.refreshToken,
      refreshTokenExpiry:
        curDate + refreshTokenLiteral.refreshTokenExpiry * 1000,
    };
  } catch (err) {
    return {
      ...token,
      error: 'RefreshTokenError',
    };
  }
};

const callbacks = {
  // Getting the JWT token from API response
  async jwt({ token, user }) {
    const curDate = Date.now();

    if (!token) {
      return token;
    }

    if (user) {
      return {
        accessToken: user.token,
        accessTokenExpiry: curDate + user.tokenExpiry * 1000,
        refreshToken: user.refreshToken,
        refreshTokenExpiry: curDate + user.refreshTokenExpiry * 1000,
      };
    }

    if (curDate < token.accessTokenExpiry) {
      return token;
    }

    return refreshAccessToken(token);
  },

  async session({ session, token }) {
    session.accessToken = token.accessToken;
    session.error = token.error;
    return session;
  },
};

const options = {
  providers,
  callbacks,
  pages: {
    signIn: '/login',
  },
  secret: process.env.SECRET,
  session: {
    jwt: true,
    maxAge: 15 * 24 * 60 * 60,
  },
};

const request = (req, res) => NextAuth(req, res, options);

export default request;
