import React, { useEffect, useRef, useState } from "react";
import NavBar from "../Navbar/NavBar";
import { Col, Container, Row,Spinner } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import trashIcon from "../../images/trash.svg";
import PlayIcon from "../../images/play.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAudiosDownload, removeOneAudiosDownload, removeOneElderDownload } from "../../features/allDownload/allDownloadSlice";
import favIcon from "../../images/fav.svg";
import PauseIcon from "../../images/pause.svg";
import Cookies from "js-cookie";
import nodata from "../../images/nodata.svg";
import { useTranslation } from "react-i18next";

const DownloadAudios = () => {
  const token = Cookies.get("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = useSelector((state) => state.download.allAudiossDownload);

  const isLoading = useSelector((state) => state.download.isLoading);
  const error = useSelector((state) => state.articles.error);
  const { t } = useTranslation('downaudio');

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(getAudiosDownload(token));
    }
  }, [token, navigate, dispatch]);
  console.log(getData);
  console.log(getData.message);

  useEffect(() => {
    if (isLoading === false) {
      if (getData) {
        console.log(getData);
        if (getData.message === "Request failed with status code 401") {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      }
    }
  }, [isLoading]);

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

  const removeData = useSelector((state) => state.download.delAudio);

  const removeDataById=(id)=>{
    removeOneAudiosDownload({token,id})
  }


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
                className=" background-image-2"
              >
                {" "}
                {t('downloads')}{" "}
              </h1>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="d-flex justify-content-center align-items-center">
        <Row className="m-3 justify-content-center align-items-center">
          <Col
            xs="6"
            md="3"
            lg="3"
            style={{
              textAlign: "center",
              marginBottom: "10px",
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
              <Link to="/DownloadScientest" style={{ textDecoration: "none" }}>
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
            md="3"
            lg="3"
            style={{
              textAlign: "center",
              marginBottom: "10px",
            }}
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
              <Link to="/DownloadAudios" style={{ textDecoration: "none" }}>
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
            md="3"
            lg="3"
            style={{
              textAlign: "center",
              marginBottom: "10px",
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
              <Link to="/DownloadBook" style={{ textDecoration: "none" }}>
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

          <Col
            xs="6"
            md="3"
            lg="3"
            style={{
              textAlign: "center",
              marginBottom: "10px",
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
              <Link to="/Downloadpictures" style={{ textDecoration: "none" }}>
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
      {!isLoading ? (
  getData && getData.length > 0 ? (
    getData.map((item, index) => {
      return (
        <>
          <Row className="me-auto" md={4} key={item.id}>
            <Col>
              <div style={{ display: "flex" }}>
                <img
                  src={item.image}
                  alt=""
                  style={{borderRadius:'5.81px'}}
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
                {item.elder.name}
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
                  gap: "5px",
                }}
              >
                <img src={trashIcon} style={{ marginLeft:'10px' }}                onClick={()=>removeDataById(item.id)}
/>

                <img src={favIcon}
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
                                  style={{
                                    color: "rgb(209, 155, 111)",
                                    fontSize: "26px",
                                  }}
                                />
                              ) : (
                                <img src={PlayIcon} />
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
          <div
            style={{
              marginLeft: "-55px",
              marginBottom: "15px",
              borderBottom: "1.5px solid #EEEEEE ",
              width: "100%",
            }}
          ></div>
        </>
      );
    })
  ) : (
    <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
          <span>{t('nodata2')}</span></div>
  )
) :<div style={{ height: "280px" }}> <Spinner animation="border" variant="primary" /> </div>}

    



      </Container>
    </>
  );
};
export default DownloadAudios;