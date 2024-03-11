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
                  <a href="/">الرئيسيه</a>
                  <a href="/audios">صوتيات</a>
                  <a href="/Books">كتب</a>
                  <a href="/articles">مقالات</a>
                  <a href="/pictures">صور</a>
                  <a href="/contact-us">تواصل معنا</a>
                  <a href="/conditionandroles">الشروط والاحكام </a>
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
      >
        {" "}
        حقوق الطبع والنشر @ 2023. جميع الحقوق محفوظة د/عمر كامل.{" "}
      </div>
    </>
  );
};
export default Footer;
