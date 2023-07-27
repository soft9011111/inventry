import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Header= (Props)=> {
    const navigate = useNavigate();
    
        return (
            <Container>
                <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                    <Container>
                        <Navbar.Brand href="/home">P M FAABS</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        {Props.menu? 
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/listinventry">Inventry</Nav.Link>
                                <Nav.Link href="/listjobs">Jobs</Nav.Link>
                                <Nav.Link href="/listbills">Bills</Nav.Link>
                                <Nav.Link onClick={() => 
                                                { sessionStorage.clear();
                                                 navigate('/'); }}>
                                                Logout({Props.username})
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        :null}
                        
                    </Container>
                </Navbar>
            </Container>);
    }

export default Header;
