import React, { useEffect } from 'react';
import NavBar from '../Navbar/NavBar';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import audioProfile from "../../images/audio-profile.png";
import play from "../../images/play.png";
import heart from "../../images/redheart.png";
import download from "../../images/download.png";
import { getAudiosFavorite } from '../../features/allFavorites/allFavoritesSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const FavAudios = () => {
  const token = Cookies.get('token');

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const getData = useSelector((state) => state.favorite.allAudiosFavorite);

  const isLoading = useSelector((state) => state.favorite.isLoading);
  const error = useSelector((state) => state.favorite.error);


  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
    dispatch(getAudiosFavorite(token));
  }
}, [token, navigate, dispatch]);
  console.log(getData);
  console.log(getData.message);


useEffect(() => {
  if (isLoading === false) {
      if (getData) {
          console.log(getData)
          if (getData.message === "Request failed with status code 401") {
            
              setTimeout(() => {
                  navigate("/")
              }, 1500);
          }
         
      }
  }
}, [isLoading])


    return <>

     <NavBar />

    <Container  >
    <Row>
        <Col>
        <div style={{position:'relative' , marginTop:'-35px'}}>
          <h1 style={{color: 'rgba(255, 255, 255, 1)' , fontWeight:'500' , paddingBottom :'25px', paddingTop:'15px' , borderRadius:'25px'}} className=" background-image"> المفضله  </h1>
        </div>
        </Col>
    </Row>
    </Container>

    <Container className='d-flex justify-content-center align-items-center' >
    <Row className="m-3 justify-content-center align-items-center">
    <Col xs="6" md="4" lg="2" style={{ textAlign: 'center', marginBottom: '10px' , paddingLeft:'70px'}}>

    <div style={{border :'1.38px solid rgba(232, 232, 232, 1)' , borderRadius:'23px' , width:'124px' , height:'33.74px' , 
          background:'linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)' }}>

        <Link to='/favScientists' style={{textDecoration:'none'}}>
      <h6 style={{  color:'rgba(5, 20, 39, 1)' , fontSize:'15px', marginTop:'5px'}}> العلماء </h6>
          </Link>
      </div>
    </Col>

    <Col xs="6" md="4" lg="2" style={{ textAlign: 'center', marginBottom: '10px' }}>
    <div style={{border :'1.38px solid rgba(232, 232, 232, 1)' , borderRadius:'23px' , width:'124px' , height:'33.74px' , 
        background:'linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)' }}>

        <Link to='/favAudios' style={{textDecoration:'none'}}>
        <h6 style={{  color:'#FFFFFF' , fontSize:'15px', marginTop:'5px'}}> صوتيات </h6>
        </Link>
            
        </div>
    </Col>

    <Col xs="6" md="4" lg="2" style={{ textAlign: 'center', marginBottom: '10px' }}>
      <div style={{border :'1.38px solid rgba(232, 232, 232, 1)' , borderRadius:'23px' , width:'124px' , height:'33.74px' , 
          background:'linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)' }}>
          <Link to='/favBook' style={{textDecoration:'none'}}>
          <h6 style={{  color:'rgba(5, 20, 39, 1)' , fontSize:'15px', marginTop:'5px'}}> كتب  </h6>
          </Link>
        </div>
    </Col>

    <Col xs="6" md="4" lg="2" style={{ textAlign: 'center', marginBottom: '10px' }}>
      <div style={{border :'1.38px solid rgba(232, 232, 232, 1)' , borderRadius:'23px' , width:'124px' , height:'33.74px' , 
          background:'linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)' }}>

          <Link to='/favArtivles' style={{textDecoration:'none'}}>
          <h6 style={{  color:'rgba(5, 20, 39, 1)' , fontSize:'15px', marginTop:'5px'}}>    مقالات </h6>
          </Link>
          
      </div>
    </Col>

    <Col xs="6" md="4" lg="2" style={{ textAlign: 'center', marginBottom: '10px' }}>
      <div style={{border :'1.38px solid rgba(232, 232, 232, 1)' , borderRadius:'23px' , width:'124px' , height:'33.74px' , 
          background:'linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)' }}>
          <Link to='/favpictures' style={{textDecoration:'none'}}>
                  <h6 style={{  color:'rgba(5, 20, 39, 1)' , fontSize:'15px', marginTop:'5px'}}>   صور </h6>
                  </Link>
        </div>
    </Col>
    </Row>
    </Container>

    <Container>
       <Row className='me-auto'  md={4}>
        <Col > 
          <div style={{display:'flex'}}>
             <img  src={audioProfile} alt="" style={{}} width='61px' height='61px' />
             <p style={{color:'rgba(17, 32, 34, 1)' , fontWeight:'bold' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px'}}>فضل شهر رمضان</p>
          </div> 
         </Col>
     
        <Col xs={6}><p style={{color:'rgba(130, 130, 130, 1)' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px'}}  >محمد صالح المنجد</p></Col>

        <Col xs={6} > <p style={{color:'rgba(130, 130, 130, 1)' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px' }}  >
        3:40 دقيقة</p>
         </Col>


        <Col>
             <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px' ,  gap:'15px'}}>
                 <img src={download} alt='' />
                 <img src={heart} alt=''/>
                 <img src={play} alt='' width="45px" height="45px"/>
               </div>
          </Col>
       </Row>
        <div style={{marginLeft:'-55px', marginBottom: '15px', borderBottom:'1.5px solid #EEEEEE ', width:'100%' }}></div>

        <Row className='me-auto'  md={4}>
        <Col > 
          <div style={{display:'flex'}}>
          <img  src={audioProfile} alt="" style={{}} width='61px' height='61px' />
          <p style={{color:'rgba(17, 32, 34, 1)' , fontWeight:'bold' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px'}}>فضل شهر رمضان</p>
          </div> 
         </Col>
     
        <Col xs={6}><p style={{color:'rgba(130, 130, 130, 1)' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px'}}  >محمد صالح المنجد</p></Col>

        <Col xs={6} > <p style={{color:'rgba(130, 130, 130, 1)' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px' }}  >
        3:40 دقيقة</p>
         </Col>


        <Col>
        <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px' ,  gap:'15px'}}>
                 <img src={download} alt='' />
                 <img src={heart} alt=''/>
                 <img src={play} alt='' width="45px" height="45px"/>
               </div></Col>
       </Row>
        <div style={{marginLeft:'-55px', marginBottom: '15px', borderBottom:'1.5px solid #EEEEEE ', width:'100%' }}></div>

        <Row className='me-auto'  md={4}>
        <Col > 
          <div style={{display:'flex'}}>
          <img  src={audioProfile} alt="" style={{}} width='61px' height='61px' />
          <p style={{color:'rgba(17, 32, 34, 1)' , fontWeight:'bold' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px'}}>فضل شهر رمضان</p>
          </div> 
         </Col>
     
        <Col xs={6}><p style={{color:'rgba(130, 130, 130, 1)' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px'}}  >محمد صالح المنجد</p></Col>

        <Col xs={6} > <p style={{color:'rgba(130, 130, 130, 1)' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px' }}  >
        3:40 دقيقة</p>
         </Col>


        <Col>
        <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px' ,  gap:'15px'}}>
                 <img src={download} alt='' />
                 <img src={heart} alt=''/>
                 <img src={play} alt='' width="45px" height="45px"/>
               </div>
          </Col>
       </Row>
        <div style={{marginLeft:'-55px', marginBottom: '15px', borderBottom:'1.5px solid #EEEEEE ', width:'100%' }}></div>

        <Row className='me-auto'  md={4}>
        <Col > 
          <div style={{display:'flex'}}>
          <img  src={audioProfile} alt="" style={{}} width='61px' height='61px' />
          <p style={{color:'rgba(17, 32, 34, 1)' , fontWeight:'bold' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px'}}>فضل شهر رمضان</p>
          </div> 
         </Col>
     
        <Col xs={6}><p style={{color:'rgba(130, 130, 130, 1)' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px'}}  >محمد صالح المنجد</p></Col>

        <Col xs={6} > <p style={{color:'rgba(130, 130, 130, 1)' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px' }}  >
        3:40 دقيقة</p>
         </Col>


        <Col>
        <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px' ,  gap:'15px'}}>
                 <img src={download} alt='' />
                 <img src={heart} alt=''/>
                 <img src={play} alt='' width="45px" height="45px"/>
               </div></Col>
       </Row>
        <div style={{marginLeft:'-55px', marginBottom: '15px', borderBottom:'1.5px solid #EEEEEE ', width:'100%' }}></div>

        <Row className='me-auto'  md={4}>
        <Col > 
          <div style={{display:'flex'}}>
          <img  src={audioProfile} alt="" style={{}} width='61px' height='61px' />
          <p style={{color:'rgba(17, 32, 34, 1)' , fontWeight:'bold' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px'}}>فضل شهر رمضان</p>
          </div> 
         </Col>
     
        <Col xs={6}><p style={{color:'rgba(130, 130, 130, 1)' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px'}}  >محمد صالح المنجد</p></Col>

        <Col xs={6} > <p style={{color:'rgba(130, 130, 130, 1)' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px' }}  >
        3:40 دقيقة</p>
         </Col>


        <Col>
        <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px' ,  gap:'15px'}}>
                 <img src={download} alt='' />
                 <img src={heart} alt=''/>
                 <img src={play} alt='' width="45px" height="45px"/>
               </div></Col>
       </Row>
     
    </Container>
    </>;
}
export default FavAudios;