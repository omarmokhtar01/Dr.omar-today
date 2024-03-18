import React, { useState, useEffect } from "react";
import "./Auth.css";

import { Col, Container, Form, Modal, Row,Spinner } from "react-bootstrap";
import ForgetPass4 from "./ForgetPass4";
import { Link,useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { ToastContainer } from "react-toastify";
import notify from "../UseNotifications/useNotification";
import Cookies from "js-cookie";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineMail, MdOutlinePhoneIphone } from "react-icons/md";
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const { t } = useTranslation('register');

  const dispatch = useDispatch();
  //to make modal
  const [showw, setShoww] = useState(false);

  const handleClosee = () => setShoww(false);
  const handleShoww = () => setShoww(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
    confirm_password: "",
  });

  // Destructure state object for easier access
  const { name, email, phonenumber, password, confirm_password } = state;

  // Function to handle input changes
  const handleInputChange = (fieldName) => (e) => {
    setState((prevState) => ({ ...prevState, [fieldName]: e.target.value }));
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return notify(t('nameRequired'), "error");
    } else if (name.trim().length < 2) {
      return notify(t('nameLength'), "error");
    }
    // Check if phonenumber is empty or has incorrect format
    if (!phonenumber.trim()) {
      return notify(t('phoneNumberRequired'), "error");
    } else if (!isValidPhoneNumber(phonenumber)) {
      return notify(t('invalidPhoneNumber'), "error");
    }

    // Check if email is empty or has incorrect format
    if (!email.trim()) {
      return notify(t('emailRequired'), "error");
    } else if (!isValidEmail(email)) {
      return notify(t('invalidEmail'), "error");
    }

    // Check if password is empty or less than 8 characters long
    if (!password.trim()) {
      return notify(t('passwordRequired'), "error");
    } else if (password.trim().length < 8) {
      return notify(t('passwordLength'), "error");
    }

    // Check if confirm_password matches password
    if (confirm_password !== password) {
      return notify(t('confirmPasswordMismatch'), "error");
    }

    // Function to validate email format
    function isValidEmail(email) {
      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    // Function to validate phone number format
    function isValidPhoneNumber(phonenumber) {
      // Regular expression for phone number validation
      const phoneNumberRegex = /^\d{11}$/;
      return phoneNumberRegex.test(phonenumber);
    }

    const formData = {
      name,
      email,
      phonenumber,
      password,
      confirm_password,
    };
    await dispatch(register(formData));
  };

  const res = useSelector((state) => state.auth.userRegister);

  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  console.log(res);
  //  console.log(res.data.token)
  if (res && res.data) {
    console.log(res.data.token);
  }
  console.log(res.message);
  console.log(res.success);

  useEffect(() => {
    if (isLoading === false) {
      if (res) {
        console.log(res);

        if (res.data && res.data.token) {
          const expirationTime = 30; // in days
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + expirationTime);
          Cookies.set("token", res.data.token, { expires: expirationDate });
        } else {
          // Remove token and user info if login is not successful
          Cookies.remove("token");
        }
        if (res.message === "register successfully") {
          notify(t('registerSuss'), "success");
          setTimeout(() => {
              navigate("/");
          }, 1500);
        }
        if (res.message === "The email has already been taken.") {
          notify(t('emailTaken'), "error");
        }
        if (res.message === "The phonenumber has already been taken.") {
          notify(t('numTaken'), "error");
        }
        if (res.message === "The phonenumber has already been taken. (and 1 more error)") {
          notify(t('numAndEmailTaken'), "error");
        }
      }
    }
  }, [isLoading]);
  let lang = localStorage.getItem('lang')
  const containerStyle = { direction: lang === 'ar' ? 'rtl' : 'ltr' };
  return (
    <>
    <Container >
        <Row>
          <Col
            className=" d-flex justify-content-center text-center  "
            style={{ padding: "initial" }}
          >
            <div
              style={{
                background: "rgb(237 234 234)",
                borderRadius: "15px",
                padding: "15px",
                marginTop: "-55px",
              }}
            >
              <>
                {/* <div  onClick={handleShow} >
         <img src={arrowForm}  alt='' style={{display:'flex',cursor:'pointer'}}  /></div> */}
                <Modal.Header closeButton></Modal.Header>
                <Modal
                  show={show}
                  onHide={handleClose}
                  style={{ width: "410px", marginLeft: "20px" }}
                >
                  <LoginPage />
                </Modal>
              </>
              <h4
                style={{ fontWeight: "700", color: "rgba(209, 155, 111, 1)" }}
              >
                {" "}
                {t('signup')}{" "}
              </h4>
              <Form>
                <Form.Group className="mb-1">
                  <Form.Label style={{ fontWeight: "600", display: "flex" }}>
                  {t('fullName')}
                  </Form.Label>
                  <FaRegUser
                    style={{
                      color: "gray",
                      position: "absolute",
                      display: "flex",
                      marginTop: "17px",
                      paddingRight: "9px",
                      fontSize: "25px",
                    }}
                  />
                  <Form.Control
                    onChange={handleInputChange("name")}
                    value={name}
                    type="text"
                    placeholder={t('fullName')}
                    style={{
                      background: "rgba(245, 245, 245, 1)",
                      borderRadius: "10px",
                      padding: "15px 35px 15px 15px",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-1">
                  <Form.Label style={{ fontWeight: "600", display: "flex" }}>
                  {t('mobileNumber')}
                  </Form.Label>
                  <div>
                    <MdOutlinePhoneIphone
                      style={{
                        color: "gray",
                        position: "absolute",
                        display: "flex",
                        marginTop: "12px",
                        paddingRight: "9px",
                        fontSize: "35px",
                      }}
                    />

                    {/* <Button style={{position:'absolute', margin:'13px 60px 13px 13px' , borderRadius:'15px' 
               , background:'linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)' , border:'none', padding:'3px 20px',
               color:'#FFFFFF'}}  onClick={handleShoww}     >تفعيل</Button> */}
                  </div>

                  <Modal
                    show={showw}
                    onHide={handleClosee}
                    style={{ width: "410px" }}
                  >
                    <ForgetPass4 />
                  </Modal>

                  <Form.Control
                    onChange={handleInputChange("phonenumber")}
                    value={phonenumber}
                    type="text"
                    placeholder=" 789 456 123"
                    style={{
                      background: "rgba(245, 245, 245, 1)",
                      borderRadius: "10px",
                      padding: "15px 35px 15px 15px",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-1">
                  <Form.Label style={{ fontWeight: "600", display: "flex" }}>
                  {t('email')} {" "}
                  </Form.Label>
                  <MdOutlineMail
                    style={{
                      color: "gray",
                      position: "absolute",
                      display: "flex",
                      marginTop: "12px",
                      paddingRight: "9px",
                      fontSize: "35px",
                    }}
                  />
                  <Form.Control
                    type="email"
                    onChange={handleInputChange("email")}
                    value={email}
                    placeholder="username@mail.com"
                    style={{
                      background: "rgba(245, 245, 245, 1)",
                      borderRadius: "10px",
                      padding: "15px 38px 15px 15px",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-1">
                  <Form.Label style={{ fontWeight: "600", display: "flex" }}>
                    {" "}
                    {t('password')}{" "}
                  </Form.Label>

                  <Form.Control
                    onChange={handleInputChange("password")}
                    value={password}
                    type="password"
                    style={{
                      background: "rgba(245, 245, 245, 1)",
                      borderRadius: "10px",
                      padding: "15px",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-1">
                  <Form.Label style={{ fontWeight: "600", display: "flex" }}>
                  {t('confirmPassword')}{" "}
                  </Form.Label>

                  <Form.Control
                    type="password"
                    onChange={handleInputChange("confirm_password")}
                    value={confirm_password}
                    style={{
                      background: "rgba(245, 245, 245, 1)",
                      borderRadius: "10px",
                      padding: "15px",
                    }}
                  />
                </Form.Group>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <p>
                    {" "}
                    <input
                      style={{ marginLeft: "10px", marginTop: "10px" }}
                      type="checkbox"
                      checked
                    />
                      {t('agreeTerms')}  {" "}
                  </p>

                  <Link
                    to="/conditionandroles"
                    style={{ textDecoration: "none" }}
                  >
                    <p
                      style={{
                        color: "rgba(209, 155, 111, 1)",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                    >
                      {" "}
                      {t('termsAndConditions')}{" "}
                    </p>
                  </Link>
                </div>

                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ borderRadius: "30px" }}
                >
                  <button
                    onClick={(e) => submitRegister(e)}
                    style={{
                      color: " rgba(255, 255, 255, 1)",
                      fontWeight: "700",
                      fontSize: "25px",
                      border: "none",
                      paddingTop: "5px",
                    }}
                    className="profileButton"
                  >
                    {isLoading ? (
                      <Spinner animation="border" role="status">
                        {" "}
                        {/* Add spinner component here */}{" "}
                      </Spinner>
                    ) : (
                      `${t('register')}`
                    )}
                  </button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
};
export default RegisterPage;
