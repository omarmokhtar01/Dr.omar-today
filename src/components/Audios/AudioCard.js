import React, { useEffect, useRef, useState } from "react";
import "./audio.css";
import {
  Col,
  Container,
  Form,
  FormControl,
  NavDropdown,
  Row,
} from "react-bootstrap";
import search from "../../images/search.png";
import sortIcon from "../../images/sort-icon.png";
import profileCard from "../../images/profile-card.png";
import iconCard from "../../images/icon-1.png";
import iconCard2 from "../../images/icon-2.png";
import iconCard3 from "../../images/icon-3.png";
import pause from "../../images/pause.jpg";
import play from "../../images/play.png";
import heart from "../../images/heart.png";
import download from "../../images/download.png";
import NavBar from "../Navbar/NavBar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link,useParams  } from 'react-router-dom';
import { getAudioPublic } from "../../features/audios/audioSlice"
import { FaCirclePause, FaCirclePlay, FaPause } from "react-icons/fa6";
import { IoHeartCircleSharp, IoSearch } from "react-icons/io5";
import { MdDownloadForOffline } from "react-icons/md";
import { PiShareFatFill } from "react-icons/pi";
import { LuArrowUpDown } from "react-icons/lu";
import { getEldersByIdAudios } from "../../features/elders/eldersSlice";
const AudioCard = () => {

  const audioRefs = useRef([]);
  const [durations, setDurations] = useState([]);
  const [durationFormatted, setDurationFormatted] = useState('0:00');
  const [isPlaying, setIsPlaying] = useState([]);

  useEffect(() => {
    audioRefs.current = audioRefs.current.slice(0, durations.length);
    setIsPlaying(new Array(durations.length).fill(false));
  }, [durations]);

  useEffect(() => {
    if (durationFormatted > 0) {
      const minutes = Math.floor(durationFormatted / 60);
      const seconds = Math.floor(durationFormatted % 60);
      setDurationFormatted(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }
  }, [durationFormatted]);

  const handlePlay = (index) => {
    const newIsPlaying = [...isPlaying];
    newIsPlaying[index] = !isPlaying[index];
    setIsPlaying(newIsPlaying);
    const audioElement = audioRefs.current[index];
    if (audioElement) {
      if (newIsPlaying[index]) {
        // Check if the audio is not already playing before calling play()
        if (audioElement.paused) {
          audioElement.play().catch(error => console.error('Error playing audio:', error));
        }
      } else {
        // Check if the audio is playing before calling pause()
        if (!audioElement.paused) {
          audioElement.pause();
        }
      }
    }
  };

  const handleLoadedMetadata = (index) => {
    return (e) => {
      const newDurations = [...durations];
      newDurations[index] = e.target.duration;
      setDurations(newDurations);
    };
  };
  const params = useParams();

  // Now you can access the parameters using the keys defined in your route
  const { id } = params;
  const dispatch = useDispatch();

  const getDataOne = useSelector((state) => state.elders.elderAudioOne);

  const isLoading = useSelector((state) => state.elders.isLoading);
  const error = useSelector((state) => state.elders.error);

  useEffect(() => {
    dispatch(getEldersByIdAudios(id));
  }, [dispatch,id]);
  console.log(getDataOne);
    return <>
     <NavBar />

     <Container >
     {!isLoading ? (
          getDataOne ? (
            getDataOne.data ? (
        <Row >
           <Col  >
            <div style={{position:'relative' , marginTop:'-35px'}}>
              <div style={{color: 'rgba(255, 255, 255, 1)' , fontWeight:'500' , paddingBottom :'25px', paddingTop:'15px' , borderRadius:'25px'}} className=" background-image-card"> 
              <Row>
                <Col sm="6" xs='6' className=" d-flex " style={{marginTop :'-35px'}}  >
                  <img  src={getDataOne.data.image} width={200} height={180} alt="" style={{marginTop :'20px',borderRadius:'10px'}} />  
                </Col>
            
                <Col sm="3" xs='6' style={{display:'flex' , justifyContent:'center' , alignItems:'center'}} className="text-info-card" >
                <div style={{display:'flex' , flexDirection:'column' , marginRight:'-40px', marginTop:'-20px'}} >
                      <h5 style={{color:'rgba(5, 20, 39, 1)' , fontWeight:'bold'}}  > {getDataOne.data.name}</h5>
                      <p>{getDataOne.data.count_audios} مقطع صوتي</p>
                  </div>
                </Col>

                <Col sm="3" xs='6' className="icons" >
                <div style={{display:'flex' , gap:'10px' , marginTop:'50px', justifyContent:'center', alignItems:'center'}} className="icons-div" >
                 
                <MdDownloadForOffline style={{ color: 'rgb(209, 155, 111)', fontSize: '45px' ,  cursor: "pointer"}} className="icon-audio-card"  />
                  <IoHeartCircleSharp style={{ color: '#878787bd', fontSize: '45px' ,  cursor: "pointer"}} className="icon-audio-card"/>
                  <PiShareFatFill style={{ color: '#FFFFFF', fontSize: '45px' ,  cursor: "pointer"}} className="icon-audio-card"/>
                 
                  
                </div>
                </Col>
              
              </Row>
             </div>
            </div>
          </Col>
        </Row> 

) : null
) : null
) : null}
     </Container>
    
     <Container >
       <div style={{marginLeft:'-55px', marginBottom: '15px', borderBottom:'1.5px solid #EEEEEE ', width:'100%' }}></div>
        <Row>
          <Col>
          <div className='d-flex justify-content-between mb-4'>

           <Form >
             <FormControl
               type="search"
               placeholder="ابحث..."
               className="me-2  "
               aria-label="Search"
               style={{ borderRadius: '25px', width:'95%' }}
              /> 
            <IoSearch   width="20px"
                  height="20px"
                  style={{
                    position: "absolute",
                    marginTop: "-30px",
                    marginRight: "70px",
                    fontSize:'25px',
                    color:'#00000082'
                  }}
                  className="img-search" />
           </Form>

          <div style={{display:'flex' , gap:'10px'}}>

          <LuArrowUpDown  style={{
                    marginRight: "5px",
                    position: "absolute",
                    marginTop: "10px",
                    color:'rgb(219, 176, 134)'
                  
                  }}/>


              <NavDropdown title="الترتيب حسب" id="collapsible-nav-dropdown" style={{background:'linear-gradient(0deg, rgba(209, 155, 111, 0.15), rgba(209, 155, 111, 0.15)),linear-gradient(0deg, rgba(209, 155, 111, 0.1), rgba(209, 155, 111, 0.1))' 
                , border:'1.5px solid rgba(209, 155, 111, 0.1)' ,borderRadius:'25px' , padding:'5px 25px 5px 10px' , color:'rgba(209, 155, 111, 1)' , fontWeight:'bold',   fontSize:'13px' } }>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
          </div>

          </div>
          </Col>
        </Row>
     </Container>

     <Container>
     {!isLoading ? (
          getDataOne ? (
            getDataOne.data ? (
              getDataOne.data.Audio ? (

              getDataOne.data.Audio.map((item,index)=>{
                return(
              <>
       <Row className='me-auto'  md={4} key={item.id}>
        <Col  > 
          <div style={{display:'flex'}}>
          <img  src={item.image} alt="" style={{}} width='61px' height='61px' />
          <p style={{color:'rgba(17, 32, 34, 1)' , fontWeight:'bold' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px'}}> {item.title} </p>
          </div> 
         </Col>
     
        <Col   xs={6}><p style={{color:'rgba(130, 130, 130, 1)' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px'}}  > {item.name} </p></Col>

        <Col   xs={6} > <p style={{color:'rgba(130, 130, 130, 1)' , display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'15px' }}  >
        {durationFormatted} دقيقة</p>
         </Col>


         <Col >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px', gap: '15px' }}>
            <MdDownloadForOffline style={{ color: 'rgb(209, 155, 111)', fontSize: '30px', cursor: "pointer" }} />
            <IoHeartCircleSharp style={{ color: '#878787bd', fontSize: '30px', cursor: "pointer" }} />
            <button onClick={() => handlePlay(index)} style={{ border: 'none', background: '#FFFFFF' }}>
              {isPlaying[index] ? <FaCirclePause style={{ color: 'rgb(209, 155, 111)', fontSize: '26px' }} /> : <FaCirclePlay style={{ color: 'rgb(209, 155, 111)', fontSize: '26px' }} />}
            </button>
            <audio ref={(el) => (audioRefs.current[index] = el)} src={item.audio} controls hidden onLoadedMetadata={handleLoadedMetadata(index)} />
          </div>
        </Col>
       </Row>
        <div style={{marginLeft:'-55px', marginBottom: '15px', borderBottom:'1.5px solid #EEEEEE ', width:'100%' }}></div>
        </>
                )
              })

        ) : null
        ) : null
        ) : null

        ) : null}

     
    </Container>
    </>;
}
export default AudioCard;