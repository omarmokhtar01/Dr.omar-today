import React from 'react';
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

const ContactUs = () => {

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
                        padding:'15px 35px 15px 15px', width:'85%' }}  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                 <Form.Label style={{fontWeight: '600' , display:'flex' }}>رقم الموبيل</Form.Label>
                 <MdOutlinePhoneIphone  style={{color:'gray' , position:'absolute' , display:'flex' , marginTop:'12px' , paddingRight:'9px' , fontSize:'35px' }} />

                    <Form.Control type="text" placeholder=" 789 456 123" style={{  background:'rgba(245, 245, 245, 1)' ,borderRadius: '10px', 
                         padding:'15px 35px 15px 15px', width:'85%' }}  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{fontWeight: '600' , display:'flex' }}>البريد الالكتروني </Form.Label>

                  <MdOutlineMail  style={{color:'gray' , position:'absolute' , display:'flex' , marginTop:'12px' , paddingRight:'9px' , fontSize:'35px' }}  />

                     <Form.Control type="text"
                         placeholder="username@mail.com" style={{  background:'rgba(245, 245, 245, 1)' ,borderRadius: '10px', 
                         padding:'15px 38px 15px 15px', width:'85%' }}  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{fontWeight: '600' , display:'flex' }}>ملاحظاتك  </Form.Label>
                        <Form.Control as="textarea" placeholder="اكتب ملاحظاتك هنا" style={{ height: '150px' ,background:'rgba(245, 245, 245, 1)' ,borderRadius: '10px', 
                          padding:'15px', width:'85%' }}
                        />
                </Form.Group>


             <div className='d-flex justify-content-center align-items-center'>
                <button className=" background-button "  style={{ borderRadius:'25px',
                color:' rgba(255, 255, 255, 1)' , fontWeight:'700' , fontSize :'25px'}}  >ارسال</button>
            </div>

           
          </Form>
          
         </div>
        </Col>
    </Row>
   </Container>
 </>;
}
export default ContactUs;







