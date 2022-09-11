import * as React from 'react';
import { NextPage } from 'next';

import SignUpForm from 'src/sections/login/SignUpForm';

interface LayoutProps {
  signUpForm: React.ReactNode;
};

const SignUpLayout: React.FC<LayoutProps> = (props) => {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {props.signUpForm}
    </div>
  )
};

const SignUp: NextPage = () => {

  return (
    <SignUpLayout
      signUpForm={<SignUpForm />}
    />
  )

}

export default SignUp;
