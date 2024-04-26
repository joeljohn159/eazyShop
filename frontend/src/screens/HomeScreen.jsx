import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Loading from "../components/Loading.jsx";
import Message from "../components/Message.jsx";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";
import Meta from "../components/Meta.jsx";


export default function HomeScreen() {
    
    // const [products, setProducts] = useState([]);
    // useEffect(()=>{
    //     const fetchProducts= async () => {
    //         const results  = await axios.get('http://127.0.0.1:5000/api/products')
    //         setProducts(results.data)
    //     }
    //     fetchProducts()
    // },[])
    const {pageNumber,keyword} = useParams();
    const { data, isLoading, error } = useGetProductsQuery({pageNumber,keyword});

    return (
        <>
            {!keyword ? <ProductCarousel/> : <Link to={`/`} className="btn btn-light mb-4">Go back</Link>}
            {isLoading ? <Loading/> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
                <>
                    <Meta/>
                    <h1>Latest products</h1>
                    <Row>
                        {data.products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={data.pages} page={data.page} keyword = {keyword}/>
                </>
            )}

        </>
    )
}