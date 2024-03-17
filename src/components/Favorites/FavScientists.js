import React, { useEffect } from "react";
import NavBar from "../Navbar/NavBar";
import { Col, Container, Row,Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import favredicon from "../../images/redfav.svg";
import heart1 from "../../images/redhearticon.png";
import { getAllEldersFavorite, removeOneElderFav } from "../../features/allFavorites/allFavoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IoIosHeart } from "react-icons/io";
import audioIcon from "../../images/audio.svg"; 
import nodata from "../../images/nodata.svg";
import { useTranslation } from "react-i18next";

const FavScientists = () => {
  const token = Cookies.get("token");
  const { t } = useTranslation('favaudio');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = useSelector((state) => state.favorite.allEldersFavorite);

  const isLoading = useSelector((state) => state.favorite.isLoading);
  const error = useSelector((state) => state.favorite.error);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(getAllEldersFavorite(token));
    }
  }, [token, navigate, dispatch]);
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

  const removeData = useSelector((state) => state.favorite.delElder);

  const removeDataById=(id)=>{
    removeOneElderFav({token,id})
  }

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
            md="3"
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
                  "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
              }}
            >
              <Link to="/favScientists" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "#FFFFFF",
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
            md="3"
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
            md="3"
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
            md="3"
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

      <div class="container fluid text-center">
        <div
          class="row row-cols-2 row-cols-lg-4  g-lg-4 "
          style={{ width: "100%" }}
        >
          {/* <div class="col">
            <div>
              <Link to="/audioCardfav" style={{ textDecoration: "none" }}>
                <img src={img1} alt="" />
              </Link>
              <div
                style={{
                  position: "absolute",
                  marginTop: "-40px",
                  marginRight: "90px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <img src={heart1} alt="" />
              </div>

              <h5>محمد صالح المنجد</h5>
              <p style={{ marginTop: "-5px" }}>20 مقطع صوتي</p>
            </div>
          </div> */}

          {
           !isLoading ?(
            getData && getData.length >0 ? (
            <>
              {getData.map((item, index) => (
                <div class="col">
            <div >
              <Link to="/audioCardfav" style={{ textDecoration: "none" }}>
                <img className="img-card-scien" src={item.image} alt=""  style={{width:'230px', height:'180px', borderRadius:'8px'}}/>
              </Link>
              <div
                style={{
                  display: "flex",
                  marginTop: "-43px",
                 justifyContent:'center',
                 textAlign:'center',
                 alignItems:'center'
                 
                  
                }}
              >
               <img src={favredicon}
               onClick={()=>removeDataById(item.id)}
alt=""
                  style={{
                    
                   
                    cursor: "pointer"
                  
                    ,padding:'5px'
                  }} />
              </div>

              <h5 style={{marginTop:'15px'}}>  {item.name}</h5>
              <p style={{ marginTop: "-5px", color:'#828282' }}>  <img src={audioIcon} alt=""/>  {item.count_audios}                   {t('audios')}{" "} </p>
            </div>
          </div>
            ))}
            </>
          ) :<div style={{height:'280px'}}><img src={nodata} alt=""/> <br/>
          <span style={{fontWeight:'700'}}>لا توجد عناصر بعد</span><br/>
          <span>لا توجد بيانات على هذه الصفحة حتى الآن</span></div>
        
          ) :     <div style={{height:'280px'}}>  <Spinner animation="border" variant="primary" /></div>
        }
    

        </div>
      </div>
    </>
  );
};
export default FavScientists;