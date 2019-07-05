import React, {Component} from 'react';
import './global.css'
import { Link, withRouter } from 'react-router-dom'
import api from '../services/app'
import * as yup from 'yup'
import {ErrorMessage, Formik, Form, Field} from 'formik'
import { isValidMail }from '../functions/apihelpers'

const validations = yup.object().shape({
    name: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null],'passwords must be the same')
                    .required('Password confirm is required')
})


class Register extends Component{

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    render(){
        return (
                <div className="card register-header">
                        <h4 className="center">Register your account</h4>
                        <Formik initialValues={this.state} 
                    
                               onSubmit={ (values, { setSubmitting }) => {
                                setTimeout(async () => {
                                    console.log(this.state)
                                if( await isValidMail(values.email)){
                                    const div = document.getElementById('email')
                                    div.innerHTML = 'User already exists, try other email!'
                                    return false
                                } 
                                if (values.password === values.confirmPassword){
                                    console.log(values)
                                    await api.post('/register', values).then(function (response) {
                                      
                                      window.location.href = "/"
                                       
                                      })
                                      .catch(function (error) {
                                        console.log(error.response.data)
                                      })
    
                                   
                                }
                                  setSubmitting(false);
                                }, 400);
                              }}
                                validationSchema={validations}> 
                            {({ errors, touched }) => (  
                            <Form action="">
                                <div className="inputs">
                                    <Field type="text" 
                                        name="name" 
                                        className={errors.name && touched.name ? 'invalid' : ''} 
                                        placeholder="Username"
                                    />
                                    <ErrorMessage className="error" component="span" name="name"/>
                                    <Field type="email" 
                                        name="email" 
                                        className={errors.email && touched.email ? 'invalid' : ''} 
                                        placeholder="Email"
                                    />
                                     <ErrorMessage className="error" component="span" name="email"/>
                                    <div className="error" id="email"></div>
                                    <Field type="password" 
                                        name="password" 
                                        className={errors.password && touched.password ? 'invalid' : ''}
                                        placeholder="Password"
                                    />
                                    <ErrorMessage className="error" component="span" name="password"/>
                                    <Field type="password" 
                                        name="confirmPassword" 
                                        className={errors.confirmPassword && touched.confirmPassword ? 'invalid' : ''}
                                        placeholder="Confirm password"
                                    />
                                    <ErrorMessage className="error" component="span" name="confirmPassword"/>
                               
                                        <button className="btn waves-effect teal accent-4 button-edit" type="submit" name="action">Create Account</button>
                                
                                    <div className="link">
                                        <span>Have an account?<Link to="/"> Sign in</Link></span>  
                                    </div>
                                </div>
                            </Form>
                            )}
                        </Formik>
                    </div>    
           
            )
    }
}

export default withRouter(Register)
