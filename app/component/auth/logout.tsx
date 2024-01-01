import { Button } from "@chakra-ui/react";
import { useAuth } from './AuthContext';

const LogoutComponent: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    // Token und Rolle aus dem LocalStorage entfernen
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    logout();
    console.log('Erfolgreich ausgeloggt:');
    alert('Sie wurden erfolgreich ausgeloggt');
  };

  return (
    <>
      <Button colorScheme='red' onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default LogoutComponent;