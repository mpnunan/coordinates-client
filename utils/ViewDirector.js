import PropTypes from 'prop-types';
import { GlobalStyles } from '@mui/material';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';
import RegisterForm from '../components/RegisterForm';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading, updateUser } = useAuth();

  const inputGlobalStyles = (
    <GlobalStyles styles={{
      h1: { fontSize: '42px' },
      'h1.MuiTypography-root': { fontSize: '42px' },
      'h2.MuiTypography-root': { fontSize: '32px' },
      '.MuiPaper-root': {
        display: 'flex',
        flexDirection: 'column',
      },
    }}
    />
  );
  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user) {
    return (
      <>
        {inputGlobalStyles}
        <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="container">{'valid' in user ? <RegisterForm user={user} updateUser={updateUser} /> : <Component {...pageProps} />}</div>
      </>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
