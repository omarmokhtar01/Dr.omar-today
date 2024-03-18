import React, { useEffect, useState } from "react";
import "./profile.css";
import NavBar from "../Navbar/NavBar";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {  changePasswordUser } from "../../features/auth/authSlice";
import notify from "../UseNotifications/useNotification";
import { useTranslation } from "react-i18next";






const UserPassword = () => {
  const { t } = useTranslation('changepass');

  let token = Cookies.get("token");

  const dispatch = useDispatch();

  // const [state, setState] = useState({
  //   current_password: "",
  //   new_password: "",
  //   new_password_confirmation: "",   
  // });           
  
  // // Destructure state object for easier access
  // const { current_password, new_password,new_password_confirmation } = state;
  
  // // Function to handle input changes
  // const handleInputChange = (fieldName) => (e) => {
  //   setState((prevState) => ({ ...prevState, [fieldName]: e.target.value }));
  // };

  






  // const [formData, setFormData] = useState({
  //   current_password: '',
  //   new_password: '',
  //   new_password_confirmation: '',
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };





  const res = useSelector((state) => state.auth.changeUserPassword);

  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);


   const [currentPassState, setCurrentPassState] = useState("");
   const [newPassState, setNewPassState] = useState("");
   const [confirmPassState, setConfirmPassState] = useState("");
   
   const handleChangeCurrent = (e) => {
     setCurrentPassState(e.target.value);
   };
   
   const handleChangeNew = (e) => {
     setNewPassState(e.target.value);
   };
   
   const handleChangeConfirm = (e) => {
     setConfirmPassState(e.target.value);
   };
   
   const handleSubmit = (e) => {
     e.preventDefault();
     const formData = {
       current_password: currentPassState,
       new_password: newPassState,
       new_password_confirmation: confirmPassState
     };
     dispatch(changePasswordUser({ formData, token }));
   };
   const navigate = useNavigate();

   useEffect(() => {
    if (isLoading === false) {
      if (res) {

        if (res.message === "Password changed successfully.") {
          notify(t('sucChange'), "success");
          Cookies.remove("token");
          setTimeout(() => {
            navigate("/");
          }, 1500);
          
        }else if (res.message === "Current password is incorrect."){
          notify(t("inCorrentChange"), "error");

        }else if (res.message === "The new password field must be at least 8 characters."){
          notify(t("warnningPass"), "error");

        }

     
      }
    }
  }, [isLoading]);

  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(changePasswordUser({ 
  //     current_password: '',
  //        new_password: '',
  //       new_password_confirmation: '',
      
  //      token }));
  // };


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
                 {t("profile")}{" "}
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
                   {t("basicData")}
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
                 {t("password")}{" "}
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
                <Form.Group className="mb-3" controlId="currentPassword">
                  <Form.Label style={{ fontWeight: "600", display: "flex" }}>
                  {t("currentPassword")}{" "}
                  </Form.Label>

                  <Form.Control
  value={currentPassState} // Use state variable here
  onChange={(e) => handleChangeCurrent(e)} // Pass the event object to handleChangeCurrent
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
                  {t("newPassword")}{" "}
                  </Form.Label>

                  <Form.Control
                   onChange={(e)=>handleChangeNew(e)}
                   value={newPassState}
                   
                
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
                  {t("confirmPassword")}  {" "}
                  </Form.Label>

                  <Form.Control
                     onChange={(e)=>handleChangeConfirm(e)}
                     value={confirmPassState}
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
                  <button   onClick={handleSubmit}
                    style={{
                      color: " rgba(255, 255, 255, 1)",
                      fontWeight: "700",
                      fontSize: "25px",
                      border: "none",
                    }}
                    className="profileButton"
                  >
                    {t("save")}
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