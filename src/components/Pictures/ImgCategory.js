import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/NavBar";
import "./pic.css";
import { Col, Container, Modal, Row, Spinner } from "react-bootstrap";

import iconM2 from "../../images/iconM-2.png";
import iconM3 from "../../images/iconM-3.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllPicuture } from "../../features/allPictres/allPicturesSlice";
import { Link, useParams } from "react-router-dom";
import { getOneImgCategory } from "../../features/imgCategory/imgCategorySlice";
import { IoHeartCircleSharp } from "react-icons/io5";
import { MdDownloadForOffline, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaShareFromSquare } from "react-icons/fa6";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";

import notify from "../UseNotifications/useNotification";
const heartImg = (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: "60px",
      gap: "20px",
      position: "absolute",
    }}
  >
    <IoHeartCircleSharp
      style={{
        color: "#878787bd",
        fontSize: "30px",
        marginRight: "35px",
        marginTop: "10px",
      }}
    />
  </div>
); // Assuming you have imported heart1

const ImgCategory = () => {
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
  const params = useParams();

  // Now you can access the parameters using the keys defined in your route
  const { id } = params;

  //to make modal
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image

  const handleClose = () => setShow(false);
  const handleShow = (image) => {
    setSelectedImage(image); // Set the selected image
    setShow(true); // Open the modal
  };

  const dispatch = useDispatch();
  const getAllImgData = useSelector((state) => state.imgCategory.allImgsData);
  const isLoadingAllImgCategory = useSelector(
    (state) => state.imgCategory.isLoading
  );
  const errorAllImgCategory = useSelector((state) => state.imgCategory.error);

  const getOneData = useSelector((state) => state.imgCategory.OneImgsData);
  const isLoadingOneImgCategory = useSelector(
    (state) => state.imgCategory.isLoading
  );
  const errorOneImgCategory = useSelector((state) => state.imgCategory.error);

  useEffect(() => {
    dispatch(getAllPicuture());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOneImgCategory(id));
  }, [dispatch, id]);

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
                صور{" "}
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
              to={"/pictures"}
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

          {!isLoadingAllImgCategory ? (
            getAllImgData ? (
              <>
                {getAllImgData.map((img, index) => (
                  <Col
                    key={img.id}
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
                      to={`/pictures/${img.id}`}
                    >
                      <div
                        style={{
                          border: "1.38px solid rgba(232, 232, 232, 1)",
                          borderRadius: "23px",
                          width: "124px",
                          height: "33.74px",
                          background:
                            img.id == id
                              ? "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)"
                              : "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
                        }}
                      >
                        <h6 style={{ marginTop: "5px",color:img.id == id ?"white":'black' }}>{img.title}</h6>
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
      </Container>

      <Container>
        <Row
          className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3"
          style={{ margin: "35px" }}
        >
          {!isLoadingOneImgCategory ? (
            getOneData.length >= 1 ? (
              getOneData.map((imageGroup, index) => (
                <React.Fragment key={index}>
                  {imageGroup.image.map((image, imgIndex) => (
                    <Col key={imgIndex} xl={3} lg={4} md={6} sm={12}>
                      {/* Placeholder for heartImg */}
                      <IoHeartCircleSharp  onClick={handleCheckLogin} style={{ color: '#878787bd', fontSize: '30px', marginRight: '35px', marginTop: '10px' ,cursor:'pointer'}} />
                      <div>
                        <img
                          src={image.image}
                          alt={`pic${index + 1}`}
                          width={250}
                          height={350}
                          style={{ marginBottom: "35px", borderRadius: "15px" }}
                          onClick={() => handleShow(image.image)}
                          id="img-responsive-pic"
                        />
                      </div>
                    </Col>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <div style={{ height: "140px" }}>
                {" "}
                <Spinner animation="border" variant="primary" />
              </div>
            )
          ) : (
            <div style={{ height: "140px" }}>
              {" "}
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </Row>
        <Modal show={show} onHide={handleClose}>
          {/* Display the selected image */}
          <img src={selectedImage} alt="modal" style={{ width: "400px" }} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              {/* Your icons */}
              <FaShareFromSquare style={{ color: '#878787bd', fontSize: '40px', marginTop: '12px', cursor: 'pointer' }} />
          <MdDownloadForOffline style={{ color: 'rgb(219 176 134)', fontSize: '50px', cursor: 'pointer' }} onClick={handleCheckLogin}/>
           <IoHeartCircleSharp style={{ color: '#878787bd', fontSize: '45px', marginTop: '10px', cursor: 'pointer' }}  onClick={handleCheckLogin}/>
            </div>
          </div>
        </Modal>
        <ToastContainer/>
      </Container>
    </>
  );
};
export default ImgCategory;
