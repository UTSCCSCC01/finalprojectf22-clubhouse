import React from "react";
import MultiActionAreaCard from "./EventCard.jsx";
import { ContainerClassKey } from "@material-ui/core";
import { useEffect,useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Fab from '@mui/material/Fab'
import EditIcon from '@mui/icons-material/Edit';


function ClubAdminViewProfile(props) {
  const url = 'http://127.0.0.1:5001/club/events';
  
  const [noMore,setnoMore] = useState(true);
  const [items, setItems ] = useState([]);
  const [page, setPage] = useState(2);
  useEffect(() => {
  const getevents = async ()=>{
  const res = await fetch(url+"?page=1");
    const data = await res.json();
    setItems(data);
  };
  
    getevents();
  },[]);

 

    const fetchData = async() => {
     const res = await fetch(url+'?page='+page);
      const data = await res.json();
      console.log(data,page);
      return data;
    };

    const fetchd = async () => {
      const eventfromserv = await fetchData();
    
      setItems([...items, ...eventfromserv]);
      if(eventfromserv.length === 0 || eventfromserv.length <1){
        setnoMore(false);
      }
      
      setPage(page+1);
    }
    
  return (
    
    <div class="mui-container-fluid" className="ClubAdminProfilePage">
      <h1 style={{ textAlign: "center" }}> Profile</h1>
      

     <img
            className="img2"
            ref={props.uploadedImage}
            alt="profile-picture"
          />
           
      <div className="adminchild" >
        
      <div className="info">
      <Fab  aria-label="edit"
          className="profileEditButton"
          type="submit"
          color="primary"
          
          onClick={props.onClick}>
        <EditIcon />
      </Fab>
      <h2  style={{ textAlign: "center" }}>{props.values.clubName}</h2>

          
          <div color="#FFE498" className="viewdesc" style = {{float: "right", width:"60%", margin:"5px", display: "inline-block", padding:"5px"}}>
        
        <p style={{paddingLeft:"5px"}}>{props.values.description}</p>
        </div>

        <div className="contactinfo">
        <h3> Contact Info:</h3>
          <p > Email: {props.values.email}</p>
          <p> Phone Number: {props.values.phoneNumber} </p>
          </div>
      </div>

      <div className="cardcont">
      <h2 style={{ textAlign: 'center' }}>My Events</h2>
      <div className="evenCard">
      
      <InfiniteScroll  
      dataLength={items.length} //This is important field to render the next data
      next={fetchd}
     hasMore={noMore}
      loader={<h4>Loading...</h4>}
      endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p> }>
        {items.map((item) => {
            return <MultiActionAreaCard key={item._id} eName={item.eventName} eDesc={item.eventDesc} eJoin={item.eventJoin}/>
        }
        ) }
      </InfiniteScroll>
      </div>


   </div>
   </div>
      
      
    </div>
    
  );
}  


export default ClubAdminViewProfile;
