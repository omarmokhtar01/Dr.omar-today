import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import {
  Col,
  Container,
  Row,
  Spinner,
  Carousel,
  Button,
} from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import profile from "../../images/profile.png";
import vector from "../../images/Vector (1).png";
import vector2 from "../../images/Vector (2).png";
import quran from "../../images/quran.png";
import nodata from "../../images/nodata.svg";
import PlayIcon from "../../images/play.svg";
import favIcon from "../../images/fav.svg";
import downloadIcon from "../../images/download.svg";
import leftIcon from "../../images/left.svg";
import rightIcon from "../../images/right.svg";
import changeIcon from "../../images/change.svg";
import audioIcon from "../../images/audio.svg";
import audiossIcon from "../../images/audios.svg";
import booksIcon from "../../images/books.svg";
import articlesIcon from "../../images/articles.svg";
import picIcon from "../../images/pic.svg";
import progressimg from "../../images/progress.png";
import PauseIconMostListen from "../../images/pause.svg";
import PauseIcon from "../../images/progress.png";
// import { Carousel } from '@trendyol-js/react-carousel';
import mobile from "../../images/mobile.png";
import vector4 from "../../images/Vector (4).png";
import google from "../../images/google.png";

import { Link } from "react-router-dom";
import lastVerIcon from "../../images/newVer.svg";
// import { Carousel } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import notify from "../UseNotifications/useNotification";
import NavBar from "../Navbar/NavBar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { lastVersion } from "../../features/books/booksSlice";
import {
  downloadOneAudio,
  favOneAudio,
  mostListened,
} from "../../features/audios/audioSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import 'react-multi-carousel/lib/styles.css';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { FreeMode } from "swiper/modules";

import "swiper/css/free-mode";
const Adhan = require("adhan");

const HomePage = () => {
  const [data, setData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  // const handleNextCarousel = () => {
  //   setStartIndex(startIndex + 8);
  // };

  // const handlePrevCarousel = () => {
  //   setStartIndex(Math.max(startIndex - 8, 0));
  // };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lastVersionData = useSelector((state) => state.books.lastVersionData);
  const isLoadingLastVersion = useSelector(
    (state) => state.books.isLoadingLastVersion
  );

  useEffect(() => {
    dispatch(lastVersion());
  }, [dispatch]);

  console.log(lastVersionData);

  const mostListenedData = useSelector((state) => state.audio.mostListen);
  const isLoadingMostListen = useSelector(
    (state) => state.audio.isLoadingMostListen
  );

  useEffect(() => {
    dispatch(mostListened());
  }, [dispatch]);

  console.log(mostListenedData);
  const [isPressed, setIsPressed] = useState(false);
  let timeoutId;

  const handleMouseDown = () => {
    timeoutId = setTimeout(() => {
      setIsPressed(true);
      // notify("الوضع الخاص", "success");
    }, 2000);
  };

  const handleMouseUp = () => {
    clearTimeout(timeoutId);
    setIsPressed(false);
  };

  // Initialize coordinates with default values
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position && position.coords) {
            const { latitude, longitude } = position.coords;
            // Check if latitude and longitude are valid numbers
            if (!isNaN(latitude) && !isNaN(longitude)) {
              // Set the coordinates state
              setCoordinates({ latitude, longitude });
            } else {
              console.error("Invalid latitude or longitude values");
            }
          } else {
            console.error("Error: position.coords is null");
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser");
    }
  }, []);

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
  Object.keys(prayerTimes).forEach((prayer) => {
    if (!nextPrayer && currentTime < prayerTimes[prayer]) {
      nextPrayer = prayer;
      nextPrayerTime = prayerTimes[prayer];
    }
  });

  // If there's no upcoming prayer time for today, check for the next day's Fajr
  if (!nextPrayer || nextPrayer === "isha") {
    const dateNext = new Date();
    dateNext.setDate(dateNext.getDate() + 1);
    const prayerTimesNext = new Adhan.PrayerTimes(
      coordinates,
      dateNext,
      params
    );
    nextPrayer = "fajr"; // Fajr prayer for the next day
    nextPrayerTime = prayerTimesNext.fajr;
  }

  // Calculate the remaining time until the next prayer
  let remainingTime = 0; // Initialize remaining time to 0
  if (nextPrayerTime) {
    // Calculate the remaining time until the next prayer
    remainingTime = nextPrayerTime.getTime() - currentTime.getTime();
  }

  // Convert the remaining time to hours, minutes, and seconds
  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  // const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  // Format the hours, minutes, and seconds with leading zeros if necessary
  // const formattedTime = ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')};
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  const prayerNames = {
    fajr: "الفجر",
    dhuhr: "الظهر",
    asr: "العصر",
    sunset: "المغرب",
    isha: "العشاء",
  };

  // Get the Arabic name of the next prayer
  const arabicNextPrayer = prayerNames[nextPrayer];

  console.log("Next prayer (Arabic):", nextPrayer);
  // console.log('Time until next prayer:', formattedTime);

  const audioRefs = useRef([]);

  const [durations, setDurations] = useState([]);
  const [durationFormatted, setDurationFormatted] = useState("0:00");
  const [isPlaying, setIsPlaying] = useState([]);

  const handlePlay = (index) => {
    const newIsPlaying = [...isPlaying];
    newIsPlaying[index] = !isPlaying[index];
    setIsPlaying(newIsPlaying);
  
    const audioElement = audioRefs.current[index];
    if (audioElement) {
      if (newIsPlaying[index]) {
        // Check if the audio is not already playing before calling play()
        if (audioElement.paused) {
          audioElement.play().catch((error) => console.error("Error playing audio:", error));
        }
      } else {
        // Pause the audio if it's playing
        audioElement.pause();
      }
    }
  };
  

  const handleLoadedMetadata = (index) => {
    return (e) => {
      const newDurations = [...durations];
      newDurations[index] = e.target.duration;
      setDurations(newDurations);
    };
  };
















  const audioRefsNew = useRef([]);

  const [durationsNew, setDurationsNew] = useState([]);
  const [durationFormattedNew, setDurationFormattedNew] = useState("0:00");
  const [isPlayingNew, setIsPlayingNew] = useState([]);

  const handlePlayNew = (index) => {
    const newIsPlayingNew = [...isPlayingNew];
    newIsPlayingNew[index] = !isPlayingNew[index];
    setIsPlayingNew(newIsPlayingNew);

    const audioElement = audioRefsNew.current[index];
    if (audioElement) {
      if (newIsPlayingNew[index]) {
        // Check if the audio is not already playing before calling play()
        if (audioElement.paused) {
          audioElement.play().catch((error) => console.error("Error playing audio:", error));
        }
      } else {
        // Pause the audio if it's playing
        audioElement.pause();
      }
    }
  };

  

  const handleLoadedMetadataNew = (index) => {
    return (e) => {
      const newDurationsNew = [...durationsNew];
      newDurationsNew[index] = e.target.duration;
      setDurations(newDurationsNew);
    };
  };
  

















  

  let token = Cookies.get("token");

  const checkAddToFav = useSelector((state) => state.audio.favAudio);
  const isLoadingFav = useSelector((state) => state.audio.isLoadingFav);

  const handelAddtoFav = (audioId) => {
    const formData = {
      audio_id: audioId, // Replace 'your_audio_id_here' with the actual audio ID value
      // other formData properties if any
    };
    if (!token) {
      // Token exists, perform the download action
      // Add your download logic here
      return notify("من فضلك قم بتسجيل الدخول اولا", "error");
    }
    notify("تم الأضافة للمفضلة بنجاح", "success");

    dispatch(favOneAudio({ formData, token }));
    setTimeout(() => {
      navigate("/favAudios");
    }, 1500);
  };

  // useEffect(() => {
  //   if (isLoadingFav === false ) {
  //     if(checkAddToFav)
  //     {if (checkAddToFav.success === true && checkAddToFav.message ==="The Audio has been added to your favorites") {
  //     } else {
  //       notify("حدث مشكلة في الاضافة", "error");
  //     }}
  //   }
  // }, [isLoadingFav]);

  const [indexMobileState, setIndexMobileState] = useState(0);

  const [indexMobileStateMost, setIndexMobileStateMost] = useState(0);

  const handleNext = () => {
    if (indexMobileState < mostListenedData.length - 1) {
      setIndexMobileState(indexMobileState + 1);
    } else {
      // Handle boundary condition, for example, do nothing or loop back to the beginning
      // setIndexMobileState(0);
      <img src={rightIcon} alt="prev" />;
    }
  };

  const handlePrev = () => {
    if (indexMobileState > 0) {
      setIndexMobileState(indexMobileState - 1);
    } else {
      <img src={leftIcon} alt="prev" />;
    }
  };

  const downAudio = useSelector((state) => state.audio.downAudio);
  const isLoadingDown = useSelector((state) => state.audio.isLoadingDown);
  console.log(downAudio.status);
  const handelDownloadAudio = (audioId) => {
    const formData = {
      audio_id: audioId, // Replace 'your_audio_id_here' with the actual audio ID value
      // other formData properties if any
    };
    if (!token) {
      // Token exists, perform the download action
      // Add your download logic here
      return notify("من فضلك قم بتسجيل الدخول اولا", "error");
    }

    dispatch(downloadOneAudio({ formData, token }));
  };

  //     useEffect(() => {
  //       if (isLoadingDown === false) {
  //         if(downAudio && downAudio.success) {
  //           if(downAudio.success === true) {

  //         // Notify "تم الاضافة بنجاح"
  //         notify("سيتم بدأ التحميل الان", "success");
  //       } else {
  //         // Handle other statuses or errors if needed
  //         notify("حدث مشكلة في التحميل", "error");

  //   }
  // }

  //   }
  //     }, [isLoadingDown,downAudio]);

  const [swiperRef, setSwiperRef] = useState(null);

  let appendNumber = 4;
  let prependNumber = 1;

  const prepend2 = () => {
    swiperRef.prependSlide([
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
    ]);
  };

  const prepend = () => {
    swiperRef.prependSlide(
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>"
    );
  };

  const append = () => {
    swiperRef.appendSlide(
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>"
    );
  };

  const append2 = () => {
    swiperRef.appendSlide([
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
    ]);
  };

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
              style={{
                flexDirection: "column",
                // fontFamily:'Helvetica Neue W23 for SKY'
              }}
            >
              <span
                id="dr-responsive"
                style={{
                  color: "#FFFFFF",
                  width: "72px",
                  marginLeft: "90px",
                  fontSize: "28.96px",
                }}
              >
                الدكتور
              </span>

              <span
                style={{
                  backgroundImage:
                    "linear-gradient(235.96deg, #384659 0%, #051427 65.49%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "49.4px",
                  fontWeight: "700",
                }}
              >
                عُــمــر كامـــل
              </span>

              <span
                style={{
                  color: "#7A808A",
                  marginTop: "10px",
                  fontSize: "25.55px",
                }}
              >
                الصلاه القادمه :{" "}
                <span style={{ color: "#FFFFFF" }}>
                  {arabicNextPrayer ? arabicNextPrayer : "الفجر"}
                </span>
              </span>
              <span
                style={{
                  color: "#FFFFFF",
                  marginTop: "10px",
                  fontSize: "22.15px",
                }}
              >
                {" "}
                الموعد بعد : {formattedTime} ساعة
              </span>

              <div
                className="d-flex align-items-center justify-content-center   "
                style={{ marginBottom: "-60px", marginLeft: "-220px" }}
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
                <img src={audiossIcon} alt="" style={{ marginTop: "15px" }} />
                <p style={{ marginTop: "5px", color: "rgba(26, 35, 43, 1)" }}>
                  صوتيات
                </p>
              </div>
            </Link>
          </Col>

          <Col sm="6 p-1 " md={6} lg={3} xs={6}>
            <Link to="/Books" style={{ textDecoration: "none" }}>
              <div className="box-Book">
                <img src={booksIcon} alt="" style={{ marginTop: "15px" }} />
                <p style={{ marginTop: "5px", color: "rgba(26, 35, 43, 1)" }}>
                  كتب
                </p>
              </div>
            </Link>
          </Col>

          <Col sm="6 p-1 " md={6} lg={3} xs={6}>
            <Link to="/articles" style={{ textDecoration: "none" }}>
              <div className="box-Aritcle">
                <img src={articlesIcon} alt="" style={{ marginTop: "15px" }} />
                <p style={{ marginTop: "5px", color: "rgba(26, 35, 43, 1)" }}>
                  مقالات
                </p>
              </div>
            </Link>
          </Col>

          <Col sm="6 p-1 " md={6} lg={3} xs={6}>
            <Link to="/pictures" style={{ textDecoration: "none" }}>
              <div className="box-Pic">
                <img src={picIcon} alt="" style={{ marginTop: "20px" }} />
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
              <img src={lastVerIcon} alt="" style={{ marginLeft: "5px" }} />
              اصدارات جديدة{" "}
            </p>
            {/* <p
              style={{ color: "#D19B6F", fontSize: "16px", fontWeight: "400" }}
            >
              عرض المزيد
            </p> */}
          </div>
        </Row>
      </Container>

      {/* <Container>
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

         
        </Carousel>
      </Container> */}

      <Container>
        <Row
          className="d-flex justify-content-between align-items-center"
          style={{ margin: "20", padding: "20px" }}
        >
          {/* <Col lg='2'>
        <img src={circleNext} alt="" style={{ width: '25px', height: '25px', marginBottom: '7px' }} />
        </Col> */}

          {/* <Col xs="6" md="4" lg="2" style={{ textAlign: 'center', marginBottom: '10px' }}>
            <img src={circle} alt="" style={{ width: '25px', height: '25px', marginBottom: '7px' }} />
            <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          </Col> */}

          {/* <Carousel show={7}  transition={0.5}>
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          <img src={card1} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
   
</Carousel> */}

          <>
            {!isLoadingLastVersion ? (
              lastVersionData && lastVersionData.length > 0 ? (
                <>
                  {lastVersionData
                    .slice(startIndex, startIndex + 6)
                    .map((item, index) => (
                      <Col
                        xs="6"
                        md="4"
                        lg="2"
                        style={{ textAlign: "center", marginBottom: "10px" }}
                        key={item.id}
                      >
                        <Link to={`/book/${item.id}`}>
                          <img
                            src={item.image}
                            alt=""
                            style={{
                              width: "80%",
                              height: "193px",
                              marginRight: "5px",
                              borderRadius: "10px",
                            }}
                          />
                        </Link>
                      </Col>
                    ))}
                </>
              ) : (
                <div style={{ height: "280px" }}>
                  <img src={nodata} /> <br />
                  <span style={{ fontWeight: "700" }}>لا توجد عناصر بعد</span>
                  <br />
                  <span>لا توجد بيانات على هذه الصفحة حتى الآن</span>
                </div>
              )
            ) : (
              <div style={{ height: "280px" }}>
                {" "}
                <Spinner animation="border" variant="primary" />
              </div>
            )}
            {/* <Button variant="primary" onClick={handlePrevCarousel} disabled={startIndex === 0}>
        Previous
      </Button>
      <Button variant="primary" onClick={handleNextCarousel} disabled={startIndex + 8 >= data.length}>
        Next
      </Button> */}
          </>

          {/* <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </> */}

          {/* {
            !isLoadingLastVersion ?(

              lastVersionData && lastVersionData.length >0 ? (
            <>
              {lastVersionData.map((item, index) => (
                <Col xs="6" md="4" lg="2" style={{ textAlign: 'center', marginBottom: '10px' }}>
                
            <img src={item.image} alt="" style={{ width: '80%', height: 'auto', marginRight: '5px' }} />
          </Col>
              ))}
            </>
          ) : <div style={{height:'280px'}}><span>لا يوجد بيانات</span></div>
          ) :     <div style={{height:'280px'}}>  <Spinner animation="border" variant="primary" /></div>

        } */}
          {/* <Col lg='2'>
        <img src={circlePrev} alt="" style={{ width: '25px', height: '25px', marginBottom: '7px' }} />
        </Col> */}
        </Row>
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
                <img src={lastVerIcon} alt="" style={{ marginLeft: "5px" }} />
                الاكثر استماعاً
              </p>
              {/* <p
                style={{
                  color: "#D19B6F",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                عرض المزيد
              </p> */}
            </div>

            {!isLoadingMostListen ? (
              mostListenedData && mostListenedData.length > 0 ? (
                mostListenedData.map((item, index) => (
                  <Row
                    className="d-flex justify-content-between align-items-center mt-3 "
                    style={{ margin: "10px" }}
                    key={item.id} // Add a unique key for each item in the map
                  >
                    <Col sm="4">
                      <div className="d-flex justify-content-center align-items-center ">
                        <img
                          src={item.image}
                          alt=""
                          className="mb-3"
                          width={61}
                          height={61}
                          style={{ borderRadius: "5.81px" }}
                        />

                        <h5 style={{ width: "100%" }}> {item.title} </h5>
                      </div>
                    </Col>

                    <Col sm="4">
                      {/* <div className="d-flex justify-content-center responsive-span-home">
              <img src={audioIcon} />
              <span
                style={{
                  marginLeft: "5px",
                  color: "#828282",
                  fontWeight: "500",
                  marginRight:'5px'
                }}
                className="responsive-span-home"
              >
                45 مقطع صوتي
              </span>
            </div> */}
                    </Col>

                    <Col sm="4" className="responsive-sounds">
                      <div className="d-flex justify-content-center align-items-center  ">
                        <img
                          src={favIcon}
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                          onClick={() => handelAddtoFav(item.id)}
                          alt="" />

<button
  onClick={() => handlePlayNew(index)}
  style={{ border: "none", background: "#FFFFFF" }}
>
  {isPlayingNew[index] ? (
    <img src={PauseIconMostListen} alt=""/>
  ) : (
    <img src={PlayIcon}  alt=""/>
  )}
</button>
<audio
  key={index}
  ref={(el) => (audioRefsNew.current[index] = el)}
  src={item.audio}
  controls
  hidden
  onLoadedMetadata={handleLoadedMetadataNew(index)}
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
                ))
              ) : (
                <div style={{ height: "140px" }}></div>
              )
            ) : (
              <div style={{ height: "140px" }}>
                <Spinner animation="border" variant="primary" />
              </div>
            )}
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
              {!isLoadingMostListen ? (
                mostListenedData && mostListenedData.length > 0 ? (
                  <Col
                    md={12}
                    sm={12}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div
                      style={{
                        backgroundColor: "#FFFFFFCC",
                        borderRadius: "40px",
                        boxShadow: "4px 7px 22.2px 6px #0000000D",
                        border: "1.5px solid #DBDBDB",
                      }}
                      id="mobile-responsive"
                    >
                      <img
                        src={
                          mostListenedData[indexMobileState]?.image ||
                          "https://i1.sndcdn.com/artworks-jA2OFYdUrideAlyu-AeHsrA-t500x500.jpg"
                        }
                        alt="pic"
                        width={300}
                        height={280}
                        style={{
                          marginTop: "20px",
                          borderRadius: "40px",
                          boxShadow: "0px 20px 60px 0px #00000026",
                        }}
                        id="img-mobile-responsive"
                      />
                      <Col className="mt-4">
                        <h4>
                          {mostListenedData[indexMobileState]?.title ||
                            "Default Title"}
                        </h4>
                        {/* <span style={{ color: "gray" }}>محمد صالح المنجد</span> */}
                        <img src={PauseIcon}  alt=""/>
                      </Col>
                      <Col
                        className="mt-5"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <img
                          src={changeIcon}
                          size={30}
                          color="gray"
                          style={{ cursor: "pointer" }}
                        />
                        {indexMobileState < mostListenedData.length - 1 ? (
                          <img
                            src={rightIcon}
                            size={20}
                            style={{
                              cursor: "pointer",
                              // Add conditional styles to disable the image
                              filter:
                                indexMobileState < mostListenedData.length - 1
                                  ? "none"
                                  : "grayscale(100%)",
                              pointerEvents:
                                indexMobileState < mostListenedData.length - 1
                                  ? "auto"
                                  : "none",
                            }}
                            onClick={handleNext}
                            alt="right icon"
                          />
                        ) : (
                          // Show a disabled version of the image when the condition is not met
                          <img
                            src={rightIcon}
                            size={20}
                            style={{
                              cursor: "no-drop",
                              filter: "grayscale(100%)",
                            }}
                            alt="right icon"
                          />
                        )}

                        <button
                          onClick={() => handlePlay(indexMobileStateMost)}
                          style={{ border: "none", background: "#FFFFFF" }}
                        >
                          {isPlaying[indexMobileStateMost] ? (
                            <img src={PauseIconMostListen} />
                          ) : (
                            <img src={PlayIcon} />
                          )}
                        </button>
                        <audio
                          key={indexMobileStateMost}
                          ref={(el) =>
                            (audioRefs.current[indexMobileStateMost] = el)
                          }
                          src={
                            mostListenedData[indexMobileStateMost]?.audio ||
                            null
                          }
                          controls
                          hidden
                          onLoadedMetadata={handleLoadedMetadata(
                            indexMobileStateMost
                          )}
                        />

                        {indexMobileState > 0 ? (
                          <img
                            src={leftIcon}
                            size={20}
                            style={{ cursor: "pointer" }}
                            onClick={handlePrev}
                            alt="left icon"
                          />
                        ) : (
                          <img
                            src={leftIcon}
                            size={20}
                            style={{ cursor: "no-drop" }}
                            alt="left icon "
                          />
                        )}

                        {token ? (
                          <a
                            href={`${
                              mostListenedData[indexMobileState]?.audio || null
                            }?download=true`}
                            target="_blank"
                          >
                            <img
                              src={downloadIcon}
                              color="rgb(209, 155, 111)"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handelDownloadAudio(
                                  mostListenedData[indexMobileState]?.id || null
                                )
                              }
                            />
                          </a>
                        ) : (
                          <img
                            src={downloadIcon}
                            color="rgb(209, 155, 111)"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handelDownloadAudio(
                                mostListenedData[indexMobileState]?.id || null
                              )
                            }
                          />
                        )}
                      </Col>
                    </div>
                  </Col>
                ) : (
                  <div style={{ height: "140px" }}></div>
                )
              ) : (
                <div style={{ height: "140px" }}>
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
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

                  "@media (maxWidth: 768px)": {
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
