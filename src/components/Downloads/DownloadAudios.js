import React, { useEffect } from "react";
import NavBar from "../Navbar/NavBar";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import audioProfile from "../../images/audio-profile.png";

import { RiDeleteBin5Line } from "react-icons/ri";
import { IoHeartCircleSharp } from "react-icons/io5";
import { FaCirclePlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAudiosDownload } from "../../features/allDownload/allDownloadSlice";
import Cookies from "js-cookie";

const DownloadAudios = () => {
  const token = Cookies.get("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = useSelector((state) => state.download.allAudiossDownload);

  const isLoading = useSelector((state) => state.download.isLoading);
  const error = useSelector((state) => state.articles.error);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      dispatch(getAudiosDownload(token));
    }
  }, [token, navigate, dispatch]);
  console.log(getData);
  console.log(getData.message);

  useEffect(() => {
    if (isLoading === false) {
      if (getData) {
        console.log(getData);
        if (getData.message === "Request failed with status code 401") {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      }
    }
  }, [isLoading]);

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
                التحميلات{" "}
              </h1>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="d-flex justify-content-center align-items-center">
        <Row className="m-3 justify-content-center align-items-center">
          <Col
            xs="6"
            md="3"
            lg="2"
            style={{
              textAlign: "center",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                border: "1.38px solid rgba(232, 232, 232, 1)",
                borderRadius: "23px",
                width: "124px",
                height: "33.74px",
                background:
                  "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
              }}
            >
              <Link to="/DownloadScientest" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "rgba(5, 20, 39, 1)",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  العلماء{" "}
                </h6>
              </Link>
            </div>
          </Col>

          <Col
            xs="6"
            md="3"
            lg="2"
            style={{
              textAlign: "center",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                border: "1.38px solid rgba(232, 232, 232, 1)",
                borderRadius: "23px",
                width: "124px",
                height: "33.74px",
                background:
                  "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)",
              }}
            >
              <Link to="/DownloadAudios" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "#FFFFFF",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  صوتيات{" "}
                </h6>
              </Link>
            </div>
          </Col>

          <Col
            xs="6"
            md="3"
            lg="2"
            style={{
              textAlign: "center",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                border: "1.38px solid rgba(232, 232, 232, 1)",
                borderRadius: "23px",
                width: "124px",
                height: "33.74px",
                background:
                  "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
              }}
            >
              <Link to="/DownloadBook" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "rgba(5, 20, 39, 1)",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  كتب{" "}
                </h6>
              </Link>
            </div>
          </Col>

          <Col
            xs="6"
            md="3"
            lg="2"
            style={{
              textAlign: "center",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                border: "1.38px solid rgba(232, 232, 232, 1)",
                borderRadius: "23px",
                width: "124px",
                height: "33.74px",
                background:
                  "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
              }}
            >
              <Link to="/Downloadpictures" style={{ textDecoration: "none" }}>
                <h6
                  style={{
                    color: "rgba(5, 20, 39, 1)",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  صور{" "}
                </h6>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="me-auto" md={4}>
          <Col>
            <div style={{ display: "flex" }}>
              <img
                src={audioProfile}
                alt=""
                style={{}}
                width="61px"
                height="61px"
              />
              <p
                style={{
                  color: "rgba(17, 32, 34, 1)",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px",
                }}
              >
                فضل شهر رمضان
              </p>
            </div>
          </Col>

          <Col xs={6}>
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              محمد صالح المنجد
            </p>
          </Col>

          <Col xs={6}>
            {" "}
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              3:40 دقيقة
            </p>
          </Col>

          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
                gap: "5px",
              }}
            >
              <RiDeleteBin5Line style={{ fontSize: "25px", color: "gray" }} />

              <IoHeartCircleSharp
                style={{
                  color: "#878787bd",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
              />
              <FaCirclePlay
                style={{ color: "rgb(209, 155, 111)", fontSize: "26px" }}
              />
            </div>
          </Col>
        </Row>
        <div
          style={{
            marginLeft: "-55px",
            marginBottom: "15px",
            borderBottom: "1.5px solid #EEEEEE ",
            width: "100%",
          }}
        ></div>

        <Row className="me-auto" md={4}>
          <Col>
            <div style={{ display: "flex" }}>
              <img
                src={audioProfile}
                alt=""
                style={{}}
                width="61px"
                height="61px"
              />
              <p
                style={{
                  color: "rgba(17, 32, 34, 1)",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px",
                }}
              >
                فضل شهر رمضان
              </p>
            </div>
          </Col>

          <Col xs={6}>
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              محمد صالح المنجد
            </p>
          </Col>

          <Col xs={6}>
            {" "}
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              3:40 دقيقة
            </p>
          </Col>

          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
                gap: "5px",
              }}
            >
              <RiDeleteBin5Line style={{ fontSize: "25px", color: "gray" }} />

              <IoHeartCircleSharp
                style={{
                  color: "#878787bd",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
              />
              <FaCirclePlay
                style={{ color: "rgb(209, 155, 111)", fontSize: "26px" }}
              />
            </div>
          </Col>
        </Row>
        <div
          style={{
            marginLeft: "-55px",
            marginBottom: "15px",
            borderBottom: "1.5px solid #EEEEEE ",
            width: "100%",
          }}
        ></div>

        <Row className="me-auto" md={4}>
          <Col>
            <div style={{ display: "flex" }}>
              <img
                src={audioProfile}
                alt=""
                style={{}}
                width="61px"
                height="61px"
              />
              <p
                style={{
                  color: "rgba(17, 32, 34, 1)",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px",
                }}
              >
                فضل شهر رمضان
              </p>
            </div>
          </Col>

          <Col xs={6}>
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              محمد صالح المنجد
            </p>
          </Col>

          <Col xs={6}>
            {" "}
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              3:40 دقيقة
            </p>
          </Col>

          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
                gap: "5px",
              }}
            >
              <RiDeleteBin5Line style={{ fontSize: "25px", color: "gray" }} />

              <IoHeartCircleSharp
                style={{
                  color: "#878787bd",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
              />
              <FaCirclePlay
                style={{ color: "rgb(209, 155, 111)", fontSize: "26px" }}
              />
            </div>
          </Col>
        </Row>
        <div
          style={{
            marginLeft: "-55px",
            marginBottom: "15px",
            borderBottom: "1.5px solid #EEEEEE ",
            width: "100%",
          }}
        ></div>

        <Row className="me-auto" md={4}>
          <Col>
            <div style={{ display: "flex" }}>
              <img
                src={audioProfile}
                alt=""
                style={{}}
                width="61px"
                height="61px"
              />
              <p
                style={{
                  color: "rgba(17, 32, 34, 1)",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px",
                }}
              >
                فضل شهر رمضان
              </p>
            </div>
          </Col>

          <Col xs={6}>
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              محمد صالح المنجد
            </p>
          </Col>

          <Col xs={6}>
            {" "}
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              3:40 دقيقة
            </p>
          </Col>

          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
                gap: "5px",
              }}
            >
              <RiDeleteBin5Line style={{ fontSize: "25px", color: "gray" }} />

              <IoHeartCircleSharp
                style={{
                  color: "#878787bd",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
              />
              <FaCirclePlay
                style={{ color: "rgb(209, 155, 111)", fontSize: "26px" }}
              />
            </div>
          </Col>
        </Row>
        <div
          style={{
            marginLeft: "-55px",
            marginBottom: "15px",
            borderBottom: "1.5px solid #EEEEEE ",
            width: "100%",
          }}
        ></div>

        <Row className="me-auto" md={4}>
          <Col>
            <div style={{ display: "flex" }}>
              <img
                src={audioProfile}
                alt=""
                style={{}}
                width="61px"
                height="61px"
              />
              <p
                style={{
                  color: "rgba(17, 32, 34, 1)",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px",
                }}
              >
                فضل شهر رمضان
              </p>
            </div>
          </Col>

          <Col xs={6}>
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              محمد صالح المنجد
            </p>
          </Col>

          <Col xs={6}>
            {" "}
            <p
              style={{
                color: "rgba(130, 130, 130, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              3:40 دقيقة
            </p>
          </Col>

          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
                gap: "5px",
              }}
            >
              <RiDeleteBin5Line style={{ fontSize: "25px", color: "gray" }} />

              <IoHeartCircleSharp
                style={{
                  color: "#878787bd",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
              />
              <FaCirclePlay
                style={{ color: "rgb(209, 155, 111)", fontSize: "26px" }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default DownloadAudios;
