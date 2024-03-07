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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import { MdDownloadForOffline } from "react-icons/md";
import {
  getAudioCategory,
  getAudioCategoryById,
} from "../../features/audios/audioSlice";
import { LuArrowUpDown } from "react-icons/lu";
import { IoHeartCircleSharp, IoSearch } from "react-icons/io5";

const AudioCategory = () => {
  const params = useParams();

  // Now you can access the parameters using the keys defined in your route
  const { id } = params;
  const dispatch = useDispatch();

  const audioCategory = useSelector((state) => state.audio.audioCategory);
  const audioCategoryLoading = useSelector((state) => state.audio.isLoading);

  const getAudioCategoryData = useSelector(
    (state) => state.audio.audioCategoryId
  );
  const getAudioCategoryLoading = useSelector((state) => state.audio.isLoading);

  useEffect(() => {
    dispatch(getAudioCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAudioCategoryById(id));
  }, [dispatch, id]);

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
            <Link
              to={"/audios"}
              style={{
                color: "rgba(5, 20, 39, 1)",
                fontSize: "15px",
                marginTop: "5px",
                textDecoration: "none",
              }}
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
            </Link>
          </Col>

          {!audioCategoryLoading ? (
            audioCategory ? (
              <>
                {audioCategory.map((item, index) => (
                  <Col
                    key={item.id}
                    xs="6"
                    md="4"
                    lg="2"
                    style={{ textAlign: "center", marginBottom: "10px" }}
                  >
                    <Link
                      style={{
                        color: "rgba(5, 20, 39, 1)",
                        fontSize: "15px",
                        marginTop: "5px",
                        textDecoration: "none",
                      }}
                      to={`/audiosCategory/${item.id}`}
                    >
                      <div
                        style={{
                          border: "1.38px solid rgba(232, 232, 232, 1)",
                          borderRadius: "23px",
                          width: "124px",
                          height: "33.74px",
                          background:
                            item.id == id
                              ? "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)"
                              : "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
                        }}
                      >
                        <h6
                          style={{
                            color: item.id == id ? "white" : "black",
                            fontSize: "15px",
                            marginTop: "5px",
                          }}
                        >
                          {item.title}
                        </h6>
                      </div>
                    </Link>
                  </Col>
                ))}
              </>
            ) : null
          ) : null}
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

                <Link to={`/audiosCategorySort/${id}`}>
                  <img src={group} alt="" width="30px" height="30px" />
                </Link>

                <Link to={`/audiosCategory/${id}`}>
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
          {!getAudioCategoryLoading ? (
            getAudioCategoryData && getAudioCategoryData.length > 0 ? (
              getAudioCategoryData.map((item) => {
                return (
                  <Col xs="12" md="12" lg="6" className="mb-3" key={item.id}>
                    {console.log(item)}
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
                        <Link to={`/audioCardCategory/${item.id}`}>
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
                        <MdDownloadForOffline
                          style={{
                            color: "rgb(219 176 134)",
                            fontSize: "42px",
                            paddingLeft: "5px",
                          }}
                        />
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
          )}
        </Row>
      </Container>
    </>
  );
};
export default AudioCategory;
