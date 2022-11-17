import React from "react";
import EventCard from "./EventCard.jsx";
import { useEffect,useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Fab from '@mui/material/Fab'
import EditIcon from '@mui/icons-material/Edit';
import { Clear } from "@mui/icons-material";
import { Container, Grid, Skeleton } from "@mui/material";
import { Stack } from "@mui/system";

/**
 * StudentClubProfile
 * @component
 */
function StudentClubProfile(props) {
  const url = 'http://127.0.0.1:5001/club/events';
  
  const [isMore,setisMore] = useState(true);
  const [items, setItems ] = useState([]);
  const [page, setPage] = useState(2);
  const [clubName, setClubName] = useState(props.clubName);
  const [noitem, setNoitem] = useState(false);
    /**
 * <Gets page 1 of events from the database>
 */
  useEffect(() => {
  const getevents = async ()=>{
  const res = await fetch(url+"?page=1"+"&clubName="+clubName);
    const data = await res.json();
    setItems(data);
    if (data.length <=0 ){
      setisMore(false);
      setNoitem(true)
    }
  };
  
    getevents();
  },[]);

 
  /**
 * <function description>

 * @returns  {Promise<Object>}        <returns the events depending on the page number from the database>
 */
    const fetchData = async() => {
     const res = await fetch(url+'?page='+page+"&clname="+clubName);
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
        const res = await fetch("http://127.0.0.1:5001/club/profileimg");
        const data = await res.json();
        
        setImage(data);
        
        
      }
      fetchImage();
    });
    
  return (
    
    <div class="mui-container-fluid" className="ClubAdminProfilePage">
        <Container style={{padding:'10'}}>
         <Fab  aria-label="edit"
          className="profileEditButton2"
          type="submit"
          color="primary"
          
          onClick={props.close}>
        <Clear/>
      </Fab>
      
      
      <h1 style={{ textAlign: "center" }}> Profile</h1>
      </Container>
      
        
      
      
     <img
            className="img2"
            src={props.img}
            alt="profile-picture"
          />
           
      <div className="adminchild" >
        
      <div className="info">
      
      <h2  style={{ textAlign: "center" }}>{props.clubName}</h2>

          
          <div color="#FFE498" className="viewdesc" style = {{float: "right", width:"60%", margin:"5px", display: "inline-block", padding:"5px"}}>
        
        <p style={{paddingLeft:"5px"}}>{props.description}</p>
        </div>

        <div className="contactinfo">
        <h3> Contact Info:</h3>
          <p > Email: {props.email}</p>
          <p> Phone Number: {props.phoneNumber} </p>
          </div>
      </div>

      <div className="cardcont">
      <h2 style={{ textAlign: 'center' }}>My Events</h2>
      <div id="scrollableDiv" className="evenCard">
      
      <InfiniteScroll  
      dataLength={items.length} //This is important field to render the next data
      next={fetchd}
     hasMore={isMore}
     scrollableTarget="scrollableDiv"
      loader={<h4>Loading...</h4>}
      endMessage={ noitem ? (
        <div>
    <p style={{ textAlign: 'center', width:'300'}}>
      <b> No more events!  </b>
    </p> 
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton sx={{ bgcolor: '#7ba4d9' }} variant="rounded" width={350} height={200} />
      <Skeleton sx={{ bgcolor: '#7ba4d9' }} variant="rounded" width={350} height={60} />
      <Skeleton sx={{ bgcolor: '#7ba4d9' }} variant="rounded" width={350} height={60} />
    </Stack>
     </div>
      ):(<p style={{ textAlign: 'center', width:'300'}}>
      <b> No more events!  </b>
    </p> )
  }>
        {items.map((item) => {
            return  <EventCard key={item._id} cName={item.clubName} eName={item.eventName} eDate={item.eventDate} eJoin={item.eventJoin} eImage={item.eventImage} eStartTime={item.eventStartTime} eEndTime={item.eventEndTime} eLoc={item.eventLoc} eTags={item.eventTags} eDesc={item.eventDesc}/>
        }
        ) }
      </InfiniteScroll>
      </div>


   </div>
   </div>
      
      
    </div>
    
  );
}  


export default StudentClubProfile;
