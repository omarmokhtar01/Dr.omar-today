import React, { useState } from 'react';
import './navbar.css'
import {  Container, Dropdown, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import logo from "../../images/logo 1.png";
import backgroundImage from '../../images/back-header.png';
import nav1 from "../../images/nav1.png";
import nav2 from "../../images/nav2.png";
import nav3 from "../../images/nav3.png";
import nav4 from "../../images/nav4.png";
import nav5 from "../../images/nav5.png";
import nav6 from "../../images/nav6.png";
import { Link } from 'react-router-dom';
import { IoHeartCircleSharp } from 'react-icons/io5';
import { MdCircleNotifications } from "react-icons/md";
import { MdDownloadForOffline } from "react-icons/md";
import { IoPersonCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import notify from '../UseNotifications/useNotification';
import { ToastContainer } from 'react-toastify'

const NavBar = () => {

  const navigate = useNavigate(); 

  const logOut = () =>{
 
    Cookies.remove("token");
     setTimeout(() => {
            navigate("/");
        }, 1500);

        notify("تم تسجيل الخروج بنجاح   ", "success");
   }

    const navbarStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', // You can adjust this property based on your image and design preferences
        
      };

 return <>
    <Navbar expand="lg" style={navbarStyle}  >
      <Container style={{marginBottom:'50px '}} >
        <Navbar.Brand >
        <Link to='/'>
              <img  src={logo} alt=""  style={{width:'110px' , height:'110px'}}/>
              </Link></Navbar.Brand>
        <Navbar.Toggle  aria-controls="basic-navbar-nav" style={{ backgroundColor: '#fff', border: 'none' }}/>
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-5" >
        <Nav.Link style={{ color: '#D19B6F' , marginLeft :'20px'}} href='/'>الرئيسيه</Nav.Link>
            <Nav.Link  style={{ color: '#FFFFFF' , marginLeft :'20px' }} href='/audios'>صوتيات</Nav.Link>
            <Nav.Link style={{ color: '#FFFFFF' , marginLeft :'20px' }} href="/Books">كتب</Nav.Link>
            <Nav.Link style={{ color: '#FFFFFF' , marginLeft :'20px'}} href="/articles">مقالات</Nav.Link>
            <Nav.Link style={{ color: '#FFFFFF' , marginLeft :'20px'}} href="/pictures">صور</Nav.Link>
            <Nav.Link style={{ color: '#FFFFFF' , marginLeft :'20px'}} href="/contact-us">تواصل معنا</Nav.Link>
        </Nav>

         <div  className=" nav-menu  ">
          <img src={nav6} alt='' style={{paddingLeft:'5px'}} />
          <img src={nav5} alt='' style={{paddingLeft:'5px'}}  />

          <Link to='/DownloadScientest' >
          <MdDownloadForOffline  style={{ color: 'rgb(219 176 134)', fontSize: '35px' ,paddingLeft:'5px' }}/>
          </Link>
         
          
          <Link to='/favScientists' >
          <IoHeartCircleSharp style={{ color: '#FFFFFF', fontSize: '35px' ,paddingLeft:'5px' }} />
          </Link>
          
          <Link to='/notification'>
          <MdCircleNotifications  style={{ color: '#FFFFFF', fontSize: '35px' ,paddingLeft:'5px' }}/>
          </Link>
         
          
        <NavDropdown title={ <IoPersonCircleOutline style={{ color: '#FFFFFF', fontSize: '30px' }} /> } className='pp'    >
            <NavDropdown.Item    href='/personaLinformation'>الملف الشخصي</NavDropdown.Item>
            <NavDropdown.Item   href='/conditionandroles'>الشروط والاحكام </NavDropdown.Item>
            <NavDropdown.Item 
             onClick={logOut}
            style={{color:'rgba(255, 53, 53, 1)' }} eventKey="4.3">  تسجيل الخروج</NavDropdown.Item>
          </NavDropdown> 
          </div>
        </Navbar.Collapse>
      </Container>
      <ToastContainer />
    </Navbar>
    </>;
}
export default NavBar;