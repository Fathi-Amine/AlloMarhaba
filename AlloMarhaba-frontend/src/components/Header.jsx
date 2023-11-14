import {Navbar, Nav, Container, NavDropdown, Badge} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {FaSignInAlt, FaSignOutAlt} from "react-icons/fa";
import {LinkContainer} from 'react-router-bootstrap'
import {Link, useNavigate} from "react-router-dom";
import {useLogoutMutation} from "../slices/usersApiSlice.js";
import {clearCredentials} from "../slices/authSlice.js"

const Header = ()=>{
    const {userInfo} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()

    const logoutHandler = async ()=>{
        try {
            await logout().unwrap()
            dispatch(clearCredentials())
            navigate('/')
        }catch (error) {
            console.log(error)
        }
    }
    return (<header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Allo Media</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {userInfo ? (
                            <>
                                <NavDropdown title={userInfo.user.name} id="username">
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <FaSignInAlt /> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/register">
                                    <Nav.Link>
                                        <FaSignOutAlt /> Register
                                    </Nav.Link>
                                </LinkContainer>
                            </>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    )
}

export default Header;