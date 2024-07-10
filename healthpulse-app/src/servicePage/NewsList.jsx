import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import useNewsData from "../hooks/useNewsData";
import CustomPagination from "./CustomPagination.js";
import "../style/servicePage/NewsList.css";

import banner from "../images/banner/kidsCorner.mp4";

import Background from "../components/basicComponents/Background";
import Base from "../components/Base";

const NewsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const { newsData = [], loading, error } = useNewsData("health", "en");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const totalArticles = newsData.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArticles = newsData.slice(startIndex, endIndex);

  return (
    <div>
      <Background />
      <Base>
        <div className="main">
          <div className="video-container">
            <video src={banner} autoPlay loop muted></video>
          </div>
          <Container>
            <Row>
              <Col xs={12} className="text-center">
                <h3 className="my-4 news-heading">Health News</h3>
              </Col>
            </Row>
            <Row>
              {currentArticles.map((article) => (
                <Col xs={12} md={6} lg={4} key={article.url} className="mb-4">
                  <Card className="news-card">
                    <Card.Img
                      src={article.image}
                      variant="top"
                      className="news-card-img"
                    />
                    <Card.Body>
                      <Card.Title className="news-card-title">
                        {article.title}
                      </Card.Title>
                      <Card.Text className="news-card-text">
                        {article.description}
                      </Card.Text>
                      <Card.Link href={article.url} className="news-card-link">
                        Read More
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </Container>
        </div>
      </Base>
    </div>
  );
};

export default NewsList;
