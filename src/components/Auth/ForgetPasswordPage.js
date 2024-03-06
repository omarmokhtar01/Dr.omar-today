import React, { useState } from 'react';
import './Auth.css'
import phone from "../../images/phone.png";
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import arrowForm from "../../images/Arroww.png";
import ForgetPass2 from './ForgetPass2';
import { Link } from 'react-router-dom';
import LoginPage from './LoginPage';


const ForgetPasswordPage = () => {
   //to make modal
    const [showW, setShoww] = useState(false);

    const handleClosee = () => setShoww(false);
    const handleShoww = () => setShoww(true);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <>
    <Container>
       <Row  >
        <Col className=" d-flex justify-content-center text-center  " style={{padding:'initial'}} >
         <div style={{ width:'400px' , background:'rgb(237 234 234)' ,borderRadius:'15px' ,padding:'25px',}}>

         <>
         <Modal.Header closeButton></Modal.Header>

         <Modal show={show} onHide={handleClose} style={{width:'410px' , marginLeft:'20px'}}>
           <LoginPage />
         </Modal>
        </>

            <h4 style={{fontWeight:'700' ,  color:'rgba(209, 155, 111, 1)'}}>    نسيت كلمة المرور؟     </h4>
            <p style={{color:'rgba(122, 134, 154, 1)' , fontSize:'18px'}}>
             قم بادخال رقم الموبايل لاستعادة كلمة المرور</p>

        <Form>
         <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{fontWeight: '600' , display:'flex' }}>رقم الموبيل</Form.Label>
         
          <img  className='icon-input' src={phone} alt="" style={{position:'absolute' , display:'flex' , marginTop:'17px',paddingRight:'9px' }} />
          <Form.Control type="text" placeholder=" 789 456 123" style={{  background:'#FFFFFF' ,borderRadius: '10px', 
                  padding:'15px 35px 15px 15px' }}  />  
         </Form.Group>

         <div  className='d-flex justify-content-center align-items-center' style={{borderRadius:'30px' }} >
              <Button style={{ color:' rgba(255, 255, 255, 1)' , fontWeight:'700' , fontSize :'25px' , border:'none' , paddingTop:'5px'}}
               onClick={handleShoww} className='profileButton' >التالي</Button>
            <Modal show={showW} onHide={handleClosee} style={{width:'410px' , marginLeft:'20px'}}>
              <ForgetPass2 />
            </Modal>

         </div>

        </Form>

        </div>
        </Col>
      </Row>
    </Container>
    </>;
}
export default ForgetPasswordPage;