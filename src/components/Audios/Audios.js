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

import group from "../../images/Group.png";
import group2 from "../../images/Group2.png";
import group22 from "../../images/Group-2-2.png";
import { useSelector, useDispatch } from "react-redux";
import { getAudioCategory, getAudioCategoryById, getAudios } from "../../features/audios/audioSlice";
import { Link } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import { MdDownloadForOffline } from "react-icons/md";
import { IoHeartCircleSharp, IoSearch } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
const Audios = () => {
    const [id,setId]=useState(null)
  const dispatch = useDispatch();
  const getAll = useSelector((state) => state.audio.audios);
  const isLoading = useSelector((state) => state.audio.isLoading);
  const error = useSelector((state) => state.audio.error);

  const audioCategory = useSelector((state) => state.audio.audioCategory);
  const audioCategoryLoading = useSelector((state) => state.audio.isLoading);


  const getAudioCategoryId= useSelector((state) => state.audio.audioCategoryId);


  useEffect(() => {
    dispatch(getAudios());
    dispatch(getAudioCategory());
  }, [dispatch]);
  
  useEffect(() => {
    if (id !== null) {
      dispatch(getAudioCategoryById(id));
    }
  }, [dispatch, id]);
  

  

  console.log(getAudioCategoryId);
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
            style={{ textAlign: "center", marginBottom: "10px",cursor:'pointer' }}
            onClick={()=>setId(null)}
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
    ? "0px 3.6861166954040527px 3.6861166954040527px 0px rgba(209, 155, 111, 0.22)": "none"
  }}
>
  <p style={{color: id === null ? 'white' :  'black', fontWeight: "bold" }}>الكل</p>
</div>

          </Col>

          {
  audioCategory ? (
    <>
      {audioCategory.map((item, index) => (
            
        <Col
          key={item.id}
          xs="6"
          md="4"
          lg="2"
          style={{
            textAlign: "center",
            marginBottom: "10px",
            cursor: 'pointer',
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
              height: "33.74px",
              background: id === item.id ? 'linear-gradient(331.41deg, rgb(209, 155, 111) 6.78%, rgb(246, 229, 195) 204.87%)' :  "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)"
             , boxShadow: id === item.id ?"0px 3.6861166954040527px 3.6861166954040527px 0px rgba(209, 155, 111, 0.22)" :'none'
            }}
          >
            <h6
              style={{
                color: id === item.id ? "white":"black",
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
    {
        id == null ? (
            !isLoading ? (
                getAll && getAll.length > 0 ? (
                    getAll.map((item) => {
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
                                            <img
                                                src={item.image}
                                                alt="img"
                                                width={200}
                                                height={200}
                                                id="img-card-audio"
                                            />
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
                                            <p
                                                style={{
                                                    color: "rgb(130, 130, 130)",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {" "}
                                                {item.count_audios} مقطع صوتي
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
                                        <Link to={"/favAudios"}>
                                            {" "}
                                            <IoHeartCircleSharp
                                                style={{
                                                    color: "#878787bd",
                                                    fontSize: "40px",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </Link>
                                        <Link to={"/login"}>

                                        <MdDownloadForOffline
                                            style={{
                                                color: "rgb(219 176 134)",
                                                fontSize: "42px",
                                                paddingLeft: "5px",
                                            }}
                                        />
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        );
                    })
                ) : (
                    <div style={{ height: "140px" }}></div>
                )
            ) : (
                <div style={{ height: "140px" }}>
                    {" "}
                    <Spinner animation="border" variant="primary" />
                </div>
            )
        ) : (
            !isLoading ? (
                getAudioCategoryId && Array.isArray(getAudioCategoryId) && getAudioCategoryId.length > 0 ? (
                    getAudioCategoryId.map((item) => {
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
                                            <img
                                                src={item.image}
                                                alt="img"
                                                width={200}
                                                height={200}
                                                id="img-card-audio"
                                            />
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
                                            <p
                                                style={{
                                                    color: "rgb(130, 130, 130)",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {" "}
                                                {item.count_audios} مقطع صوتي
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
                                        <Link to={"/favAudios"}>
                                            {" "}
                                            <IoHeartCircleSharp
                                                style={{
                                                    color: "#878787bd",
                                                    fontSize: "40px",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </Link>
                                        <Link to={"/login"}>
                                        <MdDownloadForOffline
                                            style={{
                                                color: "rgb(219 176 134)",
                                                fontSize: "42px",
                                                paddingLeft: "5px",
                                            }}
                                            
                                        />
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        );
                    })
                ) : (
                    <div style={{ height: "140px" }}></div>
                )
            ) : (
                <div style={{ height: "140px" }}>
                    {" "}
                    <Spinner animation="border" variant="primary" />
                </div>
            )
        )
    }
</Row>

      </Container>
    </>
  );
};
export default Audios;
