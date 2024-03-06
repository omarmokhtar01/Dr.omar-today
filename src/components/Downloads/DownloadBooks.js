import React, { useEffect } from 'react';
import NavBar from '../Navbar/NavBar';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import deleteicon from "../../images/deleteicon2.png";
import bookSort from "../../images/book-sort.png";
import bookSort1 from "../../images/book-sort1.png";
import bookSort2 from "../../images/book-sort2.png";
import { RiDeleteBin5Line } from "react-icons/ri";
import './download.css'
import { getBooksDownload } from '../../features/allDownload/allDownloadSlice';
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const DownloadBooks = () => {
  const token = Cookies.get('token');

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const getData = useSelector((state) => state.download.allBooksDownload);

  const isLoading = useSelector((state) => state.download.isLoading);
  const error = useSelector((state) => state.articles.error);

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
    dispatch(getBooksDownload(token));
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
       <h1 style={{color: 'rgba(255, 255, 255, 1)' , fontWeight:'500' , paddingBottom :'25px', paddingTop:'15px' , borderRadius:'25px'}} className=" background-image"> التحميلات  </h1>
    </div>
    </Col>
</Row>
   </Container>

  <Container className='d-flex justify-content-center align-items-center' >
  <Row className="m-3 justify-content-center align-items-center">
  {/* <Col xs="6" md="2" lg="2" style={{ textAlign: 'center', marginBottom: '10px' , paddingLeft:'120px'}}>

  <div style={{border :'1.38px solid rgba(232, 232, 232, 1)' , borderRadius:'23px' , width:'124px' , height:'33.74px' , 
        background:'linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)' }}>

        <Link to='/DownloadScientest' style={{textDecoration:'none'}} >
    <h6 style={{  color:'rgba(5, 20, 39, 1)' , fontSize:'15px', marginTop:'5px'}}> العلماء </h6>
        </Link>
    
    </div>
  </Col> */}



  <Col xs="6" md="3" lg="2" style={{ textAlign: 'center', marginBottom: '10px' , display:'flex', justifyContent:'center', alignItems:'center'}}>
    
    <div style={{border :'1.38px solid rgba(232, 232, 232, 1)' , borderRadius:'23px' , width:'124px' , height:'33.74px' , 
      background:'linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)'}}>
     <Link to='/DownloadScientest' style={{textDecoration:'none'}} >
    <h6 style={{  color:'rgba(5, 20, 39, 1)' , fontSize:'15px', marginTop:'5px'}}> العلماء </h6>
        </Link>
     </div>
   </Col>

  <Col xs="6" md="3" lg="2" style={{ textAlign: 'center', marginBottom: '10px' , display:'flex', justifyContent:'center', alignItems:'center'}}>
    
    <div style={{border :'1.38px solid rgba(232, 232, 232, 1)' , borderRadius:'23px' , width:'124px' , height:'33.74px' , 
      background:'linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)'}}>
      <Link to='/DownloadAudios' style={{textDecoration:'none'}}>
      <h6 style={{  color:'rgba(5, 20, 39, 1)' , fontSize:'15px', marginTop:'5px'}}> صوتيات </h6>
      </Link>
     </div>
   </Col>



  <Col xs="6" md="3" lg="2" style={{ textAlign: 'center', marginBottom: '10px' , display:'flex', justifyContent:'center', alignItems:'center'}}>
    
    <div style={{border :'1.38px solid rgba(232, 232, 232, 1)' , borderRadius:'23px' , width:'124px' , height:'33.74px' , 
   background:'linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)'}}>
     <Link to='/DownloadBook' style={{textDecoration:'none'}}>
        <h6 style={{  color:'#FFFFFF' , fontSize:'15px', marginTop:'5px' }}> كتب  </h6>
        </Link>
     </div>
   </Col>
 

  <Col xs="6" md="3" lg="2" style={{ textAlign: 'center', marginBottom: '10px' , display:'flex', justifyContent:'center', alignItems:'center'}}>
    
    <div style={{border :'1.38px solid rgba(232, 232, 232, 1)' , borderRadius:'23px' , width:'124px' , height:'33.74px' , 
      background:'linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)'}}>
      <Link to='/Downloadpictures' style={{textDecoration:'none'}}>
                <h6 style={{  color:'rgba(5, 20, 39, 1)' , fontSize:'15px', marginTop:'5px'}}>   صور </h6>
                </Link>
     </div>
   </Col>

  </Row>
  </Container>

    <div class="container text-center">
        <div class="row row-cols-2 row-cols-lg-5  g-lg-3" style={{width:'100%'}}>
            <div class="col">
                <div >
                  <img src={bookSort} alt='' className='book-download'  />

                    <div style={{position:'absolute' , marginTop:'-240px' , marginRight:'40px' , display:'flex' , gap:'10px',
                      border:'1px solid #FFFFFF', background:'#FFFFFF', borderRadius:'25px'}}  >
                      <RiDeleteBin5Line style={{paddingLeft:'10px', fontSize:'35px', color:'gray', padding:'5px'}}/>
                    </div>

                   <h5>  الارتقاء بالكتابه</h5>
                    <p style={{marginTop:'-5px'}} >20 صفحه </p>      
                </div>
            </div>

            <div class="col">
                <div >
                  <img src={bookSort1} alt='' className='book-download' />
                  <div style={{position:'absolute' , marginTop:'-240px' , marginRight:'40px' , display:'flex' , gap:'10px',
                      border:'1px solid #FFFFFF', background:'#FFFFFF', borderRadius:'25px'}} className='icon-delt' >
                      <RiDeleteBin5Line style={{paddingLeft:'10px', fontSize:'35px', color:'gray', padding:'5px'}}/>
                    </div>
                    <h5>  الارتقاء بالكتابه</h5>
                  <p style={{marginTop:'-5px'}} >20 صفحه </p>       
                </div>
            </div>

            <div class="col">
                <div >
                  <img src={bookSort2} alt='' className='book-download' />
                  <div style={{position:'absolute' , marginTop:'-240px' , marginRight:'40px' , display:'flex' , gap:'10px',
                      border:'1px solid #FFFFFF', background:'#FFFFFF', borderRadius:'25px'}} className='icon-delt' >
                      <RiDeleteBin5Line style={{paddingLeft:'10px', fontSize:'35px', color:'gray', padding:'5px'}}/>
                    </div>

                    <h5>  عبقريه عمر </h5>
                  <p style={{marginTop:'-5px'}} >20 صفحه </p>      
                </div>
            </div>

            <div class="col">
                <div >
                  <img src={bookSort1} alt=''  className='book-download'/>
                  <div style={{position:'absolute' , marginTop:'-240px' , marginRight:'40px' , display:'flex' , gap:'10px',
                      border:'1px solid #FFFFFF', background:'#FFFFFF', borderRadius:'25px'}}  className='icon-delt' >
                      <RiDeleteBin5Line style={{paddingLeft:'10px', fontSize:'35px', color:'gray', padding:'5px'}}/>
                    </div>

                    <h5>  عبقريه عمر </h5>
                    <p style={{marginTop:'-5px'}} >20 صفحه </p>  
                </div>
            </div>

            <div class="col">
                <div >
                  <img src={bookSort} alt='' className='book-download' />
                  <div style={{position:'absolute' , marginTop:'-240px' , marginRight:'40px' , display:'flex' , gap:'10px',
                      border:'1px solid #FFFFFF', background:'#FFFFFF', borderRadius:'25px'}} className='icon-delt' >
                      <RiDeleteBin5Line style={{paddingLeft:'10px', fontSize:'35px', color:'gray', padding:'5px'}}/>
                    </div>

                      <h5>  عبقريه عمر </h5>
                     <p style={{marginTop:'-5px'}} >20 صفحه </p>   
                </div>
            </div>

            <div class="col">
              <div >
                <img src={bookSort1} alt='' className='book-download' />
                <div style={{position:'absolute' , marginTop:'-240px' , marginRight:'40px' , display:'flex' , gap:'10px',
                      border:'1px solid #FFFFFF', background:'#FFFFFF', borderRadius:'25px'}} className='icon-delt' >
                      <RiDeleteBin5Line style={{paddingLeft:'10px', fontSize:'35px', color:'gray', padding:'5px'}}/>
                    </div>
                 <h5>  عبقريه عمر </h5>
                  <p style={{marginTop:'-5px'}} >20 صفحه </p>   
             </div>
           
          </div>

          <div class="col">
           <div >
             <img src={bookSort2} alt='' className='book-download' />
             <div style={{position:'absolute' , marginTop:'-240px' , marginRight:'40px' , display:'flex' , gap:'10px',
                      border:'1px solid #FFFFFF', background:'#FFFFFF', borderRadius:'25px'}} className='icon-delt' >
                      <RiDeleteBin5Line style={{paddingLeft:'10px', fontSize:'35px', color:'gray', padding:'5px'}}/>
                    </div>

                  <h5>   حياه محمد </h5>
                  <p style={{marginTop:'-5px'}} >20 صفحه </p>    
           </div>
          
          </div>
 
         <div class="col">
           <div >
             <img src={bookSort} alt=''  className='book-download' />
             <div style={{position:'absolute' , marginTop:'-240px' , marginRight:'40px' , display:'flex' , gap:'10px',
                      border:'1px solid #FFFFFF', background:'#FFFFFF', borderRadius:'25px'}} className='icon-delt' >
                      <RiDeleteBin5Line style={{paddingLeft:'10px', fontSize:'35px', color:'gray', padding:'5px'}}/>
                    </div>
                 <h5>   حياه محمد </h5>
                  <p style={{marginTop:'-5px'}} >20 صفحه </p>          
           </div>
         </div>

         <div class="col">
           <div >
             <img src={bookSort1} alt='' className='book-download'  />
             <div style={{position:'absolute' , marginTop:'-240px' , marginRight:'40px' , display:'flex' , gap:'10px',
                      border:'1px solid #FFFFFF', background:'#FFFFFF', borderRadius:'25px'}} className='icon-delt' >
                      <RiDeleteBin5Line style={{paddingLeft:'10px', fontSize:'35px', color:'gray', padding:'5px'}}/>
                    </div>

                  <h5>   حياه محمد </h5>
                  <p style={{marginTop:'-5px'}} >20 صفحه </p>    
           </div> 
         </div>

         <div class="col">
           <div >
             <img src={bookSort2} alt='' className='book-download' />
             <div style={{position:'absolute' , marginTop:'-240px' , marginRight:'40px' , display:'flex' , gap:'10px',
                      border:'1px solid #FFFFFF', background:'#FFFFFF', borderRadius:'25px'}} className='icon-delt' >
                      <RiDeleteBin5Line style={{paddingLeft:'10px', fontSize:'35px', color:'gray', padding:'5px'}}/>
                    </div>

               <h5>   حياه محمد </h5>
                  <p style={{marginTop:'-5px'}} >20 صفحه </p>    
           </div>
           
         </div>

        </div>
    </div>
    </>;
}
export default DownloadBooks;