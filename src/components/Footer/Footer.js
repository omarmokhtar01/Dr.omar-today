import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import footer from "../../images/footer.png";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <div
        style={{
          background: "rgba(167, 190, 174, 0.21)",
          borderTop: "2px solid  rgba(167, 190, 174, 0.26)",
          borderRadius: "15px",
        }}
      >
        <Container>
          <Row className="d-flex justify-content-center align-items-center w-100 ">
            <Col sm="12">
              <div style={{ width: "100%" }}>
                <a href="/">
                  <img src={footer} alt="" style={{ marginTop: "15px" }} />
                  </a>

                <div className="d-flex justify-content-center align-items-center d-flex-menu ">
      <div className="all-footer  d-flex ">
          <div className="footer-1 mt-3 mb-3" >
                <a href="/">الرئيسيه</a> 
                <a href="/audios">صوتيات</a>
                <a href="/Books">كتب</a> 
                <a href="/articles">مقالات</a>
                </div>
                
                <div className="footer-2 mt-3 mb-3">
               
                <a href="/pictures">صور</a>
                <a href="/contact-us">تواصل معنا</a>
                <a href="/conditionandroles">شروط واحكام</a>
                 </div>
      </div>
               
                {/* <Col xs={12}><a href="/audios">صوتيات</a></Col>
                <Col xs={4}> <a href="/Books">كتب</a></Col>
                <Col xs={4}>  <a href="/articles">مقالات</a></Col>
                <Col xs={4}> <a href="/pictures">صور</a></Col>
                <Col xs={4}>  <a href="/contact-us">تواصل معنا</a></Col>
                <Col xs={4}> <a href="/conditionandroles">الشروط والاحكام </a></Col> */}
                
                
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div
        style={{
          background: "linear-gradient(235.96deg, #384659 0%, #051427 65.49%)",
          color: "#fff",
          padding: "10px",
        }}
        className="bluefooter"
      >
        {" "}
        حقوق الطبع والنشر @ 2023. جميع الحقوق محفوظة د/عمر كامل.{" "}
      </div>
    </>
  );
};
export default Footer;