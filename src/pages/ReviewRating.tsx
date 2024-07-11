import React, { useState, useEffect } from "react";
import { Rate } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const App: React.FC<{}> = ({}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [submissionStatus, setSubmissionStatus] = useState<string>("Submit");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { productId } = useParams();
  const [product, setProduct] = useState<any>({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/${productId}`)
      .then((response) => {
        console.log("Fetched product:", response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [productId]);

  const handleChange = (value: number) => {
    setRating(value);
    console.log(`Selected ${value} stars`);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.value.length <= 60) {
      setComment(event.target.value);
    }
  };

  const handleSubmit = async () => {
    const buyerIdString = localStorage.getItem("sellerId");
    const buyerId = buyerIdString;

    if (buyerId === null) {
      console.error("Buyer ID is missing");
      alert("Please log in or register to submit a review.");
      return;
    }

    if (!product.product_id) {
      console.error("Product ID is missing");
      return;
    }

    try {
      const reviewData = {
        rating,
        comment,
        productId: parseInt(product.product_id),
        buyerId: parseInt(buyerId),
      };

      console.log("Submitting review with data:", reviewData);

      const response = await axios.post(
        `http://localhost:8080/reviews`,
        reviewData
      );
      console.log("Review submitted successfully:", response.data);
      setSubmissionStatus("Submitted");
      setIsDisabled(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error submitting review:", error.message);
        if (error.response) {
          console.error("Response data:", error.response.data); // Log response data here
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Unexpected error:", error);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div
      className="container"
      style={{
        width: "70%",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #00BA29",
        borderRadius: "8px",
        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
        marginTop: "20px",
      }}
    >
      <h5 className="mb-2" style={{ color: "#00BA29" }}>
        Rate this product
      </h5>
      <div className="mb-4">
        <p style={{ fontSize: "14px" }}>{product.name}</p>
      </div>
      <img
        src={product.image1}
        alt="Product"
        className="img-fluid mb-4"
        style={{
          display: "block",
          margin: "0 auto",
          border: "1px solid black",
          width: "30%",
          height: "auto",
        }}
      />
      <div className="p-3 border rounded mb-3">
        <Rate onChange={handleChange} value={rating} disabled={isDisabled} />
      </div>
      <p className="mt-3" style={{ fontSize: "12px" }}>
        You have rated: {rating} stars
      </p>
      <div className="form-group">
        <label
          htmlFor="comment"
          style={{ color: "#00BA29", fontSize: "17px", marginBottom: "5px" }}
        >
          Write a comment (60 characters max):
        </label>
        <textarea
          id="comment"
          className="form-control"
          value={comment}
          onChange={handleCommentChange}
          maxLength={60}
          rows={3}
          style={{ resize: "none" }}
          disabled={isDisabled}
        />
        <p className="mt-3" style={{ fontSize: "12px" }}>
          {comment.length}/60 characters used
        </p>
        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            onClick={handleSubmit}
            style={{ backgroundColor: "#00BA29", border: "none" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.boxShadow =
                "1px 1px 2px 2px rgba(0, 0, 0, 0.2)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.boxShadow = "0 3px 7px rgba(0, 0, 0, 0.1)")
            }
            disabled={isDisabled}
          >
            {submissionStatus}
          </Button>
        </div>
        {submissionStatus === "Submitted" && (
          <p className="mt-3" style={{ color: "#00BA29", fontSize: "14px" }}>
            Your review has been submitted successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
