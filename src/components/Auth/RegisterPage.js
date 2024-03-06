import React, { useState } from 'react';
import './Auth.css'
import phone from "../../images/phone.png";
import emailImg from "../../images/email.png";
import nameImg from "../../images/name.png";
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import ForgetPass4 from './ForgetPass4';
import { Link } from 'react-router-dom';
import arrowForm from "../../images/Arroww.png";
import LoginPage from './LoginPage';
import { useDispatch } from 'react-redux';
import {register} from "../../features/auth/authSlice"
const RegisterPage = () => {
  const dispatch=useDispatch()
  //to make modal
    const [showw, setShoww] = useState(false);

    const handleClosee = () => setShoww(false);
    const handleShoww = () => setShoww(true);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state, setState] = useState({
      name: '',
      email: '',
      phonenumber: '',
      password:'',
      confirm_password:''
    });
  
    // Destructure state object for easier access
    const {  name,email,phonenumber ,password,confirm_password} = state;
  
    // Function to handle input changes
    const handleInputChange = (fieldName) => (e) => {
      setState(prevState => ({ ...prevState, [fieldName]: e.target.value}));
  };


  const submitRegister =async (e) => {
    e.preventDefault();
    // Perform form validation here if necessary
    if (name.trim() === '' || email.trim() === '' || phonenumber.trim() === '' || password.trim() === '' || confirm_password.trim() === '') {
      // Handle empty fields or any other validation errors
      console.log('Please fill in all fields');
      return;
    }
  
    if (password !== confirm_password) {
      // Handle password mismatch error
      console.log('Passwords do not match');
      return;
    }
  
    // If form data is valid, proceed with form submission
    console.log('Submitting form...');
    // Here you can proceed with any further actions like making an API call, etc.
    const formData = {
      name,
      email,
      phonenumber,
      password,
      confirm_password
    };
   await dispatch(register(formData))
  };

  return <>
    <Container>
     <Row  >
      <Col className=" d-flex justify-content-center text-center  " style={{padding:'initial'}} >
       
       <div style={{ width:'400px' , background:'rgb(237 234 234)' ,borderRadius:'15px' ,padding:'25px', marginTop:'-55px' }}>
       <>
        {/* <div  onClick={handleShow} >
         <img src={arrowForm}  alt='' style={{display:'flex',cursor:'pointer'}}  /></div> */}
         <Modal.Header closeButton></Modal.Header>
        <Modal show={show} onHide={handleClose} style={{width:'410px' , marginLeft:'20px'}}>
          <LoginPage />
         </Modal>
       </>
              <h4 style={{fontWeight:'700' ,  color:'rgba(209, 155, 111, 1)'}}>    تسجيل جديد    </h4>
      <Form>
  
      <Form.Group className="mb-1" >
          <Form.Label style={{fontWeight: '600' , display:'flex' }}>الاسم بالكامل</Form.Label>
          <img className='icon-input' src={nameImg} alt="" style={{position:'absolute' , display:'flex' , marginTop:'17px' , paddingRight:'9px' }} />
          <Form.Control onChange={handleInputChange('name')} value={name} type="text" placeholder="محمد خالد" style={{  background:'rgba(245, 245, 245, 1)' ,borderRadius: '10px', 
                padding:'15px 35px 15px 15px' }}  />
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label style={{fontWeight: '600' , display:'flex' }}>رقم الموبيل</Form.Label>
            <div>
               <img  className='icon-input' src={phone} alt="" style={{position:'absolute' , display:'flex' , marginTop:'17px',paddingRight:'9px' }} />
             
              {/* <Button style={{position:'absolute', margin:'13px 60px 13px 13px' , borderRadius:'15px' 
               , background:'linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)' , border:'none', padding:'3px 20px',
               color:'#FFFFFF'}}  onClick={handleShoww}     >تفعيل</Button> */}

           </div>

            <Modal  show={showw} onHide={handleClosee} style={{width:'410px'}}>
              <ForgetPass4 />
            </Modal>


            <Form.Control onChange={handleInputChange('phonenumber')} value={phonenumber} type="text" placeholder=" 789 456 123" style={{  background:'rgba(245, 245, 245, 1)' ,borderRadius: '10px', 
                  padding:'15px 35px 15px 15px' }}  />
                
        </Form.Group>

        <Form.Group className="mb-1" >
                      <Form.Label style={{fontWeight: '600' , display:'flex' }}>البريد الالكتروني </Form.Label>
                      <img className='icon-input' src={emailImg} alt="" style={{position:'absolute' , display:'flex' , marginTop:'20px',paddingRight:'9px' }} />
                        <Form.Control type="email"
                        onChange={handleInputChange('email')} value={email}
                            placeholder="username@mail.com" style={{  background:'rgba(245, 245, 245, 1)' ,borderRadius: '10px', 
                            padding:'15px 38px 15px 15px'}}  />
       </Form.Group>

       <Form.Group className="mb-1" >
            <Form.Label style={{fontWeight: '600' , display:'flex' }}> كلمه المرور  </Form.Label>
            
            <Form.Control
            onChange={handleInputChange('password')} value={password}
            type="password"  style={{  background:'rgba(245, 245, 245, 1)' ,borderRadius: '10px', 
                    padding:'15px' }}  />
            </Form.Group>

       <Form.Group className="mb-1" >
            <Form.Label style={{fontWeight: '600' , display:'flex' }}>تاكيد كلمه المرور  </Form.Label>
            
            <Form.Control type="password"  onChange={handleInputChange('confirm_password')} value={confirm_password} style={{  background:'rgba(245, 245, 245, 1)' ,borderRadius: '10px', 
                    padding:'15px' }}  />
            </Form.Group>


        <div style={{display:'flex' , alignItems:'center'}}>
           <p> <input style={{marginLeft:'10px' , marginTop:'10px'}} type='checkbox' />لقد قرأت و أوافق على   </p>


         <Link to='/conditionandroles' style={{textDecoration:'none'}}>
          <p style={{ color:'rgba(209, 155, 111, 1)' , cursor:'pointer' , marginLeft:'10px'}}   >   الشروط والاحكام   </p>
        </Link>
   
       </div>

       <div  className='d-flex justify-content-center align-items-center' style={{borderRadius:'30px' }} >
          <button onClick={(e) => submitRegister(e)} style={{ color:' rgba(255, 255, 255, 1)' , fontWeight:'700' , fontSize :'25px' , border:'none' , paddingTop:'5px'}} className='profileButton' >تسجيل</button>
       </div>
      </Form>

       </div>

      </Col>
    </Row>
  </Container>
  </>;
}
export default RegisterPage;