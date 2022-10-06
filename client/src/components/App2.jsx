import "../styles.css";
import React from "react";
import ClubAdminProfilePage from "./ClubAdminProfilePage.jsx";
export default function App2() {
  return (
    <div className="App">
      <ClubAdminProfilePage 
      email = "email"
      description = "description"

      phoneNumber = "1234567890"
      clubName = "Club Name"
      />
    </div>
  );
}
