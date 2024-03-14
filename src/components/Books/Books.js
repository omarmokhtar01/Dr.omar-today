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
  Spinner,

} from "react-bootstrap";
import nodata from "../../images/nodata.svg";


import { Link,useNavigate } from "react-router-dom";
import squareIcon from "../../images/squares.svg";
import rowaIcon from "../../images/rows.svg";
import group2 from "../../images/Group2.png";
import group22 from "../../images/Group-2-2.png";
import group from "../../images/Group.png";
import searchIcon from "../../images/search.svg";
import favGroundIcon from "../../images/favground.svg";
import arrowsIcon from "../../images/twoArr.svg";
import { IoHeartCircleSharp, IoSearch } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { addToFavBook, getAllBooksCategory, getBookMainCategory, getBookSubCategory, getBooks, searchBooks } from "../../features/books/booksSlice";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";

import notify from "../UseNotifications/useNotification";
const Books = () => {
  const navigate = useNavigate()

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

  //to change icon
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const handleCheckLogin = () => {
    const token = Cookies.get("token");

    if (token) {
      // Token exists, perform the download action
      // Add your download logic here
      notify("تم الاضافة للمفضلة", "success");
    } else {
      // Token doesn't exist, notify the user
      notify("من فضلك قم بتسجيل الدخول اولا", "error");
    }
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
    notify(" تم الأضافة للمفضلة بنجاح", "success");

    setTimeout(() => {

    navigate("/favBook")
  }, 1000);

        }
      //   useEffect(() => {
      //     if (isLoadingFavBook === false) {
      //       if(checkAddToFavBook && checkAddToFavBook.success) {
      //     if (checkAddToFavBook.success === true) {
      //       // Notify "تم الاضافة بنجاح"
      //       notify(" تم الأضافة للمفضلة بنجاح", "success");
      //     } else {
      //       // Handle other statuses or errors if needed
      //       notify("حدث مشكلة في الاضافة", "error");
      //   }
      // }

      // }
      //   }, [isLoadingFavBook,checkAddToFavBook]);


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
            getDataBooksCategory && getDataBooksCategory.length > 0? (
              <>
                {getDataBooksCategory.map((item, index) => (
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
            borderBottom: "1.5px solid #EEEEEE",
            width: "100%",
          }}
        ></div>
        <Row style={{ marginBottom: "30px" }}>
          <Col sm="5" xs="6" md="3" lg="2">
            <div
              id="box-books"
              style={{
                background: "rgba(244, 245, 247, 1)",
                height: "400px",
                borderRadius: "15px",
                marginBottom: "25px",
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
                {/* <p style={{ color: "rgba(122, 128, 138, 1)" }}>مسح الكل</p> */}
              </div>
              {getMainCategory
                ?getMainCategory&& getMainCategory.length > 0&& getMainCategory.map((item, index) => (
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
required
                />
               <img src={searchIcon}   className="img-search" style={{
                    position: "absolute",
                    marginTop: "-30px",
                    marginRight: "70px",
                    fontSize: "25px",
                    color: "#00000082",
                  }} />
              </Form>
              <div style={{ display: "flex", gap: "10px" }}>
              <img style={{
                    marginRight: "5px",
                    position: "absolute",
                    marginTop: "10px",
                    color: "rgb(219, 176, 134)",
                  }} src={arrowsIcon} />

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
                  <img src={squareIcon} alt=""/>
                </Link>

                <Link to="/Books">
                <img src={rowaIcon} alt=""/>
                  {/* {" "}
                  <img
                    src={isClicked ? group2 : group22}
                    width="30px"
                    height="30px"
                    onClick={handleClick}
                  /> */}
                </Link>
              </div>
            </div>
            <Row>
  {searchState !== '' && searchResults.length > 0 ? (
    searchResults.map((item) => (
      <Col xs="12" md="12" lg="6" className="mb-3" key={item.id}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "2px solid rgba(236, 236, 236, 1)",
            borderRadius: "15px",
            width: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link to={`/book/${item.id}`}>
              <div
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
              >
              
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
            </Link>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                padding: "20px",
              }}
            >
              <h5 style={{ color: "black" }}>{item.name}</h5>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "60px",
              gap: "20px",
            }}
          >
            <IoHeartCircleSharp
              style={{
                color: "#878787bd",
                fontSize: "30px",
                marginRight: "-30px",
                cursor: 'pointer'
              }}
              onClick={()=>handelAddtoFavBook(item.id)}
            />
          </div>
        </div>
      </Col>
    ))
  ) : searchResults.length === 0 ? (
    <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>لا توجد عناصر بعد</span><br/>
          <span>لا توجد بيانات على هذه الصفحة حتى الآن</span></div>
  ) : id == null ? (
    !isLoading ? (
      getAll && getAll.length > 0 ? 
      [...getAll].sort(sortFunction).map((item) => (
        <Col
          xs="12"
          md="12"
          lg="6"
          className="mb-3"
          key={item.id}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "2px solid rgba(236, 236, 236, 1)",
              borderRadius: "15px",
              width: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link to={`/book/${item.id}`}>
                <div
                  style={{
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={item.image}
                    alt=""
                    height={164}
                    width={134} style={{borderRadius:'0px 12.32px 12.32px 0px'}}
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
              </Link>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  padding: "20px",
                }}
              >
                <h5 style={{ color: "black" }}>{item.name}</h5>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "60px",
                gap: "20px",
              }}
            >
              <img src={favGroundIcon}
                style={{
                  color: "#878787bd",
                  fontSize: "30px",
                  marginRight: "-30px",
                  cursor: 'pointer'
                }}
              onClick={()=>handelAddtoFavBook(item.id)}
              />
            </div>
          </div>
        </Col>
      ))
      : <div style={{height:'280px'}}><img src={nodata}/> <br/>
      <span style={{fontWeight:'700'}}>لا توجد عناصر بعد</span><br/>
      <span>لا توجد بيانات على هذه الصفحة حتى الآن</span></div>
    ) : (
      <div style={{ height: "280px" }}>
      <Spinner animation="border" variant="primary" />
    </div>
    )
  ) : !isLoading ? (
    searchState !== '' && searchResults.length > 0 ? (
      searchResults.map((item) => (
        <Col xs="12" md="12" lg="6" className="mb-3" key={item.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "2px solid rgba(236, 236, 236, 1)",
              borderRadius: "15px",
              width: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link to={`/book/${item.id}`}>
                <div
                  style={{
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={item.image}
                    alt=""
                    height={164}
                    width={134}
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
              </Link>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  padding: "20px",
                }}
              >
                <h5 style={{ color: "black" }}>{item.name}</h5>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "60px",
                gap: "20px",
              }}
            >
              <img src={favGroundIcon}
                style={{
                 
                  marginRight: "-30px",
                  cursor: 'pointer'
                }}
              onClick={()=>handelAddtoFavBook(item.id)}
              />
            </div>
          </div>
        </Col>
      ))
    ) : (
      booksMainSubCategory &&
      Array.isArray(booksMainSubCategory) &&
      booksMainSubCategory.length > 0 ? (
        [...booksMainSubCategory].sort(sortFunction).map((item) => (
          <Col xs="12" md="12" lg="6" className="mb-3" key={item.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "2px solid rgba(236, 236, 236, 1)",
                borderRadius: "15px",
                width: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link to={`/book/${item.id}`}>
                  <div
                    style={{
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <img src={item.image} alt="" height={164} width={134} style={{borderRadius:'0px 12.32px 12.32px 0px'}} />
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
                </Link>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: "20px",
                  }}
                >
                  <h5 style={{ color: "black" }}>{item.name}</h5>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "60px",
                  gap: "20px",
                }}
              >
                <img src={favGroundIcon}
                  style={{
                    color: "#878787bd",
                    fontSize: "30px",
                    marginRight: "-30px",
                    cursor: 'pointer'
                  }}
                onClick={()=>handelAddtoFavBook(item.id)}
                />
              </div>
            </div>
          </Col>
        ))
      ) : (
        <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>لا توجد عناصر بعد</span><br/>
          <span>لا توجد بيانات على هذه الصفحة حتى الآن</span></div>
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
export default Books;