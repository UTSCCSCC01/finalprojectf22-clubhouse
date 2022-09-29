import React from "react";

function ClubAdminViewProfile(props) {
  return (
    <div className="ClubAdminProfilePage">
      <h1 style={{ textAlign: "center" }}> Profile</h1>
      <div className="info">
        <div className="ClubProfileImgContainer">
          <img
            className="img2"
            src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
            alt="profile-picture"
          />
          <h3> Contact Info:</h3>
          <p> Email: {props.values.email}</p>
          <p> Phone Number: {props.values.phoneNumber}</p>
        </div>
        <button
          className="profileEditButton"
          type="submit"
          onClick={props.onClick}
        >
          Edit<span role="img">✒️</span>
        </button>
        <h2>{props.values.clubName}</h2>
        <p>{props.values.description}</p>
      </div>
    </div>
  );
}

export default ClubAdminViewProfile;
