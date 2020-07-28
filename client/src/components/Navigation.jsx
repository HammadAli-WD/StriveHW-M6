import React, { Component } from 'react'
import { Navbar, Button, FormControl, Nav, Form} from "react-bootstrap"
import { Link } from "react-router-dom"

class Navigation extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Student-Portfolio</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                  <Link className="nav-link" to="/">Home</Link>
                  <Link className="nav-link" to="/backoffice">Backoffice</Link>
                {/* <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Back Office</Nav.Link> */}
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        )
    }
}

export default Navigation