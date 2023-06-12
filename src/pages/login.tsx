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

  // React.useEffect(() => {
  //   console.log('@ callback url', callbackUrl);
  // }, [callbackUrl]);

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
          const res = await signIn<'email'>('seekshare-backend', {
            email: values.email,
            password: values.password,
            redirect: false,
            callbackUrl: 'http://localhost:3000' + callbackUrl,
          });

            if (res?.error) {
              setError(res.error);
            } else if (res?.url) {
              router.push(res.url);
            } else {
              setError('');
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
              <h1 className="text-2xl font-light text-nord-0 dark:text-nord-6 mb-4">
                {'Sign in to Seekshare'}
              </h1>
            </div>
            <div className="bg-nord-4 dark:bg-nord-1 shadow-xl rounded-lg px-4 py-2 mb-4 md:w-72 border dark:border-nord-2">
              <div>
                <FormInput
                  containerClass={'flex flex-col items-start py-3'}
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
                  containerClass={'flex flex-col items-start py-2'}
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
              <div className="flex flex-wrap items-center justify-center">
                <Button variant="secondary" type="submit">
                  {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                </Button>
                <div className="text-red-600 text-sm">
                  {error}
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
      <div className="my-4 rounded-full border dark:border-nord-2 flex p-4 justify-center items-center">
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
