import {Row, Col, Button, Form, Image, Card, ListGroup} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { useNavigate,Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../slices/cartSlice';

export default function CartScreen(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {cartItems} = useSelector((state)=> state.cart);

     const addToCartHandler = async (product,qty) => {
        dispatch(addToCart({...product,qty}))
    }
    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id))
    }

    function checkOutHandler(){
        navigate('/login?redirect=/shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1 style={{marginBottom: '20px'}}>Shopping Cart</h1>
                {cartItems.length === 0 ? (<Message>Your Cart is Emply <Link to='/'>Go Back</Link></Message>):
                (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}><Image src={item.image} alt={item.name} fluid rounded/></Col>
                                    <Col md={3}><Link to={`/product/${item._id}`}>{item.name}</Link></Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e)=>addToCartHandler(item, Number(e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map(x=>(
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}><Button type='button' variant='light' onClick={()=>removeFromCartHandler(item._id)}><FaTrash/></Button></Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce((acc,item)=> acc+item.qty ,0)})
                            </h2>
                            ${cartItems.reduce((acc,item)=> acc+item.price*item.qty,0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button onClick={checkOutHandler} type='button' className='btn-block' disabled={cartItems.length === 0}>Proceed to Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}