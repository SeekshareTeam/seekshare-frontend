
const classes = {
  main: 'flex flex-auto flex-wrap flex-row justify-center content-center',
};

export const HomeLayout = ({ loginButton, signUpButton }) => {
  return (
    <div className={classes.main}>
      <div>
        {loginButton}
      </div>
      <div>
        {signUpButton}
      </div>
    </div>
  )
};
