import React, { useEffect, useState } from 'react';
import NavBar from '../Navbar/NavBar';
import './pic.css'
import { Button, Col, Container, Modal, Row, Spinner } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { downOnePic, favOnePic, getAllPicuture } from '../../features/allPictres/allPicturesSlice';
import { Link } from 'react-router-dom';
import { getAllImgCategory, getOneImgCategory } from '../../features/imgCategory/imgCategorySlice';
import { IoHeartCircleSharp } from 'react-icons/io5';
import { MdDownloadForOffline, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaShare } from "react-icons/fa6";
import { FaShareFromSquare } from "react-icons/fa6";
import { saveAs } from 'file-saver';
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";

import notify from "../UseNotifications/useNotification";

const Pictures = () => {
  let token = Cookies.get("token");

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
  const [id,setId]=useState(null)
//to make modal
const [show, setShow] = useState(false);
const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image
const [savedId, setSavedId] = useState(null);


const handleClose = () => setShow(false);
const handleShow = (image) => {
  setSelectedImage(image); // Set the selected image
  setShow(true); // Open the modal
}


  const dispatch = useDispatch()
  const getAllPicturesData = useSelector(state => state.pictures.allPicturesData);
  const isLoadingAllPictures = useSelector(state => state.pictures.isLoading);
  const errorAllPictures = useSelector(state => state.pictures.error);
  
  const getAllImgData = useSelector(state => state.imgCategory.allImgsData);
  const isLoadingAllImgCategory = useSelector(state => state.imgCategory.isLoading);
  const errorAllImgCategory = useSelector(state => state.imgCategory.error);
  

const handleDownload = (picId) => {

  const formData = {
    image_id: picId, // Replace 'your_audio_id_here' with the actual audio ID value
      // other formData properties if any
  };
  if (!token) {
    // Token exists, perform the download action
    // Add your download logic here
   return notify("من فضلك قم بتسجيل الدخول اولا", "error");
  }

  dispatch(downOnePic({ formData, token }))

  fetch(selectedImage)
    .then(response => response.blob())
    .then(blob => {
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(new Blob([blob]));
      
      // Create a temporary anchor element
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.setAttribute('download', 'image');
      
      // Append the anchor element to the body
      document.body.appendChild(downloadLink);
      
      // Trigger a click event on the anchor element
      downloadLink.click();
      
      // Clean up: remove the anchor element from the body and revoke the URL
      downloadLink.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error downloading image:', error));
}


  const getOneData = useSelector((state) => state.imgCategory.OneImgsData);
  const isLoadingOneImgCategory = useSelector(
    (state) => state.imgCategory.isLoading
  );

  useEffect(() => {
      dispatch(getAllPicuture());
      dispatch(getAllImgCategory());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getOneImgCategory(id));
  }, [dispatch, id]);

  const checkAddToFavPic = useSelector((state) => state.pictures.favPic);
  const isLoadingFavPic = useSelector((state) => state.pictures.isLoadingFavPic);

  const handelAddtoFavPic = (picId) => {
    const formData = {
      image_id: picId, // Replace 'your_audio_id_here' with the actual audio ID value
        // other formData properties if any
    };
    if (!token) {
      // Token exists, perform the download action
      // Add your download logic here
     return notify("من فضلك قم بتسجيل الدخول اولا", "error");
    }

    dispatch(favOnePic({ formData, token }))
           
        }

        console.log(savedId);

        useEffect(() => {
          if (isLoadingFavPic === false) {
            if(checkAddToFavPic && checkAddToFavPic.success) {
          if (checkAddToFavPic.success === true) {
            // Notify "تم الاضافة بنجاح"
            notify(" تم الأضافة للمفضلة بنجاح", "success");
          } else {
            // Handle other statuses or errors if needed
            notify("حدث مشكلة في الاضافة", "error");
        }
      }

      }
        }, [isLoadingFavPic,checkAddToFavPic]);
  
    return <>
     <NavBar />

    <Container>
        <Row>
            <Col>
             <div style={{position:'relative' , marginTop:'-35px'}}>
               <h1 style={{color: 'rgba(255, 255, 255, 1)' , fontWeight:'500' , paddingBottom :'25px', paddingTop:'15px' , borderRadius:'25px'}} className=" background-image"> صور  </h1>
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
            style={{
              textAlign: "center",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => setId(null)}
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
                    ? "0px 3.6861166954040527px 3.6861166954040527px 0px rgba(209, 155, 111, 0.22)"
                    : "none",
              }}
            >
              <p
                style={{
                  color: id === null ? "white" : "black",
                  fontWeight: "bold",
                }}
              >
                الكل
              </p>
            </div>
          </Col>

          {getAllImgData ? (
            <>
              {getAllImgData.map((item, index) => (
                <Col
                  key={item.id}
                  xs="6"
                  md="4"
                  lg="2"
                  style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    cursor: "pointer",
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
                      background:
                        id === item.id
                          ? "linear-gradient(331.41deg, rgb(209, 155, 111) 6.78%, rgb(246, 229, 195) 204.87%)"
                          : "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
                      boxShadow:
                        id === item.id
                          ? "0px 3.6861166954040527px 3.6861166954040527px 0px rgba(209, 155, 111, 0.22)"
                          : "none",
                    }}
                  >
                    <h6
                      style={{
                        color: id === item.id ? "white" : "black",
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
          ) : null}
        </Row>
      </Container>


     <Container> 
     <div style={{marginLeft:'-55px', marginBottom: '15px', borderBottom:'1.5px solid #EEEEEE ', width:'100%' }}></div>
     </Container>

     <Container>
  <Row className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3" style={{ margin: '35px' }}>
  { id == null ? (
    !isLoadingAllPictures ? (
      getAllPicturesData.length > 0 ? (
        getAllPicturesData.map((image, index) => (
          <Col key={index} xl={6} lg={6} md={12} sm={12}>
            {/* Placeholder for heartImg */}
            <div style={{ position: 'relative', top: '10px', right: '10px', zIndex: '1' }}>
              <IoHeartCircleSharp onClick={()=>handelAddtoFavPic(image.id)} style={{ color: '#878787bd', fontSize: '30px', cursor: 'pointer' }} />
            </div>
            {image && image.image && (
              <img
                src={image.image}
               
                alt={`pic${index + 1}`}
                style={{ marginBottom: '35px', borderRadius: '15px', cursor: 'pointer',maxHeight:'350px',maxWidth:'450px' }}
                onClick={() => handleShow(image.image)}
                id='img-responsive-pic'
              />
            )}
          </Col>
        ))
      ) : <div style={{ height: '240px' }}></div>
    ) : <div style={{ height: '240px' }}> <Spinner animation="border" variant="primary" /></div>
  ) : (
    !isLoadingOneImgCategory ? (
      getOneData[0]?.image?.map((image, index) => (
        <Col key={image.id} xl={6} lg={6} md={12} sm={12} >
        {/* Placeholder for heartImg */}
          <div style={{ position: 'relative', top: '10px', right: '10px', zIndex: '1' }}>
            <IoHeartCircleSharp onClick={()=>handelAddtoFavPic(image.id)} style={{ color: '#878787bd', fontSize: '30px', cursor: 'pointer' }} />
          </div>
          {image && (
  <img
    src={image.image}
    alt={`pic${index + 1}`}
    style={{
      marginBottom: '35px',
      borderRadius: '15px',
      cursor: 'pointer',
      maxHeight: '350px',
      maxWidth: '450px'
    }}
    onClick={() => {
      handleShow(image.image);
      setSavedId(image.id);
    }}
    id='img-responsive-pic'
  />
)}

        </Col>
      ))
    ) : <div style={{ height: '240px' }}> <Spinner animation="border" variant="primary" /></div>
  )
}


  </Row>
  <Modal show={show} onHide={handleClose}>
  {/* Display the selected image */}
  <img src={selectedImage} alt="modal" style={{ width: '400px' }} />
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '180px', justifyContent: 'space-between', display: 'flex' }}>
      {/* Your icons */}
      <FaShareFromSquare style={{ color: '#878787bd', fontSize: '40px', marginTop: '12px', cursor: 'pointer' }} />
      <MdDownloadForOffline style={{ color: 'rgb(219 176 134)', fontSize: '50px', cursor: 'pointer' }} onClick={()=>handleDownload(savedId)} />        
      <IoHeartCircleSharp style={{ color: '#878787bd', fontSize: '45px', marginTop: '10px', cursor: 'pointer' }} onClick={handleCheckLogin} />
    </div>
  </div>
</Modal>


  <ToastContainer/>
</Container>


    </>;
}
export default Pictures;