import * as React from 'react';
import { signIn } from 'next-auth/react';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

import { Button, TextLink } from 'src/components/Button';
import { FormInput } from 'src/components/Form';

const Login: NextPage & { layoutType: string } = () => {
  const router = useRouter();
  const { callbackUrl = '/' } = router.query;
  const [error, setError] = React.useState<string>('');

  return (
    <div className="flex flex-col items-center justify-center shadow-lg h-full">
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
          let res = await signIn<'email'>('seekshare-backend', {
            email: values.email,
            password: values.password,
            callbackUrl: 'http://localhost:3000' + callbackUrl,
          });

          if (res?.error) {
            console.log('login error', error);
            setError(res.error);
          } else {
            setError('');
          }
          if (res?.url) {
            router.push(res.url);
          }
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center"
          >
            <div className="flex flex-col items-center space-y-2 my-4">
              <img src={'/static/images/logo.png'} className="h-16" />
              <h1 className="text-2xl font-light text-darkpen-medium mb-4">
                {'Sign in to Seekshare'}
              </h1>
            </div>
            <div className="bg-night-medium shadow-xl rounded-lg px-4 py-2 mb-4 md:w-72 border dark:border-night-light">
              <div>
                <FormInput
                  displayClass={'flex flex-col items-start py-3'}
                  labelHtmlFor={'email'}
                  labelName={'Email'}
                  ariaLabel={'enter your email'}
                  ariaRequirement={true}
                  inputValue={formik.values}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  inputWidth={'w-full'}
                />
                <div className="text-red-600 text-sm">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="mb-2">
                <FormInput
                  displayClass={'flex flex-col items-start py-2'}
                  labelHtmlFor={'password'}
                  labelName={'Password'}
                  ariaLabel={'enter your password'}
                  ariaRequirement={true}
                  inputValue={formik.values}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  inputWidth={'w-full'}
                  type={'password'}
                />
                <div className="text-red-600 text-sm">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Button variant="secondary" type="submit">
                  {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
      <div className="my-4 rounded-full border dark:border-night-light flex p-4 justify-center items-center">
        <TextLink
          size={'small'}
          normalText={'New to Seekshare?'}
          linkText={'Create an Account.'}
          href={'signup'}
        />
      </div>
    </div>
  );
};

Login.layoutType = 'general';

// This is the recommended way for Next.js 9.3 or newer

export default Login;
