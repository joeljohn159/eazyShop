import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import Message from "../../components/Message"
import Loading from "../../components/Loading"
import FormContainer from "../../components/FormContainer"
import { toast } from "react-toastify"
import { useGetUserDetailsQuery, useUpdateUserMutation  } from "../../slices/usersApiSlice"


export default function UserEditScreen(){

    const {id:userId} = useParams();

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [isAdmin,setIsAdmin] = useState(false);

    const {data:user, isLoading, refetch, error} = useGetUserDetailsQuery(userId);
    const [updateUser, {isLoading:loadingUpdate}] = useUpdateUserMutation();

    const navigate = useNavigate();

    useEffect(() => { 
        if(user){
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    },[user])

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            await updateUser({userId,name,email,isAdmin});
            refetch()
            toast.success('User Updated Successfully');
            navigate('/admin/userlist');
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }


    }
    return (
        <>
            <Link to='/admin/userlist'>Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate ? <Loading/> : error ? <Message variant='danger'>{error}</Message>:(
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name" className="my-2">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email" className="my-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="isAdmin" className="my-2">
                                <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e)=>setIsAdmin(e.target.checked)}
                                ></Form.Check>
                        </Form.Group>

                        <Button type="submit" variant="primary" className="my-2">Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}