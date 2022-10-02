import React from "react";

import MultiActionAreaCard from "./EventCard.jsx";

import { useEffect,useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
function ClubAdminEditProfile(props) {
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
    <body className="ClubAdminProfilePage">
      <h1 style={{ textAlign: "center" }}> Profile</h1>
      <div className="adminchild" >
      <div className="info">
        <form>
          <div className="ClubProfileImgContainer">
            <img
              className="img2"
              src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
              alt="profile-picture"
            />

            <h3> Contact Info:</h3>
           <>Email: </> 
            <input
            
              name="email"
              onChange={props.onChange}
              value={props.values.email}
              placeholder="Email"
            />
            <h5></h5>
            <p>
            <>Phone Number:</>
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
            return <MultiActionAreaCard key={item._id} eName={item.eventName} eJoin={item.eventJoin} eDesc={item.eventDesc}/>
        }
        ) }
          
      </InfiniteScroll>
      </div>


        </div>
      </div>
      
     
      
    </body>
  );
}

export default ClubAdminEditProfile;
