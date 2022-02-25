import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in" className="header-link">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="header-link">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="menu-container">
      <div className="header">
        <div className="header-left">
          <Link to="/">Tennis Meetup</Link>
        </div>
        <div className="header-middle">
          <Link to="/messenger" className="message-link">Messages</Link>
          <Link to="/my-user-profile" className="profile-link">Profile</Link>
          <Link to="/join-room" className="join-room-link">Join Chat Room</Link>
        </div>
        <div className="header-right">
          <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
