import React, { useState,useEffect } from 'react';
import './contact.css'
import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import contact from "../../images/contact.png";
import name from "../../images/name.png";
import phone from "../../images/phone.png";
import email from "../../images/email.png";
import facebook from "../../images/facebook.png";
import whats from "../../images/whats.png";
import messgener from "../../images/Messanger.png";
import instagram from "../../images/instrgram.png";
import NavBar from '../Navbar/NavBar';
import { FaRegUser } from 'react-icons/fa6';
import { MdOutlineMail, MdOutlinePhoneIphone } from 'react-icons/md';
import { useDispatch,useSelector } from 'react-redux';
import { createContactUs } from '../../features/contactUs/contactSlice';
import { ToastContainer } from 'react-toastify'
import notify from '../UseNotifications/useNotification'
import { useNavigate } from 'react-router-dom'

const ContactUs = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate(); 
  const res = useSelector((state) => state.contact.data);

  const isLoading = useSelector((state) => state.contact.isLoading);
  const error = useSelector((state) => state.contact.error);

console.log(res)
console.log(res.message)

  const [state, setState] = useState({
   
    subject: '',
      first_name: '',
      phone: '',
      email: ''
   
  });

  // Destructure state object for easier access
  const { subject,first_name,phone,email} = state;

  // Function to handle input changes
  const handleInputChange = (fieldName) => (e) => {
    setState(prevState => ({ ...prevState, [fieldName]: e.target.value}));
};

  const OnSubmit = async(e) =>{
    e.preventDefault();
    const contactData = {
      subject,first_name,phone,email
    };
    
 await dispatch(createContactUs(contactData));
 } 

 useEffect(() => {
  if (isLoading === false) {
    if (res) {
      console.log(res);
     
      if (res.message === "The message has added  successfully") {
        notify("تم ارسال الرساله بنجاح   ", "success");
        setTimeout(() => {
          window.location.reload() // to reload page after send msg
      }, 1500);
      }
      if (res.message === "Request failed with status code 422"){
        notify("  هناك خطأ في ارسال الرساله ", "error");
        
      }
    }
  }
}, [isLoading]);




    return <> 
    <NavBar />
     
    <Container>
    <Row>
        <Col>
          <div style={{position:'relative' , marginTop:'-35px'}}>
            <h1 style={{color: 'rgba(255, 255, 255, 1)' , fontWeight:'500' , paddingBottom :'25px', paddingTop:'15px' , borderRadius:'25px'}} className=" background-image">تواصل معنا </h1>
          </div>
        </Col>
    </Row>
    </Container>

   <Container>
    <Row style={{marginTop:"25px" }}  >
        <Col sm="6" xs='12'>
            <img  src={contact} alt="" style={{ maxWidth: '80%', height: 'auto' }} />
            <div className='d-flex justify-content-center align-items-center'>
                <a href="https://www.instagram.com/" ><img style={{padding:'10px'}} src={instagram} alt=""  /></a>
                <a href="https://www.messenger.com/" ><img style={{padding:'10px'}} src={messgener} alt=""  /></a>
                <a href=" https://web.whatsapp.com/" ><img style={{padding:'10px'}} src={whats} alt=""  /></a>
                <a href="https://www.facebook.com/" ><img style={{padding:'10px'}} src={facebook} alt=""  /></a>
            </div>
        </Col>
        
        <Col sm="6" xs='12' >
         <div  style={{ padding:'10px' }}>
           <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                 <Form.Label style={{fontWeight: '600' , display:'flex' }}>الاسم بالكامل</Form.Label>

                 <FaRegUser style={{color:'gray' , position:'absolute' , display:'flex' , marginTop:'17px' , paddingRight:'9px' , fontSize:'25px' }} />

               
                 <Form.Control type="text" placeholder="محمد خالد" style={{  background:'rgba(245, 245, 245, 1)' ,borderRadius: '10px', 
                        padding:'15px 35px 15px 15px', width:'85%' }} onChange={handleInputChange('first_name')} value={first_name} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                 <Form.Label style={{fontWeight: '600' , display:'flex' }}>رقم الموبيل</Form.Label>
                 <MdOutlinePhoneIphone  style={{color:'gray' , position:'absolute' , display:'flex' , marginTop:'12px' , paddingRight:'9px' , fontSize:'35px' }} />

                    <Form.Control type="text" placeholder=" 789 456 123" style={{  background:'rgba(245, 245, 245, 1)' ,borderRadius: '10px', 
                         padding:'15px 35px 15px 15px', width:'85%' }} onChange={handleInputChange('phone')} value={phone} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{fontWeight: '600' , display:'flex' }}>البريد الالكتروني </Form.Label>

                  <MdOutlineMail  style={{color:'gray' , position:'absolute' , display:'flex' , marginTop:'12px' , paddingRight:'9px' , fontSize:'35px' }}  />

                     <Form.Control type="text"
                         placeholder="username@mail.com" style={{  background:'rgba(245, 245, 245, 1)' ,borderRadius: '10px', 
                         padding:'15px 38px 15px 15px', width:'85%' }}  onChange={handleInputChange('email')} value={email}  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{fontWeight: '600' , display:'flex' }}>ملاحظاتك  </Form.Label>
                        <Form.Control as="textarea" placeholder="اكتب ملاحظاتك هنا" style={{ height: '150px' ,background:'rgba(245, 245, 245, 1)' ,borderRadius: '10px', 
                          padding:'15px', width:'85%' }}  onChange={handleInputChange('subject')} value={subject} 
                        />
                </Form.Group> 


             <div className='d-flex justify-content-center align-items-center'>
                <button className=" background-button "  style={{ borderRadius:'25px',
                color:' rgba(255, 255, 255, 1)' , fontWeight:'700' , fontSize :'25px'}}  onClick={(e) => OnSubmit(e)}>ارسال</button>
            </div>

           
          </Form>
          
         </div>
        </Col>
    </Row>
    <ToastContainer />
   </Container>
 </>;
}
export default ContactUs;






