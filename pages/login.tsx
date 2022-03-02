import * as React from 'react';
import { signIn, SignInResponse } from 'next-auth/react';
import { PrimaryButton } from 'src/components/Button';

import { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { GeneralLayout, GeneralLayoutType } from 'src/components/Layouts';
import { NextPage } from 'next';

const Login: NextPage & { getLayout: GeneralLayoutType } = () => {
  const router = useRouter();
  const { callbackUrl = '/' } = router.query;
  const [error, setError] = useState<string>('');

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(64, 'Must be 64 characters or less')
            .email('Invalid email address')
            .required('Please enter your email'),
          password: Yup.string().required('Please enter your password'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          let res: SignInResponse | undefined = await signIn(
            'seekshare-backend',
            {
              email: values.email,
              password: values.password,
              callbackUrl: 'http://localhost:3000' + callbackUrl,
              redirect: false,
            }
          );

          if (!res) {
            res = { error: '', url: '', status: 200, ok: false }
          }

          if (res) {
            if (res?.error) {
              console.log('@ error', error);
              setError(res.error);
            } else {
              setError('');
            }
            if (res?.url) {
              router.push(res.url);
            }
          }
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col items-center justify-center shadow-lg">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="uppercase text-sm text-gray-600 font-bold"
                  >
                    Email
                    <Field
                      name="email"
                      aria-label="enter your email"
                      aria-required="true"
                      type="text"
                      className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    />
                  </label>

                  <div className="text-red-600 text-sm">
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="uppercase text-sm text-gray-600 font-bold"
                  >
                    password
                    <Field
                      name="password"
                      aria-label="enter your password"
                      aria-required="true"
                      type="password"
                      className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    />
                  </label>

                  <div className="text-red-600 text-sm">
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <PrimaryButton type="submit">
                    {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

Login.getLayout = GeneralLayout;

// This is the recommended way for Next.js 9.3 or newer

export default Login;
