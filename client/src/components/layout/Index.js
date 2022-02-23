import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Index = (props) => {
  return (
    <div className="container">
      <div className="index">
        <h1>The Smarter Way To Play Tennis Locally</h1>
        <div className="index-link">
          <Link to="/find-players" className="btn">
            Find players
          </Link>
          <Link to="/courts" className="btn">
            Find courts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
