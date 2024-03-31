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
import nodata from "../../images/nodata.svg";
import favrediconwith from "../../images/favredWith.svg";

import PlayIcon from "../../images/play.svg";
import PauseIcon from "../../images/pause.svg";
import NavBar from "../Navbar/NavBar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useParams,useNavigate } from "react-router-dom";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { IoHeartCircleSharp, IoSearch } from "react-icons/io5";
import { MdDownloadForOffline } from "react-icons/md";
import { PiShareFatFill } from "react-icons/pi";
import { LuArrowUpDown } from "react-icons/lu";
import { downloadOneElder, favOneElder, getEldersByIdAudios } from "../../features/elders/eldersSlice";
import { favOneAudio,downloadOneAudio } from "../../features/audios/audioSlice";
import favIcon from "../../images/fav.svg";
import downloadIcon from "../../images/download.svg";
import Cookies from "js-cookie";
import searchIcon from "../../images/search.svg";
import arrowsIcon from "../../images/twoArr.svg";
import shareIcon from "../../images/share.svg";
import downIcon from "../../images/downloadBorder.svg";
import audioWhiteIcon from "../../images/audiowhite.svg";
import fav2Icon from "../../images/fav2.svg";
import { ToastContainer } from "react-toastify";
import { useTranslation } from 'react-i18next';

import notify from "../UseNotifications/useNotification";

import JSZip from 'jszip';

const AudioCard = () => {
  const { t } = useTranslation('audios');

  const params = useParams();
const navigate = useNavigate()
  // Now you can access the parameters using the keys defined in your route
  const { id } = params;
  const dispatch = useDispatch();

  const elderDown = useSelector((state) => state.elders.downElder);

  const isLoadingElderDown = useSelector((state) => state.elders.isLoadingDownElder);



  function downloadAudiosAsZip(idElder) {
    if (!token) {
      return notify(t('loginRequired'), "error");
    }
  
    const formData = {
      elder_id: idElder,
      // other formData properties if any
    };
  
    // Dispatch action to download audio data for the elder
    dispatch(downloadOneElder({ formData, token }))
    // .then(response => {
    //   console.log(response);
    //   let audioData = [];
      
    //   // Check if response.payload is an array or an object with audio data
    //   if (Array.isArray(response.payload)) {
    //     // Case 1: response.payload is already an array of audios
    //     audioData = response.payload;
    //   } else if (response.payload && response.payload.audio) {
    //     // Case 2: response.payload has an 'audio' property containing audio data
    //     audioData = response.payload.audio;
    //   } else {
    //     console.error('Error: Invalid audio data format');
    //     return; // Exit the function or handle the error appropriately
    //   }
    
    //   const zip = new JSZip();
    
    //   audioData.forEach((audio, index) => {
    //     fetch(audio.audio)
    //       .then(response => response.blob())
    //       .then(blob => {
    //         zip.file(`audio_${index + 1}.mp3, blob`); // Rename the files as needed
    //       })
    //       .catch(error =>
    //         console.error(`Error downloading audio ${index + 1}:`, error)
    //       );
    //   });
    
    //   // Generate the .zip archive
    //   zip.generateAsync({ type: 'blob' })
    //     .then(zipBlob => {
    //       const url = window.URL.createObjectURL(new Blob([zipBlob]));
    //       const link = document.createElement('a');
    //       link.href = url;
    //       link.setAttribute('download', 'audios.zip');
    //       document.body.appendChild(link);
    //       link.click();
    //       document.body.removeChild(link); // Remove the link after download
    //     })
    //     .catch(error => console.error('Error generating .zip file:', error));
    // })
    // .catch(error => {
    //   console.error('Error downloading audio data:', error);
    // });
    
    
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
      localStorage.setItem("audiodown","تحميل صوت بنجاح")

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
        notify(t('Downloadedsuccessfully'), "success");
        downloadAudio(audioUrl);

      } else {
        notify(t('audioUnavailable'), "error");
      }
    } else {
      // Token doesn't exist, notify the user to log in
      return notify(t('loginRequired'), "error");
    }
  };
  
  
  const audioRefs = useRef([]);
  const [durations, setDurations] = useState([]);
  const [durationFormatted, setDurationFormatted] = useState("0:00");
  const NUM_OF_AUDIOS = 1; // Define the actual number of audios here

  const [isPlayingNew, setIsPlayingNew] = useState(Array(NUM_OF_AUDIOS).fill(false)); // Initialize with the number of audios you have

  useEffect(() => {
    audioRefs.current = audioRefs.current.slice(0, durations.length);
    setIsPlayingNew(new Array(durations.length).fill(false));
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
// Pause all other audios before playing the new one
    
audioRefs.current.forEach((audioRef, idx) => {
  if (idx !== index && audioRef && !audioRef.paused) {
    audioRef.pause();
    setIsPlayingNew((prev) => {
      const newIsPlaying = [...prev];
      newIsPlaying[idx] = false;
      return newIsPlaying;
    });
  }
})
const audioRef = audioRefs.current[index];
if (audioRef.paused) {
  audioRef.play().catch((error) => console.error("Error playing audio:", error));
} else {
  audioRef.pause();
}
setIsPlayingNew((prev) => {
  const newIsPlaying = [...prev];
  newIsPlaying[index] = !newIsPlaying[index];
  return newIsPlaying;
})
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


  useEffect(() => {
    dispatch(getEldersByIdAudios({id,token}));
  }, [dispatch, id,token]);

  const checkAddToFav = useSelector((state) => state.audio.favAudio);
  const isLoadingFav = useSelector((state) => state.audio.isLoadingFav);

  




  // const favIconIs = isFav ? favrediconwith  :favIcon;
  const favIconNot = favIcon; // Path to the normal icon
  const favRedIcon = favrediconwith; // Path to the red/favorite icon
  const [favorites, setFavorites] = useState([]);
  const [isFav, setIsFav] = useState(false);

  const handleAddtoFav = (id) => {
    const formData = {
      audio_id: id,
    };

    // Add logic to handle favoriting audio
    if (!token) {
      return notify(t("loginRequired"), 'error');
    }

    dispatch(favOneAudio({ formData, token }));
    navigate("/favAudios")

    if (!favorites.includes(id)) {
      setFavorites([...favorites, id]);
    }
  };

  // useEffect(() => {
  //   if (!isLoading && checkAddToFav && checkAddToFav.success) {
  //     if (checkAddToFav.message === "The Audio has been added to your favorites") {
  //       setIsFav(true); // Toggle favorite status

  //     } else if (checkAddToFav.message === "The Audio has been removed from your favorites") {
  //       setIsFav(false); // Toggle favorite status

  //     }
  //   }
  // }, [isLoading, checkAddToFav]);



        




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
            return notify(t('loginRequired'), "error");
          }

          dispatch(downloadOneAudio({ formData, token }))
                 
              }
      
      
            //   useEffect(() => {
            //     if (isLoadingDown === false) {
            //       if(downAudio && downAudio.success) {
            //     if (downAudio.success === true) {
            //       // Notify "تم الاضافة بنجاح"
            //       notify("تم الأضافة للمفضلة بنجاح", "success");
            //     } else {
            //       // Handle other statuses or errors if needed
            //       notify("حدث مشكلة في الاضافة", "error");
            //   }
            // }
      
            // }
            //   }, [isLoadingDown,downAudio]);
      






            const [isFavElder, setIsFavElder] = useState(false); // State to track favorite status

  // const favIconElderIs = isFavElder ? favrediconwith  :favIcon;

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
            return notify(t('loginRequired'), "error");
          }
          dispatch(favOneElder({ formData, token }))
// navigate("/favScientists")
          setTimeout(() => {
            navigate("/favScientists")
          }, 1000);
                 
              }


              useEffect(() => {
                if (isLoadingFavElder === false) {
                  if(checkAddToFavElder && checkAddToFavElder.success) {
                if (checkAddToFavElder.message === "The elder has been added to your favorites") {
                  // Notify "تم الاضافة بنجاح"
                  // notify(t('addToFavoritesSuccess'), "success");
                  setIsFavElder(true);
                } else if (checkAddToFavElder.message === "The elder has been removed from your favorites") {
                  setIsFavElder(false); // Toggle favorite status
      
                  // Handle other statuses or errors if needed
                  // notify(t('addToFavoritesError'), "error");
              }
            }
      
            }
              }, [isLoadingFavElder,checkAddToFavElder]);




            //   useEffect(() => {
            //     if (isLoadingElderDown === false) {
            //       if(elderDown && elderDown.success) {
            //     if (elderDown.success === true) {
            //       // Notify "تم الاضافة بنجاح"
            //       notify(" تم الأضافة للمفضلة بنجاح", "success");
            //     } else {
            //       // Handle other statuses or errors if needed
            //       notify("حدث مشكلة في الاضافة", "error");
            //   }
            // }
      
            // }
            //   }, [isLoadingElderDown,elderDown]);


  return (


    <>
      <NavBar />

      <Container>
      {!isLoading ? (
  getDataOne ? (
  
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
          className="background-image-card"
        >
          <Row>
            <Col
              sm="6"
              xs="6"
              className="d-flex img-res-audio"
              style={{ marginTop: "-35px" }}
            >
              <img
                src={getDataOne.image}
                width={200}
                height={180}
                alt=""
                style={{ marginTop: "20px", borderRadius: "0px 15px 15px 0px" }}
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
                className="res-h5-name"
              >
                <h5
                  style={{
                    color: "rgba(5, 20, 39, 1)",
                    fontWeight: "bold",
                  }}
                >
                  {getDataOne.name}
                </h5>
                <p>
                  <img src={audioWhiteIcon} alt="audio icon" />{" "}
                  {getDataOne.count_audios} {t('audio')}
                </p>
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
                {/* <img
                  src={downIcon}
                  alt="download icon"
                  style={{
                    cursor: "pointer",
                  }}
                  className="icon-audio-card"
                  onClick={() => downloadAudiosAsZip(getDataOne.Audio, getDataOne.id)}
                /> */}
                <img
                  src={getDataOne.is_Favourite ? favRedIcon : fav2Icon}
                  alt="favorite icon"
                  style={{
                    cursor: "pointer",
                  }}
                  className="icon-audio-card"
                  onClick={() => handelAddtoFavElder(getDataOne.id)}
                />
                <img
                  src={shareIcon}
                  alt="share icon"
                  style={{
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
  ) : <div style={{height:'280px'}}><img src={nodata}/> <br/>
  <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
  <span>{t('nodata2')}</span></div>
) : <div style={{height:'280px'}}><Spinner/></div>}

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
              {/* <Form>
                <FormControl
                  type="search"
                  placeholder="ابحث..."
                  className="me-2  "
                  aria-label="Search"
                  style={{ borderRadius: "25px", width: "95%" }}
                />
                 <img src={searchIcon}   className="img-search" style={{
                    position: "absolute",
                    marginTop: "-30px",
                    marginRight: "70px",
                    fontSize: "25px",
                    color: "#00000082",
                  }} />
              </Form> */}

              <div style={{ display: "flex", gap: "10px" }}>
              <img style={{
                    marginRight: "5px",
                    position: "absolute",
                    marginTop: "10px",
                    color: "rgb(219, 176, 134)",
                  }} src={arrowsIcon} />


<NavDropdown
        title={t('sortBy')}
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
        {t('latestAdded')}
        </NavDropdown.Item>
        <NavDropdown.Item onClick={handleSortAlphabetically}>
        {t('alphabetical')}
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
    getDataOne ? (
      getDataOne.Audio&&getDataOne.Audio.length>0 ? (
        [...getDataOne.Audio].sort(sortFunction).map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Row className="me-auto" md={4}>
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
                    {item.elder?.name}{" "}
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
  {durations[index] ? formatDuration(durations[index]) : 'Loading...'} {t('minutes')}
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
                    {/* {token ? (
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
                      <MdDownloadForOffline
                        style={{
                          color: "rgb(209, 155, 111)",
                          fontSize: "30px",
                          cursor: "pointer",
                        }}
                        onClick={handleCheckLogin}
                        download="audio_file"
                      />
                    )} */}

<img
                src={ item.is_Favourite ? favRedIcon : favIconNot}
                alt="Favorite Icon"
                style={{
                  color: '#878787bd',
                  fontSize: '30px',
                  cursor: 'pointer',
                }}
                onClick={() => handleAddtoFav(item.id)}
              />

                    <button
                      onClick={() => handlePlay(index)}
                      style={{ border: "none", background: "#FFFFFF" }}
                    >
                      {isPlayingNew[index] ? (
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
        <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
          <span>{t('nodata2')}</span></div>
      )
    ) : (
      <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
          <span>{t('nodata2')}</span></div>
    )
  ) : (
    <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
          <span>{t('nodata2')}</span></div>
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