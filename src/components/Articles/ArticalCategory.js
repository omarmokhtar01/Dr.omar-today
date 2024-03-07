import React, { useEffect } from "react";
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
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticleCategory,
  getArticleCategoryById,
} from "../../features/articles/articlesSlich";
import { IoHeartCircleSharp, IoSearch } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import { FaClock } from "react-icons/fa";
import { IoEye } from "react-icons/io5";

const ArticalCategory = () => {
  const params = useParams();

  // Now you can access the parameters using the keys defined in your route
  const { id } = params;
  const dispatch = useDispatch();

  const getData = useSelector((state) => state.articles.articleCategory);

  const isLoading = useSelector((state) => state.articles.isLoading);
  const error = useSelector((state) => state.articles.error);

  const getDataById = useSelector((state) => state.articles.articleCategoryId);

  useEffect(() => {
    dispatch(getArticleCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getArticleCategoryById(id));
  }, [dispatch, id]);

  console.log(getDataById);
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
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            <Link
              style={{
                color: "rgba(5, 20, 39, 1)",
                fontSize: "15px",
                marginTop: "5px",
                textDecoration: "none",
              }}
              to={"/articles"}
            >
              <div
                style={{
                  border: "1.38px solid rgba(232, 232, 232, 1)",
                  borderRadius: "23px",
                  width: "124px",
                  height: "33.74px",
                  background:
                    "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
                }}
              >
                <h6 style={{ marginTop: "5px" }}> الكل </h6>
              </div>
            </Link>
          </Col>
          {!isLoading ? (
            getData ? (
              <>
                {getData.map((artical, index) => (
                  <Col
                    key={artical.id}
                    xs="6"
                    md="4"
                    lg="2"
                    style={{ textAlign: "center", marginBottom: "10px" }}
                  >
                    <Link
                      style={{
                        color: "rgba(5, 20, 39, 1)",
                        fontSize: "15px",
                        marginTop: "5px",
                        textDecoration: "none",
                      }}
                      to={`/articles/${artical.id}`}
                    >
                      <div
                        style={{
                          border: "1.38px solid rgba(232, 232, 232, 1)",
                          borderRadius: "23px",
                          width: "124px",
                          height: "33.74px",
                          background:
                            artical.id === id
                              ? "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)"
                              : "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
                        }}
                      >
                        <h6 style={{ marginTop: "5px" }}>{artical.title}</h6>
                      </div>
                    </Link>
                  </Col>
                ))}
              </>
            ) : null
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
        <Row xs={1} md={2} className="g-4  me-auto mb-5">
          {!isLoading ? (
            getDataById ? (
              <>
                {getDataById.map(
                  (
                    item // Added missing parentheses for map function
                  ) => (
                    <Col key={item.id}>
                      {" "}
                      {/* Ensure each mapped element has a unique key */}
                      <Link to={"/favArtivles"}>
                        {" "}
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
                        />
                      </Link>
                      <Link
                        to={`/articleCard/${item.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Card style={{ width: "100%", borderRadius: "15px" }}>
                          <Card.Img
                            variant="top"
                            height={300}
                            src={item.image}
                          />{" "}
                          {/* Changed src attribute to use item.imgArticle */}
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
                  )
                )}
              </>
            ) : (
              <div style={{ height: "140px" }}></div>
            )
          ) : (
            <div style={{ height: "140px" }}>
              {" "}
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};
export default ArticalCategory;
