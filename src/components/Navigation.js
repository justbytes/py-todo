import React from 'react';

// Import react-bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="navbar-brand" href="/">
            TODO APP
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
