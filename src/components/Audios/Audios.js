import React, { useEffect, useState } from "react";
import "./audio.css";
import {
  Col,
  Container,
  Form,
  FormControl,
  NavDropdown, 
  Row,
} from "react-bootstrap";
import heart1 from "../../images/heart1.png";
import down from "../../images/down.png";
import profile1 from "../../images/pro1.png";
import search from "../../images/search.png";
import group from "../../images/Group.png";
import group1 from "../../images/Group-1-1.png";
import group2 from "../../images/Group2.png";
import group22 from "../../images/Group-2-2.png";
import sortIcon from "../../images/sort-icon.png";
import { useSelector,useDispatch } from "react-redux";
import { getAudioCategory, getAudios } from "../../features/audios/audioSlice";
import { Link } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import { MdDownloadForOffline, MdOutlineFavoriteBorder } from "react-icons/md";
import { MdFileDownload } from "react-icons/md";
import { IoHeartCircleSharp, IoSearch } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
const Audios = () => {
  const dispatch = useDispatch();
  const getAll = useSelector((state) => state.audio.audios);
  const isLoading = useSelector((state) => state.audio.isLoading);
  const error = useSelector((state) => state.audio.error);
 


  const audioCategory = useSelector((state) => state.audio.audioCategory);
  const audioCategoryLoading = useSelector((state) => state.audio.isLoading);

  useEffect(() => {
    dispatch(getAudios());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAudioCategory());
  }, [dispatch]);

  console.log(getAll);
  //to change icon
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
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
                الصوتيات{" "}
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
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
           
            <div
              style={{
                border: "none",
                borderRadius: "23px",
                width: "124px",
                height: "33.74px",
                background:
                  "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
                boxShadow:
                  "0px 3.6861166954040527px 3.6861166954040527px 0px rgba(209, 155, 111, 0.22)",
              }}
            >
              <p style={{ color: "black", fontWeight: "bold" }}>الكل</p>
            </div>
          </Col>

          {
  !audioCategoryLoading ? (
    audioCategory ? (
     <>
        {audioCategory.map((item, index) => (
        <Col key={item.id} xs="6" md="4" lg="2" style={{ textAlign: 'center', marginBottom: '10px' }}>
                <Link style={{ color: 'rgba(5, 20, 39, 1)', fontSize: '15px', marginTop: '5px', textDecoration: 'none' }} to={`/audiosCategory/${item.id}`}>

        <div  style={{
                          border: "1.38px solid rgba(232, 232, 232, 1)",
                          borderRadius: "23px",
                          width: "124px",
                          height: "33.74px",
                          background:
                            "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
                        }}>
                <h6
                          style={{
                            color: "rgba(5, 20, 39, 1)",
                            fontSize: "15px",
                            marginTop: "5px",
                          }}
                        >{item.title}</h6>
            </div>
            </Link>
        </Col>
))}

</>
) : null
) : null
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
                  placeholder="ابحث..."
                  className="me-2 w-100  search-audio"
                  aria-label="Search"
                  style={{ borderRadius: "25px" }}
                />
              

            <IoSearch   width="20px"
                  height="20px"
                  style={{
                    position: "absolute",
                    marginTop: "-30px",
                    marginRight: "70px",
                    fontSize:'25px',
                    color:'#00000082'
                  }}
                  className="img-search" />
              </Form>

              <div className="audio-section" style={{ display: "flex", gap:'5px' , marginLeft:'5px'}}>
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

                <LuArrowUpDown  style={{
                    marginRight: "5px",
                    position: "absolute",
                    marginTop: "10px",
                    color:'rgb(219, 176, 134)'
                  
                  }}/>

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
                    fontSize:'13px'
                  }}
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <Link to="/audiosSort">
                  <img src={group} alt="" width="30px" height="30px" />
                </Link>

                <Link to="/audios">
                  {" "}
                  <img
                    src={isClicked ? group2 : group22}
                    width="30px"
                    height="30px"
                    onClick={handleClick}
                  />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="m-auto">
          {!isLoading
            ? getAll && getAll.length > 0
              ? getAll.map((item) => {
                  return (
                    <Col xs="12" md="12" lg="6" className="mb-3">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          border: "2px solid rgba(236, 236, 236, 1)",
                          borderRadius: "15px",
                          width: "auto",
                        }}
                      >
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Link to={`/audioCard/${item.id}`}>
                            <img src={item.image } alt="img" width={200} height={200} id="img-card-audio" />
                          </Link>
                          <div  
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              flexDirection: "column",
                              padding: "20px",
                            }}
                          >
                            <h5>{item.name}</h5>
                            <p>عدد المقاطع الصوتية {item.count_audios }</p>
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
                            <IoHeartCircleSharp style={{ color: '#878787bd', fontSize: '40px' ,  cursor: "pointer"}} />
                           <MdDownloadForOffline  style={{ color: 'rgb(219 176 134)', fontSize: '42px' ,paddingLeft:'5px' }}/>
                        </div>
                      </div>
                    </Col>
                  );
                })
              : null
            : null}
        </Row>
      </Container>
    </>
  );
};
export default Audios;
