import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col } from "react-bootstrap"
import {  FaTrash, FaEdit } from "react-icons/fa"
import Message from "../../components/Message"
import Loading from "../../components/Loading"
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from "../../slices/productsApiSlice"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import Paginate from "../../components/Paginate"


export default function ProductListScreen(){

    const {pageNumber} = useParams()
    const {data, isLoading ,error, refetch} = useGetProductsQuery({pageNumber});
    const [createProduct, {isLoading:loadingCreate}] = useCreateProductMutation();
    const [deleteProduct, {isLoading:loadingDelete}] = useDeleteProductMutation();
    
    async function deleteHandler(id){
        if(window.confirm('Are you sure?')){
            try {
                await deleteProduct(id);
                toast.success('Deleted Successfully')
                refetch();
           } catch (err) {
                toast.error(error?.data?.message||err.error)               
            }
        }
    }

    const createProductHandler = async () => {
        if(window.confirm("Are you sure to create a new product?")){
            try {
                const sampleProduct = await createProduct();
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }
    return (
        <>
        <Row className="align-items-center">
            <Col><h1>Products</h1></Col>
            <Col className="text-end">
                <Button onClick={createProductHandler} className="btn-sm m-3"><FaEdit/>Create Product</Button>
            </Col>
        </Row>
        {loadingDelete && <Loading/>}
        {loadingCreate && <Loading/>}
        {isLoading ? <Loading/> : error ? <Message variant='danger'>{error.data.message}</Message> : (
            <>
                <Table striped hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map(product=>(
                            <tr key={product._id}>
                                   <td>{product._id}</td> 
                                   <td>{product.name}</td> 
                                   <td>{product.price}</td> 
                                   <td>{product.category}</td> 
                                   <td>{product.brand}</td> 
                                   <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button  variant="light" className="btn-sm mx-2"><FaEdit/></Button>
                                        </LinkContainer>

                                            <Button onClick={()=>deleteHandler(product._id)} variant="danger" className="btn-sm mx-2"><FaTrash style={{color:'white'}}/></Button>
                                       
                                    </td> 
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={data.pages} page={data.page} isAdmin={true} />
            </>
        )}
        </>
    )
}