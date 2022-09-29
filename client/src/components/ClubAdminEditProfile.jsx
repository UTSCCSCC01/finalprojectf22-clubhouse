import React from "react";

function ClubAdminEditProfile(props) {
  return (
    <div className="ClubAdminProfilePage">
      <h1 style={{ textAlign: "center" }}> Profile</h1>
      <div className="info">
        <form>
          <div className="ClubProfileImgContainer">
            <img
              className="img2"
              src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
              alt="profile-picture"
            />

            <h3> Contact Info:</h3>
            <input
              name="email"
              onChange={props.onChange}
              value={props.values.email}
              placeholder="Email"
            />

            <p>
              <input
                name="phoneNumber"
                onChange={props.onChange}
                value={props.values.phoneNumber}
                placeholder="Phone Number"
              />
            </p>
          </div>
          <button
            className="profileEditButton"
            type="submit"
            onClick={props.editDone}
          >
            Done<span role="img">✅</span>
          </button>

          <h2>{props.values.clubName}</h2>
          <textarea
            name="description"
            onChange={props.onChange}
            className="clubEditDecription"
            value={props.values.description}
            placeholder="Description of Club..."
          ></textarea>
        </form>
      </div>
    </div>
  );
}

export default ClubAdminEditProfile;
