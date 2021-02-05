import Axios from 'axios';
import 'react';

class ApiService {
    
    baseUrl: String =  `${process.env.REACT_APP_API_URL}api/`;
    
    get imageUrl() {
        return `${process.env.REACT_APP_API_URL}public/storage/`;
    }

    getData = async (route: string, header: any | null = null) => {
        
        var response = await Axios.get(this.baseUrl + route, header).then((result) => {
            if (result.status === 200) {
                return result.data;
            } 

            if (result.status === 201) {
                return result.data;
            } 

            if (result.status === 401) {
                return {
                    error : 'Unauthorize',
                    message: 'Token invalid or expire'
                }
            }  else {
                throw (result.headers);
            }
        });

        return response;
    }

    patchData = async (route: string, header: any | null = null) => {
        
        var response = await Axios.patch(this.baseUrl + route, header).then((result) => {
            if (result.status === 200) {
                return result.data;
            } else {
                throw (result.headers);
            }
        });

        return response;
    }

    deleteData = async (route: string, header: any | null = null) => {
        
        var response = await Axios.delete(this.baseUrl + route, header).then((result) => {
            if (result.status === 204) {
                return true;
            } else {
                throw (result.headers);
            }
        });

        return response;
    }

    postData = async (route: string, data: any, header: any | null = null) => {

        
        var response = await Axios.post(this.baseUrl + route, data,header).then((result) => {


            if (result.status === 201) {
                return result.data;
            } 
            if (result.status === 200) {
                return result.data;
            } 
            if (result.status === 401) {
                return {
                    error : 'Unauthorize',
                    message: 'Token invalid or expire'
                }
            }  else {
                throw (result.headers);
            }
        });

        return response;
    }

}

export default new ApiService();