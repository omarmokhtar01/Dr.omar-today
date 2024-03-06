import React, { useEffect, useState } from 'react';
import './audio.css'
import { Col, Container, Form, FormControl, NavDropdown, Row } from 'react-bootstrap';
import search from "../../images/search.png";
import group from "../../images/Group.png";
import group2 from "../../images/Group2.png";
import sortIcon from "../../images/sort-icon.png";
import img1 from "../../images/img1.png";
import heart1 from "../../images/heart1.png";
import down from "../../images/down.png";
import { Link,useParams  } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import group1 from "../../images/Group-1-1.png";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAudioCategory, getAudioCategoryById, getAudios } from '../../features/audios/audioSlice';
const AudioCategorySort = () => {
    const params = useParams();

    // Now you can access the parameters using the keys defined in your route
    const { id } = params;
    const dispatch = useDispatch()
   
    const audioCategory = useSelector(state => state.audio.audioCategory);
    const audioCategoryLoading = useSelector(state => state.audio.isLoading);
  
    const getAudioCategoryData = useSelector(state => state.audio.audioCategoryId);
    const getAudioCategoryLoading = useSelector(state => state.audio.isLoading);
  
    
    useEffect(()=>{
      dispatch(getAudioCategory())
          },[dispatch])
          
      
    
    useEffect(() => {
        dispatch(getAudioCategoryById(id));
    }, [dispatch,id]);
  
  
    
      //to change icon
      const [isClicked, setIsClicked] = useState(false);
  
      const handleClick = () => {
        setIsClicked(!isClicked);
      };

    return <>  
     <NavBar />

     <Container  >
        <Row>
            <Col>
            <div style={{position:'relative' , marginTop:'-35px'}}>
            <h1 style={{color: 'rgba(255, 255, 255, 1)' , fontWeight:'500' , paddingBottom :'25px', paddingTop:'15px' , borderRadius:'25px'}} className=" background-image"> الصوتيات  </h1>
            </div>
            </Col>
        </Row>
     </Container>

     <Container className='d-flex justify-content-center align-items-center' >
     <Row className="m-3 d-flex" style={{justifyContent:'space-between'}}>
     
       <Col xs="6" md="4" lg="2" style={{ textAlign: 'center', marginBottom: '10px' }}>
       <Link style={{  color:'rgba(5, 20, 39, 1)' , fontSize:'15px', marginTop:'5px',textDecoration:'none'}} to={'/audios'}>     <div style={{border :'none' , borderRadius:'23px' , width:'124px' , height:'33.74px' , 
              background:'linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)' , boxShadow:'0px 3.6861166954040527px 3.6861166954040527px 0px rgba(209, 155, 111, 0.22)',}}>
              <p style={{color:'rgba(5, 20, 39, 1)', fontWeight:'bold'}}>الكل</p>
            </div> </Link>
        </Col>

        {
  !audioCategoryLoading ? (
    audioCategory ? (
     <>
        {audioCategory.map((item, index) => (
        <Col key={item.id} xs="6" md="4" lg="2" style={{ textAlign: 'center', marginBottom: '10px' }}>
                <Link style={{ color: 'rgba(5, 20, 39, 1)', fontSize: '15px', marginTop: '5px', textDecoration: 'none' }} to={`/audiosCategory/${item.id}`}>

        <div style={{border :'1.38px solid rgba(232, 232, 232, 1)' , borderRadius:'23px' , width:'124px' , height:'33.74px' , 
            background: 'linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)' }}>
                <h6 style={{  color: 'black' , fontSize:'15px', marginTop:'5px'}}>{item.title}</h6>
            </div>
            </Link>
        </Col>
))}

</>
) : null
) : null
}

     
       </Row>
     </Container>

      <Container >
      <div style={{marginLeft:'-55px', marginBottom: '15px', borderBottom:'1.5px solid #EEEEEE ', width:'100%' }}></div>
        <Row >
          <Col>

            <div className='d-flex justify-content-between mb-4'>
              <Form >
                
                <FormControl
                                type="search"
                                placeholder="ابحث..."
                                className="me-2 w-100  "
                                aria-label="Search"
                                style={{ borderRadius: '25px' }}
                            />
                    <img src={search} alt='' width='20px' height="20px" style={{position:'absolute' , marginTop:'-30px' , marginRight:'70px'}}/>
              </Form>

              <div style={{display:'flex' , gap:'10px'}}>
               <img src={sortIcon} alt='' width='15px' height="15px" style={{ marginRight:'5px', position:'absolute' , marginTop:'10px'}} />

               <NavDropdown title="الترتيب حسب" id="collapsible-nav-dropdown" style={{background:'linear-gradient(0deg, rgba(209, 155, 111, 0.15), rgba(209, 155, 111, 0.15)),linear-gradient(0deg, rgba(209, 155, 111, 0.1), rgba(209, 155, 111, 0.1))' 
               , border:'1.5px solid rgba(209, 155, 111, 0.1)' ,borderRadius:'25px' , padding:'5px 25px 5px 10px' , color:'rgba(209, 155, 111, 1)' , fontWeight:'bold' } }>
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

              <Link to={`/audiosCategorySort/${id}`}><img 
               src={isClicked ? group : group1} 
               width='35px' 
              height='35px' 
              onClick={handleClick}  /></Link>

              <Link to={`/audiosCategory/${id}`}>   <img src={group2} alt=''  width='35px' height="35px"  /></Link>
              </div>
            </div> 

          </Col> 
        </Row>
     </Container>

     <div class="container text-center">
        <div class="row row-cols-2 row-cols-lg-5  g-lg-3" style={{width:'100%'}}>
          
      {
      !getAudioCategoryLoading?(
  getAudioCategoryData && getAudioCategoryData.length > 0 ? (
    getAudioCategoryData.map((item)=>{
return(
            <div class="col">
            <div class="p-3">
                <div key={item.id}>
                  <img src={item.image} alt='pic' width={200} height={200} />
                    <div style={{position:'absolute' , marginTop:'-40px' , marginRight:'55px' , display:'flex' , gap:'10px'}}  >
                         <img src={heart1} alt=''  />
                        <img src={down} alt=''  />
                    </div>

                 <h5>{item.name}</h5>
                  <p style={{marginTop:'-5px'}} >عدد المقاطع الصوتية {item.count_audios} </p>      
                </div>
                </div>
            </div>
        )
      })
          ) : null):null
      }
           

        </div>
     </div>

     </>;
}
export default AudioCategorySort;