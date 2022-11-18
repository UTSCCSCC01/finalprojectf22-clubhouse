import React from "react";
import { useEffect,useState } from 'react';
import ClubAdminViewProfile from "./ClubAdminViewProfile.jsx";
import ClubAdminEditProfile from "./ClubAdminEditProfile.jsx";
import '../styles.css';
import { getCookie } from '../libraries/cookieDAO'
import Auth from '../components/AuthCheck.jsx';

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
 
  

  const [profileInfo, setProfileInfo] = useState({});
  const [editMode, setEditMode] = useState(false);

  
  const clubName = getCookie("clubName");
  useEffect( ()  => {
    Auth({student: "/allclubs", nonauth: "/login", admin: "/SCSUClubs"});
    const fetchpotmembers = async () => {
        const res = await fetch("http://127.0.0.1:5001/club/profile/" + clubName);
        const data = await res.json();
        setProfileInfo(data);
        // console.log(data);
      }
fetchpotmembers();

}, []);
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
  function doneEditing(id) {

    const updateProfile = async () => {
      fetch('http://localhost:5001/club/profile/' + id, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileInfo)
    }).then(() => {
      setEditMode(false);
    }).catch((err) => {
        console.log(err);
    })

}

updateProfile();
 
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
