import React, { useEffect, useRef, useState } from "react";
import NavBar from "../Navbar/NavBar";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import audioProfile from "../../images/audio-profile.png";
import play from "../../images/play.png";
import heart from "../../images/redheart.png";
import download from "../../images/download.png";
import { getAudiosFavorite } from "../../features/allFavorites/allFavoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IoIosHeart } from "react-icons/io";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { MdDownloadForOffline } from "react-icons/md";
import notify from "../UseNotifications/useNotification";
import { downloadOneAudio } from "../../features/audios/audioSlice";
import favrediconwith from "../../images/favredWith.svg";
import PlayIcon from "../../images/play.svg";
import PauseIcon from "../../images/pause.svg";
import downloadIcon from "../../images/download.svg";
import nodata from "../../images/nodata.svg";
import { useTranslation } from "react-i18next";

const FavAudios = () => {
  const token = Cookies.get("token");
  const { t } = useTranslation('favaudio');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = useSelector((state) => state.favorite.allAudiosFavorite);

  const isLoading = useSelector((state) => state.favorite.isLoading);
  const error = useSelector((state) => state.favorite.error);
console.log(getData);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(getAudiosFavorite(token));
    }
  }, [token, navigate, dispatch]);

  console.log(getData);
//   if(getData){
//  console.log(getData.title)
//   }
  

  useEffect(() => {
    if (isLoading === false) {
      if (getData) {
        console.log(getData);
        if (getData.message === "Request failed with status code 401") {
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      }
    }
  }, [isLoading]);

  const downloadAudio = async (audioUrl) => {
    try {
      const response = await fetch(audioUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const blob = await response.blob();
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'audio_file.mp3'; // Set the desired filename with the correct extension
      
      // Append the link to the body, trigger the click event, and remove the link afterward
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Error downloading audio:', error);
      notify("حدثت مشكلة أثناء تحميل الصوت", "error");
    }
  };
  
  
  
  const handleCheckLogin = (audioUrl) => {
    let token = Cookies.get("token");
  
    if (token) {
      // Token exists, perform the download action if the URL is valid
      if (audioUrl) {
        notify("تم التحميل", "success");
        downloadAudio(audioUrl);
      } else {
        notify("عذرًا، الصوت غير متاح حاليًا", "error");
      }
    } else {
      // Token doesn't exist, notify the user to log in
      notify("من فضلك قم بتسجيل الدخول أولاً", "error");
    }
  };

  const audioRefs = useRef([]);
  const [durations, setDurations] = useState([]);
  const [durationFormatted, setDurationFormatted] = useState("0:00");
  const [isPlaying, setIsPlaying] = useState([]);

  useEffect(() => {
    audioRefs.current = audioRefs.current.slice(0, durations.length);
    setIsPlaying(new Array(durations.length).fill(false));
  }, [durations]);

  useEffect(() => {
    if (durations.length > 0) {
      const totalDuration = durations.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const hours = Math.floor(totalDuration / 3600);
      const minutes = Math.floor((totalDuration % 3600) / 60);
      const seconds = Math.floor(totalDuration % 60);
      setDurationFormatted(
        `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    } else {
      setDurationFormatted("0:00:00"); // Reset to initial state if there's no duration
    }
  }, [durations]);

  const handlePlay = (index) => {
    const newIsPlaying = [...isPlaying];
    newIsPlaying[index] = !isPlaying[index];
    setIsPlaying(newIsPlaying);
    const audioElement = audioRefs.current[index];
    if (audioElement) {
      if (newIsPlaying[index]) {
        // Check if the audio is not already playing before calling play()
        if (audioElement.paused) {
          audioElement
            .play()
            .catch((error) => console.error("Error playing audio:", error));
        }
      } else {
        // Check if the audio is playing before calling pause()
        if (!audioElement.paused) {
          audioElement.pause();
        }
      }
    }
  };
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
    
    dispatch(downloadOneAudio({ formData, token }))
           
        }


  const handleLoadedMetadata = (index) => {
    return (e) => {
      const newDurations = [...durations];
      newDurations[index] = e.target.duration;
      setDurations(newDurations);
    };
  };
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <>
      <NavBar />

      <Container>
        <Row>
          <Col>
            <div style={{ position: "relative", marginTop: "-35px" }}>
              <h1
                style={{
                  color: "rgba(255, 255, 255, 1)",
                  fontWeight: "500",
                  paddingBottom: "25px",
                  paddingTop: "15px",
                  borderRadius: "25px",
                }}
                className=" background-image"
              >
                {" "}
                {t('favourite')}{" "}
              </h1>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="d-flex justify-content-center align-items-center">
        <Row className="m-3 justify-content-center align-items-center">
          <Col
            xs="6"
            md="4"
            lg="3"
            style={{
              textAlign: "center",
              marginBottom: "10px",
              paddingLeft: "70px",
            }}
          >
            <div
              style={{
                border: "1.38px solid rgba(232, 232, 232, 1)",
                borderRadius: "23px",
                width: "124px",
                height: "33.74px",
                background:
                  "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
              }}
            >
              <Link to="/favScientists" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "rgba(5, 20, 39, 1)",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  {t('elder')}{" "}
                </h6>
              </Link>
            </div>
          </Col>

          <Col
            xs="6"
            md="4"
            lg="3"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            <div
              style={{
                border: "1.38px solid rgba(232, 232, 232, 1)",
                borderRadius: "23px",
                width: "124px",
                height: "33.74px",
                background:
                  "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
              }}
            >
              <Link to="/favAudios" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "#FFFFFF",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  {t('audios')}{" "}
                </h6>
              </Link>
            </div>
          </Col>

          <Col
            xs="6"
            md="4"
            lg="3"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            <div
              style={{
                border: "1.38px solid rgba(232, 232, 232, 1)",
                borderRadius: "23px",
                width: "124px",
                height: "33.74px",
                background:
                  "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
              }}
            >
              <Link to="/favBook" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "rgba(5, 20, 39, 1)",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  {t('books')}{" "}
                </h6>
              </Link>
            </div>
          </Col>

          {/* <Col
            xs="6"
            md="4"
            lg="2"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            <div
              style={{
                border: "1.38px solid rgba(232, 232, 232, 1)",
                borderRadius: "23px",
                width: "124px",
                height: "33.74px",
                background:
                  "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
              }}
            >
              <Link to="/favArtivles" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "rgba(5, 20, 39, 1)",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  مقالات{" "}
                </h6>
              </Link>
            </div>
          </Col> */}

          <Col
            xs="6"
            md="4"
            lg="3"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            <div
              style={{
                border: "1.38px solid rgba(232, 232, 232, 1)",
                borderRadius: "23px",
                width: "124px",
                height: "33.74px",
                background:
                  "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
              }}
            >
              <Link to="/favpictures" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "rgba(5, 20, 39, 1)",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  {t('photos')}{" "}
                </h6>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>

      {
          !isLoading ?(
            getData && getData.length >0 ? (
            <>
              {getData.map((item, index) => (
                <Row className="me-auto" md={4}>
          <Col key={item.id}>
            <div style={{ display: "flex" }}>
              <img
                src={item.image}
                alt=""
                style={{}}
                width="61px"
                height="61px"
              />
              <p
                style={{
                  color: "rgba(17, 32, 34, 1)",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px",
                }}
              >
              {item.title}
              </p>
            </div>
          </Col>

          <Col xs={6}>
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              {/* محمد صالح المنجد */}
            </p>
          </Col>

          <Col xs={6}>
            {" "}
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
  {durations[index] ? formatDuration(durations[index]) : 'Loading...'} {t('minute')}
            </p>
          </Col>

          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
                gap: "15px",
              }}
            >
              {token ? (
                      <a href={`${item.audio}?download=true`} target="_blank">
                        <img src={downloadIcon}
                          style={{
                            color: "rgb(209, 155, 111)",
                            fontSize: "30px",
                            cursor: "pointer",
                          }}
                          onClick={()=>handelDownloadAudio(item.id)}
                          download="audio_file"
                        />
                      </a>
                    ) : (
                      <img src={downloadIcon}
                        style={{
                          color: "rgb(209, 155, 111)",
                          fontSize: "30px",
                          cursor: "pointer",
                        }}
                        onClick={handleCheckLogin}
                        download="audio_file"
                      />
                    )}
              <img src={favrediconwith}
                  style={{
                    
                    cursor: "pointer",
                  }}
                />
           <button
                      onClick={() => handlePlay(index)}
                      style={{ border: "none", background: "#FFFFFF" }}
                    >
                      {isPlaying[index] ? (
                        <img src={PauseIcon}
                          
                        />
                      ) : (
                        <img src={PlayIcon}
                        
                        />
                      )}
                    </button>
                    <audio
                      key={index}
                      ref={(el) => (audioRefs.current[index] = el)}
                      src={item.audio}
                      controls
                      hidden
                      onLoadedMetadata={handleLoadedMetadata(index)}
                    />
            </div>
          </Col>
        </Row>
              ))}
              </>
            ) : <div style={{height:'280px'}}><img src={nodata}/> <br/>
            <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
            <span>{t('nodata2')}</span></div>
          
            ) :     <div style={{height:'280px'}}>  <Spinner animation="border" variant="primary" /></div>
          }
      


        <div
          style={{
            marginLeft: "-55px",
            marginBottom: "15px",
            borderBottom: "1.5px solid #EEEEEE ",
            width: "100%",
          }}
        ></div>

        {/* <Row className="me-auto" md={4}>
          <Col>
            <div style={{ display: "flex" }}>
              <img
                src={audioProfile}
                alt=""
                style={{}}
                width="61px"
                height="61px"
              />
              <p
                style={{
                  color: "rgba(17, 32, 34, 1)",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px",
                }}
              >
                فضل شهر رمضان
              </p>
            </div>
          </Col>

          <Col xs={6}>
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              محمد صالح المنجد
            </p>
          </Col>

          <Col xs={6}>
            {" "}
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              3:40 دقيقة
            </p>
          </Col>

          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
                gap: "15px",
              }}
            >
              <img src={download} alt="" />
              <img src={heart} alt="" />
              <img src={play} alt="" width="45px" height="45px" />
            </div>
          </Col>
        </Row>
        <div
          style={{
            marginLeft: "-55px",
            marginBottom: "15px",
            borderBottom: "1.5px solid #EEEEEE ",
            width: "100%",
          }}
        ></div>

        <Row className="me-auto" md={4}>
          <Col>
            <div style={{ display: "flex" }}>
              <img
                src={audioProfile}
                alt=""
                style={{}}
                width="61px"
                height="61px"
              />
              <p
                style={{
                  color: "rgba(17, 32, 34, 1)",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px",
                }}
              >
                فضل شهر رمضان
              </p>
            </div>
          </Col>

          <Col xs={6}>
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              محمد صالح المنجد
            </p>
          </Col>

          <Col xs={6}>
            {" "}
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              3:40 دقيقة
            </p>
          </Col>

          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
                gap: "15px",
              }}
            >
              <img src={download} alt="" />
              <img src={heart} alt="" />
              <img src={play} alt="" width="45px" height="45px" />
            </div>
          </Col>
        </Row>
        <div
          style={{
            marginLeft: "-55px",
            marginBottom: "15px",
            borderBottom: "1.5px solid #EEEEEE ",
            width: "100%",
          }}
        ></div>

        <Row className="me-auto" md={4}>
          <Col>
            <div style={{ display: "flex" }}>
              <img
                src={audioProfile}
                alt=""
                style={{}}
                width="61px"
                height="61px"
              />
              <p
                style={{
                  color: "rgba(17, 32, 34, 1)",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px",
                }}
              >
                فضل شهر رمضان
              </p>
            </div>
          </Col>

          <Col xs={6}>
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              محمد صالح المنجد
            </p>
          </Col>

          <Col xs={6}>
            {" "}
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              3:40 دقيقة
            </p>
          </Col>

          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
                gap: "15px",
              }}
            >
              <img src={download} alt="" />
              <img src={heart} alt="" />
              <img src={play} alt="" width="45px" height="45px" />
            </div>
          </Col>
        </Row>
        <div
          style={{
            marginLeft: "-55px",
            marginBottom: "15px",
            borderBottom: "1.5px solid #EEEEEE ",
            width: "100%",
          }}
        ></div>

        <Row className="me-auto" md={4}>
          <Col>
            <div style={{ display: "flex" }}>
              <img
                src={audioProfile}
                alt=""
                style={{}}
                width="61px"
                height="61px"
              />
              <p
                style={{
                  color: "rgba(17, 32, 34, 1)",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px",
                }}
              >
                فضل شهر رمضان
              </p>
            </div>
          </Col>

          <Col xs={6}>
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              محمد صالح المنجد
            </p>
          </Col>

          <Col xs={6}>
            {" "}
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              3:40 دقيقة
            </p>
          </Col>

          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
                gap: "15px",
              }}
            >
              <img src={download} alt="" />
              <img src={heart} alt="" />
              <img src={play} alt="" width="45px" height="45px" />
            </div>
          </Col>
        </Row> */}
      </Container>


    </>
  );
};
export default FavAudios;