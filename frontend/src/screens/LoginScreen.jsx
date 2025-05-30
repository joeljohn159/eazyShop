import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Form, Col, Row, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import Loading from '../components/Loading.jsx';
import {useLoginMutation} from '../slices/usersApiSlice'
import {setCredentials} from '../slices/authSlice'
import { toast } from "react-toastify";

export default function LoginScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch =  useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();

    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
        console.log(userInfo);
    },[userInfo,redirect, navigate])


    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const res = await login({email,password}).unwrap();
            dispatch(setCredentials({...res}))
            navigate(redirect);
        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || error.error);
        }
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className="my-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    required
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                ></Form.Control>
                </Form.Group>
            
                <Form.Group controlId='password' className="my-3">
                <Form.Label>password Address</Form.Label>
                <Form.Control
                required
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-12" disabled={isLoading}>Sign In</Button>
                {isLoading && <Loading/>}
            </Form>
            <Row className="py-3">
                <Col>
                New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}