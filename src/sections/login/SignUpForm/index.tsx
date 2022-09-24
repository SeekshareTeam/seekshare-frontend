import * as React from 'react';

import { Formik, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useUserSignUpMutation } from 'src/generated/apollo';

import { FormInput } from 'src/components/Form';
import { Button } from 'src/components/Button';

const SignUpForm: React.FC = () => {
  /**
   * Things todo:
   * Use the password and confirm it with something else
   *
   */
  const router = useRouter();
  const [userSignUpMutation] = useUserSignUpMutation();
  const [error, setError] = React.useState<string>('');

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(64)
          .required('Please enter your first name'),
        lastName: Yup.string().max(64).required('Please enter your last name'),
        email: Yup.string()
          .max(64, 'Must be 64 characters or less')
          .email('Invalid email address')
          .required('Please enter your email'),
        password: Yup.string().required('Please enter your password'),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Passwords must match'
        ),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        console.log('values', values);
        const response = await userSignUpMutation({
          variables: {
            userInput: {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              secret: values.password,
            },
          },
        });

        if (response?.data?.userSignUp === 'Created') {
          let res = await signIn<'email'>('seekshare-backend', {
            email: values.email,
            password: values.password,
            callbackUrl: 'http://localhost:3000',
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
              {'Create An Account.'}
            </h1>
          </div>
          <div className="bg-night-medium shadow-xl rounded-lg px-4 py-2 mb-4 md:w-72 border dark:border-night-light">
            <FormInput
              displayClass={'flex flex-col items-start py-2'}
              labelHtmlFor={'firstName'}
              labelName={'First Name'}
              ariaLabel={'enter your first name'}
              ariaRequirement={true}
              inputValue={formik.values}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              inputWidth={'w-full'}
            />
            <FormInput
              displayClass={'flex flex-col items-start py-2'}
              labelHtmlFor={'lastName'}
              labelName={'Last Name'}
              ariaLabel={'enter your last name'}
              ariaRequirement={true}
              inputValue={formik.values}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              inputWidth={'w-full'}
            />
            <FormInput
              displayClass={'flex flex-col items-start py-2'}
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
              <FormInput
                displayClass={'flex flex-col items-start py-2'}
                labelHtmlFor={'confirmPassword'}
                labelName={'Confirm Password'}
                ariaLabel={'confirm your password'}
                ariaRequirement={true}
                inputValue={formik.values}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                inputWidth={'w-full'}
                type={'password'}
              />
            </div>
            <div className="flex items-center justify-center">
              <Button
                variant="secondary"
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                {formik.isSubmitting ? 'Please wait...' : 'Sign Up'}
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
