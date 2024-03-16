import React, { useEffect,useState } from "react";
import NavBar from "../Navbar/NavBar";
import {
  Card,
  Col,
  Container,
  Form,
  FormControl,
  NavDropdown,
  Row,
  Spinner,
} from "react-bootstrap";
import nodata from "../../images/nodata.svg";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticleCategory,
  getArticleCategoryById,
  getArticles,
  searchArticle,
} from "../../features/articles/articlesSlich";
import {  IoSearch } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import { ToastContainer } from "react-toastify";
import searchIcon from "../../images/search.svg";
import arrowsIcon from "../../images/twoArr.svg";
import clockIcon from "../../images/clock.svg";
import eyeIcon from "../../images/eye.svg";
import { useTranslation } from 'react-i18next';

const Articles = () => {
  const { t } = useTranslation('articles');

  const [sortBy, setSortBy] = useState(null); // State to keep track of sorting option

  // Event handler for sorting by latest addition
  const handleSortByLatest = () => {
    setSortBy('latest');
    // Call function to sort articles by latest addition
  };

  // Event handler for sorting alphabetically
  const handleSortAlphabetically = () => {
    setSortBy('alphabetical');
    // Call function to sort articles alphabetically
  };

  // Sort function based on the selected option
  const sortFunction = (a, b) => {
    if (!a.title || !b.title) {
      // Handle cases where either 'a' or 'b' does not have a 'title' property
      return 0; // Or you can prioritize the one with a 'title' property if needed
    }
  
    if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    } else {
      // Add sorting logic for other options, e.g., sorting by latest addition
      return 0; // Placeholder, modify as per your actual logic
    }
  };
  


  const [id,setId]=useState(null)

  const dispatch = useDispatch();

  const getData = useSelector((state) => state.articles.articles);

  const isLoading = useSelector((state) => state.articles.isLoading);
  const error = useSelector((state) => state.articles.error);

  const getDataCategory = useSelector(
    (state) => state.articles.articleCategory
  );

  const getDataById = useSelector((state) => state.articles.articleCategoryId);

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getArticleCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getArticleCategoryById(id));
  }, [dispatch, id]);




  const [searchState, setSearchState] = useState('');
  const searchListen = useSelector((state) => state.articles.searchArticles);
  const isLoadingSearch = useSelector((state) => state.articles.isLoadingSearchArticle);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    // Dispatch the thunk action creator when the searchState changes
    dispatch(searchArticle(searchState));
  }, [dispatch, searchState]);

  useEffect(() => {
    // Update searchResults whenever searchListen changes
    setSearchResults(searchListen);
  }, [searchListen]);
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
                {t('articles')}
{" "}
              </h1>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="d-flex justify-content-center align-items-center">
        <Row className="m-3 d-flex" style={{ justifyContent: "space-between" }}>
          <Col
            xs="6"
            md="4"
            lg="2"
            style={{ textAlign: "center", marginBottom: "10px" ,cursor:'pointer'}}
            onClick={()=>setId(null)}
          >
            <div
             style={{
              border: "none",
              borderRadius: "23px",
              width: "124px",
              height: "33.74px",
              background:
                id === null
                  ? "linear-gradient(331.41deg, #D19B6F 6.78%, #F6E5C3 204.87%)"
                  : "linear-gradient(0deg, rgb(232, 232, 232), rgb(232, 232, 232)), linear-gradient(0deg, rgb(245, 245, 245), rgb(245, 245, 245))",
              boxShadow:
              id === null
              ? "0px 3.6861166954040527px 3.6861166954040527px 0px rgba(209, 155, 111, 0.22)": "none"
            }}
            >
  <p style={{color: id === null ? 'white' :  'black', fontWeight: "bold" }}>{t('all')}</p>
            </div>
          </Col>

          {
            getDataCategory ? (
              <>
                {getDataCategory&& getDataCategory.length > 0&&getDataCategory.map((img, index) => (
                  <Col
                    key={index}
                    xs="6"
                    md="4"
                    lg="2"
                    style={{ textAlign: "center", marginBottom: "10px",cursor:'pointer' }}
                    onClick={() => {
                      if (id !== img.id) { 
                        setId(img.id);
                      }
                    }}
                  >

                      <div
                        style={{
                          border: "1.38px solid rgba(232, 232, 232, 1)",
                          borderRadius: "23px",
                          width: "124px",
                          height: "33.74px",
                          background: id === img.id ? 'linear-gradient(331.41deg, rgb(209, 155, 111) 6.78%, rgb(246, 229, 195) 204.87%)' :  "linear-gradient(0deg, #E8E8E8, #E8E8E8),linear-gradient(0deg, #F5F5F5, #F5F5F5)",
                          boxShadow: id === img.id ? "0px 3.6861166954040527px 3.6861166954040527px 0px rgba(209, 155, 111, 0.22)" : 'none'
                        }}
                      >
                         <h6
              style={{
                color: id === img.id ? "white" : "black",
                fontSize: "15px",
                marginTop: "5px",
              }}
            >
              {img.title}
            </h6>
                      </div>
                  </Col>
                ))}
              </>
           
          ) : null}
        </Row>
      </Container>

      <Container>
        <div
          style={{
            marginLeft: "-55px",
            marginBottom: "15px",
            borderBottom: "1.5px solid #EEEEEE ",
            width: "100%",
          }}
        ></div>
        <Row>
          <Col>
            <div className="d-flex justify-content-between mb-4">
              <Form>
                <FormControl
                  type="search"
                  placeholder={t('search')}
                  className="me-2 w-100  search-audio"
                  aria-label="Search"
                  style={{ borderRadius: "25px" }}
                  onChange={(e)=>setSearchState(e.target.value)}
                  required
                />

              <img src={searchIcon}   className="img-search" style={{
                    position: "absolute",
                    marginTop: "-30px",
                    marginRight: "70px",
                    fontSize: "25px",
                    color: "#00000082",
                  }} />
              </Form>

              <div style={{ display: "flex", gap: "10px" }}>
              <img style={{
                    marginRight: "5px",
                    position: "absolute",
                    marginTop: "10px",
                    color: "rgb(219, 176, 134)",
                  }} src={arrowsIcon} />


                <NavDropdown
        title={t('sortBy')}
        id="collapsible-nav-dropdown"
        style={{
          background:
            "linear-gradient(0deg, rgba(209, 155, 111, 0.15), rgba(209, 155, 111, 0.15)),linear-gradient(0deg, rgba(209, 155, 111, 0.1), rgba(209, 155, 111, 0.1))",
          border: "1.5px solid rgba(209, 155, 111, 0.1)",
          borderRadius: "25px",
          padding: "5px 25px 5px 10px",
          color: "rgba(209, 155, 111, 1)",
          fontWeight: "bold",
          fontSize: "13px",
        }}
      >
        <NavDropdown.Item onClick={handleSortByLatest}>
        {t('latestAdded')}
        </NavDropdown.Item>
        <NavDropdown.Item onClick={handleSortAlphabetically}>
        {t('alphabetical')}
        </NavDropdown.Item>
      </NavDropdown>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
      <Row xs={1} md={2} className="g-4 me-auto mb-5">
      {searchState !== '' && searchResults.length > 0 ? (
    searchResults.map((item) => (
      <Col key={item.id}>
                    <Link to={`/articleCard/${item.id}`} style={{ textDecoration: "none" }}>
                      <Card style={{ width: "100%", borderRadius: "15px" }}>
                        <Card.Img variant="top" src={item.image} width={100} height={300} />
                        <Card.Body>
                          <Card.Title style={{ display: "flex" }}>{item.title}</Card.Title>
                          <Card.Text style={{ display: "flex", justifyContent: "space-between" }}>
                            <p style={{ color: "rgba(130, 130, 130, 1)", fontSize: "14px" }}>
                              <img src={clockIcon} alt="" style={{ marginLeft: "8px", color: "rgb(209, 155, 111)", fontSize: "17px" }} />
                              {item.created_at} 
                            </p>
                            <p style={{ color: "rgba(130, 130, 130, 1)", fontSize: "14px" }}>
                              <img src={eyeIcon} style={{ marginLeft: "8px", color: "rgb(209, 155, 111)", fontSize: "20px" }} />
                              {item.visit_count} {t('view')}
                            </p>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
    ))
  ) : searchResults.length === 0 ? (
    <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
          <span>{t('nodata2')}</span></div>
  ) : id == null ? (
    !isLoading ? (
      getData && getData.length > 0 ? 
      [...getData].sort(sortFunction).map((item) => (
        <Col key={item.id}>
        <Link to={`/articleCard/${item.id}`} style={{ textDecoration: "none" }}>
          <Card style={{ width: "100%", borderRadius: "15px" }}>
            <Card.Img variant="top" src={item.image} width={100} height={300} />
            <Card.Body>
              <Card.Title style={{ display: "flex" }}>{item.title}</Card.Title>
              <Card.Text style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ color: "rgba(130, 130, 130, 1)", fontSize: "14px" }}>
                              <img src={clockIcon} style={{ marginLeft: "8px", color: "rgb(209, 155, 111)", fontSize: "17px" }} />
                              {item.created_at} 
                            </p>
                            <p style={{ color: "rgba(130, 130, 130, 1)", fontSize: "14px" }}>
                              <img src={eyeIcon} style={{ marginLeft: "8px", color: "rgb(209, 155, 111)", fontSize: "20px" }} />
                              {item.visit_count} {t('view')}
                            </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
      ))
      : <div style={{ height: "140px" }}></div>
    ) : (
      <div style={{ height: "140px" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    )
  ) : !isLoading ? (
    searchState !== '' && searchResults.length > 0 ? (
      searchResults.map((item) => (
        <Col key={item.id}>
        <Link to={`/articleCard/${item.id}`} style={{ textDecoration: "none" }}>
          <Card style={{ width: "100%", borderRadius: "15px" }}>
            <Card.Img variant="top" src={item.image} width={100} height={300} />
            <Card.Body>
              <Card.Title style={{ display: "flex" }}>{item.title}</Card.Title>
              <Card.Text style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ color: "rgba(130, 130, 130, 1)", fontSize: "14px" }}>
                              <img src={clockIcon} style={{ marginLeft: "8px", color: "rgb(209, 155, 111)", fontSize: "17px" }} />
                              {item.created_at} 
                            </p>
                            <p style={{ color: "rgba(130, 130, 130, 1)", fontSize: "14px" }}>
                              <img src={eyeIcon} style={{ marginLeft: "8px", color: "rgb(209, 155, 111)", fontSize: "20px" }} />
                              {item.visit_count} {t('view')}
                            </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
      ))
    ) : (
      getDataById &&
      Array.isArray(getDataById) &&
      getDataById.length > 0 ? (
        [...getDataById].sort(sortFunction).map((item) => (
          <Col key={item.id}>
          <Link to={`/articleCard/${item.id}`} style={{ textDecoration: "none" }}>
            <Card style={{ width: "100%", borderRadius: "15px" }}>
              <Card.Img variant="top" src={item.image} width={100} height={300} />
              <Card.Body>
                <Card.Title style={{ display: "flex" }}>{item.title}</Card.Title>
                <Card.Text style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "rgba(130, 130, 130, 1)", fontSize: "14px" }}>
                              <img src={clockIcon} style={{ marginLeft: "8px", color: "rgb(209, 155, 111)", fontSize: "17px" }} />
                              {item.created_at} 
                            </p>
                            <p style={{ color: "rgba(130, 130, 130, 1)", fontSize: "14px" }}>
                              <img src={eyeIcon} style={{ marginLeft: "8px", color: "rgb(209, 155, 111)", fontSize: "20px" }} />
                              {item.visit_count} {t('view')}
                            </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        ))
      ) : (
        <div style={{height:'280px'}}><img src={nodata}/> <br/>
          <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
          <span>{t('nodata2')}</span></div>

      )
    )
  ) : (
    <div style={{height:'280px'}}>
      <Spinner animation="border" variant="primary" />
    </div>
  )}
</Row>




</Container>
<ToastContainer/>
    </>
  );
};
export default Articles;