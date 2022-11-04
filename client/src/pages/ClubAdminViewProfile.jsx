import React from "react";
import MultiActionAreaCard from "./EventCard.jsx";
import EventCard from "./StudentEventCard.jsx";
import { useEffect,useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Fab from '@mui/material/Fab'
import EditIcon from '@mui/icons-material/Edit';
import { getCookie } from '../libraries/cookieDAO'
/**
 * ClubAdminViewProfile
 * @component
 */
function ClubAdminViewProfile(props) {
  const url = 'http://127.0.0.1:5001/club/events';
  
  const clubName = getCookie("clubName");
  // console.log(props.values);
  const [isMore,setisMore] = useState(true);
  const [items, setItems ] = useState([]);
  const [page, setPage] = useState(2);
    /**
 * <Gets page 1 of events from the database>
 */

  
  useEffect(() => {
  const getevents = async ()=>{

  const res = await fetch(url+"?page=1"+ "&clubName=" + clubName);

    const data = await res.json();
    setItems(data);
  };
  
    getevents();
  },[]);

 
  /**
 * <function description>

 * @returns  {Promise<Object>}        <returns the events depending on the page number from the database>
 */
    const fetchData = async() => {

     const res = await fetch(url+'?page='+page+"&clubName="+clubName);

      const data = await res.json();
      
      return data;
    };
/**
 * < increments the page number by 1 and if there are no events left it sets the variable isMore to false>
 * 
 */
    const fetchd = async () => {
      const eventfromserv = await fetchData();
    
      setItems([...items, ...eventfromserv]);
      if(eventfromserv.length === 0 || eventfromserv.length <1){
        setisMore(false);
      }
      
      setPage(page+1);
    }
    const [image,setImage] = useState('');

    /**
 * <fetches the image base64 string and sets image to that>
 * 
 */
    useEffect(() => {
      const fetchImage = async()=>{
        const res = await fetch("http://127.0.0.1:5001/club/profileimg/" + clubName);
        const data = await res.json();
        
        setImage(data);
        
        
      }
      fetchImage();
    });
    
  return (
    
    <div class="mui-container-fluid" className="ClubAdminProfilePage">
      <h1 style={{ textAlign: "center" }}> Profile</h1>
      

     <img
            className="img2"
            src={image}
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

          
          <div color="#FFE498" className="viewdesc" style = {{float: "right", width:"55%", margin:"5px", display: "inline-block", padding:"5px", marginTop:"50px", marginRight:"0px"}}>
        
        <p style={{paddingLeft:"5px"}}>{props.values.clubDesc}</p>
        </div>

        <div className="contactinfo">
        <h3> Contact Info:</h3>
          <p > Email: {props.values.email}</p>
          <p> Phone Number: {props.values.clubPhone} </p>
          </div>
      </div>

      <div className="cardcont">
      <h2 style={{ textAlign: 'center' }}>My Events</h2>
      <div id="scdiv" className="evenCard">
      
      <InfiniteScroll  
      dataLength={items.length} //This is important field to render the next data
      next={fetchd}
     hasMore={isMore}
     scrollableTarget="scdiv"
      loader={<h4>Loading...</h4>}
      endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p> }>
        {items.map((item) => {
            return <EventCard key={item._id} cName={item.clubName} eName={item.eventName} eDate={item.eventDate} eJoin={item.eventJoin} eImage={item.eventImage} eStartTime={item.eventStartTime} eEndTime={item.eventEndTime} eLoc={item.eventLoc} eTags={item.eventTags} eDesc={item.eventDesc}/>
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
