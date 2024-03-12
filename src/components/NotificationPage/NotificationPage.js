import React from "react";
import NavBar from "../Navbar/NavBar";
import { Col, Container, Row } from "react-bootstrap";
import delIcon from "../../images/del.svg";
import bellIcon from "../../images/bell.svg";
import picNotifcation from "../../images/pic-noti.png";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaBell } from "react-icons/fa6";
const NotificationPage = () => {
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
                الاشعارات{" "}
              </h1>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col
            sm="12"
            className="d-flex justify-content-center align-items-center"
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 1)",
                width: "65%",
                boxShadow: "0px 0px 42px 0px rgba(3, 20, 37, 0.05)",
                border: "2px solid rgba(238, 238, 238, 1)",
                borderRadius: "8px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center m-2">
                <h5>
                  {" "}
                  <img src={bellIcon} style={{marginLeft: "5px" }} />
                  الادمن
                </h5>
                <img src={delIcon}
                  style={{
                    paddingLeft: "10px",
 
                  }}
                />
              </div>

              <Col sm="8" style={{ textAlign: "start" }}>
                <div style={{ margin: "5px 15px 15px 15px" }}>
                  <h6
                    style={{
                      color: "rgba(4, 32, 48, 1)",
                      display: "flex",
                      lineHeight: "25px",
                    }}
                  >
                    تم اضافة اصدارات جديدة من الكتب
                  </h6>
                  <p
                    style={{
                      color: "rgba(122, 128, 138, 1)",
                      display: "flex",
                      fontSize: "15px",
                    }}
                  >
                    30/11/2023-09:30PM
                  </p>
                </div>
              </Col>
            </div>
          </Col>

          <Col
            sm="12"
            className="d-flex justify-content-center align-items-center"
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 1)",
                width: "65%",
                boxShadow: "0px 0px 42px 0px rgba(3, 20, 37, 0.05)",
                border: "2px solid rgba(238, 238, 238, 1)",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center m-2">
                <h5>
                  {" "}
                  <img src={bellIcon} style={{marginLeft: "5px" }} />
                  الادمن
                </h5>

                <img src={delIcon}
                  style={{
                    paddingLeft: "10px",
 
                  }}
                />
              </div>

              <Col sm="8" style={{ textAlign: "start" }}>
                <div style={{ margin: "5px 15px 15px 15px" }}>
                  <h6
                    style={{
                      color: "rgba(4, 32, 48, 1)",
                      display: "flex",
                      lineHeight: "25px",
                    }}
                  >
                    {" "}
                    تم الانتهاء من تحميل المقطع الصوتي{" "}
                  </h6>
                  <p
                    style={{
                      color: "rgba(122, 128, 138, 1)",
                      display: "flex",
                      fontSize: "15px",
                    }}
                  >
                    30/11/2023-09:30PM
                  </p>
                </div>
              </Col>
            </div>
          </Col>

          <Col
            sm="12"
            className="d-flex justify-content-center align-items-center"
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 1)",
                width: "65%",
                boxShadow: "0px 0px 42px 0px rgba(3, 20, 37, 0.05)",
                border: "2px solid rgba(238, 238, 238, 1)",
                borderRadius: "8px",
                marginBottom: "20px", 
              }}
            >
              <div className="d-flex justify-content-between align-items-center m-2">
                <h5>
                  {" "}
                  <img src={bellIcon} style={{marginLeft: "5px" }} />
                  الادمن
                </h5>

                <img src={delIcon}
                  style={{
                    paddingLeft: "10px",
 
                  }}
                />
              </div>

              <Col sm="8" style={{ textAlign: "start" }}>
                <div style={{ margin: "5px 15px 15px 15px" }}>
                  <div>
                    <h6
                      style={{
                        color: "rgba(4, 32, 48, 1)",
                        display: "flex",
                        lineHeight: "25px",
                      }}
                    >
                      {" "}
                      لوريم إيبسوم طريقة لكتابة النصوص في النشر والتصميم
                      الجرافيكي تستخدم بشكل شائع لتوضيح الشكل المرئي للمستند أو
                      الخط دون الاعتماد على محتوى ذي معنى{" "}
                    </h6>
                  </div>

                  <p
                    style={{
                      color: "rgba(122, 128, 138, 1)",
                      display: "flex",
                      fontSize: "15px",
                    }}
                  >
                    30/11/2023-09:30PM
                  </p>
                </div>
              </Col>
            </div>
          </Col>

          <Col
            sm="12"
            className="d-flex justify-content-center align-items-center"
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 1)",
                width: "65%",
                boxShadow: "0px 0px 42px 0px rgba(3, 20, 37, 0.05)",
                border: "2px solid rgba(238, 238, 238, 1)",
                borderRadius: "8px",
                marginBottom: "60px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center m-2">
                <h5>
                  {" "}
                  <img src={bellIcon} style={{marginLeft: "5px" }} />
                  الادمن
                </h5>

                <img src={delIcon}
                  style={{
                    paddingLeft: "10px",
 
                  }}
                />
              </div>

              <Col sm="8" style={{ textAlign: "start" }}>
                <div style={{ margin: "5px 15px 15px 15px" }}>
                  <div style={{ display: "flex" }}>
                    <h6
                      style={{
                        color: "rgba(4, 32, 48, 1)",
                        display: "flex",
                        lineHeight: "25px",
                      }}
                    >
                      {" "}
                      لوريم إيبسوم طريقة لكتابة النصوص في النشر والتصميم
                      الجرافيكي تستخدم بشكل شائع لتوضيح الشكل{" "}
                    </h6>
                  </div>

                  <p
                    style={{
                      color: "rgba(122, 128, 138, 1)",
                      display: "flex",
                      fontSize: "15px",
                    }}
                  >
                    30/11/2023-09:30PM
                  </p>
                  <img
                    src={picNotifcation}
                    alt=""
                    style={{ display: "flex", maxWidth: "100%" }}
                  />
                </div>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default NotificationPage;