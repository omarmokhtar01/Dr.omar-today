import React, { useEffect, useState } from 'react';
import NavBar from '../Navbar/NavBar';
import './pic.css' 
import { Button, Col, Container, Modal, Row, Spinner } from 'react-bootstrap';
import modalfav from "../../images/modalfav.svg";
import modaldown from "../../images/modaldown.svg";
import modalshare from "../../images/modalshare.svg";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { downOnePic, favOnePic, getAllPicuture, getAllPicuturePrivate } from '../../features/allPictres/allPicturesSlice';
import { Link,useNavigate } from 'react-router-dom';
import { getAllImgCategory, getOneImgCategory } from '../../features/imgCategory/imgCategorySlice';
import { IoHeartCircleSharp } from 'react-icons/io5';
import { MdDownloadForOffline, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaShare } from "react-icons/fa6";
import { FaShareFromSquare } from "react-icons/fa6";
import { saveAs } from 'file-saver';
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import favGroundIcon from "../../images/favground.svg";
import notify from "../UseNotifications/useNotification";
import { useTranslation } from 'react-i18next';
import nodata from "../../images/nodata.svg";
import fav2Icon from "../../images/fav2.svg";
import favrediconwith from "../../images/favredWith.svg";
const Pictures = () => {
  const { t } = useTranslation('image');

  let token = Cookies.get("token");
  const navigate = useNavigate()

  const handleCheckLogin = () => {
    const token = Cookies.get("token");

    if (token) {
        // Token exists, perform the download action
        // Add your download logic here
        notify("تم التحميل", "success");

    } else {
        // Token doesn't exist, notify the user
        notify(t('loginRequired'), "error");
    }
};
  const [id,setId]=useState(null)
//to make modal
const [show, setShow] = useState(false);
const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image
const [savedId, setSavedId] = useState(null);

console.log(savedId);
const handleClose = () => setShow(false);
const handleShow = (image) => {
  setSelectedImage(image); // Set the selected image
  setShow(true); // Open the modal
}


  const dispatch = useDispatch()
  const getAllPicturesData = useSelector(state => state.pictures.allPicturesData);
  const isLoadingAllPictures = useSelector(state => state.pictures.isLoading);
  const errorAllPictures = useSelector(state => state.pictures.error);
  

const handleDownload = (picId) => {

  const formData = {
    image_id: picId, // Replace 'your_audio_id_here' with the actual audio ID value
      // other formData properties if any
  };
  if (!token) {
    // Token exists, perform the download action
    // Add your download logic here
   return notify(t('loginRequired'), "error");
  }

  dispatch(downOnePic({ formData, token }))
  localStorage.setItem("photodown","تم تحميل  الصورة بنجاح")

  saveAs(selectedImage,'test.jpg');


// console.log(selectedImage);
//   fetch(selectedImage)
//     .then(response => response.blob())
//     .then(blob => {
//       // Create a temporary URL for the blob
//       const url = window.URL.createObjectURL(new Blob([blob]));
      
//       // Create a temporary anchor element
//       const downloadLink = document.createElement('a');
//       downloadLink.href = url;
//       downloadLink.setAttribute('download', 'image');
      
//       // Append the anchor element to the body
//       document.body.appendChild(downloadLink);
      
//       // Trigger a click event on the anchor element
//       downloadLink.click();
      
//       // Clean up: remove the anchor element from the body and revoke the URL
//       downloadLink.remove();
//       window.URL.revokeObjectURL(url);
//     })
//     .catch(error => console.error('Error downloading image:', error));
}
















  const getOneData = useSelector((state) => state.imgCategory.OneImgsData);
  const isLoadingOneImgCategory = useSelector(
    (state) => state.imgCategory.isLoading
  );

  const getAllImgData = useSelector(state => state.imgCategory.allImgsData);
  const isLoadingAllImgCategory = useSelector(state => state.imgCategory.isLoading);
  const errorAllImgCategory = useSelector(state => state.imgCategory.error);
  
console.log(getAllImgData);

  useEffect(() => {
      dispatch(getAllPicuture(token));
      dispatch(getAllImgCategory());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getOneImgCategory(id));
  }, [dispatch, id]);

  const favIconNot = fav2Icon; // Path to the normal icon
  const favRedIcon = favrediconwith; // Path to the red/favorite icon
  
  
  
   const [isFav, setIsFav] = useState(false); // State to track favorite status


  const checkAddToFavPic = useSelector((state) => state.pictures.favPic);
  const isLoadingFavPic = useSelector((state) => state.pictures.isLoadingFavPic);
  const [favorites, setFavorites] = useState([]);
  const handelAddtoFavPic = (picId) => {
    const formData = {
      image_id: picId, // Replace 'your_audio_id_here' with the actual audio ID value
        // other formData properties if any
    };
    if (!token) {
      // Token exists, perform the download action
      // Add your download logic here
     return notify(t('loginRequired'), "error");
    }


    dispatch(favOnePic({ formData, token }))
    navigate("/favpictures")

                // notify(t('addToFavoritesSuccess'), "success");
                if (!favorites.includes(picId)) {
                  setFavorites([...favorites, picId]);
                }
    // setTimeout(() => {

    //   navigate("/favBook")
    // }, 1000);
        }

        useEffect(() => {
          if (isLoadingFavPic === false) {
            if(checkAddToFavPic && checkAddToFavPic.success) {
          if (checkAddToFavPic.message === "The image has been added to your favorites") {
            // Notify "تم الاضافة بنجاح"
            setIsFav(true); // Toggle favorite status
            // notify(t('addToFavoritesSuccess'), "success");
          } else if (checkAddToFavPic.message === "The image has been removed from your favorites") {
            setIsFav(false); // Toggle favorite status

            // Handle other statuses or errors if needed
            // notify(t('addToFavoritesError'), "error");
        }
      }

      }
        }, [isLoadingFavPic,checkAddToFavPic]);

        console.log(checkAddToFavPic);

      //   useEffect(() => {
      //     if (isLoadingFavPic === false) {
      //       if(checkAddToFavPic && checkAddToFavPic.success) {
      //     if (checkAddToFavPic.success === true) {
      //       // Notify "تم الاضافة بنجاح"
      //       notify(" تم الأضافة للمفضلة بنجاح", "success");
      //     } else {
      //       // Handle other statuses or errors if needed
      //       notify("حدث مشكلة في الاضافة", "error");
      //   }
      // }

      // }
      //   }, [isLoadingFavPic,checkAddToFavPic]);
  
      const getAPictureDataPrivate = useSelector((state) => state.pictures.allPicturesDataPrivate);
      const isLoadingPrivate = useSelector((state) => state.pictures.isLoadingPrivate);
      
      useEffect(()=>{
        dispatch(getAllPicuturePrivate())
      },[dispatch])

    return <>
     <NavBar />

    <Container>
        <Row>
            <Col>
             <div style={{position:'relative' , marginTop:'-35px'}}>
               <h1 style={{color: 'rgba(255, 255, 255, 1)' , fontWeight:'500' , paddingBottom :'25px', paddingTop:'15px' , borderRadius:'25px'}} className=" background-image"> {t('photos')}  </h1>
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
                {t('all')}
              </p>
            </div>
          </Col>

          {
          !isLoadingAllImgCategory ? (
          getAllImgData ? (
            <>
              {getAllImgData && getAllImgData.length > 0 &&getAllImgData.map((item, index) => (
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
          ) :  <div style={{height:'280px'}}><span>لا يوجد بيانات</span></div>
          ):null
        
        }
        </Row>
      </Container>


     <Container> 
     <div style={{marginLeft:'-55px', marginBottom: '150px', borderBottom:'1.5px solid #EEEEEE ', width:'100%' }}></div>
     </Container>

     <Container>
  <Row className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3" style={{ margin: '35px' }}>
  { id == null ? (
  !isLoadingAllPictures ? (
    getAllPicturesData.length > 0 ? (
      getAllPicturesData.map((image, index) => (
        <Col key={index} xl={6} lg={6} md={12} sm={12} xs={12} onClick={()=>setSavedId(image.id)}>
          {/* Placeholder for heartImg */}
          <div style={{ position: 'relative', top: '40px', right: '-80px', zIndex: '1' }}>
            {console.log(image)}
            <img src={
                // favorites.includes(item.id) ? 
              (image.is_Favourite ? favRedIcon : favIconNot) 
              // : favIconNot
            } onClick={()=>handelAddtoFavPic(image.id)} style={{ color: '#878787bd', fontSize: '30px', cursor: 'pointer' }} />
          </div>
          {image && image.image && (
            <img
              src={image.image}
              alt={`pic${index + 1}`}
              style={{ marginBottom: '35px', borderRadius: '15px', cursor: 'pointer', maxHeight:'350px', maxWidth:'450px' }}
              onClick={() => handleShow(image.image)}
              id='img-responsive-pic'
            />
          )}
        </Col>
      ))
    ) : (
      <div style={{height:'280px'}}>
        <img src={nodata} alt="No data" /> <br/>
        <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
        <span>{t('nodata2')}</span>
      </div>
    )
  ) : (
    <div style={{ height: '240px' }}> 
      <Spinner animation="border" variant="primary" />
    </div>
  )
) : (
  !isLoadingOneImgCategory ? (
    getOneData && getOneData.length > 0 ? (
      getOneData[0]?.image?.map((image, index) => (
        <Col key={image.id} xl={6} lg={6} md={12} sm={12} xs={12} onClick={()=>setSavedId(image.id)}>

          {/* Placeholder for heartImg */}
          <div style={{ position: 'relative', top: '40px', right: '-70px', zIndex: '1' }}>
            <img src={
                // favorites.includes(item.id) ? 
              (image.is_Favourite ? favRedIcon : favIconNot) 
              // : favIconNot
            } onClick={()=>handelAddtoFavPic(image.id)} style={{ color: '#878787bd', fontSize: '30px', cursor: 'pointer' }} />
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
              onClick={() => handleShow(image.image)}
              id='img-responsive-pic'
            />
          )}
        </Col>
      ))
    ) : (
      <div style={{height:'280px'}}>
        <img src={nodata} alt="No data" /> <br/>
        <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
        <span>{t('nodata2')}</span>
      </div>
    )
  ) : (
    <div style={{ height: '240px' }}>
      <Spinner animation="border" variant="primary" />
    </div>
  )
)}



  </Row>
  <Modal show={show} onHide={handleClose}>
  {/* Display the selected image */}
  <img src={selectedImage} alt="modal" style={{ width: '400px' }} />
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '180px', justifyContent: 'space-between', display: 'flex' }}>
      {/* Your icons */}
      <img src={modalshare} style={{  marginTop: '12px', cursor: 'pointer' }} />
      <img src={modaldown}  style={{  cursor: 'pointer' }} onClick={()=>handleDownload(savedId)} />        
      <img src={favorites.includes(savedId) ? (isFav ? favRedIcon : favIconNot) : favIconNot} style={{ marginTop: '10px', cursor: 'pointer' }} onClick={()=>handelAddtoFavPic(savedId)} />
    </div>
  </div>
</Modal>




<Container >
  <Row>
    <div className="mb-2">المحتوي الخاص</div>
{
  !isLoadingPrivate ? (
    getAPictureDataPrivate && getAPictureDataPrivate.length > 0 ? (
      getAPictureDataPrivate.map((image,index) => (
        <>
        <Col key={image.id} xl={6} lg={6} md={12} sm={12} xs={12} onClick={()=>setSavedId(image.id)}>

{/* Placeholder for heartImg */}
<div style={{ position: 'relative', top: '40px', right: '-70px', zIndex: '1' }}>
  <img src={
                // favorites.includes(item.id) ? 
              (image.is_Favourite ? favRedIcon : favIconNot) 
              // : favIconNot
            } onClick={()=>handelAddtoFavPic(image.id)} style={{ color: '#878787bd', fontSize: '30px', cursor: 'pointer' }} />
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
    onClick={() => handleShow(image.image)}
    id='img-responsive-pic'
  />
)}
</Col>
</>
))
    ) : null
  ) : null
}
</Row>
</Container>
        

        <ToastContainer/>
</Container>

    </>;
}
export default Pictures;