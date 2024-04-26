import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

export default function SearchBox(){

    const navigate = useNavigate();
    const {keyword: urlKeyword} = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || '');

    function submitHandler(e){
        e.preventDefault();
        setKeyword('')
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else{
            navigate('/')
        }
    } 
    return (
        <Form style={{display:'flex'}} onSubmit={submitHandler}>
            <Form.Control  onChange={(e)=>setKeyword(e.target.value)} value={keyword} placeholder = 'Search Products..' className='mr-sm-2 ml-sm-5' style={{marginRight:'10px'}} type='text' name='q' >

            </Form.Control>
            <Button  type='submit' variant ='outline-light'style={{marginRight:'10px'}} className='p-2 mx-2'>Search</Button>
        </Form>
    )
}