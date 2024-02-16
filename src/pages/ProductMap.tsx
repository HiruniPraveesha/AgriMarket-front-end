import React from "react";

export default function App() {
  return (
    <div className="container">
      <div className="row w-100">
        <div className="col-lg-4 my-4 d-flex align-items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.271597275592!2d80.70525401477377!3d7.873054094345983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2480baef06707%3A0x255a1f345b0a3ba3!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1644329821503!5m2!1sen!2sus"
            className="w-100"
            height="600"
            loading="lazy"
          ></iframe>
        </div>
        <div className="col-lg-8 my-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.271597275592!2d80.70525401477377!3d7.873054094345983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2480baef06707%3A0x255a1f345b0a3ba3!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1644329821503!5m2!1sen!2sus"
            className="w-100"
            height="600"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
