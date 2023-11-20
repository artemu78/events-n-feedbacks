import HomePage from '@/app/page';
import LoginDialog from '@/components/login';

const SigninPage = () => {
  return (
    <>
      <HomePage />
      <LoginDialog title="Sign in" />
    </>
  );
};

export default SigninPage;
