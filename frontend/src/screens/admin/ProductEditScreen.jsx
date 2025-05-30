import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import Message from "../../components/Message"
import Loading from "../../components/Loading"
import FormContainer from "../../components/FormContainer"
import { toast } from "react-toastify"
import { useUpdateProductMutation, useGetProductDetailQuery, useUploadProductImageMutation } from "../../slices/productsApiSlice"


export default function ProductEditScreen(){

    const {id:productId} = useParams();

    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [image,setImage] = useState('');
    const [brand,setBrand] = useState('');
    const [category,setCategory] = useState('');
    const [countInStock,setCountInStock] = useState('');
    const [description,setDescription] = useState('');


    const {data:product, isLoading, refetch, error} = useGetProductDetailQuery(productId);
    const [updateProduct, {isLoading:loadingUpdate}] = useUpdateProductMutation();
    const [uploadProductImage, {isLoading: loadingUpload}] = useUploadProductImageMutation();

    const navigate = useNavigate();

    useEffect(() => { 
        if(product){
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    },[product])

    const submitHandler = async(e) => {
        e.preventDefault();
        const updateProduct1  = {
            _id:product._id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,   
            description
        };
        const res = await updateProduct(updateProduct1);
        if(res.error){
            toast.error(res.error);
        }else{
            refetch();
            toast.success('Product Updated');
            navigate('/admin/productlist')
        }


    }

    const uploadFileHandler = async (e) =>{
        const formData = new FormData();
        formData.append('image',e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image)
        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || error.error)
        }
    }
    return (
        <>
            <Link to='/admin/productList'>Go Back</Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate ? <Loading/> : error ? <Message variant='danger'>{error.data.message}</Message>:(
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name" className="my-2">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="price" className="my-2">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="Enter Price" value={price} onChange={(e)=>setPrice(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="image" className="my-2">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text" placeholder="Enter Image URL" value={image} onChange={(e)=>setImage}></Form.Control>
                            <Form.Control type="file" label="Choose File" onChange={uploadFileHandler}></Form.Control>
                            
                        </Form.Group>
                        <Form.Group controlId="brand" className="my-2">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type="text" placeholder="Enter brand" value={brand} onChange={(e)=>setBrand(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="countInStock" className="my-2">
                                <Form.Label>Count in Stock</Form.Label>
                                <Form.Control type="number" placeholder="Enter Count in Stock" value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="category" className="my-2">
                                <Form.Label>Category</Form.Label>
                                <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(e)=>setCategory(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="description" className="my-2">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Description" value={description} onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary" className="my-2">Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}