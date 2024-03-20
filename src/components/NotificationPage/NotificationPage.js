import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/NavBar";
import { Col, Container, Row } from "react-bootstrap";
import delIcon from "../../images/del.svg";
import bellIcon from "../../images/bell.svg";
import picNotifcation from "../../images/pic-noti.png";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaBell } from "react-icons/fa6";
import nodata from "../../images/nodata.svg";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getNotifi } from "../../features/notifiFeature/notifiSlice";

import Cookies from "js-cookie";

const NotificationPage = () => {
  const { t } = useTranslation('notifi');
  let token = Cookies.get("token");

    const dispatch = useDispatch()
  const getDatNotifi = useSelector((state) => state.notifi.notifiData);
  const isLoading = useSelector((state) => state.notifi.isLoading);
 
  console.log(getDatNotifi)

  useEffect(() => {
    dispatch(getNotifi(token));
  }, [dispatch]);

  const [notifications, setNotifications] = useState({
    photofav: localStorage.getItem("photofav"),
    elderdown: localStorage.getItem("elderdown"),
    audiofav: localStorage.getItem("audiofav"),
    elderfav: localStorage.getItem("elderfav"),
    audiodown: localStorage.getItem("audiodown"),
  });

  const handleDelete = (key) => {
    localStorage.removeItem(key);
    setNotifications(prevNotifications => ({
      ...prevNotifications,
      [key]: null, // Update the specific notification to null after deletion
    }));
  };

 
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
                {t('notifi')}{" "}
              </h1>
            </div>
          </Col>
        </Row>
      </Container>

      {/* <Container style={{marginBottom:'280px'}}>
      <Row>
          {Object.keys(notifications).map((key) =>
            notifications[key] ? (
              <Col sm="12" className="d-flex justify-content-center align-items-center" key={key}>
                <div style={{ background: "rgba(255, 255, 255, 1)", width: "65%", boxShadow: "0px 0px 42px 0px rgba(3, 20, 37, 0.05)", border: "2px solid rgba(238, 238, 238, 1)", borderRadius: "8px", marginTop: "20px", marginBottom: "20px" }}>
                  <div className="d-flex justify-content-between align-items-center m-2">
                    <h5>
                      <img src={bellIcon} alt="Bell Icon" style={{ marginLeft: "5px" }} />
                      Label
                    </h5>
                    <img
                      src={delIcon}
                      alt="Delete Icon"
                      style={{ paddingLeft: "10px", cursor: 'pointer' }}
                      onClick={() => handleDelete(key)} 
                    />
                  </div>
                  <Col sm="8" style={{ textAlign: "start" }}>
                    <div style={{ margin: "5px 15px 15px 15px" }}>
                      <h6 style={{ color: "rgba(4, 32, 48, 1)", display: "flex", lineHeight: "25px" }}>
                        {notifications[key]}
                      </h6>
                    </div>
                  </Col>
                </div>
              </Col>
            ) : null
          )}
          {Object.values(notifications).every((val) => val === null) && (
            <div style={{ height: '280px', textAlign: 'center', marginTop: '20px' }}>
              <img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
          <span>{t('nodata2')}</span>
            </div>
          )}
        </Row>
      </Container> */}
      <Container style={{marginBottom:'280px'}}>
        <Row>

        {
          !isLoading?(
            getDatNotifi.data ? (
            <>
              {getDatNotifi.data && (getDatNotifi.data).map((item, index) => (
                <Col sm='12' className='d-flex justify-content-center align-items-center' >
                <div style={{background:'rgba(255, 255, 255, 1)' , width:'65%' , boxShadow:'0px 0px 42px 0px rgba(3, 20, 37, 0.05)'
                , border:"2px solid rgba(238, 238, 238, 1)" , borderRadius:'8px' , marginTop:'20px' , marginBottom:'20px'}}>

                  <div className='d-flex justify-content-between align-items-center m-2'>
                    <h5>  <img src={bellIcon} alt='' style={{marginLeft:'5px'}} />
                    {item.Title} {item.Code && " كود المحتوي الخاص" + item.Code}
                    </h5>
                    <img src={delIcon} alt='' style={{paddingLeft:'10px'}}  />
                  </div>
                  
                  <Col sm='8' style={{ textAlign:'start'}} >
                  <div style={{margin:'5px 15px 15px 15px'}}>
                   <h6 style={{color:'rgba(4, 32, 48, 1)' , display:'flex',lineHeight:'25px'}}>{item.message}    </h6>
                    <p style={{color:'rgba(122, 128, 138, 1)'  , display:'flex' , fontSize:'15px'}}>30/11/2023-09:30PM</p>
                   </div>
                  </Col>


                </div>
            </Col> 
            
              ))}
            </>
          ) :   <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
          <span>{t('nodata2')}</span></div>
          ):(
            null
            )
        }

            {/* <Col sm='12' className='d-flex justify-content-center align-items-center' >
                <div style={{background:'rgba(255, 255, 255, 1)' , width:'65%' , boxShadow:'0px 0px 42px 0px rgba(3, 20, 37, 0.05)'
                , border:"2px solid rgba(238, 238, 238, 1)" , borderRadius:'8px' , marginTop:'20px' , marginBottom:'20px'}}>

                  <div className='d-flex justify-content-between align-items-center m-2'>
                    <h5>  <img src={bellIcon} alt='' style={{marginLeft:'5px'}} />
                    الادمن
                    </h5>
                    <img src={delIcon} alt='' style={{paddingLeft:'10px'}}  />
                  </div>
                  
                  <Col sm='8' style={{ textAlign:'start'}} >
                  <div style={{margin:'5px 15px 15px 15px'}}>
                   <h6 style={{color:'rgba(4, 32, 48, 1)' , display:'flex',lineHeight:'25px'}}>تم اضافة اصدارات جديدة من الكتب</h6>
                    <p style={{color:'rgba(122, 128, 138, 1)'  , display:'flex' , fontSize:'15px'}}>30/11/2023-09:30PM</p>
                   </div>
                  </Col>
                </div>
            </Col> */}

            {/* <Col sm='12' className='d-flex justify-content-center align-items-center' >
                <div style={{background:'rgba(255, 255, 255, 1)' , width:'65%' , boxShadow:'0px 0px 42px 0px rgba(3, 20, 37, 0.05)'
                   , border:"2px solid rgba(238, 238, 238, 1)" , borderRadius:'8px' , marginBottom:'20px'}}>
                  <div className='d-flex justify-content-between align-items-center m-2'>
                    <h5>  <img src={not} alt='' style={{marginLeft:'5px'}} />
                    الادمن
                    </h5>
               
                    <img src={deleteicon} alt='' style={{paddingLeft:'10px'}}  />
                  </div>
                  
                  <Col sm='8' style={{ textAlign:'start'}} >
                  <div style={{margin:'5px 15px 15px 15px'}}>
                   <h6 style={{color:'rgba(4, 32, 48, 1)' , display:'flex',lineHeight:'25px'}}>   تم الانتهاء من تحميل المقطع الصوتي  </h6>
                    <p style={{color:'rgba(122, 128, 138, 1)'  , display:'flex' , fontSize:'15px'}}>30/11/2023-09:30PM</p>
                   </div>
                  </Col>
                   
                </div>
            </Col>

            <Col sm='12' className='d-flex justify-content-center align-items-center' >
                <div style={{background:'rgba(255, 255, 255, 1)' , width:'65%' , boxShadow:'0px 0px 42px 0px rgba(3, 20, 37, 0.05)'
                    , border:"2px solid rgba(238, 238, 238, 1)" , borderRadius:'8px'  , marginBottom:'20px'}}>

                  <div className='d-flex justify-content-between align-items-center m-2'>
                    <h5>  <img src={not} alt='' style={{marginLeft:'5px'}} />
                    الادمن
                    </h5>
            
                    <img src={deleteicon} alt='' style={{paddingLeft:'10px'}}  />
                  </div>

              <Col sm='8' style={{ textAlign:'start'}}>
            <div style={{margin:'5px 15px 15px 15px'}}>
            <div>
            <h6 style={{color:'rgba(4, 32, 48, 1)' , display:'flex', lineHeight:'25px'}}>    لوريم إيبسوم طريقة لكتابة النصوص في النشر والتصميم الجرافيكي تستخدم بشكل شائع لتوضيح الشكل المرئي للمستند أو الخط دون الاعتماد على محتوى ذي معنى      </h6>
            </div>
                              
                                <p style={{color:'rgba(122, 128, 138, 1)'  , display:'flex' , fontSize:'15px'}}>30/11/2023-09:30PM</p>
                              </div>
              </Col>
                </div>
            </Col>


            <Col sm='12' className='d-flex justify-content-center align-items-center' >
                <div style={{background:'rgba(255, 255, 255, 1)' , width:'65%' , boxShadow:'0px 0px 42px 0px rgba(3, 20, 37, 0.05)'
                , border:"2px solid rgba(238, 238, 238, 1)" , borderRadius:'8px' , marginBottom:'60px' }}>

                  <div className='d-flex justify-content-between align-items-center m-2'>
                    <h5>  <img src={not} alt='' style={{marginLeft:'5px'}} />
                    الادمن
                    </h5>
                  
                    <img src={deleteicon} alt='' style={{paddingLeft:'10px'}}  />
                  </div>  

              <Col sm='8' style={{ textAlign:'start'}} >
              <div style={{margin:'5px 15px 15px 15px'}}>
                  <div style={{display:'flex'}}>
                  <h6 style={{color:'rgba(4, 32, 48, 1)' , display:'flex' ,lineHeight:'25px'}}>  لوريم إيبسوم طريقة لكتابة النصوص في النشر والتصميم
                  الجرافيكي تستخدم بشكل شائع لتوضيح الشكل </h6>
                  </div>
                                  
                    <p style={{color:'rgba(122, 128, 138, 1)'  , display:'flex' , fontSize:'15px'}}>30/11/2023-09:30PM</p>
                     <img src={picNotifcation} alt='' style={{display:'flex' , maxWidth:'100%'}} />
                  </div>
                                
              </Col>
                </div>
            </Col> */}

            
      </Row>
     </Container>
    </>
  );
};
export default NotificationPage;