import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import NavBar from '../Navbar/NavBar';
import { Link } from 'react-router-dom';
import imgArticle from "../../images/img-article.png";
import imgArticle2 from "../../images/img-article2.png";
import imgArticle3 from "../../images/img-article3.png";
import icon1 from "../../images/article-icon.png";
import icon2 from "../../images/article-icon2.png";
import heart1 from "../../images/redhearticon.png"
import Cookies from 'js-cookie';

const FavArticles = () => {
  const token = Cookies.get('token');

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

        <Link to='/favScientists' style={{textDecoration:'none'}} >
    <h6 style={{  color:'rgba(5, 20, 39, 1)' , fontSize:'15px', marginTop:'5px'}}> العلماء </h6>
        </Link>
    
    </div>
    </Col>

    <Col xs="6" md="4" lg="2" style={{ textAlign: 'center', marginBottom: '10px' }}>
  <div style={{border :'1.38px solid rgba(232, 232, 232, 1)' , borderRadius:'23px' , width:'124px' , height:'33.74px' , 
      background:'linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)' }}>

      <Link to='/favAudios' style={{textDecoration:'none'}}>
      <h6 style={{  color:'rgba(5, 20, 39, 1)' , fontSize:'15px', marginTop:'5px'}}> صوتيات </h6>
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
        background:'linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)' }}>
          <Link to='/favArtivles' style={{textDecoration:'none'}}>
        <h6 style={{  color:'#FFFFFF' , fontSize:'15px', marginTop:'5px'}}>    مقالات </h6>
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
     <Row xs={1} md={2} className="g-4  me-auto mb-5">
      
        <Col >
       
        <img src={heart1} style={{position:'absolute' , zIndex:'2' , margin:'10px' , display:'flex'}}  />
        <Link to='/articleCard' style={{textDecoration:'none'}}  >
          <Card style={{width:'100%' , borderRadius:'15px'}}>
            <Card.Img variant="top" src={imgArticle} />
           
            <Card.Body>
              <Card.Title style={{display:'flex'}}> من أقوال السلف في الإيمان</Card.Title>
              <Card.Text style={{display:'flex' , justifyContent:'space-between'}}  >

               <p style={{color:'rgba(130, 130, 130, 1)' ,fontSize:'14px' }} >
               <img src={icon1} alt='' style={{marginLeft:'8px'}} />
               منذ ساعة 
               </p>
             
               <p style={{color:'rgba(130, 130, 130, 1)' , fontSize:'14px'}} >
               <img src={icon2} alt='' style={{marginLeft:'8px'}}  />
               23 مشاهدة
               </p>
              </Card.Text>
            </Card.Body>
          </Card>
          </Link>
        </Col>

        <Col >
        <img src={heart1} style={{position:'absolute' , zIndex:'2' , margin:'10px' , display:'flex'}}  />
        <Link to='/articleCard' style={{textDecoration:'none'}} >
          <Card style={{width:'100%' , borderRadius:'15px'}}>
            <Card.Img variant="top" src={imgArticle2} />
           
            <Card.Body>
              <Card.Title style={{display:'flex'}}> من أقوال السلف في الإيمان</Card.Title>
              <Card.Text style={{display:'flex' , justifyContent:'space-between'}}  >

               <p style={{color:'rgba(130, 130, 130, 1)' ,fontSize:'14px' }} >
               <img src={icon1} alt='' style={{marginLeft:'8px'}} />
               منذ ساعة 
               </p>
             
               <p style={{color:'rgba(130, 130, 130, 1)' , fontSize:'14px'}} >
               <img src={icon2} alt='' style={{marginLeft:'8px'}}  />
               23 مشاهدة
               </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>

        </Col>

        <Col >
        <img src={heart1} style={{position:'absolute' , zIndex:'2' , margin:'10px' , display:'flex'}}  />
          <Card style={{width:'100%' , borderRadius:'15px'}}>
            <Card.Img variant="top" src={imgArticle3} />
           
            <Card.Body>
              <Card.Title style={{display:'flex'}}> من أقوال السلف في الإيمان</Card.Title>
              <Card.Text style={{display:'flex' , justifyContent:'space-between'}}  >

               <p style={{color:'rgba(130, 130, 130, 1)' ,fontSize:'14px' }} >
               <img src={icon1} alt='' style={{marginLeft:'8px'}} />
               منذ ساعة 
               </p>
             
               <p style={{color:'rgba(130, 130, 130, 1)' , fontSize:'14px'}} >
               <img src={icon2} alt='' style={{marginLeft:'8px'}}  />
               23 مشاهدة
               </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col >
        <img src={heart1} style={{position:'absolute' , zIndex:'2' , margin:'10px' , display:'flex'}}  />
          <Card style={{width:'100%' , borderRadius:'15px'}}>
            <Card.Img variant="top" src={imgArticle} />
           
            <Card.Body>
              <Card.Title style={{display:'flex'}}> من أقوال السلف في الإيمان</Card.Title>
              <Card.Text style={{display:'flex' , justifyContent:'space-between'}}  >

               <p style={{color:'rgba(130, 130, 130, 1)' ,fontSize:'14px' }} >
               <img src={icon1} alt='' style={{marginLeft:'8px'}} />
               منذ ساعة 
               </p>
             
               <p style={{color:'rgba(130, 130, 130, 1)' , fontSize:'14px'}} >
               <img src={icon2} alt='' style={{marginLeft:'8px'}}  />
               23 مشاهدة
               </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

      

       
    </Row>
     </Container>
    </>;
}
export default FavArticles;