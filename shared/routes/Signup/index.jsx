import React, { Component, PropTypes } from 'react';
import { Cell } from 'react-mdl';
import steps from './components/steps';
import Multistep from './components/Multistep';
import { createUser } from 'routes/Account/actions';
import { connect } from 'react-redux';

class Signup extends Component {
  static propTypes = {
    Account: PropTypes.object,
    notify: PropTypes.func,
    dispatch: PropTypes.func,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      title: '',
      lastName: '',
      firstName: '',
      email: '',
      username: '',
      password: '',
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      postcode: '',
      country: '',
      zip: '',
      state: '',
      city: '',
      phone: '',
    };
  }

  componentWillMount() {
    const { Account } = this.props;
    if (Account.get('isAuthenticated')) {
      this.context.router.replace('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { notify } = this.props;
    if (nextProps.message) {
      const submit = document.querySelector('.Signup__container--body-fieldrow_submit');
      if (nextProps.Account.get('shouldRedirect')) {
        submit.classList.add('success');
      }
      notify(nextProps.message, this.redirect, 2000, 'Ok');
    }
  }

  onSignup = (finishForm) => {
    finishForm();
    // clear passMatchError propagated from password checking
    delete this.state.passMatchError;
    const { dispatch } = this.props;
    dispatch(createUser({ ...this.state, action: {
      type: 'CREATE_SHOPPER',
    } }));
  };

  saveData = (fields, callback, evt) => {
    evt.preventDefault();
    if (fields !== null && typeof fields !== 'undefined') {
      this.setState(fields, () => {
        callback();
      });
    } else {
      callback();
    }
  };

  redirect = () => {
    const { Account } = this.props;
    const submit = document.querySelector('.Signup__container--body-fieldrow_submit');
    if (Account.get('shouldRedirect')) {
      submit.classList.remove('success');
      setTimeout(() => {
        this.context.router.replace(`/${Account.get('redirectLocation')}`);
      }, 2000);
    }
  };

  render() {
    const { Account } = this.props;
    return (
      <div className="Signup">
        <Cell col={6} tablet={6} phone={4} className="Signup__container mdl-shadow--6dp">
          <div className="Signup__container--header">
            <h4>Create an Account</h4>
          </div>
          <div className="Signup__container--body">
            <Multistep
              steps={steps}
              onCallbackParent={this.saveData}
              fieldValues={this.state}
              onSignup={this.onSignup}
              isWaiting={Account.get('isWaiting')}
            />
          </div>
        </Cell>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Account: state.Account,
  message: state.Account.get('message'),
});

export default connect(mapStateToProps)(Signup);
