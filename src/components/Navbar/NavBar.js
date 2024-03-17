import React, { useEffect, useState } from 'react';
import './navbar.css'
import { Container, Nav, NavDropdown, Navbar, Modal, Col, Button,Dropdown } from 'react-bootstrap';
import logo from "../../images/logo 1.png";
import locationIcon from "../../images/location.svg";
import download from "../../images/download.svg";
import heart from "../../images/heart.svg";
import noti from "../../images/noti.svg";
import personal from "../../images/personal.svg";
import vector from "../../images/vector.svg";
import downNav from "../../images/downNav.svg";

import backgroundImage from '../../images/back-header.png';
import { Link, useLocation } from 'react-router-dom';
import { IoHeartCircleSharp } from 'react-icons/io5';
import { MdCircleNotifications } from "react-icons/md";
import { MdDownloadForOffline } from "react-icons/md";
import { IoPersonCircleOutline } from 'react-icons/io5';
import Cookies from 'js-cookie';
import notify from '../UseNotifications/useNotification';
import { ToastContainer } from 'react-toastify'
import LoginPage from '../Auth/LoginPage';
import { HiOutlineUser } from 'react-icons/hi2';
import { SlLocationPin } from 'react-icons/sl';
import backgroundImageee from "../../images/ground-home.png";
import { useTranslation } from 'react-i18next';

const NavBar = () => {


  const {  i18n } = useTranslation();
  const { t } = useTranslation('navbar');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'ar'); // Get language from localStorage or default to 'ar'

  const changeLanguage = (lng) => {
    if (lng !== lang) {
      i18n.changeLanguage(lng);
      setLang(lng);
      localStorage.setItem('lang', lng); // Save selected language to localStorage
    }
  };









  const [hasToken, setHasToken] = useState(false);
  const [location, setLocation] = useState(null);
  const [activeLink, setActiveLink] = useState(null);
  const locationNav = useLocation();

  // Update activeLink when the location changes
  React.useEffect(() => {
      setActiveLink(locationNav.pathname);
  }, [locationNav]);

  const handleClick = (link) => {
      setActiveLink(link);
  };
  useEffect(() => {
    if (!localStorage.getItem('lang')) {
      changeLanguage('ar');
    }
    console.log(lang);
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Fetch address using reverse geocoding with language set to Arabic
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`);
            const data = await response.json();
            console.log(data);
            // Extract city and country from the address
            const city = data.address.city || data.address.town || data.address.village || data.address.hamlet || data.address.county;
            const country = data.address.country;
            setLocation(`${city}, ${country}`);
          } catch (error) {
            console.error("Error getting location:", error);
            setLocation('Location not found');
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setLocation('Location not found');
        }
      );
    } else {
      setLocation('Geolocation is not supported by your browser');
    }
  }, []);
  


  useEffect(() => {
    // Update session storage when location changes
    if (location) {
      sessionStorage.setItem('userLocation', location);
    }
  }, [lang,location]);
let getLocation=sessionStorage.getItem('userLocation')
  // Check if token exists in cookies
  const checkToken = () => {
    const tokenExists = Cookies.get('token') !== undefined;
    setHasToken(tokenExists);
  };

  useEffect(() => {
    checkToken();
  }, [hasToken]);


  const logOut = () =>{
 
    Cookies.remove("token");
     setTimeout(() => {
            window.location.href="/";
        }, 1500);

        notify(t('logoutSuccess'), "success");
      }

    const navbarStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', // You can adjust this property based on your image and design preferences
      

      };
      const navbarStyleUnLogin = {
        backgroundImage: `url(${backgroundImageee})`,
    backgroundSize: "cover", // You can adjust this property based on your image and design preferences
    height: "300px",
    marginBottom:'20px'
      };
  //to make modal screen
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 return <>
   {hasToken ? (
   <>

    <Navbar expand="lg" style={navbarStyle} className='navLogin'>
      <Container className='navLogin' style={{marginBottom:'50px '}} >
        <Navbar.Brand >
        <Link to='/'>
              <img  src={logo} alt=""  style={{width:'110px' , height:'110px'}}/>
              </Link></Navbar.Brand>
        <Navbar.Toggle  aria-controls="basic-navbar-nav" style={{ backgroundColor: '#fff', border: 'none' }}/>
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-5">
            <Nav.Link
                as={Link}
                to="/"
                style={{ color: activeLink === '/' ? '#D19B6F' : '#FFFFFF', marginLeft: '20px' }}
            >
                {t('home')}
            </Nav.Link>
            <Nav.Link
                as={Link}
                to="/audios"
                style={{ color: activeLink === '/audios' ? '#D19B6F' : '#FFFFFF', marginLeft: '20px' }}
            >
                {t('audios')}
            </Nav.Link>
            <Nav.Link
                as={Link}
                to="/Books"
                style={{ color: activeLink === '/Books' ? '#D19B6F' : '#FFFFFF', marginLeft: '20px' }}
            >
                {t('books')}
            </Nav.Link>
            <Nav.Link
                as={Link}
                to="/articles"
                style={{ color: activeLink === '/articles' ? '#D19B6F' : '#FFFFFF', marginLeft: '20px' }}
            >
                {t('articles')}
            </Nav.Link>
            <Nav.Link
                as={Link}
                to="/pictures"
                style={{ color: activeLink === '/pictures' ? '#D19B6F' : '#FFFFFF', marginLeft: '20px' }}
            >
                {t('photos')}
            </Nav.Link>
            <Nav.Link
                as={Link}
                to="/contact-us"
                style={{ color: activeLink === '/contact-us' ? '#D19B6F' : '#FFFFFF', marginLeft: '20px' }}
            >
                {t('contactUs')}
            </Nav.Link>
        </Nav>

         <div  className=" nav-menu  d-flex">
          
         <Dropdown style={{
        border: '1px solid white',
        width: '50px',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '35px',
        marginLeft: '5px',
        cursor: 'pointer',
        backgroundColor:'#FFFFFF',
      }}>
      <Dropdown.Toggle variant="success" id="language-dropdown" style={{backgroundColor:'#d3a074',border:'0px',borderRadius:'20px'}}>
        <span style={{ color: 'white' }}>{i18n.language === 'en' ? 'en' : 'ar'}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="custom-dropdown-menu"> {/* Add custom class */}
        <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage('ar')}>العربية</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>         <Button
              style={{
                color: "#FFFFFF",
                backgroundColor: "rgba(209, 155, 111, 0.3)",
                borderRadius: "19px",
                height: "auto",
                width:'auto',
                marginLeft: "20px",
                border: "none",
                top: "56px",
                fontWeight: "400",
                fontSize: "15px",
              }}
              type="submit"
            >
            <img src={locationIcon} style={{ marginLeft: "5px" , fontSize:'20px'}}/>
            
             {getLocation || ""}{" "}
            </Button>

          <Link to='/DownloadScientest' >
          <img src={downNav}  style={{ color: 'rgb(219 176 134)', fontSize: '35px' ,paddingLeft:'5px' }}/>
          </Link>
         
          
          <Link to='/favScientists' >
          <img src={heart} style={{ color: '#FFFFFF', fontSize: '35px' ,paddingLeft:'5px' }} />
          </Link>
          
          <Link to='/notification'>
          <img src={noti}  style={{ color: '#FFFFFF', fontSize: '35px' ,paddingLeft:'5px' }}/>
          </Link>
         
          
        <NavDropdown title={ <img src={personal} style={{ color: '#FFFFFF', fontSize: '30px' }} /> } className='pp'    >
            <NavDropdown.Item    href='/personaLinformation'>{t('profile')}</NavDropdown.Item>
            <NavDropdown.Item   href='/conditionandroles'>{t('termsAndConditions')}</NavDropdown.Item>
            <NavDropdown.Item 
             onClick={logOut}
            style={{color:'rgba(255, 53, 53, 1)' }} eventKey="4.3">{t('logout')}</NavDropdown.Item>
          </NavDropdown> 
          </div>
        </Navbar.Collapse>
      </Container>
      <ToastContainer />
    </Navbar>
    </> ) : (
      <>

      <Navbar expand="lg" className="navbarStyle" style={navbarStyleUnLogin}>
      <Container className="nav-responsive navUnLogin" style={{ marginTop: "-120px" }}>
        <Navbar.Brand>
          <Link to="/">
            <img
              src={logo}
              alt=""
              style={{ width: "110px", height: "110px" }}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ backgroundColor: "#fff", border: "none" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-5">
            <Nav.Link
                as={Link}
                to="/"
                style={{ color: activeLink === '/' ? '#D19B6F' : '#FFFFFF', marginLeft: '20px' }}
            >
                {t('home')}
            </Nav.Link>
            <Nav.Link
                as={Link}
                to="/audios"
                style={{ color: activeLink === '/audios' ? '#D19B6F' : '#FFFFFF', marginLeft: '20px' }}
            >
                {t('audios')}
            </Nav.Link>
            <Nav.Link
                as={Link}
                to="/Books"
                style={{ color: activeLink === '/Books' ? '#D19B6F' : '#FFFFFF', marginLeft: '20px' }}
            >
                {t('books')}
            </Nav.Link>
            <Nav.Link
                as={Link}
                to="/articles"
                style={{ color: activeLink === '/articles' ? '#D19B6F' : '#FFFFFF', marginLeft: '20px' }}
            >
                {t('articles')}
            </Nav.Link>
            <Nav.Link
                as={Link}
                to="/pictures"
                style={{ color: activeLink === '/pictures' ? '#D19B6F' : '#FFFFFF', marginLeft: '20px' }}
            >
                {t('photos')}
            </Nav.Link>
            <Nav.Link
                as={Link}
                to="/contact-us"
                style={{ color: activeLink === '/contact-us' ? '#D19B6F' : '#FFFFFF', marginLeft: '20px' }}
            >
                {t('contactUs')}
            </Nav.Link>
        </Nav>

          <Col
            xs="auto"
            className="me-auto mb-2 nav-res-unlogin"
            style={{ position: "relative", left: "5px" }}
          >
             <div className="dropdown">
        <div
          className="dropdown-btn"
          
        >
        </div>
        <Dropdown style={{
        border: '1px solid white',
        width: '50px',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '35px',
        marginLeft: '5px',
        cursor: 'pointer',
        backgroundColor:'#FFFFFF',
      }}>
      <Dropdown.Toggle variant="success" id="language-dropdown" style={{backgroundColor:'#d3a074',border:'0px',borderRadius:'20px'}}>
        <span style={{ color: 'white' }}>{i18n.language === 'en' ? 'en' : 'ar'}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="custom-dropdown-menu"> {/* Add custom class */}
        <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage('ar')}>العربية</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </div>
            <Button
              style={{
                color: "#FFFFFF",
                backgroundColor: "rgba(209, 155, 111, 0.3)",
                borderRadius: "19px",
                height: "auto",
                width:'auto',
                                marginLeft: "20px",
                border: "none",
                top: "56px",
                fontWeight: "400",
                fontSize: "15px",
              }}
              type="submit"
            >
            <img src={locationIcon} style={{ marginLeft: "5px" , fontSize:'20px'}}/>
            
             {getLocation || ""}{" "}
            </Button>

            {/* 
          <Button  style={{color : '#042030' , fontWeight:'700',  background : 'linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)' , borderRadius : '19px' , width :'119px' , height:'38px' , border:'none'  }} 
           type="submit"><img  src={user} alt="" style={{marginLeft:'5px'}} /> تسجيل</Button>
*/}

            <>
              {/* <Button variant="primary" onClick={handleShow}>
      Launch demo modal
    </Button> */}

              <Button
                onClick={handleShow}
                id="login-home-button"
                style={{
                  color: "#042030",
                  fontWeight: "700",
                  background:
                    "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
                  borderRadius: "19px",
                  width: "119px",
                  height: "38px",
                  border: "none",
                }}
                type="submit"
              >

                <img src={vector} style={{ marginLeft: "5px", fontSize:'20px' }} />
                {t('login')}
              </Button>

              <Modal
              className='card-mod'
                show={show}
                onHide={handleClose}
                style={{ width: "410px", marginLeft: "-20px" }}
              >
                <LoginPage />
              </Modal>
            </>
          </Col>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
     )}
    </>;
}
export default NavBar;