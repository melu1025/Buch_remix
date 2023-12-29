const handleLogout = () => {
    // Token und Rolle aus dem LocalStorage entfernen
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    console.log('Erfolgreich ausgeloggt');
  };

  export default handleLogout;