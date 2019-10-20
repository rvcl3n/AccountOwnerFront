import React from 'react';
import './Navigation.css';
import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const navigation = (props) => {
    return (
            <div>
                <Navbar bg="primary" expand="lg" variant="dark">
                    <Navbar.Brand href="/">Account-Owner App</Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/owner-list">Owner Actions</Nav.Link>
                        <Nav.Link href="/account-list">Account Actions</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
                    

    )
}

export default navigation;
