import React from "react";
import "../Audios/audio.css";
import { Col, Container, Row } from "react-bootstrap";
import profileCard from "../../images/profile-card.png";
import iconCard2 from "../../images/icon-2.png";
import iconCard3 from "../../images/icon-3.png";
import audioProfile from "../../images/audio-profile.png";
import play from "../../images/play.png";
import heart from "../../images/heart.png";
import deleteicon from "../../images/deleteicon.png";
import NavBar from "../Navbar/NavBar";

const DownloadAudioCard = () => {
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
                      <img src={iconCard2} alt="" />
                      <img src={iconCard3} alt="" />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container style={{ marginTop: "30px" }}>
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
              <img src={deleteicon} alt="" />
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
              <img src={deleteicon} alt="" />
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
              <img src={deleteicon} alt="" />
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
              <img src={deleteicon} alt="" />
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
      </Container>
    </>
  );
};
export default DownloadAudioCard;
