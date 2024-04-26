import { useParams, useNavigate} from "react-router-dom";
import {useState } from 'react'
import { Link } from "react-router-dom";
import { Row, Col, Image, Card, Button, ListGroup, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailQuery, useCreateReviewMutation } from "../slices/productsApiSlice.js";
import Loading from "../components/Loading.jsx";
import Message from "../components/Message.jsx";
import { addToCart } from "../slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Meta from "../components/Meta.jsx";


export default function ProductScreen(){

    const {id: productId} = useParams();
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {data: product, isLoading,refetch, error} =  useGetProductDetailQuery(productId);
    const [ createReview, {isLoading:loadingProductReview} ] = useCreateReviewMutation();

    const {userInfo} = useSelector(state=>state.auth)

    function addToCartHandler(){
        dispatch(addToCart({...product, qty}));
        navigate('/cart')
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            console.log('Hi')
            await createReview({
                productId,
                rating, 
                comment,
                name:userInfo.name
            }).unwrap();
            refetch();
            toast.success('Review Submitted');
            setRating(0);
            setComment('');
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || error.error)
        }
    }
    return (
        <>
         <Link className="btn btn-light my-3" to="/">Go back</Link>
        {isLoading ? <Loading/> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
            <>
           <Meta title={product.name}/>
            <Row>
              <Col md={5}>
                  <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={4}>
                  <ListGroup variant="flush">
                      <ListGroup.Item>
                          <h3>{product.name}</h3>
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                      </ListGroup.Item>
                      <ListGroup.Item>
                          Price: ${product.price}
                      </ListGroup.Item>
                      <ListGroup.Item>
                          Description: {product.description}
                      </ListGroup.Item>
                  </ListGroup>
              </Col>
              <Col md={3}>
                  <Card>
                      <ListGroup variant="flush">
                          <ListGroup.Item>
                              <Row>
                                  <Col>Price:</Col>
                                  <Col>${product.price}</Col>
                              </Row>
                          </ListGroup.Item>

                          {
                            product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control
                                            as = 'select'
                                            value={qty}
                                            onChange= {(e) => setQty(Number(e.target.value))}>
                                                {[...Array(product.countInStock).keys()].map((x) => <option key={x+1} value={x+1}>{x+1}</option>)}
                                            </Form.Control>
                                    
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                          }
  
                          <ListGroup.Item>
                              <Row>
                                  <Col>Status:</Col>
                                  <Col>{product.countInStock > 0 ? 'In Stock':'Out of Stock'}</Col>
                              </Row>
                          </ListGroup.Item>
  
                          <ListGroup.Item>
                              <Button onClick={addToCartHandler} className="btn-block" type="button" disabled={product.countInStock === 0}>
                                  Add to Cart
                              </Button>
                          </ListGroup.Item>
                      </ListGroup>
                  </Card>
              </Col>
            </Row>

            <Row className="review mt-4">
                          <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviewslength === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant="flush">
                                {product.reviews.map(review=>
                                {
                                    return (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating}/>
                                            <p>{review.createdAt.substring(0,10)}</p>
                                            <p>{review.comment}</p>   
                                        </ListGroup.Item>
                                    )
                                }
                                    )}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {loadingProductReview && <Loading/>}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId="rating" className="my-2">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e)=>setRating(Number(e.target.value))}
                                                >
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment" className="my-2">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as='textarea' row='3' value={comment} onChange={e=>setComment(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Button disabled={loadingProductReview} variant="primary" type="submit">Submit</Button>
                                        </Form>
                                    ) : (
                                        <Message>Please <Link to='/login'>sign in </Link> to review.</Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                          </Col>
            </Row>
          </>
        )}
        </>
    )
}