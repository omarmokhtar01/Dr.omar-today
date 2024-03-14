import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import errorImg from "../../images/404.png";
import { Link } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';

const ErrorPage = () => {
    return <>
    <NavBar/>

        <Container className='d-flex justify-content-center align-items-center ' style={{marginTop:'12%',marginBottom:'15%'}} >
            <Row>
                <Col>
                    <img src={errorImg} alt='' width='350px' />
                    <h2 style={{fontWeight:'bold' , color:'#4f3281' , marginTop:'20px'}}  >هذه الصفحه غير متاحه  </h2>
                    <Link to='/'>
                    <button style={{
                        padding:'5px 30px 10px' ,border:'1px solid rgb(26 22 81) ',fontSize:'20px',fontWeight:'bold',color:'rgb(26 22 81)',marginTop:'15px', borderRadius:'25px'
                    }}>ارجع للرئيسيه</button>
                    </Link>
                </Col>
            </Row>
        </Container>
    </>;
}
export default ErrorPage;