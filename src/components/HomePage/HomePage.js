import React, { useEffect, useState } from "react";
import "./home.css";
import { Col, Container, Row } from "react-bootstrap";

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
import image3 from "../../images/image 3.png";

import mobile from "../../images/mobile.png";
import vector4 from "../../images/Vector (4).png";
import google from "../../images/google.png";

import { Link } from "react-router-dom";

import { FaCirclePlay } from "react-icons/fa6";
import { MdFileDownload } from "react-icons/md";
import { MdAudiotrack } from "react-icons/md";
import { Carousel } from "react-bootstrap";
import { IoHeartCircleSharp } from "react-icons/io5";

import {
  TbArrowsExchange2,
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { ToastContainer } from "react-toastify";
import notify from "../UseNotifications/useNotification";
import NavBar from "../Navbar/NavBar";

const Adhan = require('adhan');

const HomePage = () => {
  const [isPressed, setIsPressed] = useState(false);
  let timeoutId;

  const handleMouseDown = () => {
    timeoutId = setTimeout(() => {
      setIsPressed(true);
      notify("الوضع الخاص", "success");
    }, 2000);
  };

  const handleMouseUp = () => {
    clearTimeout(timeoutId);
    setIsPressed(false);
  };


 

// Initialize coordinates with default values
const [coordinates, setCoordinates] = useState(null);

// Effect to fetch user's location
useEffect(() => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Set the coordinates state
          setCoordinates(new Adhan.Coordinates(latitude, longitude));
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.log('Geolocation is not supported by your browser');
    }
}, []);

// Check if coordinates are available
if (!coordinates) {
  // Render loading state or handle accordingly
  return <div>Loading...</div>;
}

// Replace date with the desired date
const date = new Date();

// Replace parameters with your calculation parameters
const params = Adhan.CalculationMethod.MuslimWorldLeague();

const prayerTimes = new Adhan.PrayerTimes(coordinates, date, params);

// Get current time
const currentTime = new Date();


// Iterate over prayer times to find the next upcoming prayer
let nextPrayer;
let nextPrayerTime;
Object.keys(prayerTimes).forEach(prayer => {
    if (!nextPrayer && currentTime < prayerTimes[prayer]) {
        nextPrayer = prayer;
        nextPrayerTime = prayerTimes[prayer];
    }
}); 


// Calculate the remaining time until the next prayer
// Calculate the remaining time until the next prayer
const remainingTime = nextPrayerTime.getTime() - currentTime.getTime();

// Convert the remaining time to hours, minutes, and seconds
const hours = Math.floor(remainingTime / (1000 * 60 * 60));
const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

// Format the hours, minutes, and seconds with leading zeros if necessary
const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

const prayerNames = {
  fajr: 'الفجر',
  dhuhr: 'الظهر',
  asr: 'العصر',
  maghrib: 'المغرب',
  isha: 'العشاء'
}; 

// Get the Arabic name of the next prayer
const arabicNextPrayer = prayerNames[nextPrayer];

console.log('Next prayer (Arabic):', arabicNextPrayer);


  
  return (
    <>
      <NavBar />

      <Container
        className="responsive-ground"
        style={{
          background:
            "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
          width: "90%",
          borderRadius: "19px",
          position: "relative",
          marginTop: "-50px",
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
                الصلاه القادمه : <span style={{ color: "#FFFFFF" }}>{arabicNextPrayer}</span>
              </h5>
              <h5 style={{ color: "#FFFFFF", marginTop: "10px" }}>
                {" "}
                الموعد بعد : {formattedTime}
              </h5>

              <div
                className="d-flex align-items-center justify-content-center   "
                style={{ marginBottom: "-80px", marginLeft: "-220px" }}
              >
                <img
                  src={quran}
                  alt=""
                  id="quran-img"
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                />
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
          <Col sm="6 p-1 " md={6} lg={3} xs={6}>
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
                <div className="d-flex justify-content-center responsive-span-home">
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
                <Link to={"/favAudios"}>  <IoHeartCircleSharp
                    style={{
                      color: "#878787bd",
                      fontSize: "35px",
                      cursor: "pointer",
                    }}
                  />
</Link>
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
                <div className="d-flex justify-content-center responsive-span-home">
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
                                  <Link to={"/favAudios"}>  <IoHeartCircleSharp
                    style={{
                      color: "#878787bd",
                      fontSize: "35px",
                      cursor: "pointer",
                    }}
                  />
</Link>
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
                <div className="d-flex justify-content-center responsive-span-home">
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
                                  <Link to={"/favAudios"}>  <IoHeartCircleSharp
                    style={{
                      color: "#878787bd",
                      fontSize: "35px",
                      cursor: "pointer",
                    }}
                  />
</Link>
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
              <Col
                md={12}
                sm={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  style={{
                    backgroundColor: "#FFFFFFCC",
                    borderRadius: "40px",
                    boxShadow: "4px 7px 22.200000762939453px 6px #0000000D",
                    border:'1.5px solid #DBDBDB'
                  }}
                  id="mobile-responsive"
                >
                  <img
                    src={
                      "https://i1.sndcdn.com/artworks-jA2OFYdUrideAlyu-AeHsrA-t500x500.jpg"
                    }
                    alt="pic"
                    width={300}
                    height={280}
                    style={{ marginTop: "20px", borderRadius: "40px" , boxShadow:'0px 20px 60px 0px #00000026'}}
                    id="img-mobile-responsive"
    />
                  <Col className="mt-4">
                    <h4>فضل شهر رمضان</h4>
                    <span style={{ color: "gray" }}>محمد صالح المنجد</span>
                  </Col>
                  <Col
                    className="mt-5"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <TbArrowsExchange2
                      size={30}
                      color="gray"
                      style={{ cursor: "pointer" }}
                    />

                    <TbPlayerTrackNextFilled
                      size={20}
                      style={{ cursor: "pointer" }}
                    />

                    <FaCirclePlay
                      size={50}
                      color="rgb(209, 155, 111)"
                      style={{ cursor: "pointer" }}
                    />
                    <TbPlayerTrackPrevFilled
                      size={20}
                      style={{ cursor: "pointer" }}
                    />
                                        <Link to={"/login"}>

                    <MdFileDownload
                      size={30}
                      color="rgb(209, 155, 111)"
                      style={{ cursor: "pointer" }}
                    />
                    </Link>
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
              <img
                className="img-mobile"
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

              <div
                style={{
                  width: "100%",
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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
        <ToastContainer />
      </Container>
    </>
  );
};

export default HomePage;