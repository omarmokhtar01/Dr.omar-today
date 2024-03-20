import React, { useEffect, useState } from "react";
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
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import nodata from "../../images/nodata.svg";
import { useTranslation } from 'react-i18next';

import group from "../../images/Group.png";
import searchIcon from "../../images/search.svg";
import group2 from "../../images/Group2.png";
import group22 from "../../images/Group-2-2.png";
import arrowsIcon from "../../images/twoArr.svg";
import squareIcon from "../../images/squares.svg";
import rowaIcon from "../../images/rows.svg";
import favGroundIcon from "../../images/favground.svg";
import audioIcon from "../../images/audio.svg"; 
import downGroundIcon from "../../images/downloadGround.svg";

import fav2Icon from "../../images/fav2.svg";
import favrediconwith from "../../images/favredWith.svg";



import { useSelector, useDispatch } from "react-redux";
import {
  getAudioCategory,
  getAudioCategoryById,
  getAudios,
  searchListened,
} from "../../features/audios/audioSlice";
import { Link,useNavigate } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import { MdDownloadForOffline } from "react-icons/md";
import { IoHeartCircleSharp, IoSearch, IoTerminal } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";

import notify from "../UseNotifications/useNotification";
import { downloadOneElder, favOneElder } from "../../features/elders/eldersSlice";
import JSZip from 'jszip';

const Audios = () => {
  const favIconNot = fav2Icon; // Path to the normal icon
  const favRedIcon = favrediconwith; // Path to the red/favorite icon
const navigate = useNavigate()
  const [sortBy, setSortBy] = useState(null); // State to keep track of sorting option
  const { t } = useTranslation('audios');

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
    if (!a.title || !b.title) {
      // Handle cases where either 'a' or 'b' does not have a 'title' property
      return 0; // Or you can prioritize the one with a 'title' property if needed
    }
  
    if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    } else {
      // Add sorting logic for other options, e.g., sorting by latest addition
      return 0; // Placeholder, modify as per your actual logic
    }
  };
  
  let token = Cookies.get("token");

  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const getAll = useSelector((state) => state.audio.audios);
  const isLoading = useSelector((state) => state.audio.isLoading);
  const error = useSelector((state) => state.audio.error);

  const audioCategory = useSelector((state) => state.audio.audioCategory);
  const audioCategoryLoading = useSelector((state) => state.audio.isLoading);

  const getAudioCategoryId = useSelector(
    (state) => state.audio.audioCategoryId
  );
console.log(getAudioCategoryId);

  const elderDown = useSelector((state) => state.elders.downElder);
console.log(elderDown);
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
    localStorage.setItem("elderdown","تحميل عالم بنجاح")

    // .then(response => {
    //   console.log(response);
    //   let audioData = [];cf
      
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
  
  
  
  

  useEffect(() => {
    dispatch(getAudios());
    dispatch(getAudioCategory());
  }, [dispatch]);

  useEffect(() => {
    if (id !== null) {
      dispatch(getAudioCategoryById(id));
    }
  }, [dispatch, id]);

  const handleCheckLogin = () => {
    const token = Cookies.get("token");

    if (token) {
      // Token exists, perform the download action
      // Add your download logic here
      // notify("تم التحميل", "success");
    } else {
      // Token doesn't exist, notify the user
      notify("من فضلك قم بتسجيل الدخول اولا", "error");
    }
  };

  //to change icon
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };



 











  const [isFavElder, setIsFavElder] = useState(false); // State to track favorite status
  const [favorites, setFavorites] = useState([]);
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
    localStorage.setItem("elderfav","تم حفظ  العالم بنجاح")
    if (!favorites.includes(elderId)) {
      setFavorites([...favorites, elderId]);
    }

    // setTimeout(() => {
    //   navigate("/favScientists")
    // }, 1000);
           
        }


        useEffect(() => {
          if (isLoadingFavElder === false) {
            if(checkAddToFavElder && checkAddToFavElder.success) {
          if (checkAddToFavElder.message === "The elder has been added to your favorites") {
            navigate("/favScientists")

            // Notify "تم الاضافة بنجاح"
            // notify(t('addToFavoritesSuccess'), "success");
            setIsFavElder(true);
          } else if (checkAddToFavElder.message === "The elder has been removed from your favorites") {
            setIsFavElder(false); // Toggle favorite status
            navigate("/favScientists")

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





        const [searchState, setSearchState] = useState('');
        const searchListen = useSelector((state) => state.audio.searchListen);
        const isLoadingSearch = useSelector((state) => state.audio.isLoadingSearch);
        const [searchResults, setSearchResults] = useState([]);
        useEffect(() => {
          // Dispatch the thunk action creator when the searchState changes
          dispatch(searchListened(searchState));
        }, [dispatch, searchState]);
      
        useEffect(() => {
          // Update searchResults whenever searchListen changes
          setSearchResults(searchListen);
        }, [searchListen]);
      
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
                {t('audios')}{" "}
              </h1>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="d-flex justify-content-center align-items-center">
        <Row className="m-3 d-flex" style={{ justifyContent: "space-between" }}>
          <Col
            xs="6"
            md="4"
            lg="2"
            style={{
              textAlign: "center",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => setId(null)}
          >
            <div
              style={{
                border: "none",
                borderRadius: "23px",
                width: "124px",
                height: "33.74px",
                background:
                  id === null
                    ? "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)"
                    : "linear-gradient(0deg, rgb(232, 232, 232), rgb(232, 232, 232)), linear-gradient(0deg, rgb(245, 245, 245), rgb(245, 245, 245))",
                boxShadow:
                  id === null
                    ? "0px 3.6861166954040527px 3.6861166954040527px 0px rgba(209, 155, 111, 0.22)"
                    : "none",
              }}
            >
              <p
                style={{
                  color: id === null ? "white" : "black",
                  fontWeight: "bold",
                }}
              >
                {t('all')}
              </p>
            </div>
          </Col>

          {
          !isLoading?(
          audioCategory ? (
            <>
              {audioCategory && audioCategory.length > 0 && (audioCategory).map((item, index) => (
                <Col
                  key={item.id}
                  xs="6"
                  md="4"
                  lg="2"
                  style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (id !== item.id) {
                      setId(item.id);
                    }
                  }}
                >
                  <div
                    style={{
                      border: "1.38px solid rgba(232, 232, 232, 1)",
                      borderRadius: "23px",
                      width: "124px",
                      height: "auto",
                      background:
                        id === item.id
                          ? "linear-gradient(331.41deg, rgb(209, 155, 111) 6.78%, rgb(246, 229, 195) 204.87%)"
                          : "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
                      boxShadow:
                        id === item.id
                          ? "0px 3.6861166954040527px 3.6861166954040527px 0px rgba(209, 155, 111, 0.22)"
                          : "none",
                    }}
                  >
                    <h6
                      style={{
                        color: id === item.id ? "white" : "black",
                        fontSize: "15px",
                        marginTop: "5px",
                      }}
                    >
                      {item.title}
                    </h6>
                  </div>
                </Col>
              ))}
            </>
          ) :   <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
          <span>{t('nodata2')}</span></div>
          ):(
            null
            )
        }
        </Row>
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
                  placeholder={t('search')}
                  className="me-2 w-100  search-audio"
                  aria-label="Search"
                  style={{ borderRadius: "25px" }}
                  onChange={(e)=>setSearchState(e.target.value)}
                  required
                />
              
               
                 <img src={searchIcon}   className="img-search" style={{
                    position: "absolute",
                    marginTop: "-30px",
                    marginRight: "70px",
                    fontSize: "25px",
                    color: "#00000082",
                  }} />
              </Form>

              <div
                className="audio-section"
                style={{ display: "flex", gap: "5px", marginLeft: "5px" }}
              >
                {/* <img
                  src={sortIcon}
                  alt=""
                  width="15px"
                  height="15px"
                  style={{
                    marginRight: "5px",
                    position: "absolute",
                    marginTop: "10px",
                  }} 
                /> */}

               
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

                <Link to="/audiosSort">
                  <img src={squareIcon} alt=""  />
                </Link>

                <Link to="/audios">
                  {/* {" "}
                  <img
                    src={isClicked ? rowaIcon : group22}
                    width="30px"
                    height="30px"
                    onClick={handleClick}
                  /> */}
                  <img src={rowaIcon} alt=""  />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
      <Row className="m-auto">
  {searchState !== '' && searchResults.length > 0 ? (
    searchResults.map((item) => (
      <Col xs="12" md="12" lg="6" className="mb-3" key={item.id}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "2px solid rgba(236, 236, 236, 1)",
            borderRadius: "15px",
            width: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to={`/audioCard/${item.id}`}>
              <img
                src={item.image}
                alt="img"
                width={200}
                height={200}
                id="img-card-audio"
              />
            </Link>
            <div className="card-namee"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h5 className="card-namee-details">{item.name}</h5>
              <p className="card-namee-details"
                style={{
                  color: "rgb(130, 130, 130)",
                  fontWeight: "bold",
                }}
              >
                {" "}
                {item.count_audios} {t('audio')}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "60px",
              gap: "20px",
            }}
            id="sounds-icons"
          >
            {" "}
            <img 
                     src={
                      // favorites.includes(item.id) ? 
                    (item.is_Favourte ? favRedIcon : favIconNot) 
                    // : favIconNot
                  }
                     style={{
                color: "#878787bd",
                fontSize: "40px",
                cursor: "pointer",
              }}
              className="icon-mob"
              onClick={()=>handelAddtoFavElder(item.id)}
            />
            <MdDownloadForOffline
              style={{
                color: "rgb(219 176 134)",
                fontSize: "42px",
                paddingLeft: "5px",
                cursor: "pointer",
              }}
              onClick={() => downloadAudiosAsZip(item.id)}
            />
          </div>
        </div>
      </Col>
    ))
  ) : searchResults.length === 0 ? (
    <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
          <span>{t('nodata2')}</span></div>
  ) : id == null ? (
    !isLoading ? (
      getAll && getAll.length > 0 ? 
      ([...getAll].sort(sortFunction).map((item) => {
        return (
          <Col xs="12" md="12" lg="6" className="mb-3" key={item.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "2px solid rgba(236, 236, 236, 1)",
                borderRadius: "15px",
                width: "auto",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to={`/audioCard/${item.id}`}>
                  <img
                    src={item.image}
                    alt="img"
                    width={200}
                    height={200}
                    id="img-card-audio"
                    style={{borderRadius:'0px 15px 15px 0px'}}
                  />
                </Link>
                <div className="card-namee"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <h5 className="card-namee-details">{item.name}</h5>
                  <p className="card-namee-details"
                    style={{
                      color: "rgb(130, 130, 130)",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    <img src={audioIcon} />    {item.count_audios} {t('audio')}  
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "60px",
                  gap: "20px",
                }}
                id="sounds-icons"
              >
                {" "}
                <img                     src={
                // favorites.includes(item.id) ? 
              (item.is_Favourte ? favRedIcon : favIconNot) 
              // : favIconNot
            }

                  style={{
                    color: "#878787bd",
                    fontSize: "40px",
                    cursor: "pointer",
                  }}
                  onClick={()=>handelAddtoFavElder(item.id)}
                  className="icon-mob"
                />
                <img src={downGroundIcon}
                  style={{
                    color: "rgb(219 176 134)",
                    fontSize: "42px",
                    paddingLeft: "5px",
                    cursor: "pointer",
                  }}
                  className="icon-mob"
                  onClick={() => downloadAudiosAsZip(item.id)}
                />
              </div>
            </div>
          </Col>
        );
      })) : (
        <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
          <span>{t('nodata2')}</span></div>
      )
    ) : (
      <div style={{ height: "280px" }}>
        {" "}
        <Spinner animation="border" variant="primary" />
      </div>
    )
  ) : !isLoading ? (
    searchState !== '' && searchResults.length > 0 ? (
      searchResults.map((item,index) => (
        <Col xs="12" md="12" lg="6" className="mb-3" key={index}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "2px solid rgba(236, 236, 236, 1)",
              borderRadius: "15px",
              width: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link to={`/audioCard/${item.id}`}>
                <img
                  src={item.image}
                  alt="img"
                  width={200}
                  height={200}
                  id="img-card-audio"
                />
              </Link>
              <div className="card-namee"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <h5 className="card-namee-details">{item.name}</h5>
                <p className="card-namee-details"
                  style={{
                    color: "rgb(130, 130, 130)",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  <img src={audioIcon} />  {item.count_audios} {t('audio')}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "60px",
                gap: "20px",
              }}
              id="sounds-icons"
            >
              {" "}
              <img                     src={
                // favorites.includes(item.id) ? 
              (item.is_Favourte ? favRedIcon : favIconNot) 
              // : favIconNot
            }

                  style={{
                    color: "#878787bd",
                    fontSize: "40px",
                    cursor: "pointer",
                  }}
                  onClick={()=>handelAddtoFavElder(item.id)}
                  className="icon-mob"
                />
              <img src={downGroundIcon}
                onClick={()=>downloadAudiosAsZip(item.id,item.id)}
                style={{
                  color: "rgb(219 176 134)",
                  fontSize: "42px",
                  paddingLeft: "5px",
                  cursor: "pointer",
                }}
                className="icon-mob"
              />
            </div>
          </div>
        </Col>
      ))
    ) : (
      getAudioCategoryId &&
      Array.isArray(getAudioCategoryId) &&
      getAudioCategoryId.length > 0 ? (
        [...getAudioCategoryId].sort(sortFunction).map((item,index) => (
          <Col xs="12" md="12" lg="6" className="mb-3" key={index}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "2px solid rgba(236, 236, 236, 1)",
                borderRadius: "15px",
                width: "auto",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to={`/audioCard/${item.id}`}>
                  <img
                    src={item.image}
                    alt="img"
                    width={200}
                    height={200}
                    id="img-card-audio"
                    style={{borderRadius:'0px 15px 15px 0px'}}
                  />
                </Link>
                <div className="card-namee"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                  
                >
                  <h5 className="card-namee-details">{item.name}</h5>
                  <p
                  className="card-namee-details"
                    style={{
                      color: "rgb(130, 130, 130)",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    <img src={audioIcon} />  {item.count_audios} {t('audio')}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "60px",
                  gap: "20px",
                }}
                id="sounds-icons"
              >
                {" "}
                <img                     src={
                // favorites.includes(item.id) ? 
              (item.is_Favourte ? favRedIcon : favIconNot) 
              // : favIconNot
            }

                  style={{
                    color: "#878787bd",
                    fontSize: "40px",
                    cursor: "pointer",
                  }}
                  onClick={()=>handelAddtoFavElder(item.id)}
                  className="icon-mob"
                />
                <img src={downGroundIcon}
                  onClick={()=>downloadAudiosAsZip(item.id,item.id)}
                  style={{
                    color: "rgb(219 176 134)",
                    fontSize: "42px",
                    paddingLeft: "5px",
                    cursor: "pointer",
                  }}
                  className="icon-mob"
                />
              </div>
            </div>
          </Col>
        ))
      ) : (
        <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
          <span>{t('nodata2')}</span></div>
      )
    )
  ) : (
    <div style={{ height: "280px" }}>
      {" "}
      <Spinner animation="border" variant="primary" />
    </div>
  )}
</Row>

        <ToastContainer />
      </Container>
    </>
  );
};
export default Audios;