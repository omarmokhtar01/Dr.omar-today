import React, { useState } from "react";
import NavBar from "../Navbar/NavBar";
import { Col, Container, Row } from "react-bootstrap";
import delIcon from "../../images/del.svg";
import bellIcon from "../../images/bell.svg";
import picNotifcation from "../../images/pic-noti.png";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaBell } from "react-icons/fa6";
import nodata from "../../images/nodata.svg";

const NotificationPage = () => {
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
                الاشعارات{" "}
              </h1>
            </div>
          </Col>
        </Row>
      </Container>

      <Container style={{marginBottom:'280px'}}>
      <Row>
          {Object.keys(notifications).map((key) =>
            notifications[key] ? (
              <Col sm="12" className="d-flex justify-content-center align-items-center" key={key}>
                <div style={{ background: "rgba(255, 255, 255, 1)", width: "65%", boxShadow: "0px 0px 42px 0px rgba(3, 20, 37, 0.05)", border: "2px solid rgba(238, 238, 238, 1)", borderRadius: "8px", marginTop: "20px", marginBottom: "20px" }}>
                  <div className="d-flex justify-content-between align-items-center m-2">
                    <h5>
                      <img src={bellIcon} alt="Bell Icon" style={{ marginLeft: "5px" }} />
                      {/* Label */}
                    </h5>
                    <img
                      src={delIcon}
                      alt="Delete Icon"
                      style={{ paddingLeft: "10px", cursor: 'pointer' }}
                      onClick={() => handleDelete(key)} // Pass the key to delete
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
              <img src={nodata} alt="No Data" />
              <br />
              <span style={{ fontWeight: '700' }}>لا توجد عناصر بعد</span>
              <br />
              <span>لا توجد بيانات على هذه الصفحة حتى الآن</span>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};
export default NotificationPage;