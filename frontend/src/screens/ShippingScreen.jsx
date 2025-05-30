import { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingScreen() {

    const {shippingAddress} = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode ||'');
    const [country, setCountry] = useState(shippingAddress?.country||'');

    function submitHandler(e){
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode, country}));
        navigate('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2={true}/>
            <h1>Shipping</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address' className='my-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='city' className='my-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e)=>setCity(e.target.value)}
                    >
                        
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode' className='my-2'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Postal Code"
                        value={postalCode}
                        onChange={(e)=>setPostalCode(e.target.value)}
                    >
                        
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='country' className='my-2'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e)=>setCountry(e.target.value)}
                    >
                        
                    </Form.Control>
                </Form.Group>

                <Button type="text" variant="primary" className="my-2">Continue</Button>
            </Form>
        </FormContainer>
    )
}