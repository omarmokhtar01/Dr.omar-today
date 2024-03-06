import React, { useEffect } from 'react';
import NavBar from '../Navbar/NavBar';
import { Col, Container, Row } from 'react-bootstrap';
import imgCard from "../../images/article-card.png";
import icon1 from "../../images/article-icon.png";
import icon2 from "../../images/article-icon2.png";
import heart1 from "../../images/heart1.png";
import articleProfile from "../../images/article-profile.png";
import facebook from "../../images/facebook.png";
import whats from "../../images/whats.png";
import messgener from "../../images/Messanger.png";
import instagram from "../../images/instrgram.png";
import { Link,useParams  } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getArticleCategoryOne } from '../../features/articles/articlesSlich';
import { IoEye, IoHeartCircleSharp } from 'react-icons/io5';
import { FaClock } from 'react-icons/fa6';

const ArticleCard = () => {
  
  const dummyData = {
    title: "عنوان المقالة الأول",
    timeSince: "منذ ١٠ ساعات",
    views: "١٢ مشاهدة",
    content: "نص المقالة الأول..."
  };
  





  const params = useParams();

  // Now you can access the parameters using the keys defined in your route
  const { id } = params;

  const dispatch = useDispatch();

  const getDataOne = useSelector((state) => state.articles.oneArticale);

  const isLoading = useSelector((state) => state.articles.isLoading);
  const error = useSelector((state) => state.articles.error);


  useEffect(() => {
    dispatch(getArticleCategoryOne(id));
  }, [dispatch,id]);


console.log(getDataOne);


    return <>
    <NavBar />

    <Container >
        <Row>
            <Col>
           { !isLoading ? (
    getDataOne ? (
            <img src={getDataOne.image} width={50} height={200} style={{maxWidth:'100%' , position:'relative' , marginTop:'-55px' , width:'95%'}}  alt=''/>
            ):null):null}
            </Col>  
        </Row>
    </Container>

    <Container >
     <Row>
     {
  !isLoading ? (
    getDataOne ? (
        <Col xs={12} md={8} sm={8}>
          <div style={{display:'flex' , flexDirection:'column'}}>
            <h4 style={{display:'flex' , marginRight:'60px' , marginTop:'15px' , color:'rgba(4, 32, 48, 1)'}}>{getDataOne.title }</h4>

            <p style={{display:'flex'  , marginRight:'60px', color:'rgba(130, 130, 130, 1)' ,fontSize:'14px' }}>
              <div>  <FaClock  style={{ marginLeft: '8px', color:'rgb(209, 155, 111)', fontSize:'17px' }}/></div>
            منذ ساعة</p>

            <p style={{display:'flex'  , marginRight:'60px', color:'rgba(130, 130, 130, 1)'  }}>
              <div> <IoEye style={{ marginLeft: '8px', color:'rgb(209, 155, 111)', fontSize:'20px' }}/> </div> 
              23 مشاهدة  </p>

              <p style={{margin:'5px 35px 35px 50px'}}>  
                {getDataOne.content}
              </p>
          </div>
        </Col>
    ):null):null}
             {
!isLoading ? (
  getDataOne ? (
    getDataOne.elder ? (
        <Col xs={12} md={4} sm={4} >
       
          <IoHeartCircleSharp style={{ color: '#878787bd', fontSize: '35px' , cursor: "pointer" ,margin:'15px 10px 10px -170px' }} />
          <div style={{display:'flex', border:'3px solid rgba(236, 236, 236, 1)' ,borderRadius:'15px' , width:'90%' , padding:'10px'}}>
             <div>
                <img src={getDataOne.image} width={50} height={50} />
             </div>

    
      
            <div style={{display:'flex' , flexDirection:'column' , marginRight:'15px'}}>
               <h6 style={{color:'rgba(130, 130, 130, 1)'}}>المقال بواسطه</h6>
               <h6 style={{marginLeft:'-30px'}}>{getDataOne.elder.name}</h6>
            </div>
            
               
        </div>
     
        <div style={{display:'flex', border:'3px solid rgba(236, 236, 236, 1)' ,borderRadius:'15px' , width:'90%' , marginTop:'15px'
           ,padding:'10px' , justifyContent:'space-between',marginBottom:'25px'}} >
           <h6 className='d-flex justify-content-center align-items-center'>مشاركه المقال</h6>
        
            <div>
                <a href="https://www.instagram.com/ " ><img style={{paddingLeft:'10px'}} src={instagram} alt=""  /></a>
                <a href="https://www.messenger.com/" ><img style={{paddingLeft:'10px'}} src={messgener} alt=""  /></a>
                <a href=" https://web.whatsapp.com/" ><img style={{paddingLeft:'10px'}} src={whats} alt=""  /></a>
                <a href="https://www.facebook.com/" ><img style={{paddingLeft:'10px'}} src={facebook} alt=""  /></a>
            </div>

        </div>
        </Col>
          ) : null
          ) : null
        ) : null
    }
      </Row>
    </Container>
    </>;
}
export default ArticleCard;