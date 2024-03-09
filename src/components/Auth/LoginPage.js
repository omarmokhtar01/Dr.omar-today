import React, { useState, useEffect } from "react";
import "./Auth.css";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import facebook from "../../images/face.png";
import gmail from "../../images/gamil.png";
import apple from "../../images/apple.png";
import ForgetPasswordPage from "./ForgetPasswordPage";
import RegisterPage from "./RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { createLoginUser } from "../../features/auth/authSlice";
import { MdOutlineMail } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import notify from "../UseNotifications/useNotification";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  // Destructure state object for easier access
  const { email, password } = state;

  // Function to handle input changes
  const handleInputChange = (fieldName) => (e) => {
    setState((prevState) => ({ ...prevState, [fieldName]: e.target.value }));
  };
  const res = useSelector((state) => state.auth.userLogin);

  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  console.log(res);
  //  console.log(res.data.token)
  if (res && res.data) {
    console.log(res.data.token);
  }
  console.log(res.message);
  console.log(res.success);

  //save data
  const OnSubmit = async (e) => {
    e.preventDefault();
    function isValidEmail(email) {
      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    if (!email.trim()) {
      notify("أيميل المستخدم مطلوب", "error");
    } else if (!isValidEmail(email)) {
      notify("الرجاء إدخال بريد إلكتروني صحيح", "error");
    }

    // Check if password is empty or less than 8 characters long
    if (!password.trim()) {
      notify("باسورد المستخدم مطلوب", "error");
    } else if (password.trim().length < 8) {
      notify("يجب أن يكون طول كلمة المرور على الأقل 8 أحرف", "error");
    }
    await dispatch(
      createLoginUser({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    if (isLoading === false) {
      if (res) {
        console.log(res);

        if (res.data && res.data.token) {
          const expirationTime = 7; // in days
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + expirationTime);
          Cookies.set("token", res.data.token, { expires: expirationDate });
        } else {
          // Remove token and user info if login is not successful
          Cookies.remove("token");
        }
        if (res.message === "register successfully") {
          notify("تم تسجيل الدخول بنجاح", "success");
          setTimeout(() => {
            navigate("/personaLinformation");
          }, 1500);
        }
        if (res.error === "unauthorised") {
          notify("   هناك خطأ في تسجيل الدخول", "error");
        }
      }
    }
  }, [isLoading]);

  //to make modal
  const [show, setShow] = useState(false);
  const [showReg, setShowRwg] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClosee = () => setShowRwg(false);
  const handleShowReg = () => setShowRwg(true);

  return (
    <>
    
      <Container>
        <Row>
          <Col
            className=" d-flex justify-content-center text-center  "
            style={{ padding: "initial" }}
          >
            <div
              style={{
                background: "rgb(237 234 234)",
                borderRadius: "15px",
                padding: "25px",
              }}
            >
              <h4
                style={{ fontWeight: "700", color: "rgba(209, 155, 111, 1)" }}
              >
                {" "}
                تسجيل الدخول{" "}
              </h4>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ fontWeight: "600", display: "flex" }}>
                    {" "}
                    الأيميل
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
                    placeholder=" user@email.com"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "10px",
                      padding: "15px 35px 15px 15px",
                    }}
                    onChange={handleInputChange("email")}
                    value={email}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ fontWeight: "600", display: "flex" }}>
                    {" "}
                    كلمه المرور{" "}
                  </Form.Label>

                  <Form.Control
                    type="password"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "10px",
                      padding: "15px",
                    }}
                    onChange={handleInputChange("password")}
                    value={password}
                  />
                </Form.Group>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "120px",
                  }}
                >
                  <p>
                    {" "}
                    <input
                      style={{ marginLeft: "10px", marginTop: "10px" }}
                      type="checkbox"
                    />
                    تذكرني{" "}
                  </p>
                  <p
                    style={{ color: "rgba(235, 60, 60, 1)", cursor: "pointer" }}
                    onClick={handleShow}
                  >
                    {" "}
                    نسيت كلمة المرور؟{" "}
                  </p>

                  <Modal
                    show={show}
                    onHide={handleClose}
                    style={{ width: "410px", marginLeft: "20px" }}
                  >
                    <ForgetPasswordPage />
                  </Modal>
                </div>

                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ borderRadius: "30px" }}
                >
                  <button
                    onClick={(e) => OnSubmit(e)}
                    style={{
                      color: " rgba(255, 255, 255, 1)",
                      fontWeight: "700",
                      fontSize: "25px",
                      border: "none",
                      paddingTop: "5px",
                    }}
                    className="profileButton"
                  >
                    دخول
                  </button>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  {" "}
                  <p> لا تمتلك حساب ؟ </p>
                  <div>
                    <p
                      style={{
                        color: "rgba(209, 155, 111, 1)",
                        paddingLeft: "4px",
                        cursor: "pointer",
                      }}
                      onClick={handleShowReg}
                    >
                      {" "}
                      قم بإنشاء حساب{" "}
                    </p>
                  </div>
                  <Modal
                    className="card-mod"
                    show={showReg}
                    onHide={handleClosee}
                    style={{ width: "410px", marginLeft: "20px" }}
                  >
                    <RegisterPage />
                  </Modal>
                </div>

                <div>
                  <p>او من خلال</p>
                  <div className="d-flex justify-content-center align-items-center">
                    <a href="https://www.messenger.com/">
                      <img style={{ padding: "10px" }} src={apple} alt="" />
                    </a>
                    <a href=" https://web.whatsapp.com/">
                      <img style={{ padding: "10px" }} src={gmail} alt="" />
                    </a>
                    <a href="https://www.facebook.com/">
                      <img style={{ padding: "10px" }} src={facebook} alt="" />
                    </a>
                  </div>
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
export default LoginPage;
