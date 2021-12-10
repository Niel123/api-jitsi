import axios from "axios";
import { Api,ENPOINT } from './consts'
import {
    getCookie,
} from './helper';


export default class API
{
    static login(parameters = {})
    {  
        let email = parameters.email;
        let password = parameters.password;
        return axios({
            method: 'post',
            url: ENPOINT.LOGIN,
            data: {
			    email: email,
			    password: password,
            }
        });
    }

    static organizationSave(parameters = {})
    {  
        return axios({
            method: 'post',
            url: Api+'organization-store',
            data: parameters,
            headers: {
                'Authorization': `Bearer  ${getCookie("access_token")}`,
            }
        });
    }

    static studentSave(parameters = {})
    {  
        return axios({
            method: 'post',
            url: Api+'student-store',
            data: parameters,
             headers: {
                'Authorization': `Bearer  ${getCookie("access_token")}`,
            }
        });
    }


    static fetchCustomer(parameters = {}) {
        return axios({
            method: 'get',
            url: Api+'customer',
            headers: {
                'Authorization': `Bearer  ${getCookie("access_token")}`,
            }
        });
    }

    static classSave(parameters = {})
    {  
        return axios({
            method: 'post',
            url: Api+'class-store',
            data: parameters,
             headers: {
                'Authorization': `Bearer  ${getCookie("access_token")}`,
            }
        });
    }
    static conferenceSave(parameters = {})
    {  
        return axios({
            method: 'post',
            url: Api+'conference-store',
            data: parameters,
             headers: {
                'Authorization': `Bearer  ${getCookie("access_token")}`,
            }
        });
    }

    static fetchAttendance(parameters = {}) {
        return axios({
            method: 'POST',
            url: Api+'conference-attendance',
            data: parameters,
            headers: {
                 'Authorization': `Bearer  ${getCookie("access_token")}`,
            }
        });
    }
    
    static userSave(parameters = {})
    {  
        return axios({
            method: 'post',
            url: Api+'user-store',
            data: parameters,
             headers: {
                'Authorization': `Bearer  ${getCookie("access_token")}`,
            }
        });
    }
    static userUpdate(parameters = {})
    {  
        return axios({
            method: 'post',
            url: Api+'user-update',
            data: parameters,
             headers: {
                'Authorization': `Bearer  ${getCookie("access_token")}`,
            }
        });
    }
}