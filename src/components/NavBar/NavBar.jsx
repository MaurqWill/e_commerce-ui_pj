import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import style from './NavBar.module.css';

function NavBar() {
  return (
    <Navbar expand="lg" className={`${style.navbar} bg-primary navbar-dark`}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white">SE147 Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border border-white" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className={style["nav-links"]} activeClassName="active">Home</Nav.Link>
            <Nav.Link as={Link} to="/add-customer" className={style["nav-links"]} activeClassName="active">Add Customers</Nav.Link>
            <Nav.Link as={Link} to="/customers" className={style["nav-links"]} activeClassName="active">View Customers</Nav.Link>
            <Nav.Link as={Link} to="/products" className={style["nav-links"]} activeClassName="active">Products</Nav.Link>
            <Nav.Link as={Link} to="/add-product" className={style["nav-links"]} activeClassName="active">Add Product</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

