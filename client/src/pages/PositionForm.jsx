import React from "react";

export default class PositionForm extends React.Component {
  state = {
    clubName: "",
    jobPosition: "",
    jobDescription: "",
    jobRequirements: ""
  };

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      clubName: "",
      jobPosition: "",
      jobDescription: "",
      jobRequirements: ""
    });
    this.props.onChange({
      clubName: "",
      jobPosition: "",
      jobDescription: "",
      jobRequirements: ""
    });
  };

  render() {
    return (
      <form>
      <input
          name="clubName"
          placeholder="Club Name"
          value={this.state.clubName}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="jobPosition"
          placeholder="Job Position"
          value={this.state.jobPosition}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="jobDescription"
          placeholder="Job Description"
          value={this.state.jobDescription}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="jobRequirements"
          placeholder="Job Requirements"
          value={this.state.jobRequirements}
          onChange={e => this.change(e)}
        />
        <br />
        <button onClick={e => this.onSubmit(e)}>Submit Posting</button>
      </form>
    );
  }
}