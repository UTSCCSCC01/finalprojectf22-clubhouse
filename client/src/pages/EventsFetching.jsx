import React, { Component } from 'react';
import Container from '@mui/material/Container';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {"clubName": "", 
        "eventName": "", 
         "eventDesc": "", 
         "eventJoin": "",
         "eventDate": null, 
         "eventTags": []
        }]
    };
    
  }

componentDidMount() {
  fetch("http://127.0.0.1:5001/events").then( 
  response => response.text()).then(body => this.setState({data: JSON.parse(body)}));
  // setState remounts the comp
}

// useEffect( () => {
//   fetch("http://127.0.0.1:5001/events").then( response =>
//     response.json().then(data => {
//     })
//   );
// }, []);




render() {
  return (
    <Container>

      <table>
        <tr>
          <th>clubName</th>
          <th>eventName</th>
          <th>eventDesc</th>
          <th>eventJoin</th>
          <th>eventDate</th>
          <th>eventTags</th>
        </tr>
      {this.state.data.map( (v,i) => (
        <tr key={v._id}>
          <td>{v.clubName}</td>
          <td>{v.eventName}</td>
          <td>{v.eventDesc}</td>
          <td>{v.eventJoin}</td>
          <td>{v.eventDate}</td>
          <td>{v.eventTags}</td>
        </tr>
      ))}
      </table>
      </Container>
    );
  }
}


export default Events;

