import React, { useState } from 'react';
import './Auth.css'
import phone from "../../images/phone.png";
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import facebook from "../../images/face.png";
import gmail from "../../images/gamil.png";
import apple from "../../images/apple.png";
import ForgetPasswordPage from './ForgetPasswordPage';
import RegisterPage from './RegisterPage';


const LoginPage = () => {

  //to make modal
     const [show, setShow] = useState(false);
     const [showReg, setShowRwg] = useState(false);

     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     const handleClosee = () => setShowRwg(false);
     const handleShowReg = () => setShowRwg(true);

    return <>
    <Container>
       <Row  >
        <Col className=" d-flex justify-content-center text-center  " style={{padding:'initial'}} >
        <div style={{ width:'400px' , background:'rgb(237 234 234)' ,borderRadius:'15px' ,padding:'25px',}}>

         <h4 style={{fontWeight:'700' ,  color:'rgba(209, 155, 111, 1)'}}>    تسجيل الدخول    </h4>
     <Form>
       <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{fontWeight: '600' , display:'flex' }}>رقم الموبيل</Form.Label>
         
         <img  className='icon-input' src={phone} alt="" style={{position:'absolute' , display:'flex' , marginTop:'17px',paddingRight:'9px' }} />
          
         <Form.Control type="text" placeholder=" 789 456 123" style={{  background:'#FFFFFF' ,borderRadius: '10px', 
                  padding:'15px 35px 15px 15px' }}  /> 
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{fontWeight: '600' , display:'flex' }}> كلمه المرور  </Form.Label>
            
            <Form.Control type="password"  style={{  background:'#FFFFFF' ,borderRadius: '10px', 
                    padding:'15px' }}  />
         </Form.Group>


       <div style={{display:'flex' , justifyContent:'center' , gap:'120px'}}>
          <p> <input style={{marginLeft:'10px' , marginTop:'10px'}} type='checkbox' />تذكرني  </p>
          <p style={{color:'rgba(235, 60, 60, 1)' , cursor:'pointer'}}  onClick={handleShow} >     نسيت كلمة المرور؟     </p>

       <Modal show={show} onHide={handleClose} style={{width:'410px' , marginLeft:'20px'}}>
         <ForgetPasswordPage />
       </Modal>
      </div>

       <div  className='d-flex justify-content-center align-items-center' style={{borderRadius:'30px' }} >
              <button style={{ color:' rgba(255, 255, 255, 1)' , fontWeight:'700' , fontSize :'25px' , border:'none' , paddingTop:'5px'}} className='profileButton' >دخول</button>
       </div>

        <div style={{display:'flex' , justifyContent:'center'}}> <p>  لا تمتلك حساب ؟  </p>

       <div>
         <p style={{color:'rgba(209, 155, 111, 1)' , paddingLeft:'4px',cursor:'pointer'}}   onClick={handleShowReg}  >   قم بإنشاء حساب </p>
      </div>
               
        <Modal  show={showReg} onHide={handleClosee} style={{width:'410px'}}>
               <RegisterPage />
         </Modal>
      
       </div>

        <div>
             <p>او من خلال</p>
             <div className='d-flex justify-content-center align-items-center'>
             
                <a href="https://www.messenger.com/" ><img style={{padding:'10px'}} src={apple} alt=""  /></a>
                <a href=" https://web.whatsapp.com/" ><img style={{padding:'10px'}} src={gmail} alt=""  /></a>
                <a href="https://www.facebook.com/" ><img style={{padding:'10px'}} src={facebook} alt=""  /></a>
            </div>
         </div>

        </Form>

        </div>
        </Col>
      </Row>
    </Container> 
    </>;
}
export default LoginPage;