import { HomeLayout } from './layout';

const classes = {
  btn: 'bg-blue-500 text-nord-6 font-bold py-2 px-4 rounded'
};

export const Home = () => {

  const renderButton = (buttonText) => {
    return (
      <button className={classes.btn}>
        {buttonText}
      </button>
    )
  }

  return (
    <HomeLayout
      loginButton={
        renderButton("Login")
      }
      signUpButton={
        renderButton("Sign Up")
      }
    />
  )
};
