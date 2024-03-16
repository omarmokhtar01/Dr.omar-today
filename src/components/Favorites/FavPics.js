import React, { useEffect } from "react";
import { Col, Container, Row,Spinner } from "react-bootstrap";
import heart1 from "../../images/redhearticon.png";
import pic1 from "../../images/pic1.png";
import pic2 from "../../images/pic2.png";
import pic3 from "../../images/pic3.png";
import pic4 from "../../images/pic4.png";
import pic5 from "../../images/pic5.png";
import pic6 from "../../images/pic6.png";
import pic7 from "../../images/pic7.png";
import pic8 from "../../images/pic8.png";
import { Link } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import { getPicturesFavorite } from "../../features/allFavorites/allFavoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IoIosHeart } from "react-icons/io";
import nodata from "../../images/nodata.svg";

import favredicon from "../../images/redfav.svg";
import { useTranslation } from "react-i18next";
const FavPics = () => {
  const token = Cookies.get("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = useSelector((state) => state.favorite.allPicturesFavorite);

  const isLoading = useSelector((state) => state.favorite.isLoading);
  const error = useSelector((state) => state.favorite.error);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(getPicturesFavorite(token));
    }
  }, [token, navigate, dispatch]);
  const { t } = useTranslation('favaudio');

  console.log(getData);
  console.log(getData.message);

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
                  "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
              }}
            >
              <Link to="/favBook" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "rgba(5, 20, 39, 1)",
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
                  "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
              }}
            >
              <Link to="/favpictures" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "#FFFFFF",
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

      <Container>
        <Row
          class="row row-cols-3 row-cols-lg-4 g-2 g-lg-3"
          style={{ margin: "35px" }}
        >
          {/* <Col>
            <img
              src={heart1}
              style={{ position: "absolute", zIndex: "2", margin: "15px" }}
            />
            <img src={pic1} alt="" style={{ marginBottom: "20px" }} />

            <div>
              <img
                src={heart1}
                style={{ position: "absolute", zIndex: "2", margin: "15px" }}
              />
              <img src={pic2} alt="" style={{ marginBottom: "20px" }} />
            </div>
          </Col>       */}

          {          !isLoading ?(
            getData && getData.length >0 ? (
            <>
              {getData.map((item, index) => (
                <Col xl={6} lg={12} md={12} sm={12} xs={12} >
                <img  src={favredicon}
                  style={{
                   position:'absolute',
                    cursor: "pointer",
                    padding:'5px'
                  }}/>
            <img className="img-fav-card"
            src={item.image} alt="" style={{ marginBottom: "20px", borderRadius: '15px', cursor: 'pointer',maxHeight:'350px',maxWidth:'450px' }} />

            {/* <div>
              <img
                src={heart1}
                style={{ position: "absolute", zIndex: "2", margin: "15px" }}
              />
              <img src={pic2} alt="" style={{ marginBottom: "20px" }} />
            </div> */}
                </Col> 
              ))}
              </>
            ) : <div style={{height:'280px'}}><img src={nodata}/> <br/>
            <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
            <span>{t('nodata2')}</span></div>
          
            ) :     <div style={{height:'280px'}}>  <Spinner animation="border" variant="primary" /></div>
          }
          {/* <Col>
            <div>
              <img
                src={heart1}
                style={{ position: "absolute", zIndex: "2", margin: "15px" }}
              />
              <img src={pic3} alt="" style={{ marginBottom: "20px" }} />
            </div>

            <div>
              <img
                src={heart1}
                style={{ position: "absolute", zIndex: "2", margin: "15px" }}
              />
              <img src={pic4} alt="" style={{ marginBottom: "20px" }} />
            </div>
          </Col>

          <Col>
            <div>
              <img
                src={heart1}
                style={{ position: "absolute", zIndex: "2", margin: "15px" }}
              />
              <img src={pic7} alt="" style={{ marginBottom: "20px" }} />
            </div>

            <div>
              <img
                src={heart1}
                style={{ position: "absolute", zIndex: "2", margin: "15px" }}
              />
              <img src={pic8} alt="" style={{ marginBottom: "20px" }} />
            </div>
          </Col> */}
        </Row>
      </Container>
    </>
  );
};
export default FavPics;