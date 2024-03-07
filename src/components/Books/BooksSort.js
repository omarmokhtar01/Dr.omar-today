import React, { useEffect, useState } from "react";
import "./Book.css";
import NavBar from "../Navbar/NavBar";
import {
  Accordion,
  Col,
  Container,
  Form,
  FormControl,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import group2 from "../../images/Group2.png";
import search from "../../images/search.png";
import group from "../../images/Group.png";
import group1 from "../../images/Group-1-1.png";

import { IoHeartCircleSharp } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import { getBookMainCategory, getBooks } from "../../features/books/booksSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const BooksSort = () => {
  const dispatch = useDispatch();
  const getAll = useSelector((state) => state.books.booksData);
  const isLoading = useSelector((state) => state.books.isLoading);
  const error = useSelector((state) => state.books.error);

  const getMainCategory = useSelector((state) => state.books.booksMainCategory);

  const getSubCategory = useSelector(
    (state) => state.books.booksMainSubCategory
  );

  const dummyData = [
    { category: "كتب اسلامية" },
    { category: "كتب علميه" },
    { category: "قصص وروايات" },
    { category: "أحاديث اسلامية" },
    { category: "كتب اسلامية" },
  ];

  // You can use this dummy data array to map over and generate your JSX elements dynamically

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getBookMainCategory());
  }, [dispatch]);

  //to change icon
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

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
                كتب{" "}
              </h1>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="d-flex justify-content-center align-items-center">
        <Row className="m-3">
          {dummyData.length <= 0 ? (
            <Col
              xs="6"
              md="4"
              lg="2"
              style={{
                textAlign: "center",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  border: "none",
                  borderRadius: "23px",
                  width: "124px",
                  height: "33.74px",
                  background:
                    "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
                  boxShadow:
                    "0px 3.6861166954040527px 3.6861166954040527px 0px rgba(209, 155, 111, 0.22)",
                }}
              >
                <p style={{ color: "#FFFFFF", fontWeight: "bold" }}>الكل</p>
              </div>
            </Col>
          ) : (
            <Col
              xs="6"
              md="4"
              lg="2"
              style={{
                textAlign: "center",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  border: "none",
                  borderRadius: "23px",
                  width: "124px",
                  height: "33.74px",
                  background:
                    "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
                  boxShadow:
                    "0px 3.6861166954040527px 3.6861166954040527px 0px rgba(209, 155, 111, 0.22)",
                }}
              >
                <p style={{ color: "#FFFFFF", fontWeight: "bold" }}>الكل</p>
              </div>
            </Col>
          )}

          {dummyData.map((item) => (
            <Col
              xs="6"
              md="4"
              lg="2"
              style={{
                textAlign: "center",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
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
                <h6
                  style={{
                    color: "rgba(5, 20, 39, 1)",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  {item.category}
                </h6>
              </div>
            </Col>
          ))}
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
          <Col sm="5" xs="6" md="3" lg="2">
            <div
              id="box-books"
              style={{
                background: "rgba(244, 245, 247, 1)",
                height: "400px",
                borderRadius: "15px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "6px",
                }}
              >
                <h4 style={{ color: "rgba(4, 32, 48, 1)", fontWeight: "bold" }}>
                  الفئات
                </h4>
                <p style={{ color: "rgba(122, 128, 138, 1)" }}>مسح الكل</p>
              </div>
              {getMainCategory
                ? getMainCategory.map((item, index) => (
                    <Accordion key={index}>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>{item.title}</Accordion.Header>
                        <Accordion.Body>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {item.sub_categories
                              ? item.sub_categories.map((data, index) => (
                                  <label
                                    className="form-check-label d-flex"
                                    key={index}
                                  >
                                    <input
                                      style={{ margin: "5px" }}
                                      type="checkbox"
                                    />
                                    {data.title}
                                  </label>
                                ))
                              : null}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  ))
                : null}
            </div>
          </Col>
          <Col sm="12" xs="12" md="9" lg="10">
            <div className="d-flex justify-content-between mb-4">
              <Form>
                <FormControl
                  type="search"
                  placeholder="ابحث..."
                  className="me-2 w-100  search-book"
                  aria-label="Search"
                  style={{ borderRadius: "25px" }}
                />
                <img
                  src={search}
                  alt=""
                  className="search-icon"
                  width="20px"
                  height="20px"
                  style={{
                    position: "absolute",
                    marginTop: "-30px",
                    marginRight: "70px",
                  }}
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
                <Link to="/bookSort">
                  <img
                    src={isClicked ? group : group1}
                    width="30px"
                    height="30px"
                    onClick={handleClick}
                  />
                </Link>
                <Link to="/Books">
                  <img src={group2} alt="" width="30px" height="30px" />
                </Link>
              </div>
            </div>
            <Row className="row row-cols-2 row-cols-lg-5 g-lg-2">
              {!isLoading
                ? getAll && getAll.length > 0
                  ? getAll.map((item) => (
                      <Col xs={6} md={4} lg={3} key={item.id}>
                        <div class="p-2">
                          <div
                            className="card-book-sort"
                            style={{
                              border: "1px solid gray",
                              borderRadius: "10px",
                              width: "175px",
                              height: "300px",
                            }}
                          >
                            <div
                              className="card-book-pdf"
                              style={{
                                position: "relative",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                window.open(
                                  `https://docs.google.com/viewer?url=${encodeURIComponent(
                                    item.Book
                                  )}&embedded=true`
                                )
                              }
                            >
                              <img
                                className="card-book-img"
                                src={item.image}
                                alt=""
                                height={246}
                                width={169}
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                                  color: "#fff",
                                  padding: "10px",
                                  borderRadius: "5px",
                                }}
                              >
                                Click to view book
                              </div>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                marginTop: "-238px",
                                marginRight: "25px",
                                display: "flex",
                                gap: "10px",
                              }}
                            >
                              <Link to={"/favBook"}>
                                <IoHeartCircleSharp
                                  style={{ color: "gray", fontSize: "30px" }}
                                />
                              </Link>
                            </div>
                            <h5> {item.name}</h5>
                            <p style={{ marginTop: "-5px" }}>20 صفحه</p>
                          </div>
                        </div>
                      </Col>
                    ))
                  : null
                : null}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default BooksSort;
