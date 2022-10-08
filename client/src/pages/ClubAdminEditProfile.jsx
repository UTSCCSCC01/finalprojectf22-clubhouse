import React from "react";
import TextField from '@mui/material/TextField';
import MultiActionAreaCard from "./EventCard.jsx";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useEffect,useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
function ClubAdminEditProfile(props) {
  const url = 'http://127.0.0.1:5001/club/events';
  
  const [isMore,setisMore] = useState(true);
  const [items, setItems ] = useState([]);
  
  const [page, setPage] = useState(2);
  /**
 * <Gets page 1 of events from the database>
 */
  useEffect(() => {
  const getevents = async ()=>{
  const res = await fetch(url+"?page=1");
    const data = await res.json();
    setItems(data);
  };
  
    getevents();
  },[]);

  const style = {
    input: {
      color: "white",
    },
    "& .MuiInputLabel-root": {color: 'white'},
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
      '&:hover fieldset': {
        borderColor: 'lightBlue',
      },
      "& fieldset": { borderColor: "white" }
    },
    '& label.Mui-focused': {
      color: 'lightBlue',
    }
  }
  /**
 * function description
 * @returns  {Promise<Object>}        returns the events depending on the page number from the database
 */
    const fetchData = async() => {
     const res = await fetch(url+'?page='+page);
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
 * <gets the image field from the database for the clubs profile sets image to the data url>
      
 * 
 */
  useEffect(() => {
  const fetchImage = async()=>{
    const res = await fetch("http://127.0.0.1:5001/club/profileimg");
    const data = await res.json();
    
    setImage(data);
    
  }
});
/**
 * <trigger for when image upload is unsuccesful. Sets Open to true>


 */
const handleClick = () => {
  setOpen(true);
};
/**
 * <sets Open to false when someone closes the alert>
 

 

 */
const handleClose = () => {


  setOpen(false);
};
  /**
 * <gets the base64 string for the image and updates it in the database.>
 * @param   {Object} input <The uploaded image>
 
 */
  const imagechange = (input)=> {

    let file = input.target.files[0];
  
    let reader = new FileReader();
  
    reader.readAsDataURL(file);
    reader.onload = function() {
      
      var lins = reader.result.toString();
      setImage(lins);
      console.log(lins);
      
      fetch('http://127.0.0.1:5001/club/picupdate', {
method: 'PATCH', // or 'PUT'
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({'image':lins}),
})
.then((response) => response.json())
.then((data) => {

})
.catch((error) => { 
handleClick();

console.error('Error:', error);
});         
    };
    reader.onerror = function() {
      console.log(reader.error);
    };
  }
const [open, setOpen] = useState(false);
  return (
    <div class="mui-container-fluid" className="ClubAdminProfilePage">
      <h1 style={{ textAlign: "center" }}> Profile</h1>
     <div className="img2">
      <input type="file"
        accept="image/*"
        onChange={imagechange}
        
        style={{
          
        }} />
      <div 
          
          >
      <img  
              className="img2"
              alt={' for profile'}
              src = {image}
              id = "myim"
          style={{
            
            width: "100%",
            height: "100%",
            position: "absolute"}}
            />
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Image Upload Unsuccesful:
          Choose another Image!
        </Alert>
      </Snackbar>
      </div>

      </div>
      <div className="adminchild" >
      <div className="info">
        
        <form>
          
          
          
            <h2 style={{ textAlign: "center"}}>{props.values.clubName}</h2>
            
            
            <textarea
            name="description"
            onChange={props.onChange}
            className="clubEditDecription"
            value={props.values.description}
            placeholder="Description of Club..."
          ></textarea>
            <div className="contactinfo">
             <h3 > Contact Info:</h3>
             <p>
           <TextField id="emailEdit" label="Email" variant="outlined"
              name="email"
              sx={style}
              style = {{display: "inline-block", margin:"5px"}}
              // inputProps={{ style: { fontFamily: 'nunito', color: 'white'}}}
              onChange={props.onChange}
              value={props.values.email}
            />
            </p>
           
            <p><TextField id="phoneEdit" label="Phone Number" variant="outlined"
              //  style={{width: "90px", margin:"5px"}}
               sx={style}
               style={{display: "inline-block", margin:"5px"}}
                name="phoneNumber"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
                onChange={props.onChange}
   
                value={props.values.phoneNumber}
                placeholder="Phone Number"
              />
              </p>
             </div>
               <button
            className="profileDoneButton"
            type="submit"
            onClick={props.editDone}
          >
            Done<span role="img">✅</span>
          </button>
            
            

        </form>
        
      </div>
      <div className="cardcont">
      <h2 style={{ textAlign: 'center' }}>My Events</h2>
      <div className="evenCard">
      <InfiniteScroll  
      dataLength={items.length} //This is important field to render the next data
      next={fetchd}
     hasMore={isMore}
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
      
     
      
    </div>
  );
}

export default ClubAdminEditProfile;
