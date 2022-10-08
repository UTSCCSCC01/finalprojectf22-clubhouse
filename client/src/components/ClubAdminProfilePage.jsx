import React, { useState } from "react";
import ClubAdminViewProfile from "./ClubAdminViewProfile.jsx";
import ClubAdminEditProfile from "./ClubAdminEditProfile.jsx";
import '../styles.css';
/**
 * ClubAdminProfilePage
 * @component
 */
function ClubAdminProfilePage(props) {
  const currentvalues = {
    
    clubName: props.clubName,
    description: props.description,
    phoneNumber: props.phoneNumber,
    email: props.email
  };
 

  const [profileInfo, setProfileInfo] = useState(currentvalues);
  const [editMode, setEditMode] = useState(false);
  /**
 * <sets the edit mode to true when button clicked>

 */
  function editHandleClick() {
    setEditMode(true);
  }
/**
 * <handles the changes for profile infor when the club admin saves their edits>
 */
  function handleChange(event) {
    const { name, value } = event.target;

    setProfileInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }


  /**
 * <sets the edit mode to false>
 */
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
