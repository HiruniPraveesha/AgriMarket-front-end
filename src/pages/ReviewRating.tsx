import React, { useState } from 'react';
import { Rate } from 'antd';
import carrot from "../assets/Carrot.png";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { Button } from 'react-bootstrap'; // Import Bootstrap Button component

const App: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleChange = (value: number) => {
    setRating(value);
    console.log(`Selected ${value} stars`);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 60) {
      setComment(event.target.value);
    }
  };

  const handleSubmit = () => {
    // Logic for submitting the rating and comment goes here
    console.log('Submitting rating:', rating);
    console.log('Submitting comment:', comment);
  };

  const productId = 'ABC123'; // Example order ID, replace with your actual order ID

  return (
    <div className="container mt-5">
      <h5 className="mb-2" style={{ color: '#00BA29' }}>
        Rate this product
      </h5>
      <div className="mb-4">Product ID: {productId}</div>
      <img
        src={carrot}
        alt="Product"
        className="img-fluid mb-4"
        style={{
          display: 'block',
          margin: '0 auto', // Center the image
          border: '1px solid black', // Add black border
        }}
      />
      <div className="p-3 border rounded mb-3">
        <Rate onChange={handleChange} />
      </div>
      <p className="mt-3" style={{ fontSize: '12px' }}>
        You have rated: {rating} stars
      </p>
      <div className="form-group">
        <label htmlFor="comment" style={{ color: '#00BA29', fontSize: '17px', marginBottom: '5px' }}>
          Write a comment (60 characters max):
        </label>
        <textarea
          id="comment"
          className="form-control"
          value={comment}
          onChange={handleCommentChange}
          maxLength={60}
          rows={3}
        />
        <p className="mt-3" style={{ fontSize: '12px' }}>
          {comment.length}/60 characters used
        </p>
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleSubmit} 
          style={{ backgroundColor: '#00BA29', border: 'none' }}
          onMouseOver={(e) => (e.currentTarget.style.boxShadow = '1px 1px 2px 2px rgba(0, 0, 0, 0.2)')}
          onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 3px 7px rgba(0, 0, 0, 0.1)')}
          >Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default App;
