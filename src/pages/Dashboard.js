import React, { Component } from 'react';
import './global.css'
import api from '../services/app'
import {getEmail } from '../services/auth'


export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: ``
        }
    }

    componentDidMount(){
        const mail = {
            email: getEmail()
        }
        api.post('/getByEmail', mail)
        .then(response => {

            this.setState({
             user: response.data.user
            })
        }).catch(error => console.log(`error on dashboard:`+error))
        
    }
    

  render() {
      const { name } = this.state.user
     
    return (
        <h1>Ola, {name}</h1>
    )
  }
}


   

