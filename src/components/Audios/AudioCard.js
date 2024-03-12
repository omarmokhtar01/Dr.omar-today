import React, { useEffect, useRef, useState } from "react";
import "./audio.css";
import {
  Col,
  Container,
  Form,
  FormControl,
  NavDropdown,
  Row,
  Spinner,
} from "react-bootstrap";
import play from "../../images/play.svg";
import heartIcon from "../../images/heartIcon.svg";

import NavBar from "../Navbar/NavBar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { IoHeartCircleSharp, IoSearch } from "react-icons/io5";
import { MdDownloadForOffline } from "react-icons/md";
import { PiShareFatFill } from "react-icons/pi";
import { LuArrowUpDown } from "react-icons/lu";
import { downloadOneElder, favOneElder, getEldersByIdAudios } from "../../features/elders/eldersSlice";
import { favOneAudio,downloadOneAudio } from "../../features/audios/audioSlice";

import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";

import notify from "../UseNotifications/useNotification";

import JSZip from 'jszip';

const AudioCard = () => {
  const params = useParams();

  // Now you can access the parameters using the keys defined in your route
  const { id } = params;
  const dispatch = useDispatch();

  const elderDown = useSelector((state) => state.elders.downElder);

  const isLoadingElderDown = useSelector((state) => state.elders.isLoadingDownElder);



  function downloadAudiosAsZip(idElder) {
    if (!token) {
      return notify("من فضلك قم بتسجيل الدخول أولاً", "error");
    }
  
    const formData = {
      elder_id: idElder,
      // other formData properties if any
    };
  
    // Dispatch action to download audio data for the elder
    dispatch(downloadOneElder({ formData, token }))
    .then(response => {
      console.log(response);
      let audioData = [];
      
      // Check if response.payload is an array or an object with audio data
      if (Array.isArray(response.payload)) {
        // Case 1: response.payload is already an array of audios
        audioData = response.payload;
      } else if (response.payload && response.payload.audio) {
        // Case 2: response.payload has an 'audio' property containing audio data
        audioData = response.payload.audio;
      } else {
        console.error('Error: Invalid audio data format');
        return; // Exit the function or handle the error appropriately
      }
    
      const zip = new JSZip();
    
      audioData.forEach((audio, index) => {
        fetch(audio.audio)
          .then(response => response.blob())
          .then(blob => {
            zip.file(`audio_${index + 1}.mp3`, blob); // Rename the files as needed
          })
          .catch(error =>
            console.error(`Error downloading audio ${index + 1}:`, error)
          );
      });
    
      // Generate the .zip archive
      zip.generateAsync({ type: 'blob' })
        .then(zipBlob => {
          const url = window.URL.createObjectURL(new Blob([zipBlob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'audios.zip');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); // Remove the link after download
        })
        .catch(error => console.error('Error generating .zip file:', error));
    })
    .catch(error => {
      console.error('Error downloading audio data:', error);
    });
    
    
  }
  
  const [sortBy, setSortBy] = useState(null); // State to keep track of sorting option

  // Event handler for sorting by latest addition
  const handleSortByLatest = () => {
    setSortBy('latest');
    // Call function to sort articles by latest addition
  };

  // Event handler for sorting alphabetically
  const handleSortAlphabetically = () => {
    setSortBy('alphabetical');
    // Call function to sort articles alphabetically
  };

  // Sort function based on the selected option
  const sortFunction = (a, b) => {
    if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    } else {
      // Add sorting logic for other options, e.g., sorting by latest addition
      return 0; // Placeholder, modify as per your actual logic
    }
  };
  let token = Cookies.get("token");
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  
  

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

  const handleLoadedMetadata = (index) => {
    return (e) => {
      const newDurations = [...durations];
      newDurations[index] = e.target.duration;
      setDurations(newDurations);
    };
  };
  


  const getDataOne = useSelector((state) => state.elders.elderAudioOne);

  const isLoading = useSelector((state) => state.elders.isLoading);
  const error = useSelector((state) => state.elders.error);

console.log(getDataOne);

  useEffect(() => {
    dispatch(getEldersByIdAudios(id));
  }, [dispatch, id]);

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
    dispatch(favOneAudio({ formData, token }))
           
        }


        useEffect(() => {
          if (isLoadingFav === false) {
            if(checkAddToFav && checkAddToFav.success) {
          if (checkAddToFav.success === true) {
            // Notify "تم الاضافة بنجاح"
            notify("تم الأضافة للمفضلة بنجاح", "success");
          } else {
            // Handle other statuses or errors if needed
            notify("حدث مشكلة في الاضافة", "error");
        }
      }

      }
        }, [isLoadingFav,checkAddToFav]);









        const downAudio = useSelector((state) => state.audio.downAudio);
        const isLoadingDown = useSelector((state) => state.audio.isLoading);
      
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
      
      
              useEffect(() => {
                if (isLoadingDown === false) {
                  if(downAudio && downAudio.success) {
                if (downAudio.success === true) {
                  // Notify "تم الاضافة بنجاح"
                  notify("تم الأضافة للمفضلة بنجاح", "success");
                } else {
                  // Handle other statuses or errors if needed
                  notify("حدث مشكلة في الاضافة", "error");
              }
            }
      
            }
              }, [isLoadingDown,downAudio]);
      








        const checkAddToFavElder = useSelector((state) => state.elders.favElder);
        const isLoadingFavElder = useSelector((state) => state.elders.isLoadingFavElder);

        const handelAddtoFavElder = (elderId) => {
          const formData = {
            elder_id: elderId, // Replace 'your_audio_id_here' with the actual audio ID value
              // other formData properties if any
          };
          if (!token) {
            // Token exists, perform the download action
            // Add your download logic here
           return notify("من فضلك قم بتسجيل الدخول اولا", "error");
          }
          dispatch(favOneElder({ formData, token }))
                 
              }


              useEffect(() => {
                if (isLoadingFavElder === false) {
                  if(checkAddToFavElder && checkAddToFavElder.success) {
                if (checkAddToFavElder.success === true) {
                  // Notify "تم الاضافة بنجاح"
                  notify(" تم الأضافة للمفضلة بنجاح", "success");
                } else {
                  // Handle other statuses or errors if needed
                  notify("حدث مشكلة في الاضافة", "error");
              }
            }
      
            }
              }, [isLoadingFavElder,checkAddToFavElder]);




              useEffect(() => {
                if (isLoadingElderDown === false) {
                  if(elderDown && elderDown.success) {
                if (elderDown.success === true) {
                  // Notify "تم الاضافة بنجاح"
                  notify(" تم الأضافة للمفضلة بنجاح", "success");
                } else {
                  // Handle other statuses or errors if needed
                  notify("حدث مشكلة في الاضافة", "error");
              }
            }
      
            }
              }, [isLoadingElderDown,elderDown]);
  return (


    <>
      <NavBar />

      <Container>
      {!isLoading ? (
  getDataOne ? (
    getDataOne.data ? (
      <Row>
        <Col>
          <div style={{ position: "relative", marginTop: "-35px" }}>
            <div
              style={{
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "500",
                paddingBottom: "25px",
                paddingTop: "15px",
                borderRadius: "25px",
              }}
              className=" background-image-card"
            >
              <Row>
                <Col
                  sm="6"
                  xs="6"
                  className=" d-flex "
                  style={{ marginTop: "-35px" }}
                >
                  <img
                    src={getDataOne.data.image}
                    width={200}
                    height={180}
                    alt=""
                    style={{ marginTop: "20px", borderRadius: "10px" }}
                  />
                </Col>

                <Col
                  sm="3"
                  xs="6"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="text-info-card"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "-40px",
                      marginTop: "-20px",
                    }}
                  >
                    <h5
                      style={{
                        color: "rgba(5, 20, 39, 1)",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      {getDataOne.data.name}
                    </h5>
                    <p>{getDataOne.data.count_audios} مقطع صوتي</p>
                  </div>
                </Col>

                <Col sm="3" xs="6" className="icons">
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "50px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="icons-div"
                  >
                    {/* Add the download functionality here */}
                    <MdDownloadForOffline
                      style={{
                        color: "rgb(209, 155, 111)",
                        fontSize: "45px",
                        cursor: "pointer",
                      }}
                      className="icon-audio-card"
                      onClick={() => downloadAudiosAsZip(getDataOne.data.Audio,getDataOne.data.id)}

                    />
                    {/* End of download functionality */}
                    <img src={heartIcon}
                      style={{
                        color: "#878787bd",
                        fontSize: "45px",
                        cursor: "pointer",
                      }}
                      className="icon-audio-card"
                      onClick={() => handelAddtoFavElder(getDataOne.data.id)}
                    />
                    <PiShareFatFill
                      style={{
                        color: "#FFFFFF",
                        fontSize: "45px",
                        cursor: "pointer",
                      }}
                      className="icon-audio-card"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    ) : null
  ) : null
) : null}

      </Container>

      <Container>
        <div
          style={{
            marginLeft: "-55px",
            marginBottom: "15px",
            borderBottom: "1.5px solid #EEEEEE ",
            width: "100%",
          }}
        ></div>
        <Row>
          <Col>
            <div className="d-flex justify-content-between mb-4">
              <Form>
                <FormControl
                  type="search"
                  placeholder="ابحث..."
                  className="me-2  "
                  aria-label="Search"
                  style={{ borderRadius: "25px", width: "95%" }}
                />
                <IoSearch
                  width="20px"
                  height="20px"
                  style={{
                    position: "absolute",
                    marginTop: "-30px",
                    marginRight: "70px",
                    fontSize: "25px",
                    color: "#00000082",
                  }}
                  className="img-search"
                />
              </Form>

              <div style={{ display: "flex", gap: "10px" }}>
                <LuArrowUpDown
                  style={{
                    marginRight: "5px",
                    position: "absolute",
                    marginTop: "10px",
                    color: "rgb(219, 176, 134)",
                  }}
                />

<NavDropdown
        title="الترتيب حسب"
        id="collapsible-nav-dropdown"
        style={{
          background:
            "linear-gradient(0deg, rgba(209, 155, 111, 0.15), rgba(209, 155, 111, 0.15)),linear-gradient(0deg, rgba(209, 155, 111, 0.1), rgba(209, 155, 111, 0.1))",
          border: "1.5px solid rgba(209, 155, 111, 0.1)",
          borderRadius: "25px",
          padding: "5px 25px 5px 10px",
          color: "rgba(209, 155, 111, 1)",
          fontWeight: "bold",
          fontSize: "13px",
        }}
      >
        <NavDropdown.Item onClick={handleSortByLatest}>
          الأحدث اضافة
        </NavDropdown.Item>
        <NavDropdown.Item onClick={handleSortAlphabetically}>
          الابجدية
        </NavDropdown.Item>
      </NavDropdown>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
      {!isLoading ? (
  getDataOne ? (
    getDataOne.data ? (
      getDataOne.data.Audio ? (
        [...getDataOne.data.Audio].sort(sortFunction).map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Row className="me-auto" md={4}>
                <Col>
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
                      {" "}
                      {item.title}{" "}
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
                    {" "}
                    {item.name}{" "}
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
  {durations[index] ? formatDuration(durations[index]) : 'Loading...'}
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
                        <MdDownloadForOffline
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
                      <MdDownloadForOffline
                        style={{
                          color: "rgb(209, 155, 111)",
                          fontSize: "30px",
                          cursor: "pointer",
                        }}
                        onClick={handleCheckLogin}
                        download="audio_file"
                      />
                    )}

                    <img src={heartIcon}
                      style={{
                        color: "#878787bd",
                        fontSize: "30px",
                        cursor: "pointer",
                      }}
                      onClick={() => handelAddtoFav(item.id)} // Assuming 'audioId' is accessible in this scope
                    />

                    <button
                      onClick={() => handlePlay(index)}
                      style={{ border: "none", background: "#FFFFFF" }}
                    >
                      {isPlaying[index] ? (
                        <FaCirclePause
                          style={{
                            color: "rgb(209, 155, 111)",
                            fontSize: "50px",
                          }}
                        />
                      ) : (
                        <img src={play}
                          style={{
                            color: "rgb(209, 155, 111)",
                            fontSize: "26px",
                          }}
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
              <div
                style={{
                  marginLeft: "-55px",
                  marginBottom: "15px",
                  borderBottom: "1.5px solid #EEEEEE ",
                  width: "100%",
                }}
              ></div>
            </React.Fragment>
          );
        })
      ) : (
         <div style={{height:'280px'}}><span>لا يوجد بيانات</span></div>
      )
    ) : (
       <div style={{height:'280px'}}><span>لا يوجد بيانات</span></div>
    )
  ) : (
     <div style={{height:'280px'}}><span>لا يوجد بيانات</span></div>
  )
) : (
  <div style={{ height: "280px" }}>
    {" "}
    <Spinner animation="border" variant="primary" />
  </div>
)}

      </Container>
      <ToastContainer/>
    </>
  );
};
export default AudioCard;
