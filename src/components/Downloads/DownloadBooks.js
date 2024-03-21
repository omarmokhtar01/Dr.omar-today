import React, { useEffect } from "react";
import NavBar from "../Navbar/NavBar";
import { Col, Container, Row,Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import bookSort from "../../images/book-sort.png";
import bookSort1 from "../../images/book-sort1.png";
import bookSort2 from "../../images/book-sort2.png";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./download.css";
import { getBooksDownload, removeOneBookDownload } from "../../features/allDownload/allDownloadSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import delIcon from "../../images/del.svg";
import nodata from "../../images/nodata.svg";
import { useTranslation } from "react-i18next";

const DownloadBooks = () => {
  const token = Cookies.get("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = useSelector((state) => state.download.allBooksDownload);

  const isLoading = useSelector((state) => state.download.isLoading);
  const error = useSelector((state) => state.articles.error);
  const { t } = useTranslation('downbook');

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(getBooksDownload(token));
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

  const removeData = useSelector((state) => state.download.delBook);

  const removeDataById=(id)=>{
    removeOneBookDownload({token,id})
    window.location.reload();
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
          {/* <Col xs="6" md="2" lg="2" style={{ textAlign: 'center', marginBottom: '10px' , paddingLeft:'120px'}}>

  <div style={{border :'1.38px solid rgba(232, 232, 232, 1)' , borderRadius:'23px' , width:'124px' , height:'33.74px' , 
        background:'linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)' }}>

        <Link to='/DownloadScientest' style={{textDecoration:'none'}} >
    <h6 style={{  color:'rgba(5, 20, 39, 1)' , fontSize:'15px', marginTop:'5px'}}> العلماء </h6>
        </Link>
    
    </div>
  </Col> */}

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
                  "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
              }}
            >
              <Link to="/DownloadBook" style={{ textDecoration: "none" }}>
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
      <div
          class="row row-cols-2 row-cols-lg-5  row-cols-xs-1  g-lg-3  row-section"
          style={{ width: "100%" }}
        >
          
          {
          !isLoading ?(

          getData && getData.length > 0 ? (
            <>
              {getData.map((item, index) => (
                <div class="col" key={item.id}>
            <div>
              <img src={item.image} alt="" className="book-download" height='247px' width='169' style={{borderRadius:'15px'}}  />

              <div
                style={{
                  position: "absolute",
                  marginTop: "-240px",
                  marginRight: "40px",
                  display: "flex",
                  gap: "10px",
                 
                }}
              >
                <img src={delIcon}
                               onClick={()=>removeDataById(item.id)}

                  style={{
                    paddingLeft: "10px",cursor:'pointer',
                   
                    
                  }}
                />
              </div>
              {/* <h5 style={{fontWeight:'700'}}>{item.title}</h5> */}
              <h5> {item.name} </h5>
              {/* <p style={{ marginTop: "-5px" , color:'#828282'}}>20 صفحه </p> */}
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
              <img src={bookSort2} alt="" className="book-download" />
              <div
                style={{
                  position: "absolute",
                  marginTop: "-240px",
                  marginRight: "40px",
                  display: "flex",
                  gap: "10px",
                  border: "1px solid #FFFFFF",
                  background: "#FFFFFF",
                  borderRadius: "25px",
                }}
                className="icon-delt"
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

              <h5> حياه محمد </h5>
              <p style={{ marginTop: "-5px" }}>20 صفحه </p>
            </div>
          </div> */}

      
        </div>
      </div>
    </>
  );
};
export default DownloadBooks;