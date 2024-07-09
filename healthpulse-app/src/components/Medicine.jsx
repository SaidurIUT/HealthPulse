import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button,
} from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
import { useState, useEffect } from "react";

const Medicine = ({ medicine, deleteMedicine }) => {
  const cardStyle = {
    marginBottom: "20px",
    textAlign: "center",
  };

  const imgStyle = {
    height: "150px",
    objectFit: "cover",
  };

  const truncateDescription = (description) => {
    if (description.length > 40) {
      return description.substring(0, 40) + "...";
    }
    return description;
  };
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    setUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);
  return (
    <Card style={cardStyle}>
      <CardImg
        top
        width="100%"
        src={medicine.imageUrl || "https://via.placeholder.com/150"}
        alt={medicine.name}
        style={imgStyle}
      />
      <CardBody>
        <CardTitle tag="h5">{medicine.name}</CardTitle>
        <CardText>{truncateDescription(medicine.description)}</CardText>
        <CardText>Price: ${medicine.price}</CardText>
        <CardText>Quantity: {medicine.quantity}</CardText>
        <Button className="button small-button">View Details</Button>
        <Button color="primary" className="ml-2 button small-button">
          Add to cart
        </Button>

        {user &&
          (user.roles[0].id === 501 ? (
            <>
              <Button color="danger" onClick={deleteMedicine}>
                Delete
              </Button>
            </>
          ) : null)}
      </CardBody>
    </Card>
  );
};

export default Medicine;
