import React, { useEffect } from "react";
import NavBar from "../Navbar/NavBar";
import '../Favorites/fav.css'
import nodata from "../../images/nodata.svg";

import { Col, Container, Row,Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import pic1 from "../../images/pic1.png";
import pic2 from "../../images/pic2.png";
import pic3 from "../../images/pic3.png";
import pic4 from "../../images/pic4.png";
import pic5 from "../../images/pic5.png";
import pic6 from "../../images/pic6.png";
import pic7 from "../../images/pic7.png";
import pic8 from "../../images/pic8.png";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./download.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPicturesDownload, removeOneImgDownload } from "../../features/allDownload/allDownloadSlice";
import Cookies from "js-cookie";
import delIcon from "../../images/del.svg";
import { useTranslation } from "react-i18next";
const DownloadPictures = () => {
  const token = Cookies.get("token");
  const { t } = useTranslation('downphoto');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = useSelector((state) => state.download.allPicturesDownload);

  const isLoading = useSelector((state) => state.download.isLoading);
  const error = useSelector((state) => state.articles.error);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(getPicturesDownload(token));
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

  const removeData = useSelector((state) => state.download.delImg);

  const removeDataById=(id)=>{
   dispatch( removeOneImgDownload({token,id}))
    setTimeout(() => {
      window.location.reload();
  
     }, 500);  }


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
                className=" background-image-2"
              >
                {" "}
                {t('downloads')}{" "}
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
              <Link to="/DownloadScientest" style={{ textDecoration: "none" }}>
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
            md="3"
            lg="3"
            style={{
              textAlign: "center",
              marginBottom: "10px",
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
              <Link to="/DownloadAudios" style={{ textDecoration: "none" }}>
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
            style={{
              textAlign: "center",
              marginBottom: "10px",
             
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
              <Link to="/DownloadBook" style={{ textDecoration: "none" }}>
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

          <Col
            xs="6"
            md="3"
            lg="3"
            style={{
              textAlign: "center",
              marginBottom: "10px",
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
              <Link to="/Downloadpictures" style={{ textDecoration: "none" }}>
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
          class="row row-cols-2 row-cols-lg-4 g-2 g-lg-3"
          style={{ margin: "35px" }}
        >
          

          {
                    !isLoading ?(

          getData && getData.length >0 ? (
            <>
              {getData.map((item, index) => (
                <Col  xl={6} lg={12} md={12} sm={12} xs={12} key={item.id}>
            {/* <div style={{position:'absolute' , marginRight:'40px' , display:'flex' , gap:'10px',
                      border:'1px solid #FFFFFF', background:'red', borderRadius:'25px' , marginTop:'10px'}} className='icon-delt' >
                      <RiDeleteBin5Line style={{ fontSize:'35px', color:'red', padding:'5px',position:'absolute' , zIndex:'2' , margin:'15px'}}/>
                    
             </div> */}

            <img src={delIcon}
                           onClick={()=>removeDataById(item.id)}

              style={{
                fontSize: "35px",
                color: "gray",
                padding: "5px",
                position: "absolute",
                zIndex: "2",
                margin: "15px",cursor:'pointer'
               
              }}
            />
            <img className="img-fav-card"
            src={item.image} alt="" style={{ marginBottom: "20px",maxHeight:'350px',maxWidth:'450px', borderRadius:'10px' }} />

   
          </Col>
              ))}
            </>
          ) : <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
          <span>{t('nodata2')}</span></div>
          ) :     <div style={{height:'280px'}}>  <Spinner animation="border" variant="primary" /></div>

        }


          {/* <Col>
            <RiDeleteBin5Line
              style={{
                fontSize: "35px",
                color: "gray",
                padding: "5px",
                position: "absolute",
                zIndex: "2",
                margin: "15px",
                border: "1px solid #FFFFFF",
                borderRadius: "25px",
                background: "#FFFFFF",
              }}
            />
            <img src={pic5} alt="" style={{ marginBottom: "20px" }} />

            <div>
              <RiDeleteBin5Line
                style={{
                  fontSize: "35px",
                  color: "gray",
                  padding: "5px",
                  position: "absolute",
                  zIndex: "2",
                  margin: "15px",
                  border: "1px solid #FFFFFF",
                  borderRadius: "25px",
                  background: "#FFFFFF",
                }}
              />
              <img src={pic6} alt="" style={{ marginBottom: "20px" }} />
            </div>
          </Col>

          <Col>
            <div>
              <RiDeleteBin5Line
                style={{
                  fontSize: "35px",
                  color: "gray",
                  padding: "5px",
                  position: "absolute",
                  zIndex: "2",
                  margin: "15px",
                  border: "1px solid #FFFFFF",
                  borderRadius: "25px",
                  background: "#FFFFFF",
                }}
              />
              <img src={pic3} alt="" style={{ marginBottom: "20px" }} />
            </div>

            <div>
              <RiDeleteBin5Line
                style={{
                  fontSize: "35px",
                  color: "gray",
                  padding: "5px",
                  position: "absolute",
                  zIndex: "2",
                  margin: "15px",
                  border: "1px solid #FFFFFF",
                  borderRadius: "25px",
                  background: "#FFFFFF",
                }}
              />
              <img src={pic4} alt="" style={{ marginBottom: "20px" }} />
            </div>
          </Col> */}

          
        </Row>
      </Container>
    </>
  );
};
export default DownloadPictures;