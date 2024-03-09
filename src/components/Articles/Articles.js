import React, { useEffect,useState } from "react";
import NavBar from "../Navbar/NavBar";
import {
  Card,
  Col,
  Container,
  Form,
  FormControl,
  NavDropdown,
  Row,
  Spinner,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticleCategory,
  getArticleCategoryById,
  getArticles,
} from "../../features/articles/articlesSlich";
import { IoHeartCircleSharp, IoSearch } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";

import notify from "../UseNotifications/useNotification";
const Articles = () => {
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
  const [id,setId]=useState(null)

  const dispatch = useDispatch();

  const getData = useSelector((state) => state.articles.articles);

  const isLoading = useSelector((state) => state.articles.isLoading);
  const error = useSelector((state) => state.articles.error);

  const getDataCategory = useSelector(
    (state) => state.articles.articleCategory
  );

  const getDataById = useSelector((state) => state.articles.articleCategoryId);

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getArticleCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getArticleCategoryById(id));
  }, [dispatch, id]);
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
                مقالات{" "}
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
            style={{ textAlign: "center", marginBottom: "10px" ,cursor:'pointer'}}
            onClick={()=>setId(null)}
          >
            <div
             style={{
              border: "none",
              borderRadius: "23px",
              width: "124px",
              height: "33.74px",
              background:
                id === null
                  ? "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)"
                  : "linear-gradient(0deg, rgb(232, 232, 232), rgb(232, 232, 232)), linear-gradient(0deg, rgb(245, 245, 245), rgb(245, 245, 245))",
              boxShadow:
              id === null
              ? "0px 3.6861166954040527px 3.6861166954040527px 0px rgba(209, 155, 111, 0.22)": "none"
            }}
            >
  <p style={{color: id === null ? 'white' :  'black', fontWeight: "bold" }}>الكل</p>
            </div>
          </Col>

          {
            getDataCategory ? (
              <>
                {getDataCategory.map((img, index) => (
                  <Col
                    key={index}
                    xs="6"
                    md="4"
                    lg="2"
                    style={{ textAlign: "center", marginBottom: "10px",cursor:'pointer' }}
                    onClick={() => {
                      if (id !== img.id) { 
                        setId(img.id);
                      }
                    }}
                  >

                      <div
                        style={{
                          border: "1.38px solid rgba(232, 232, 232, 1)",
                          borderRadius: "23px",
                          width: "124px",
                          height: "33.74px",
                          background: id === img.id ? 'linear-gradient(331.41deg, rgb(209, 155, 111) 6.78%, rgb(246, 229, 195) 204.87%)' :  "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
                          boxShadow: id === img.id ? "0px 3.6861166954040527px 3.6861166954040527px 0px rgba(209, 155, 111, 0.22)" : 'none'
                        }}
                      >
                         <h6
              style={{
                color: id === img.id ? "white" : "black",
                fontSize: "15px",
                marginTop: "5px",
              }}
            >
              {img.title}
            </h6>
                      </div>
                  </Col>
                ))}
              </>
           
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

              <div style={{ display: "flex", gap: "10px" }}>
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
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
  <Row xs={1} md={2} className="g-4 me-auto mb-5">
    {id == null ? (
      !isLoading ? (
        getData && getData.length > 0 ? (
          <>
            {getData.map((item) => (
              <Col key={item.id}>
                {/* Ensure each mapped element has a unique key */}
                  <IoHeartCircleSharp
                    style={{
                      color: "#878787bd",
                      fontSize: "35px",
                      cursor: "pointer",
                      position: "absolute",
                      zIndex: "2",
                      margin: "10px",
                      display: "flex",
                    }}
                    onClick={handleCheckLogin}
                  />
                <Link
                  to={`/articleCard/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card style={{ width: "100%", borderRadius: "15px" }}>
                    <Card.Img
                      variant="top"
                      src={item.image}
                      width={100}
                      height={300}
                    />
                    <Card.Body>
                      <Card.Title style={{ display: "flex" }}>
                        {item.title}
                      </Card.Title>
                      <Card.Text
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          style={{
                            color: "rgba(130, 130, 130, 1)",
                            fontSize: "14px",
                          }}
                        >
                          <FaClock
                            style={{
                              marginLeft: "8px",
                              color: "rgb(209, 155, 111)",
                              fontSize: "17px",
                            }}
                          />
                          منذ ساعة
                        </p>
                        <p
                          style={{
                            color: "rgba(130, 130, 130, 1)",
                            fontSize: "14px",
                          }}
                        >
                          <IoEye
                            style={{
                              marginLeft: "8px",
                              color: "rgb(209, 155, 111)",
                              fontSize: "20px",
                            }}
                          />
                          23 مشاهدة
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </>
        ) : (
          <div style={{ height: "140px" }}></div>
        )
      ) : (
        <div style={{ height: "140px" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      )
    ) : !isLoading ? (
        getDataById && getDataById.length > 0 ? (
          <>
            {getDataById.map((item) => (
              <Col key={item.id}>
                {/* Ensure each mapped element has a unique key */}
               
                  <IoHeartCircleSharp
                    style={{
                      color: "#878787bd",
                      fontSize: "35px",
                      cursor: "pointer",
                      position: "absolute",
                      zIndex: "2",
                      margin: "10px",
                      display: "flex",
                    }}
                    onClick={handleCheckLogin}
                  />
                
                <Link
                  to={`/articleCard/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card style={{ width: "100%", borderRadius: "15px" }}>
                    <Card.Img
                      variant="top"
                      src={item.image}
                      width={100}
                      height={300}
                    />
                    <Card.Body>
                      <Card.Title style={{ display: "flex" }}>
                        {item.title}
                      </Card.Title>
                      <Card.Text
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          style={{
                            color: "rgba(130, 130, 130, 1)",
                            fontSize: "14px",
                          }}
                        >
                          <FaClock
                            style={{
                              marginLeft: "8px",
                              color: "rgb(209, 155, 111)",
                              fontSize: "17px",
                            }}
                          />
                          منذ ساعة
                        </p>
                        <p
                          style={{
                            color: "rgba(130, 130, 130, 1)",
                            fontSize: "14px",
                          }}
                        >
                          <IoEye
                            style={{
                              marginLeft: "8px",
                              color: "rgb(209, 155, 111)",
                              fontSize: "20px",
                            }}
                          />
                          23 مشاهدة
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </>
        ) : (
          <div style={{ height: "140px" }}></div>
        )
      ) : (
        <div style={{ height: "140px" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      )}
  </Row>
</Container>
<ToastContainer/>
    </>
  );
};
export default Articles;
