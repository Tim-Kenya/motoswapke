import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import Home from './pages/Home';

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect: login,
    logout: auth0Logout,
    user,
  } = useAuth0();

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <>
      <Home 
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={login}
        onSignup={signup}
        onLogout={logout}
      />
    </>
  );
}

export default App;