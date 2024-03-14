import "./artical.css";

import React, { useEffect } from "react";
import NavBar from "../Navbar/NavBar";
import { Col, Container, Row, Spinner } from "react-bootstrap";

import facebook from "../../images/facebook.svg";
import whats from "../../images/whats.svg";
import messgener from "../../images/messnger.svg";
import instagram from "../../images/instgram.svg";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getArticleCategoryOne } from "../../features/articles/articlesSlich";
import { IoEye, IoHeartCircleSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import clockIcon from "../../images/clock.svg";
import eyeIcon from "../../images/eye.svg";
import notify from "../UseNotifications/useNotification";
import nodata from "../../images/nodata.svg";

const ArticleCard = () => {
  const handleCheckLogin = () => {
    const token = Cookies.get("token");

    if (token) {
      // Token exists, perform the download action
      // Add your download logic here
      notify("تم التحميل", "success");
    } else {
      // Token doesn't exist, notify the user
      notify("من فضلك قم بتسجيل الدخول اولا", "error");
    }
  };
  const params = useParams();

  // Now you can access the parameters using the keys defined in your route
  const { id } = params;

  const dispatch = useDispatch();

  const getDataOne = useSelector((state) => state.articles.oneArticale);

  const isLoading = useSelector((state) => state.articles.isLoading);
  const error = useSelector((state) => state.articles.error);

  useEffect(() => {
    dispatch(getArticleCategoryOne(id));
  }, [dispatch, id]);

  console.log(getDataOne);

  return (
    <>
      <NavBar />

      <Container>
        <Row>
          <Col>
            {!isLoading ? (
              getDataOne ? (
                <img
                  src={getDataOne.image}
                 
                  style={{
                    maxWidth: "95%",
                    position: "relative",
                    maxHeight:'200px',
                    borderRadius:'15px'
                  }}
                  alt="img"
                  id="artical-img"
                />
              ) : null
            ) : null}
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          {!isLoading ? (
            getDataOne ? (
              <Col xs={12} md={8} sm={8}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h4
                    style={{
                      display: "flex",
                      marginRight: "60px",
                      marginTop: "15px",
                      color: "rgba(4, 32, 48, 1)",
                    }}
                  >
                    {getDataOne.title}
                  </h4>

                  <p
                    style={{
                      display: "flex",
                      marginRight: "60px",
                      color: "rgba(130, 130, 130, 1)",
                      fontSize: "14px",
                    }}
                  >
                    <div>
                      {" "}
                      <img src={clockIcon}
                        style={{
                          marginLeft: "8px",
                          color: "rgb(209, 155, 111)",
                          fontSize: "17px",
                        }}
                      />
                    </div>
                    {getDataOne.created_at} 
                                      </p>

                  <p
                    style={{
                      display: "flex",
                      marginRight: "60px",
                      color: "rgba(130, 130, 130, 1)",
                    }}
                  >
                    <div>
                      {" "}
                      <img src={eyeIcon}
                        style={{
                          marginLeft: "8px",
                          color: "rgb(209, 155, 111)",
                          fontSize: "20px",
                        }}
                      />{" "}
                    </div>
                    {getDataOne.visit_count} مشاهدة
                  </p>

                  <p style={{ margin: "5px 35px 35px 50px" }}>
                    {getDataOne.content}
                  </p>
                </div>
              </Col>
            ) : null
          ) : null}
          {!isLoading ? (
            getDataOne ? (
              getDataOne.elder ? (
                <Col xs={12} md={4} sm={4}>
                    {" "}
                    {/* <IoHeartCircleSharp
                      style={{
                        color: "#878787bd",
                        fontSize: "35px",
                        cursor: "pointer",
                        margin: "15px 10px 10px -170px",
                      }}
                      onClick={handleCheckLogin}
                    /> */}
                  
                  <div
                    style={{
                      display: "flex",
                      border: "3px solid rgba(236, 236, 236, 1)",
                      borderRadius: "15px",
                      width: "90%",
                      padding: "10px",
                    }}
                  >
                    <div>
                      <img src={getDataOne.image} width={50} height={50} />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginRight: "15px",
                      }}
                    >
                      <h6 style={{ color: "rgba(130, 130, 130, 1)" }}>
                        المقال بواسطه
                      </h6>
                      <h6 style={{ marginLeft: "-30px" }}>
                        {getDataOne.elder.name}
                      </h6>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      border: "3px solid rgba(236, 236, 236, 1)",
                      borderRadius: "15px",
                      width: "90%",
                      marginTop: "15px",
                      padding: "10px",
                      justifyContent: "space-between",
                      marginBottom: "25px",
                    }}
                  >
                    <h6 className="d-flex justify-content-center align-items-center">
                      مشاركه المقال
                    </h6>

                    <div>
                      <a href="https://www.instagram.com/ ">
                        <img
                          style={{ paddingLeft: "10px" }}
                          src={instagram}
                          alt=""
                        />
                      </a>
                      <a href="https://www.messenger.com/">
                        <img
                          style={{ paddingLeft: "10px" }}
                          src={messgener}
                          alt=""
                        />
                      </a>
                      <a href=" https://web.whatsapp.com/">
                        <img
                          style={{ paddingLeft: "10px" }}
                          src={whats}
                          alt=""
                        />
                      </a>
                      <a href="https://www.facebook.com/">
                        <img
                          style={{ paddingLeft: "10px" }}
                          src={facebook}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </Col>
              ) : (
                <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>لا توجد عناصر بعد</span><br/>
          <span>لا توجد بيانات على هذه الصفحة حتى الآن</span></div>
              )
            ) : (
              <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>لا توجد عناصر بعد</span><br/>
          <span>لا توجد بيانات على هذه الصفحة حتى الآن</span></div>
            )
          ) : (
            <div style={{ height: "280px" }}>
              {" "}
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </Row>
      </Container>
      <ToastContainer/>
    </>
  );
};
export default ArticleCard;