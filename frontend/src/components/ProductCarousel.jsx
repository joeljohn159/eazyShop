import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loading from "./Loading";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";


export default function ProductCarousel(){

    const {data: products, isLoading, error} = useGetTopProductsQuery();
    return isLoading ? <Loading/> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel style={{position:'relative'}}  pause='hover' className="bg-primary mb-4" >
            {products.map(product=>(
                <Carousel.Item  key={product._id}>
                    <Link to={`/product/${product._id}`} style={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>
                        <Image src={product.image}  alt={product.name} fluid/>
                        <Carousel.Caption className="carousel-caption">
                            <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}