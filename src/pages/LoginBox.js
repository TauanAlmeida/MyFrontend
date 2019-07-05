import React, {Component} from 'react';
import './global.css'
import { Link } from 'react-router-dom'
import api from '../services/app'
import { login } from '../services/auth'

export default class LoginBox extends Component {

  state = {
    email: '',
    password: '',

  }
  handleChange = e =>{
    this.setState({ [e.target.name]: e.target.value})
  }
  handleSubmit = async e => {
    e.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password
    }

    await api.post("/auth", data).then(function (response) {
      login(response.data.token, data.email);
      window.location.href = "/dashboard"
    })
    .catch(function (error) {
      const div = document.getElementById('login')
      div.innerHTML = 'Invalid email or password'
     
    })
 
  
  }
  
  render(){
    return (
          <div className="card login-header center">
              <div className="container">
                  <h3 className="center-align">Login</h3>
                  <form onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <input type="email" 
                          id="email"
                          name="email" 
                          className="validate" 
                          placeholder="Email"
                          onChange={this.handleChange}
                          value={this.state.name}
                        /> 
                        <input type="password" 
                          name="password" 
                          className="validate" 
                          placeholder="Password"
                          onChange={this.handleChange}
                          value={this.state.password}
                        />
                        <div className="error" id="login"></div>
                    <button className="btn waves-effect teal accent-4 button-edit" type="submit" name="action">Login
                    </button>
                    <div className="link">
                      <span>Create an account? 
                        <Link to="/register"> Sign up</Link>
                      </span>
                          <span>Forgot<Link to="/forgotPassword">  Username or Password?</Link>
                      </span>
                    </div>
                    </div>
                  </form>
              </div>   
          </div>
    )
  }
  }
