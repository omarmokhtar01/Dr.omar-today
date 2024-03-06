import React, { useState } from 'react';
import './Auth.css'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import ForgetPass2 from './ForgetPass2';
import arrowForm from "../../images/Arroww.png";

const ForgetPass3 = () => {
  //to make modal
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
           <ForgetPass2 />
          </Modal>
          </>
            <h4 style={{fontWeight:'700' ,  color:'rgba(209, 155, 111, 1)'}}>    نسيت كلمة المرور؟     </h4>
             <p style={{color:'rgba(122, 134, 154, 1)' , fontSize:'18px'}}>
             قم بادخال كلمة المرور الجديدة</p>
 
         <Form>
           <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{fontWeight: '600' , display:'flex' }}>كلمه المرور الجديده </Form.Label>
            
            <Form.Control type="password"  style={{  background:'rgba(245, 245, 245, 1)' ,borderRadius: '10px', 
                    padding:'15px' }}  />
           </Form.Group>   

            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{fontWeight: '600' , display:'flex' }}>    تأكيد كلمة المرور الجديدة  </Form.Label>
            <Form.Control type="password"  style={{  background:'rgba(245, 245, 245, 1)' ,borderRadius: '10px', 
                    padding:'15px' }}  />
            </Form.Group>  
 
          <div  className='d-flex justify-content-center align-items-center' style={{borderRadius:'30px' }} >
               <Button style={{ color:' rgba(255, 255, 255, 1)' , fontWeight:'700' , fontSize :'25px' , border:'none' , paddingTop:'5px'}}
                className='profileButton' >حفظ</Button>
          </div>
 
         </Form>
 
         </div>
         </Col>
       </Row>
     </Container>
     </>;
}
export default ForgetPass3;