import React, { useState } from "react";
import "./profile.css";
import NavBar from "../Navbar/NavBar";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import phone from "../../images/phone.svg";
import email from "../../images/email.svg";
import name from "../../images/name.svg";
import deleteAcc from "../../images/deleteAccount.png";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { delAcc } from "../../features/auth/authSlice";
import Cookies from "js-cookie";
import notify from "../UseNotifications/useNotification";

const PersonalinFormation = () => {
  const [smShow, setSmShow] = useState(false);
  const dispatch = useDispatch()
  let token = Cookies.get("token");

  const delAccount = useSelector(state => state.auth.delAcc);
  const isLoadingAllPictures = useSelector(state => state.auth.isLoading);

  console.log(delAccount);
  const delFunc =()=>{
if(!token){
  return notify("من فضلك قم بتسجيل الدخول اولا", "error");

}
    dispatch(delAcc(token))
    Cookies.remove("token");
    setTimeout(() => {
      window.location.href="/";
  }, 1500);
  notify("تم حذف الحساب بنجاح", "success");

  }
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
        <Row className="m-3">
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
              <h6 style={{ color: "#FFFFFF", paddingTop: "4px" }}>
                البيانات الاساسيه
              </h6>
            </div>
          </Col>

          {/* <Col
            xs="6"
            md="6"
            lg="6"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            <Link to="/personaLPassword" style={{ textDecoration: "none" }}>
              <div
                style={{
                  border: "2px solid rgba(232, 232, 232, 1)",
                  borderRadius: "23px",
                  width: "178px",
                  height: "33.74px",
                  background:
                    "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
                }}
                className="personal-box"
              >
                <h6
                  style={{
                    color: "rgba(5, 20, 39, 1)",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  كلمه المرور{" "}
                </h6>
              </div>
            </Link>
          </Col> */}
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
                    الاسم بالكامل
                  </Form.Label>
                  <img
                    className="icon-input"
                    src={name}
                    alt=""
                    style={{
                      position: "absolute",
                      display: "flex",
                      marginTop: "17px",
                      paddingRight: "9px",
                    }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="محمد خالد"
                    style={{
                      background: "rgba(245, 245, 245, 1)",
                      borderRadius: "10px",
                      padding: "15px 35px 15px 15px",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ fontWeight: "600", display: "flex" }}>
                    رقم الموبيل
                  </Form.Label>

                  <div>
                    <img
                      className="icon-input"
                      src={phone}
                      alt=""
                      style={{
                        position: "absolute",
                        display: "flex",
                        marginTop: "17px",
                        paddingRight: "9px",
                      }}
                    />
                    {/* <button
                      style={{
                        position: "absolute",
                        margin: "13px 100px 13px 13px",
                        borderRadius: "15px",
                        background:
                          "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
                        border: "none",
                        padding: "3px 20px",
                        color: "#FFFFFF",
                      }}
                      className="active-button"
                    >
                      تفعيل
                    </button> */}
                  </div>

                  <Form.Control
                    type="text"
                    placeholder=" 789 456 123"
                    style={{
                      background: "rgba(245, 245, 245, 1)",
                      borderRadius: "10px",
                      padding: "15px 35px 15px 15px",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ fontWeight: "600", display: "flex" }}>
                    البريد الالكتروني{" "}
                  </Form.Label>
                  <img
                    className="icon-input"
                    src={email}
                    alt=""
                    style={{
                      position: "absolute",
                      display: "flex",
                      marginTop: "20px",
                      paddingRight: "9px",
                    }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="username@mail.com"
                    style={{
                      background: "rgba(245, 245, 245, 1)",
                      borderRadius: "10px",
                      padding: "15px 38px 15px 15px",
                    }}
                  />
                </Form.Group>

                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ borderRadius: "30px" }}
                >
                  <Button
                    style={{
                      color: " rgba(229, 25, 55, 1)",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                    className="deleteButton "
                    onClick={() => setSmShow(true)}
                  >
                    حذف الحساب
                  </Button>
                </div>

                <Modal
                  size="sm"
                  show={smShow}
                  onHide={() => setSmShow(false)}
                  aria-labelledby="example-modal-sizes-title-sm"
                >
                  <Modal.Body
                    style={{
                      backgroundColor: " rgb(237, 234, 234)",
                      borderRadius: "15px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "15px",
                        }}
                      >
                        <div>
                          {" "}
                          <img
                            src={deleteAcc}
                            style={{ paddingBottom: "5px" }}
                            alt=""
                          />
                        </div>

                        <h5 style={{ color: "rgba(255, 53, 53, 1)" }}>
                          {" "}
                          حذف الحساب{" "}
                        </h5>
                        <p
                          style={{
                            color: "rgba(122, 128, 138, 1)",
                            fontSize: "19px",
                            textAlign: "center",
                          }}
                        >
                          يرجى ملاحظة أنه عند حذف الحساب سيتم حذف جميع بياناتك
                        </p>
                      </div>

                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ borderRadius: "30px" }}
                      >
                        <button
                          style={{
                            color: " rgba(255, 255, 255, 1)",
                            fontWeight: "700",
                            fontSize: "20px",
                            paddingTop: "2px",
                            border: "none",
                          }}
                          className="profileButton"
                          onClick={delFunc}
                        >
                          حذف الحساب
                        </button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>

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

export default PersonalinFormation;