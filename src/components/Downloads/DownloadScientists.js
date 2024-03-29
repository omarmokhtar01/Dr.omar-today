import React, { useEffect } from "react";
import NavBar from "../Navbar/NavBar";
import { Col, Container, Row,Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import img1 from "../../images/img1.png";
import "./download.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getAllEldersDownload, removeOneElderDownload } from "../../features/allDownload/allDownloadSlice";
import { useNavigate } from "react-router-dom";
import audioIcon from "../../images/audio.svg"; 
import deletGroundIcon from "../../images/deletground.svg"; 
import Cookies from "js-cookie";
import nodata from "../../images/nodata.svg";
import { useTranslation } from "react-i18next";

const DownloadScientists = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const dispatch = useDispatch();

  const getData = useSelector((state) => state.download.allEldersDownload);

  const isLoading = useSelector((state) => state.download.isLoading);
  const error = useSelector((state) => state.articles.error);
  const { t } = useTranslation('downseci');

  useEffect(() => {

    if (!token) {
      navigate("/login");
    } else {
      dispatch(getAllEldersDownload(token));
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

  const removeData = useSelector((state) => state.download.delElder);

  const removeDataById=(id)=>{
    dispatch(removeOneElderDownload({token,id}))
    setTimeout(() => {
      window.location.reload();
  
     }, 500);
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
                  "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
              }}
            >
              <Link to="/DownloadScientest" style={{ textDecoration: "none" }}>
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
                  "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
              }}
            >
              <Link to="/Downloadpictures" style={{ textDecoration: "none" }}>
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
        <div class="row row-cols-2 row-cols-lg-4  g-lg-3">

          {/* <div class="col">
            <div>
              <Link to="/audioCardDownload">
                <img src={img1} alt="" className="img-card-download" />
              </Link>

              <div
                style={{
                  position: "absolute",
                  marginTop: "-45px",
                  marginRight: "100px",
                  display: "flex",
                  gap: "10px",
                  border: "1px solid #FFFFFF",
                  background: "#FFFFFF",
                  borderRadius: "25px",
                }}
                className="icon-del"
              >
                <RiDeleteBin5Line
                  style={{
                    paddingLeft: "10px",
                    fontSize: "35px",
                    color: "gray",
                    padding: "5px",
                  }}
                />
              </div>

              <h5>محمد صالح المنجد</h5>
              <p style={{ marginTop: "-5px" }}>20 {t('audioClips')}</p>
            </div>
          </div> */}
     {
               !isLoading ?(

     getData && getData.length > 0 ? (
            <>
              {getData.map((item, index) => (
                 <div class="col" key={item.id}>
            <div>
              {/* <Link to="/audioCardDownload"> */}
                <img src={item.image} alt="" className="img-card-download"  style={{width:'245px', height:'180px', borderRadius:'8px'}}/>
              {/* </Link> */}

              <div
                style={{
                  display: "flex",
                  marginTop: "-43px",
                 justifyContent:'center',
                 textAlign:'center',
                 alignItems:'center',
                }}
               
              >
                <img src={deletGroundIcon}
                               onClick={()=>removeDataById(item.id)}

                  style={{
                    paddingLeft: "10px",cursor: "pointer"
              
                   
                  }}
                />
              </div>

              <h5 style={{marginTop:'15px'}}>{item.name}  </h5>
              <p style={{ marginTop: "-5px", color:'#828282', fontWeight:'400' }}>  <img src={audioIcon} /> {item.count_audios}  {t('audioClips')}</p>
            </div>
          </div>
              ))}
            </>
          ) : <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
          <span>{t('nodata2')}</span></div>
          ) :     <div style={{height:'280px'}}>  <Spinner animation="border" variant="primary" /></div>

          }
          {/* <div class="col">
            <div>
              <img src={img1} alt="" className="img-card-download" />
              <div
                style={{
                  position: "absolute",
                  marginTop: "-45px",
                  marginRight: "100px",
                  display: "flex",
                  gap: "10px",
                  border: "1px solid #FFFFFF",
                  background: "#FFFFFF",
                  borderRadius: "25px",
                }}
                className="icon-del"
              >
                <RiDeleteBin5Line
                  style={{
                    paddingLeft: "10px",
                    fontSize: "35px",
                    color: "gray",
                    padding: "5px",
                  }}
                />
              </div>

              <h5>محمد صالح المنجد</h5>
              <p style={{ marginTop: "-5px" }}>20 {t('audioClips')}</p>
            </div>
          </div>

          <div class="col">
            <div>
              <img src={img1} alt="" className="img-card-download" />

              <div
                style={{
                  position: "absolute",
                  marginTop: "-45px",
                  marginRight: "100px",
                  display: "flex",
                  gap: "10px",
                  border: "1px solid #FFFFFF",
                  background: "#FFFFFF",
                  borderRadius: "25px",
                }}
                className="icon-del"
              >
                <RiDeleteBin5Line
                  style={{
                    paddingLeft: "10px",
                    fontSize: "35px",
                    color: "gray",
                    padding: "5px",
                  }}
                />
              </div>

              <h5>محمد صالح المنجد</h5>
              <p style={{ marginTop: "-5px" }}>20 {t('audioClips')}</p>
            </div>
          </div> */}

    
       
        </div>
      </div>
    </>
  );
};
export default DownloadScientists;