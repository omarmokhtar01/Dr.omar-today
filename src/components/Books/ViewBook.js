import React, { useEffect, useState } from "react";
import "./Book.css";
import NavBar from "../Navbar/NavBar";
import {
    Accordion,
    Col,
    Container,
    Form,
    FormControl,
    NavDropdown,
    Row,
    Spinner,
  
  } from "react-bootstrap";
  import nodata from "../../images/nodata.svg";

  import { Link, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { showBook } from "../../features/books/booksSlice";
import { useSelector } from 'react-redux';

const ViewBook = () => {
    const params = useParams();

    // Now you can access the parameters using the keys defined in your route
    const { id } = params;
    const dispatch = useDispatch();

    const viewBook = useSelector((state) => state.books.showOne);
    const isLoading = useSelector((state) => state.books.isLoading);
    const [isLoadingg, setIsLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);
  
    useEffect(()=>{
dispatch(showBook(id))
    },[dispatch,id])
  return (
    <>
<NavBar/>
<Container>
    <Row className="justify-content-
    center mt-5">
        <Col md={12}>
        {!isLoadingg ? (
  viewBook.Book ? (
    <iframe
      src={`https://docs.google.com/viewer?url=${encodeURIComponent(
        viewBook.Book
      )}&embedded=true`}
      width="100%"
      height="1200px"
      frameBorder="0" // Changed from 'frameborder' to 'frameBorder'
      scrolling="no"
    ></iframe>
  ) : 
  <div style={{height:'280px'}}><span>لا يوجد بيانات</span></div>
  
) : (
    <div style={{ height: "280px" }}>
    <Spinner animation="border" variant="primary" />
  </div>
)}

        </Col>
    </Row>
</Container>
    </>
  )
}

export default ViewBook