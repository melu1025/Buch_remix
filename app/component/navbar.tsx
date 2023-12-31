import { Flex, Button } from '@chakra-ui/react';
import { StarIcon, SearchIcon, AddIcon } from '@chakra-ui/icons';
import { useNavigate, Link } from '@remix-run/react';
import { useAuth } from './auth/auth.context';
import LogoutComponent from './auth/logout';

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Flex
      as="nav"
      p="60px"
      alignItems="center"
      backgroundColor="white"
      color="black"
    >
      <Link to="/" style={{ marginRight: '40px' }}>
        <Flex alignItems="center" fontSize="lg">
          <StarIcon marginRight="2" />
          Home
        </Flex>
      </Link>
      <Link to="/search" style={{ marginRight: '40px' }}>
        <Flex alignItems="center" fontSize="lg">
          <SearchIcon marginRight="2" />
          Suche
        </Flex>
      </Link>
      {isLoggedIn && (
        <Link to="/create">
          <Flex alignItems="center" fontSize="lg">
            <AddIcon marginRight="2" />
            Anlegen
          </Flex>
        </Link>
      )}
      <Flex flex="1" justifyContent="flex-end">
        {isLoggedIn ? (
          // Wenn eingeloggt, zeige den Logout-Button
          <LogoutComponent />
        ) : (
          // Wenn nicht eingeloggt, zeige den Login-Button
          <Button colorScheme="blue" onClick={handleLoginClick}>
            Login
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
