import React, { Component } from 'react';
import './global.css'
import api from '../services/app'
import * as yup from 'yup'
import {ErrorMessage, Formik, Form, Field} from 'formik'
import M from "materialize-css";
import Loader from '../components/Loader'
/*
    Rotas Api
    /LostPassword, gera um token e envia para o email do user
    /ResetPassword, se o token for valido autoriza o user mudar sua senha
*/

const validations = yup.object().shape({
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null],'passwords must be the same')
                  .required('Password confirm is required')

})

export default class ForgotPassword extends Component {
  
    state = {
      email: '',
      passwordResetToken: '',
      password: '',
      confirmPassword: '',
      preLoader: false
    }

  render() {
    return (
      <div className="card forgot-header">

      <div className="card center" id="success"></div>
      <div className="card-content">
        <span className="card-title">You lost your password?</span>
        <Formik initialValues={this.state} onSubmit={ (values, { setSubmitting }) => {
                                              setTimeout(async () => {
                                                const url   = window.location.search.replace("?", "");
                                                const token = url.replace("token=", "")
                                                this.setState({
                                                  passwordResetToken: token 
                                                })
                                                
                                                await api.post('/getUserByToken', this.state).then(response => {
                                                    this.setState({
                                                      email: response.data.user.email,
                                                      password: values.password,
                                                      confirmPassword: values.confirmPassword 
                                                    })
                                                }).catch(error => {
                                                  console.log(error)
                                                })

                                              await api.post('/resetPassword', this.state).then(response => {
                                                
                                                this.setState({
                                                  preLoader: true
                                                })

                                              }).catch(error => {
                                                console.log(error)
                                              })
                                              setSubmitting(false);
                                              }, 400);
                                              
                                              M.toast({html: 'Success! Your password has been changed.'})
                                              setTimeout(  ()=> {
                                                window.location.href = "/"
                                                this.setState({
                                                  preLoader: false
                                                })
                                              }, 4000)
                                            }}
                                            validationSchema={validations}>
          {({ errors, touched}) => (                                     
          <Form>
            <Field type="password" 
              className={(errors.password && touched.password ? 'invalid' : '')} 
              name="password" placeholder="Password"/>
            <ErrorMessage className="error" component="span" name="password"/>

            <Field type="password" 
              className={(errors.confirmPassword && touched.confirmPassword ? 'invalid' : '')} 
              name="confirmPassword" placeholder="Confirm password"/>
            <ErrorMessage className="error" component="span" name="confirmPassword"/>
            <button className="btn waves-effect teal accent-4 button-edit" type="submit" name="action">{this.state.preLoader ? <Loader/> : 'Forgot Password'}</button>
            <a href="/" className="waves-effect waves-teal btn-flat">Back</a>
           
          </Form>
          )}
        </Formik>
      </div>

    </div>
    )
  }
}
