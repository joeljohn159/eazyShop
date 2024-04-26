import {Link, useParams} from 'react-router-dom';
import { Row, Col, Card, Button, ListGroup, Image} from 'react-bootstrap';
import Message from '../components/Message';
import { useGetOrderDetailsQuery, usePayOrderMutation, useDeliverOrderMutation } from '../slices/ordersApiSlice';
import Loading  from '../components/Loading';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';

export default function OrderScreen(){

    const {id: orderId} = useParams();
    const {data: order, isLoading,refetch, error} = useGetOrderDetailsQuery(orderId);
    const [payOrder, {isLoading : loadingPay}] = usePayOrderMutation();
    const [deliverOrder, {isLoading: loadingDeliver}] = useDeliverOrderMutation();
    const {userInfo} = useSelector(state=>state.auth)

    async function payHandler(){
        try{
            const details = {
                payer : {}
            }
            const status = await payOrder({orderId, details});
            refetch()
            toast.success('Payment successful');
        }catch(error){
            toast.error('Payment Error');
        }
    }

    async function deliverOrderHandler(){
        try{
            const status = await deliverOrder(orderId);
            refetch()
            toast.success('Order Delivered');
        }catch(error){
            toast.error('Delivery Error');
        }
    }
    return isLoading ? <Loading/>   : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : 
        (<><h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name: </strong>{order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong>{order.user.email}
                        </p>
                        <p>
                            <strong>Address: </strong>{order.shippingAddress.address} {order.shippingAddress.city}
                            {order.shippingAddress.postalCode} {order.shippingAddress.country}
                        </p>

                        {order.isDelivered ? (<Message>Delivered on {order.deliveredAt}</Message>) : (
                            <Message variant="danger">Not Delivered </Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (<Message>Paid on {order.paidAt}</Message>) : (
                            <Message variant="danger">Not Paid </Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.map((item,index)=>(
                            <ListGroup.Item key={index}> 
                                    <Row>
                                        <Col md={1}><Image src={item.image} alt={item.name} fluid rounded/></Col>
                                        <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                                        <Col md={4}>{item.qty} x ${item.price} = ${item.qty*item.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                        ))}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                            
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                                <Col><strong>Total</strong></Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {/* PAY ORDER */}
                        {/* s */}

                        {loadingDeliver && <Loading/>}

                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && 
                            (
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' onClick={deliverOrderHandler}>Mark as Delivered</Button>
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>

                    <ListGroup.Item>
                        <Button onClick={payHandler} style={{marginBottom : "10px", marginLeft:"20px", marginTop:"20px"}} disabled = {order.isPaid}>Test Pay</Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row></>
    )
    
}