import React, { useState } from 'react';
import './Auth.css'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import RegisterPage from './RegisterPage';
import arrowForm from "../../images/Arroww.png";

const ForgetPass4 = () => {
  //to make modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
 return <> 

    <Container>
       <Row>
        <Col className=" d-flex justify-content-center text-center  " style={{padding:'initial'}} >
         <div style={{ width:'400px' , background:'rgb(237 234 234)' ,borderRadius:'15px' ,padding:'25px',}}>

       <>
       <Modal.Header closeButton></Modal.Header>
         <Modal show={show} onHide={handleClose} style={{width:'410px' , marginLeft:'20px'}}>
           <RegisterPage />
         </Modal>
       </>
           <h4 style={{fontWeight:'700' ,  color:'rgba(209, 155, 111, 1)'}}>    نسيت كلمة المرور؟     </h4>
            <p style={{color:'rgba(122, 134, 154, 1)' , fontSize:'19px'}}>
            لقد قمنا بارسال رمز التأكيد الى الرقم +20 123456789</p>
       <Form>
        <div>
       <div style={{display:'flex' , gap:'10px' , justifyContent:'center' ,  marginBottom:'10px'}} >
           <Form.Control type="text" placeholder="2" style={{  background:'#FFFFFF' ,borderRadius: '10px', 
                  padding:'15px 35px 15px 15px' , width:'25%' }}  />

           <Form.Control type="text" placeholder="2" style={{  background:'#FFFFFF' ,borderRadius: '10px', 
                  padding:'15px 35px 15px 15px' , width:'25%' }}  />
                 
            <Form.Control type="text" placeholder="2" style={{  background:'#FFFFFF' ,borderRadius: '10px', 
                  padding:'15px 35px 15px 15px' , width:'25%' }}  />

      
           <Form.Control type="text" placeholder="2" style={{  background:'#FFFFFF' ,borderRadius: '10px', 
                  padding:'15px 35px 15px 15px' , width:'25%' }}  />
      </div>
  
        <span style={{color:'rgba(122, 134, 154, 1)' }}>  00:45  </span> 
        <p style={{color:'rgba(209, 155, 111, 1)' }}>  إعادة ارسال الرمز </p>
        </div>

         <div  className='d-flex justify-content-center align-items-center' style={{borderRadius:'30px' }} >
              <Button style={{ color:' rgba(255, 255, 255, 1)' , fontWeight:'700' , fontSize :'25px' , border:'none' , paddingTop:'5px'}}
               className='profileButton' >تفعيل</Button>
        </div>
        </Form>

        </div>
        </Col>
      </Row>
    </Container>
    </>;
}
export default ForgetPass4;