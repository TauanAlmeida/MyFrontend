import api from '../services/app'
import {getEmail } from '../services/auth'

export const isValidMail = async value => {
    const mail = {
        email: value
    }
    const data = await api.post('/getMail', mail)
         .then(function (response) {
            if(response.data){
                //true pq o email já existe
                return response.data
            }else{
                //caso n exista nenhum email igual o do value
                return response.data 
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          console.log('data' +data)
          return data
}

export async function getUserByEmail(){
    const mail = {
        email: getEmail()
    }
    const userData = async () => {
        return await api.post('/getByEmail', mail)
             .then(function (response) {
                return response.data
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })
    }
    return userData()
}