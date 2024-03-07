import React from "react";
import "./profile.css";
import NavBar from "../Navbar/NavBar";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserPassword = () => {
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
                الملف الشخصي{" "}
              </h1>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="d-flex justify-content-center align-items-center">
        <Row className="m-3 ">
          <Col
            xs="6"
            md="6"
            lg="6"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            <Link to="/personaLinformation" style={{ textDecoration: "none" }}>
              <div
                style={{
                  border: "none",
                  borderRadius: "23px",
                  width: "178px",
                  height: "33.74px",
                  background:
                    "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
                }}
                className="personal-box"
              >
                <h6 style={{ color: "rgba(5, 20, 39, 1)", paddingTop: "4px" }}>
                  البيانات الاساسيه
                </h6>
              </div>
            </Link>
          </Col>

          <Col
            xs="6"
            md="6"
            lg="6"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            <div
              style={{
                border: "none",
                borderRadius: "23px",
                width: "178px",
                height: "33.74px",
                background:
                  "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
              }}
              className="personal-box"
            >
              <h6
                style={{
                  color: "#FFFFFF",
                  fontSize: "15px",
                  paddingTop: "5px",
                }}
              >
                كلمه المرور{" "}
              </h6>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            {" "}
            <div
              style={{
                marginLeft: "-55px",
                marginBottom: "15px",
                borderBottom: "1.5px solid #EEEEEE ",
                width: "100%",
              }}
            ></div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col className=" d-flex justify-content-center text-center ">
            <div style={{ width: "400px" }}>
              <Form style={{ marginBottom: "35px" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ fontWeight: "600", display: "flex" }}>
                    كلمه المرور الحاليه{" "}
                  </Form.Label>

                  <Form.Control
                    type="password"
                    style={{
                      background: "rgba(245, 245, 245, 1)",
                      borderRadius: "10px",
                      padding: "15px",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ fontWeight: "600", display: "flex" }}>
                    كلمه المرور الجديده{" "}
                  </Form.Label>

                  <Form.Control
                    type="password"
                    style={{
                      background: "rgba(245, 245, 245, 1)",
                      borderRadius: "10px",
                      padding: "15px",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ fontWeight: "600", display: "flex" }}>
                    تاكيد كلمه المرور{" "}
                  </Form.Label>

                  <Form.Control
                    type="password"
                    style={{
                      background: "rgba(245, 245, 245, 1)",
                      borderRadius: "10px",
                      padding: "15px",
                    }}
                  />
                </Form.Group>

                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ borderRadius: "30px" }}
                >
                  <button
                    style={{
                      color: " rgba(255, 255, 255, 1)",
                      fontWeight: "700",
                      fontSize: "25px",
                      border: "none",
                    }}
                    className="profileButton"
                  >
                    حفظ
                  </button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default UserPassword;
