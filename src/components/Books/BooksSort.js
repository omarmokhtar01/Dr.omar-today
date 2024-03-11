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
  Row,Spinner
} from "react-bootstrap";
import { Link } from "react-router-dom";

import group2 from "../../images/Group2.png";
import search from "../../images/search.png";
import group from "../../images/Group.png";
import group1 from "../../images/Group-1-1.png";

import { IoHeartCircleSharp } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import { addToFavBook, getAllBooksCategory, getBookMainCategory, getBookSubCategory, getBooks, searchBooks } from "../../features/books/booksSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";

import notify from "../UseNotifications/useNotification";
const BooksSort = () => {
  const [sortBy, setSortBy] = useState(null); // State to keep track of sorting option

  // Event handler for sorting by latest addition
  const handleSortByLatest = () => {
    setSortBy('latest');
    // Call function to sort articles by latest addition
  };

  // Event handler for sorting alphabetically
  const handleSortAlphabetically = () => {
    setSortBy('alphabetical');
    // Call function to sort articles alphabetically
  };

  // Sort function based on the selected option
  const sortFunction = (a, b) => {
    if (!a.title || !b.title) {
      // Handle cases where either 'a' or 'b' does not have a 'title' property
      return 0; // Or you can prioritize the one with a 'title' property if needed
    }
  
    if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    } else {
      // Add sorting logic for other options, e.g., sorting by latest addition
      return 0; // Placeholder, modify as per your actual logic
    }
  };
  

  const [id,setId]=useState(null)

  const dispatch = useDispatch();
  const getAll = useSelector((state) => state.books.booksData);
  const isLoading = useSelector((state) => state.books.isLoading);
  const error = useSelector((state) => state.books.error);

  const getMainCategory = useSelector((state) => state.books.booksMainCategory);

  const getSubCategory = useSelector(
    (state) => state.books.booksMainSubCategory
  );


  const getDataBooksCategory = useSelector((state) => state.books.allBooksCategory);
  const isLoadingAllBooksCategory = useSelector((state) => state.books.isLoading);
  const errorAllBooksCategory = useSelector((state) => state.books.error);

  const  booksMainSubCategory= useSelector((state) => state.books.booksMainSubCategory);

  // You can use this dummy data array to map over and generate your JSX elements dynamically

  useEffect(() => {
    dispatch(getAllBooksCategory());
  }, [dispatch]);

  // You can use this dummy data array to map over and generate your JSX elements dynamically

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getBookMainCategory());
  }, [dispatch]);

  useEffect(() => {
    if (id !== null) {
      dispatch(getBookSubCategory(id));
    }
  }, [dispatch, id]);

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
  //to change icon
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };


  const [searchState, setSearchState] = useState('');
  const searchListen = useSelector((state) => state.books.searchBooks);
  const isLoadingSearch = useSelector((state) => state.books.isLoadingSearchBooks);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    // Dispatch the thunk action creator when the searchState changes
    dispatch(searchBooks(searchState));
  }, [dispatch, searchState]);

  useEffect(() => {
    // Update searchResults whenever searchListen changes
    setSearchResults(searchListen);
  }, [searchListen]);



  let token = Cookies.get("token");


  const checkAddToFavBook = useSelector((state) => state.books.favBook);
  const isLoadingFavBook = useSelector((state) => state.books.isLoadingBook);

  const handelAddtoFavBook = (bookId) => {
    const formData = {
      book_id: bookId, // Replace 'your_audio_id_here' with the actual audio ID value
        // other formData properties if any
    };
    if (!token) {
      // Token exists, perform the download action
      // Add your download logic here
     return notify("من فضلك قم بتسجيل الدخول اولا", "error");
    }

    dispatch(addToFavBook({ formData, token }))
           
        }
        useEffect(() => {
          if (isLoadingFavBook === false) {
            if(checkAddToFavBook && checkAddToFavBook.success) {
          if (checkAddToFavBook.success === true) {
            // Notify "تم الاضافة بنجاح"
            notify(" تم الأضافة للمفضلة بنجاح", "success");
          } else {
            // Handle other statuses or errors if needed
            notify("حدث مشكلة في الاضافة", "error");
        }
      }

      }
        }, [isLoadingFavBook,checkAddToFavBook]);

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
        <Row className="m-3 d-flex" style={{ justifyContent: "space-between" }}>
        <Col
            xs="6"
            md="4"
            lg="2"
            style={{ textAlign: "center", marginBottom: "10px",cursor:'pointer' }}
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
            getDataBooksCategory ? (
              <>
                {getDataBooksCategory&&getDataBooksCategory.length > 0&&getDataBooksCategory.map((item, index) => (
                  <Col
                  key={item.id}
                  xs="6"
                  md="4"
                  lg="2"
                  style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (id !== item.id) { 
                      setId(item.id);
                    }
                  }}
                >
                  <div
                    style={{
                      border: "1.38px solid rgba(232, 232, 232, 1)",
                      borderRadius: "23px",
                      width: "124px",
                      height: "33.74px",
                      background: id === item.id ? 'linear-gradient(331.41deg, rgb(209, 155, 111) 6.78%, rgb(246, 229, 195) 204.87%)' :  "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)"
                     , boxShadow: id === item.id ?"0px 3.6861166954040527px 3.6861166954040527px 0px rgba(209, 155, 111, 0.22)" :'none'
                    }}
                  >
                    <h6
                      style={{
                        color: id === item.id ? "white":"black",
                        fontSize: "15px",
                        marginTop: "5px",
                      }}
                    >
                      {item.title}
                    </h6>
                  </div>
                </Col>
                ))}
              </>
            ) : null
          }
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
    checked={id === data.id} // Optional: if you want the checkbox to reflect the current selection
    onChange={(event) => {
        if (event.target.checked) {
            setId(data.id);
        } else {
            setId(null);
        }
    }}
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
                  onChange={(e)=>setSearchState(e.target.value)}

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
        <NavDropdown.Item onClick={handleSortByLatest}>
          الأحدث اضافة
        </NavDropdown.Item>
        <NavDropdown.Item onClick={handleSortAlphabetically}>
          الابجدية
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
            {searchState !== '' && searchResults.length > 0 ? (
    searchResults.map((item) => (
      <Col xs={6} md={4} lg={3} key={item.id}>
      <div className="p-2">
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
            
              <IoHeartCircleSharp
                style={{ color: "gray", fontSize: "30px" ,cursor:'pointer' }}
                onClick={()=>handelAddtoFavBook(item.id)}

              />
            
          </div>
          <h5>{item.name}</h5>
          <p style={{ marginTop: "-5px" }}>20 صفحه</p>
        </div>
      </div>
    </Col>
    ))
  ) : searchResults.length === 0 ? (
    <div style={{ textAlign: "center" }}>لا يوجد بيانات</div>
  ) : id == null ? (
    !isLoading ? (
      getAll && getAll.length > 0 ? 
      [...getAll].sort(sortFunction).map((item) => (
        <Col xs={6} md={4} lg={3} key={item.id}>
        <div className="p-2">
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
              
                <IoHeartCircleSharp
                  style={{ color: "gray", fontSize: "30px" ,cursor:'pointer' }}
                                  onClick={()=>handelAddtoFavBook(item.id)}


                />
              
            </div>
            <h5>{item.name}</h5>
            <p style={{ marginTop: "-5px" }}>20 صفحه</p>
          </div>
        </div>
      </Col>
      ))
      :  <div style={{height:'280px'}}><span>لا يوجد بيانات</span></div>
    ) : (
      <div style={{ height: "280px" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    )
  ) : !isLoading ? (
    searchState !== '' && searchResults.length > 0 ? (
      searchResults.map((item) => (
        <Col xs={6} md={4} lg={3} key={item.id}>
          <div className="p-2">
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
                
                  <IoHeartCircleSharp
                    style={{ color: "gray", fontSize: "30px" ,cursor:'pointer' }}
                                    onClick={()=>handelAddtoFavBook(item.id)}


                  />
                
              </div>
              <h5>{item.name}</h5>
              <p style={{ marginTop: "-5px" }}>20 صفحه</p>
            </div>
          </div>
        </Col>
      ))
    ) : (
      booksMainSubCategory &&
      Array.isArray(booksMainSubCategory) &&
      booksMainSubCategory.length > 0 ? (
        [...booksMainSubCategory].sort(sortFunction).map((item) => (
          <Col xs={6} md={4} lg={3} key={item.id}>
          <div className="p-2">
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
                
                  <IoHeartCircleSharp
                    style={{ color: "gray", fontSize: "30px" ,cursor:'pointer' }}
                                    onClick={()=>handelAddtoFavBook(item.id)}


                  />
                
              </div>
              <h5>{item.name}</h5>
              <p style={{ marginTop: "-5px" }}>20 صفحه</p>
            </div>
          </div>
        </Col>
        ))
      ) : (
         <div style={{height:'280px'}}><span>لا يوجد بيانات</span></div>
      )
    )
  ) : (
    <div style={{ height: "280px" }}>
      <Spinner animation="border" variant="primary" />
    </div>
  )}
</Row>

          </Col>
        </Row>
      </Container>
      <ToastContainer/>
    </>
  );
};
export default BooksSort;
