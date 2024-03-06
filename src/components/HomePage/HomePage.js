import React, { useEffect, useState } from "react";
import "./home.css";
import {
  Button,
  Col,
  Container,
  Modal,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";
import logo from "../../images/logo 1.png";
import backgroundImageee from "../../images/ground-home.png";
import profile from "../../images/profile.png";
import vector from "../../images/Vector (1).png";
import vector2 from "../../images/Vector (2).png";
import quran from "../../images/quran.png";
import box1 from "../../images/box1.png";
import box2 from "../../images/box2.png";
import box3 from "../../images/box3.png";
import box4 from "../../images/box4.png";
import icon3 from "../../images/icon3.png";
import card1 from "../../images/card1.png";
import card2 from "../../images/card2.png";
import card3 from "../../images/card3.png";
import card4 from "../../images/card4.png";
import card5 from "../../images/card-play.png";
import image3 from "../../images/image 3.png";

import mobile from "../../images/mobile.png";
import vector4 from "../../images/Vector (4).png";
import google from "../../images/google.png";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoginPage from "../Auth/LoginPage";
import { getElders, getEldersById } from "../../features/elders/eldersSlice";
import { FaCirclePause, FaCirclePlay, FaPause } from "react-icons/fa6";
import { MdDownloadForOffline, MdFavoriteBorder, MdFileDownload } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdAudiotrack } from "react-icons/md";
import { Carousel } from "react-bootstrap";
import { IoHeartCircleSharp } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { SlLocationPin } from "react-icons/sl";
import { TbArrowsExchange2, TbPlayerTrackNextFilled,TbPlayerTrackPrevFilled } from "react-icons/tb";

const HomePage = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  useEffect(() => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Fetch address using reverse geocoding with language set to Arabic
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=ar`);
            const data = await response.json();
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
  // const getData = useSelector((state) => state.elders.eldersData);
  // const isLoading = useSelector((state) => state.elders.isLoading);
  // const error = useSelector((state) => state.elders.error);

  // const getDataOne = useSelector((state) => state.elders.eldersOne);

  // useEffect(() => {
  //   dispatch(getElders());
  //   dispatch(getEldersById());
  // }, [dispatch]);
  const navbarStyle = {
    backgroundImage: `url(${backgroundImageee})`,
    backgroundSize: "cover", // You can adjust this property based on your image and design preferences
    height: "300px",
  };

  //to make modal screen
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar expand="lg" className="navbarStyle" style={navbarStyle}>
        <Container className="nav-responsive" style={{ marginTop: "-120px" }}>
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
                style={{ color: "#D19B6F", marginLeft: "20px" }}
                href="/"
              >
                الرئيسيه
              </Nav.Link>
              <Nav.Link
                style={{ color: "#FFFFFF", marginLeft: "20px" }}
                href="/audios"
              >
                صوتيات
              </Nav.Link>
              <Nav.Link
                style={{ color: "#FFFFFF", marginLeft: "20px" }}
                href="/Books"
              >
                كتب
              </Nav.Link>
              <Nav.Link
                style={{ color: "#FFFFFF", marginLeft: "20px" }}
                href="/articles"
              >
                مقالات
              </Nav.Link>
              <Nav.Link
                style={{ color: "#FFFFFF", marginLeft: "20px" }}
                href="/pictures"
              >
                صور
              </Nav.Link>
              <Nav.Link
                style={{ color: "#FFFFFF", marginLeft: "20px" }}
                href="/contact-us"
              >
                تواصل معنا
              </Nav.Link>
            </Nav>

            <Col
              xs="auto"
              className="me-auto mb-2"
              style={{ position: "relative", left: "5px" }}
            >
              <Button
                style={{
                  color: "#FFFFFF",
                  backgroundColor: "rgba(209, 155, 111, 0.3)",
                  borderRadius: "19px",
                  height: "38px",
                  marginLeft: "20px",
                  border: "none",
                  top: "56px",
                  fontWeight: "400",
                  fontSize: "15px",
                }}
                type="submit"
              >
              <SlLocationPin style={{ marginLeft: "5px" , fontSize:'20px'}}/>
              
               {location || ""}{" "}
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

                  <HiOutlineUser style={{ marginLeft: "5px", fontSize:'20px' }} />
              تسجيل
                </Button>

                <Modal
                  show={show}
                  onHide={handleClose}
                  style={{ width: "410px", marginLeft: "20px" }}
                >
                  <LoginPage />
                </Modal>
              </>
            </Col>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container
        className="responsive-ground"
        style={{
          background:
            "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
          width: "90%",
          borderRadius: "19px",
          position: "relative",
          marginTop: "-150px",
        }}
      >
        <Row className="d-flex justify-content-between align-items-center">
          <Col sm="4">
            <div
              className=" d-flex align-items-center  "
              style={{ flexDirection: "column" }}
            >
              <h2
              id="dr-responsive"
                style={{ color: "#FFFFFF", width: "72px", marginLeft: "90px" }}
              >
                الدكتور
              </h2>
              
              <h1
                style={{
                  color: "#051427",
                  fontSize: "45px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                عُــمــر كامـــل{" "}
              </h1>
              <h5 style={{ color: "#7A808A", marginTop: "10px" }}>
                الصلاه القادمه : <span style={{ color: "#FFFFFF" }}>العصر</span>
              </h5>
              <h5 style={{ color: "#FFFFFF", marginTop: "10px" }}>
                {" "}
                الموعد بعد : 02:46:32
              </h5>

              <div
                className="d-flex align-items-center justify-content-center   "
                style={{ marginBottom: "-80px", marginLeft: "-220px" }}
              >
                <img src={quran} alt="" id="quran-img" />
                <img src={vector2} alt="" className="responsive-image " />
              </div>
            </div>
          </Col>

          <Col sm="2" className="d-flex align-items-center ">
            <img src={vector} alt="" />
          </Col>

          <Col
            sm="6"
            className=" d-flex align-items-center justify-content-end  "
            style={{ marginLeft: "-12px" }}
          >
            <img src={profile} alt="" style={{ marginTop: "20px" }} />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="d-flex justify-content-between align-items-center m-auto ">
          <Col sm="6 p-1 "  md={6} lg={3} xs={6}>
            <Link to="/audios" style={{ textDecoration: "none" }}>
              <div className="box-Audio">
                <img src={box4} alt="" style={{ marginTop: "15px" }} />
                <p style={{ marginTop: "5px", color: "rgba(26, 35, 43, 1)" }}>
                  صوتيات
                </p>
              </div>
            </Link>
          </Col>

          <Col sm="6 p-1 " md={6} lg={3} xs={6}>
            <Link to="/Books" style={{ textDecoration: "none" }}>
              <div className="box-Book">
                <img src={box3} alt="" style={{ marginTop: "15px" }} />
                <p style={{ marginTop: "5px", color: "rgba(26, 35, 43, 1)" }}>
                  كتب
                </p>
              </div>
            </Link>
          </Col>

          <Col sm="6 p-1 " md={6} lg={3} xs={6}>
            <Link to="/articles" style={{ textDecoration: "none" }}>
              <div className="box-Aritcle">
                <img src={box2} alt="" style={{ marginTop: "15px" }} />
                <p style={{ marginTop: "5px", color: "rgba(26, 35, 43, 1)" }}>
                  مقالات
                </p>
              </div>
            </Link>
          </Col>

          <Col sm="6 p-1 " md={6} lg={3} xs={6}>
            <Link to="/pictures" style={{ textDecoration: "none" }}>
              <div className="box-Pic">
                <img src={box1} alt="" style={{ marginTop: "20px" }} />
                <p style={{ marginTop: "5px", color: "rgba(26, 35, 43, 1)" }}>
                  صور
                </p>
              </div>
            </Link>
          </Col>

          <div className="d-flex justify-content-between mt-3">
            <p
              style={{ color: "#051427", fontSize: "18px", fontWeight: "700" }}
            >
              <img src={icon3} alt="" style={{ marginLeft: "5px" }} />
              اصدارات جديدة{" "}
            </p>
            <p
              style={{ color: "#D19B6F", fontSize: "16px", fontWeight: "400" }}
            >
              عرض المزيد
            </p>
          </div>
        </Row>
      </Container>

      <Container>
        <Carousel>
          <Carousel.Item>
            <Row
              className="d-flex justify-content-between align-items-center"
              style={{ margin: "20", padding: "20px" }}
            >
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card1}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card2}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card3}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card4}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card2}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card3}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row
              className="d-flex justify-content-between align-items-center"
              style={{ margin: "20", padding: "20px" }}
            >
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card1}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card2}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card3}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card4}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card2}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card3}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row
              className="d-flex justify-content-between align-items-center"
              style={{ margin: "20", padding: "20px" }}
            >
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card1}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card2}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card3}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card4}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card2}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
              <Col
                xs="6"
                md="4"
                lg="2"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <img
                  src={card3}
                  alt=""
                  style={{ width: "80%", height: "auto", marginRight: "5px" }}
                />
              </Col>
            </Row>
          </Carousel.Item>
          {/* Add more Carousel.Items for additional slides if needed */}
        </Carousel>
      </Container>

      <Container>
        <Row className="d-flex justify-content-between align-items-center me-auto  ">
          <Col sm="12 " md="8">
            <div className="d-flex justify-content-between mt-3">
              <p
                style={{
                  color: "#051427",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                <img src={icon3} alt="" style={{ marginLeft: "5px" }} />
                الاكثر استماعاً
              </p>
              <p
                style={{
                  color: "#D19B6F",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                عرض المزيد
              </p>
            </div>

                

            <Row
              className="d-flex justify-content-between align-items-center mt-3 "
              style={{ margin: "10px" }}
            >
              <Col sm="4  ">
                <div className="d-flex justify-content-center align-items-center ">
                  <img src={image3} alt="" className="mb-3" />
                  <h5 style={{ width: "100%" }}> احمد بن يوسف السيد </h5>
                </div>
              </Col>

              <Col sm="2">
                <div
                  className="d-flex justify-content-center responsive-span-home"
                >
                  <div
                    style={{
                      backgroundColor: "#aec3b5",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "5px",
                    }}
                  >
                    <MdAudiotrack
                      style={{
                        marginBottom: "5px",
                        color: "white",
                        position: "relative",
                        top: "2px",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      marginLeft: "5px",
                      color: "#828282",
                      fontWeight: "500",
                    }}
                    className="responsive-span-home"
                  >
                    45 مقطع صوتي
                  </span>
                </div>
              </Col>

              <Col sm="4" className="responsive-sounds">
                <div className="d-flex justify-content-center align-items-center  ">
                <IoHeartCircleSharp style={{ color: '#878787bd', fontSize: '35px' , cursor: "pointer" }} />
                
                  <FaCirclePlay
                    size={50}
                    style={{
                      color: "rgb(209, 155, 111)",
                      fontSize: "26px",
                      paddingRight: "15px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </Col>
              <div
                style={{
                  marginLeft: "-55px",
                  marginBottom: "10px",
                  borderBottom: "1.5px solid #EEEEEE ",
                  width: "90%",
                }}
              ></div>
            </Row>

            <Row
              className="d-flex justify-content-between align-items-center mt-3 "
              style={{ margin: "10px" }}
            >
              <Col sm="4  ">
                <div className="d-flex justify-content-center align-items-center ">
                  <img src={image3} alt="" className="mb-3" />
                  <h5 style={{ width: "100%" }}> احمد بن يوسف السيد </h5>
                </div>
              </Col>

              <Col sm="2">
                <div
                  className="d-flex justify-content-center responsive-span-home"
                >
                  <div
                    style={{
                      backgroundColor: "#aec3b5",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "5px",
                    }}
                  >
                    <MdAudiotrack
                      style={{
                        marginBottom: "5px",
                        color: "white",
                        position: "relative",
                        top: "2px",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      marginLeft: "5px",
                      color: "#828282",
                      fontWeight: "500",
                    }}
                    className="responsive-span-home"
                  >
                    45 مقطع صوتي
                  </span>
                </div>
              </Col>

              <Col sm="4" className="responsive-sounds">
                <div className="d-flex justify-content-center align-items-center  ">
                <IoHeartCircleSharp style={{ color: '#878787bd', fontSize: '35px' ,  cursor: "pointer"}} />
                  <FaCirclePlay
                    size={50}
                    style={{
                      color: "rgb(209, 155, 111)",
                      fontSize: "26px",
                      paddingRight: "15px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </Col>
              <div
                style={{
                  marginLeft: "-55px",
                  marginBottom: "10px",
                  borderBottom: "1.5px solid #EEEEEE ",
                  width: "90%",
                }}
              ></div>
            </Row>

            <Row
              className="d-flex justify-content-between align-items-center mt-3 "
              style={{ margin: "10px" }}
            >
              <Col sm="4  ">
                <div className="d-flex justify-content-center align-items-center ">
                  <img src={image3} alt="" className="mb-3" />
                  <h5 style={{ width: "100%" }}> احمد بن يوسف السيد </h5>
                </div>
              </Col>

              <Col sm="2">
                <div
                  className="d-flex justify-content-center responsive-span-home"
                >
                  <div
                    style={{
                      backgroundColor: "#aec3b5",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "5px",
                    }}
                  >
                    <MdAudiotrack
                      style={{
                        marginBottom: "5px",
                        color: "white",
                        position: "relative",
                        top: "2px",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      marginLeft: "5px",
                      color: "#828282",
                      fontWeight: "500",
                    }}
                    className="responsive-span-home"
                  >
                    45 مقطع صوتي
                  </span>
                </div>
              </Col>

              <Col sm="4" className="responsive-sounds">
                <div className="d-flex justify-content-center align-items-center  ">
                <IoHeartCircleSharp style={{ color: '#878787bd', fontSize: '35px' , cursor: "pointer" }} />
                  <FaCirclePlay
                    size={50}
                    style={{
                      color: "rgb(209, 155, 111)",
                      fontSize: "26px",
                      paddingRight: "15px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </Col>
              <div
                style={{
                  marginLeft: "-55px",
                  marginBottom: "10px",
                  borderBottom: "1.5px solid #EEEEEE ",
                  width: "90%",
                }}
              ></div>
            </Row>
          </Col>

          <Col sm="12" md="4">
            <div style={{ width: "100%", marginTop: "15px" }}>
              <h2
                style={{
                  color: "#051427",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                متابعه الاستماع
              </h2>
              {/* <img src={card5} alt="" style={{ width: "100%" }} /> */}
              <Col md={12} sm={12}>
              <div style={{backgroundColor:'rgb(128 128 128 / 15%)',borderRadius:'40px',boxShadow:'5px 10px 8px #888888'}} id="mobile-responsive">
                <img src={image3} alt="pic" width={300} height={280} style={{marginTop:'20px',borderRadius:'40px'}} id="img-mobile-responsive"/>
<Col className="mt-4">
<h4>فضل شهر رمضان</h4>
<span style={{color:'gray'}}>محمد صالح المنجد</span>
</Col>
<Col className="mt-5">

<TbArrowsExchange2 size={30} color="gray" style={{cursor:'pointer'}}/>

<TbPlayerTrackNextFilled size={20} style={{cursor:'pointer'}}/>

<FaCirclePlay size={50} color="rgb(209, 155, 111)" style={{cursor:'pointer'}}/>
<TbPlayerTrackPrevFilled size={20} style={{cursor:'pointer'}}/>

<MdFileDownload size={30}  color="rgb(209, 155, 111)" style={{cursor:'pointer'}}/>

</Col>
              </div>
              </Col>

            </div>
          </Col>
        </Row>
      </Container>

      <Container className="d-flex justify-content-center ">
        <Row className="d-flex justify-content-between align-items-center m-5 ">
          <Col md="6" xs="auto">
            <div style={{ width: "100%", marginTop: "15px" }}>
              <img className="img-mobile"
                src={mobile}
                alt=""
                style={{
                  width: "100%", // Set the initial width to 100%
                  marginTop: "15px",
               
                  "@media (max-width: 768px)": {
                    width: "50%", // Adjust the width for screens up to 768px
                    marginLeft: "auto", // Center the image horizontally
                    marginRight: "auto", // Center the image horizontally
                  },
                }}
              />
            </div>
          </Col>

          <Col md="6" xs="auto">
            <div style={{ width: "100%", marginTop: "15px" }}>
              <h1
                style={{
                  marginTop: "5px",
                  fontWeight: "700",
                }}
              >
                تنزيل التطبيق مجاناً
              </h1>
              <p
                style={{
                  marginTop: "5px",
                  fontSize: "22px",
                  fontWeight: "400",
                  color: "#9d9c9c",
                  marginTop: "25px",
                  marginBottom: "40px",
                }}
              >
                تصفح جميع الكتب والصوتيات المفضله لك
              </p>

              <div style={{ width: "100%", marginTop: "15px" , display:'flex', justifyContent:'center'}}>
                <img src={google} alt="" style={{}} className="google-img" />
              </div>
            </div>
          </Col>

          <div className="d-flex justify-content-between align-items-center col-lg-12 ">
            <img
              src={vector4}
              alt=""
              style={{
                width: "100%",
                position: "relative",
                zIndex: "-1",
                marginTop: "-330px",
              }}
              className="responsive-image"
            />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
