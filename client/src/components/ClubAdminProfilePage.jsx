import React, { useState } from "react";
import ClubAdminViewProfile from "./ClubAdminViewProfile.jsx";
import ClubAdminEditProfile from "./ClubAdminEditProfile.jsx";
function ClubAdminProfilePage(props) {
  const currentvalues = {

    clubName: props.clubName,
    description: props.description,
    phoneNumber: props.phoneNumber,
    email: props.email
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

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  
  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    console.log(uploadedImage);
  };



  return editMode ? (
    <ClubAdminEditProfile
      editDone={doneEditing}
      onChange={handleChange}
      values={profileInfo}
      handleImageUpload={handleImageUpload}
      imageUploader={imageUploader}
      uploadedImage={uploadedImage}

    />
  ) : (
    <ClubAdminViewProfile onClick={editHandleClick} values={profileInfo} uploadedImage={uploadedImage}/>
  );
}

export default ClubAdminProfilePage;
