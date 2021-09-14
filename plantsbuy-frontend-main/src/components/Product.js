import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function Product(props) {
  const { product } = props;

  return (
    <div classname="wrapper">
      <Card>
        <Link to={`/product/${product._id}`}>
          <Card.Img variant="top" src={product.image} />
        </Link>
        <Card.Title>
          <Link to={`/product/${product._id}`}>
            <div className="card-title">{product.name}</div>
          </Link>
        </Card.Title>
        <Card.Body>
          <Card.Text>
            <strong className="price">Rs {product.price}</strong>
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
