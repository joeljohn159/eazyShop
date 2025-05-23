import {Navbar, Nav, Container, Badge, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import logo from '../assets/logo.png';
import {LinkContainer} from "react-router-bootstrap";
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import { resetCart } from '../slices/cartSlice';

export default function Header(){
    const {cartItems} = useSelector((state)=> state.cart);
    const {userInfo} = useSelector((state)=> state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutAPI] = useLogoutMutation();

    const logoutHandler = async() =>{
       
            try {
                const res = await logoutAPI().unwrap();
                dispatch(logout())
                dispatch(resetCart());
                navigate('/login')
            } catch (error) {
                console.log(error);
            }
        
        
    }

    return (
        <header>
            <Navbar bg='dark' expand='md' variant='dark' collapseOnSelect>
                <Container>
                    <Navbar.Brand href='/'><img src={logo} alt="logo" />EazyShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>

                        <Nav className='ms-auto'>
                            <SearchBox/>
                            <LinkContainer to='/cart'><Nav.Link ><FaShoppingCart/> Cart 
                                {cartItems.length > 0 && (
                                    <Badge pill bg='success' style={{marginLeft:'5px'}}>
                                        {cartItems.reduce((a,c)=> a+c.qty,0)}
                                    </Badge>
                                ) }
                            </Nav.Link></LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : 
                            (<LinkContainer to='/login'><Nav.Link><FaUser/> Sign In</Nav.Link></LinkContainer>)}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id='adminmenu'>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}