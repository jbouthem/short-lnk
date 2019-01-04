import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Accounts } from 'meteor/accounts-base';

export default class Signup extends Component {
  constructor(props) {
      super(props);
      this.state = {
        error: ''
      };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9) {
      return this.setState({error: 'Passwords must be at least 9 characters long.'});
    }

    Accounts.createUser({email, password}, (err) => {
      if(err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    })
  }
  render() {
    return (
        <div className='boxed-view'>
          <div className='boxed-view__box'>
            <h1>Join Short Lnk</h1>
            {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form onSubmit={this.onSubmit.bind(this)} noValidate className='boxed-view__form'>
              <input type='email' name='email' ref='email' placeholder='Email' autoComplete='off' />
              <input type='password' name="password" ref='password' placeholder='Password' autoComplete='new-password'/>
              <button className='button'>Create account</button>
            </form>
            <Link to='/'>Already have an account?</Link>
          </div>
        </div>
    )
  }
}
