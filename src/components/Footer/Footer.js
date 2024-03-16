import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import footer from "../../images/footer.png";
import "./footer.css";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('footer')
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
                <a href="/">{t('home')}</a> 
                <a href="/audios">{t('audios')}</a>
                <a href="/Books">{t('books')}</a> 
                <a href="/articles">{t('articles')}</a>
                </div>
                
                <div className="footer-2 mt-3 mb-3">
               
                <a href="/pictures">{t('photos')}</a>
                <a href="/contact-us">{t('contactUs')}</a>
                <a href="/conditionandroles">{t('termsAndConditions')}</a>
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
        {t('copyright')} {t('allRightsReserved')} {t('byDrOmarKamel')}{" "}{" "}
      </div>
    </>
  );
};
export default Footer;