import React, { Component } from "react";
import "../posStyles.css";
import PositionForm from "./PositionForm.jsx";

class PositionPage extends Component {
  state = {
    fields: {}
  };

  onChange = updatedValue => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedValue
      }
    });
  };

  render() {
    return (
      <div className="PositionPage">
        <PositionForm onChange={fields => this.onChange(fields)} />
        <p>
          {JSON.stringify(this.state.fields, null, 2)}
        </p>
      </div>
    );
  }
}

export default PositionPage;