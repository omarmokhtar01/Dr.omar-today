import React, { useEffect, useState } from "react";
import "./fav.css";
import NavBar from "../Navbar/NavBar";
import { Col, Container, Row,Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import img1 from "../../images/img1.png";
import heart1 from "../../images/redhearticon.png";
import bookSort from "../../images/book-sort.png";
import bookSort1 from "../../images/book-sort1.png";
import bookSort2 from "../../images/book-sort2.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBooksFavorite, removeOneBookFav } from "../../features/allFavorites/allFavoritesSlice";
import Cookies from "js-cookie";
import { IoIosHeart } from "react-icons/io";
import favredicon from "../../images/redfav.svg";
import nodata from "../../images/nodata.svg";
import { useTranslation } from "react-i18next";
import fav2Icon from "../../images/fav2.svg";
import favrediconwith from "../../images/favredWith.svg";
import notify from "../UseNotifications/useNotification";
import { addToFavBook } from "../../features/books/booksSlice";
const FavBook = () => {
  const token = Cookies.get("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = useSelector((state) => state.favorite.allBooksFavorite);

  const isLoading = useSelector((state) => state.favorite.isLoading);
  const error = useSelector((state) => state.favorite.error);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(getBooksFavorite(token));
    }
  }, [token, navigate, dispatch]);
  console.log(getData);
  console.log(getData.message);
  const { t } = useTranslation('favaudio');

  useEffect(() => {
    if (isLoading === false) {
      if (getData) {
        console.log(getData);
        if (getData.message === "Request failed with status code 401") {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      }
    }
  }, [isLoading]);
  const favIconNot = fav2Icon; // Path to the normal icon
  const favRedIcon = favrediconwith; // Path to the red/favorite icon
  
  
  
   const [isFav, setIsFav] = useState(true); // State to track favorite status

  const checkAddToFavBook = useSelector((state) => state.books.favBook);
  const isLoadingFavBook = useSelector((state) => state.books.isLoadingBook);
  const [favorites, setFavorites] = useState([]);

  const handelAddtoFavBook = (bookId) => {
    const formData = {
      book_id: bookId, // Replace 'your_audio_id_here' with the actual audio ID value
        // other formData properties if any
    };
    if (!token) {
      // Token exists, perform the download action
      // Add your download logic here
      return notify(t('loginRequired'), "error");
    }

    dispatch(addToFavBook({ formData, token }))
    localStorage.setItem("bookfav","تم حفظ  الكتاب بنجاح")
    if (!favorites.includes(bookId)) {
      setFavorites([...favorites, bookId]);
    }
  //   notify(t('addToFavoritesSuccess'), "success");

  //   setTimeout(() => {

  //   navigate("/favBook")
  // }, 1000);






        }

        useEffect(() => {
          if (isLoadingFavBook === false) {
            if(checkAddToFavBook && checkAddToFavBook.success) {
          if (checkAddToFavBook.message === "The Book has been added to your favorites") {
            // Notify "تم الاضافة بنجاح"
            setIsFav(true); // Toggle favorite status
      
            // notify(t('addToFavoritesSuccess'), "success");
          } else if (checkAddToFavBook.message === "The Book has been removed from your favorites") {
            setIsFav(false); // Toggle favorite status
      
            // Handle other statuses or errors if needed
            // notify(t('addToFavoritesError'), "error");
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
                {t('favourite')}{" "}
              </h1>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="d-flex justify-content-center align-items-center">
        <Row className="m-3 justify-content-center align-items-center">
          <Col
            xs="6"
            md="4"
            lg="3"
            style={{
              textAlign: "center",
              marginBottom: "10px",
              paddingLeft: "70px",
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
              <Link to="/favScientists" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "rgba(5, 20, 39, 1)",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  {t('elder')}{" "}
                </h6>
              </Link>
            </div>
          </Col>

          <Col
            xs="6"
            md="4"
            lg="3"
            style={{ textAlign: "center", marginBottom: "10px" }}
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
              <Link to="/favAudios" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "rgba(5, 20, 39, 1)",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  {t('audios')}{" "}
                </h6>
              </Link>
            </div>
          </Col>

          <Col
            xs="6"
            md="4"
            lg="3"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            <div
              style={{
                border: "1.38px solid rgba(232, 232, 232, 1)",
                borderRadius: "23px",
                width: "124px",
                height: "33.74px",
                background:
                  "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
              }}
            >
              <Link to="/favBook" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "#FFFFFF",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  {t('books')}{" "}
                </h6>
              </Link>
            </div>
          </Col>

          {/* <Col
            xs="6"
            md="4"
            lg="2"
            style={{ textAlign: "center", marginBottom: "10px" }}
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
              <Link to="/favArtivles" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "rgba(5, 20, 39, 1)",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  مقالات{" "}
                </h6>
              </Link>
            </div>
          </Col> */}

          <Col
            xs="6"
            md="4"
            lg="3"
            style={{ textAlign: "center", marginBottom: "10px" }}
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
              <Link to="/favpictures" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "rgba(5, 20, 39, 1)",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  {t('photos')}{" "}
                </h6>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>

      <div class="container text-center">
        <div
          class="row row-cols-3 row-cols-lg-5  g-lg-3  row-section"
          style={{ width: "100%" }}
        >
       
          

          
       {
          !isLoading ?(
            getData && getData.length >0 ? (
            <>
              {getData.map((item, index) => (
                <div class="col section-col ">
              <div
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
              ></div>
            <div>
            <Link to={`/book/${item.id}`} style={{textDecoration:'none',color:"black"}}>

              <img src={item.image} alt="" height='247px' width='169' style={{borderRadius:'15px'}}/>
              </Link>

              <div
                style={{
                  position: "absolute",
                  marginTop: "-240px",
                  marginRight: "40px",
                  display: "flex",
                  gap: "10px",

                }}
              >
                <img src={favorites.includes(item.id) ? (isFav ? favRedIcon : favIconNot) : favRedIcon}
                              onClick={()=>handelAddtoFavBook(item.id)}

alt=""
                  style={{
                  
                    cursor: "pointer",
                  
                    padding:'5px'
                  }}
                />
              </div>

              <h5> {item.name} </h5>
              {/* <p style={{ marginTop: "-5px" }}>20 صفحه </p> */}
            </div>



          </div>
              ))}
              </>
            ) : <div style={{height:'280px'}}><img src={nodata}/> <br/>
            <span style={{fontWeight:'700'}}>لا توجد عناصر بعد</span><br/>
            <span>لا توجد بيانات على هذه الصفحة حتى الآن</span></div>
          
            ) :     <div style={{height:'280px'}}>  <Spinner animation="border" variant="primary" /></div>
          }
      
{/* 
          <div class="col section-col ">
            <div>
              <img src={bookSort2} alt="" />
              <div
                style={{
                  position: "absolute",
                  marginTop: "-240px",
                  marginRight: "40px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <img src={heart1} alt="" />
              </div>

              <h5> عبقريه عمر </h5>
              <p style={{ marginTop: "-5px" }}>20 صفحه </p>
            </div>
          </div>

          <div class="col section-col">
            <div>
              <img src={bookSort1} alt="" />
              <div
                style={{
                  position: "absolute",
                  marginTop: "-240px",
                  marginRight: "40px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <img src={heart1} alt="" />
              </div>

              <h5> عبقريه عمر </h5>
              <p style={{ marginTop: "-5px" }}>20 صفحه </p>
            </div>
          </div>

          <div class="col section-col">
            <div>
              <img src={bookSort} alt="" />
              <div
                style={{
                  position: "absolute",
                  marginTop: "-240px",
                  marginRight: "40px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <img src={heart1} alt="" />
              </div>

              <h5> عبقريه عمر </h5>
              <p style={{ marginTop: "-5px" }}>20 صفحه </p>
            </div>
          </div>

          <div class="col section-col">
            <div>
              <img src={bookSort1} alt="" />
              <div
                style={{
                  position: "absolute",
                  marginTop: "-240px",
                  marginRight: "40px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <img src={heart1} alt="" />
              </div>

              <h5> عبقريه عمر </h5>
              <p style={{ marginTop: "-5px" }}>20 صفحه </p>
            </div>
          </div>

          <div class="col section-col">
            <div>
              <img src={bookSort2} alt="" />
              <div
                style={{
                  position: "absolute",
                  marginTop: "-240px",
                  marginRight: "40px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <img src={heart1} alt="" />
              </div>

              <h5> حياه محمد </h5>
              <p style={{ marginTop: "-5px" }}>20 صفحه </p>
            </div>
          </div>

          <div class="col section-col">
            <div>
              <img src={bookSort} alt="" />
              <div
                style={{
                  position: "absolute",
                  marginTop: "-240px",
                  marginRight: "40px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <img src={heart1} alt="" />
              </div>

              <h5> حياه محمد </h5>
              <p style={{ marginTop: "-5px" }}>20 صفحه </p>
            </div>
          </div>

          <div class="col section-col">
            <div>
              <img src={bookSort1} alt="" />
              <div
                style={{
                  position: "absolute",
                  marginTop: "-240px",
                  marginRight: "40px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <img src={heart1} alt="" />
              </div>

              <h5> حياه محمد </h5>
              <p style={{ marginTop: "-5px" }}>20 صفحه </p>
            </div>
          </div>

          <div class="col section-col">
            <div>
              <img src={bookSort2} alt="" />
              <div
                style={{
                  position: "absolute",
                  marginTop: "-240px",
                  marginRight: "40px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <img src={heart1} alt="" />
              </div>

              <h5> حياه محمد </h5>
              <p style={{ marginTop: "-5px" }}>20 صفحه </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default FavBook;