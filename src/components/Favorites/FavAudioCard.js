import React from "react";
import "../Audios/audio.css";

import {
  Col,
  Container,
  Form,
  FormControl,
  NavDropdown,
  Row,
} from "react-bootstrap";
import search from "../../images/search.png";
import sortIcon from "../../images/sort-icon.png";
import profileCard from "../../images/profile-card.png";
import iconCard from "../../images/icon-1.png";
import hearticon from "../../images/redhearticon.png";
import iconCard3 from "../../images/icon-3.png";
import audioProfile from "../../images/audio-profile.png";
import play from "../../images/play.png";
import heart from "../../images/heart.png";
import download from "../../images/download.png";
import NavBar from "../Navbar/NavBar";

const FavAudioCard = () => {
  return (
    <>
      <NavBar />

      <Container>
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
                      src={profileCard}
                      alt=""
                      style={{ marginTop: "20px" }}
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
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginRight: "-40px",
                        marginLeft: "100px",
                      }}
                    >
                      <h5
                        style={{
                          color: "rgba(5, 20, 39, 1)",
                          fontWeight: "bold",
                        }}
                      >
                        محمد صالح المنجد
                      </h5>
                      <p>20 مقطع صوتي</p>
                    </div>
                  </Col>

                  <Col sm="3" xs="6" className=" icons  ">
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "50px",
                      }}
                    >
                      <img src={iconCard} alt="" />
                      <div>
                        <img src={hearticon} alt="" />
                      </div>

                      <img src={iconCard3} alt="" />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
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
                  className="me-2 w-100  "
                  aria-label="Search"
                  style={{ borderRadius: "25px" }}
                />
                <img
                  src={search}
                  alt=""
                  width="20px"
                  height="20px"
                  style={{
                    position: "absolute",
                    marginTop: "-30px",
                    marginRight: "70px",
                  }}
                />
              </Form>

              <div style={{ display: "flex", gap: "10px" }}>
                <img
                  src={sortIcon}
                  alt=""
                  width="15px"
                  height="15px"
                  style={{
                    marginRight: "5px",
                    position: "absolute",
                    marginTop: "10px",
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
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
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
      </Container>
    </>
  );
};
export default FavAudioCard;
