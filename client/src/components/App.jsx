import React, { Component } from 'react';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:5001/record").then( response => response.text()).then(body => this.setState({data: JSON.parse(body)})); // setState remounts the comp
  }

  render() {
    return (
      <table>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Level</th>
        </tr>
      {this.state.data.map( (v,i) => (
        <tr key={v._id}>
          <td>{v.name}</td>
          <td>{v.position}</td>
          <td>{v.level}</td>
        </tr>
      ))}
      </table>
    );
  }
}


export default App;