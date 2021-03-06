import React, { Component, PropTypes } from 'react';
import { Button, Textfield } from 'react-mdl';

class StepOne extends Component {
  static propTypes = {
    onCallbackParent: PropTypes.func,
    next: PropTypes.number,
    previous: PropTypes.number,
    index: PropTypes.number,
    fieldValues: PropTypes.object,
  };

  onChange = evt => this.setState({ [evt.target.name]: evt.target.value });

  render() {
    return (
      <form
        className="Signup__container--step"
        onSubmit={this.props.onCallbackParent(this.state, this.props.next)}
      >
        <div className="Signup__container--body-fieldrow doubly">
          <Textfield
            label="Title"
            floatingLabel
            onChange={this.onChange}
            pattern="^[a-zA-Z ]{2,30}$"
            error="invalid input"
            name="title"
            defaultValue={this.props.fieldValues.title}
          />
          <Textfield
            label="Last Name"
            floatingLabel
            onChange={this.onChange}
            name="lastName"
            pattern="^[a-zA-Z ]{2,30}$"
            error="invalid input"
            required
            defaultValue={this.props.fieldValues.lastName}
          />
        </div>
        <div className="Signup__container--body-fieldrow">
          <Textfield
            label="First Name"
            floatingLabel
            onChange={this.onChange}
            name="firstName"
            pattern="^[a-zA-Z ]{2,30}$"
            error="invalid input"
            required
            defaultValue={this.props.fieldValues.firstName}
          />
        </div>
        <div className="Signup__container--body-fieldrow actions">
        {
          (this.props.index !== 0) &&
            <Button raised className="" onClick={this.props.previous}>Prev</Button>
        }
          <Button raised primary type="submit" style={{ marginLeft: '25%' }}>Next</Button>
        </div>
      </form>
    );
  }
}

export default React.createFactory(StepOne);
