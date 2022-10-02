import React, { useState } from "react";
import ClubAdminViewProfile from "./ClubAdminViewProfile.jsx";
import ClubAdminEditProfile from "./ClubAdminEditProfile.jsx";
function ClubAdminProfilePage() {
  const currentvalues = {
    clubName: "yello",
    description: "r",
    phoneNumber: "d",
    email: "g"
  };

  const [profileInfo, setProfileInfo] = useState(currentvalues);
  const [editMode, setEditMode] = useState(false);

  function editHandleClick() {
    setEditMode(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setProfileInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function doneEditing() {
    setEditMode(false);
  }
  return editMode ? (
    <ClubAdminEditProfile
      editDone={doneEditing}
      onChange={handleChange}
      values={profileInfo}
    />
  ) : (
    <ClubAdminViewProfile onClick={editHandleClick} values={profileInfo} />
  );
}

export default ClubAdminProfilePage;
