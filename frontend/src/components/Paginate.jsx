import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

export default function Paginate({pages, page, isAdmin=false, keyword=''}){
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x)=>(
                    <LinkContainer  key={x+1} 
                        to={!isAdmin ? keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x+1}` : `/admin/productList/${x+1}`}>
                        <Pagination.Item  active={x+1 === page}>{x+1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    )
}

// 