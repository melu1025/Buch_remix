import { Button } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { useAuth } from './AuthContext';

export default function LogoutComponent() {
  const { logout } = useAuth();

  const handleLogout = () => {
    // Token und Rolle aus dem LocalStorage entfernen
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Cookie mit dem Namen 'token' entfernen
    Cookies.remove('token');
    Cookies.remove('roles'); 

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
}
