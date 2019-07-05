import React, { Component } from 'react';
import './global.css'
import api from '../services/app'
import * as yup from 'yup'
import {ErrorMessage, Formik, Form, Field} from 'formik'
import { isValidMail }from '../functions/apihelpers'
import M from "materialize-css";
import Loader from '../components/Loader'
/*
    Rotas Api
    /LostPassword, gera um token e envia para o email do user
    /ResetPassword, se o token for valido autoriza o user mudar sua senha
*/
const validations = yup.object().shape({
  email: yup.string().email().required(),

})

export default class ForgotPassword extends Component {
  
    state = {
      email: '',
      preLoader: false
    }

  componentDidMount() {
      // Auto initialize all the things!
      M.AutoInit();
  }

  render() {
    return (
      <div className="card forgot-header">
      <div className="card-content">
        <span className="card-title">Recover Password</span>
        <Formik initialValues={this.state} onSubmit={ (values, { setSubmitting }) => {
                                              setTimeout(async () => {
                                                const mailValid = await isValidMail(values.email)
                                                const btn = document.getElementById("button") 
                                                btn.classList.add("not-allowed");
                                                this.setState({
                                                  preLoader: true
                                                })
                                                if( !mailValid ){
                                                  const div = document.getElementById('email')
                                                  div.innerHTML = 'This email not exists, try again!'
                                                  return false
                                                }
                                                await api.post('/lostPassword', values).then(function (response) {
                                                  M.toast({html: 'Success! Verify your inbox messages.'})
                                                 
                                                 
                                                }).catch(function (error) {
                                                    console.log(error.response)
                                                }).finally(()=>{
                                                  this.setState({
                                                    preLoader: false
                                                  })
                                                  btn.classList.remove("not-allowed");
                                                })

                                                setSubmitting(false);
                                              }, 400);
                                            }}
                                            validationSchema={validations}>
          {({ errors, touched}) => (                                     
          <Form action="">
            <Field type="email" 
              className={(errors.email && touched.email ? 'invalid' : '')} 
              name="email" placeholder="Insert your e-mail"/>
             <div className="error" id="email"></div>
            <ErrorMessage className="error" component="span" name="email"/>
            <button id="button" className="btn waves-effect teal accent-4 button-edit" type="submit" name="action">{ this.state.preLoader ? <Loader/> : 'Forgot Password'}</button>
            <a href="/" className="waves-effect waves-teal btn-flat">Back</a>
           
          </Form>
          )}
        </Formik>
      </div>

    </div>
    )
  }
}
