import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Header() {
  const { products } = useSelector((state) => state.productSlice);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        {console.log("render method")}
        <Container>
          <Navbar.Brand href="#home">Admin-dashboard</Navbar.Brand>
          <Nav className="ms-auto">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link text-danger" : "nav-link"
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link text-danger" : "nav-link"
              }
              to="/products"
            >
              Products ({products?.length || 0})
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link text-danger" : "nav-link"
              }
              to="/Login"
            >
              Login
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
