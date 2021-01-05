import Axios from 'axios';
import 'react';

class ApiService {
    baseUrl: String =  `${process.env.REACT_APP_API_URL}api/`;
    imageUrl : String = `${process.env.REACT_APP_API_URL}public/storage/`;

    getData = async (route: string, header: any | null = null) => {
        
        var response = Axios.get(this.baseUrl + route, header).then((result) => {
            if (result.status === 200) {
                return result.data;
            } else {
                throw (result.headers);
            }
        });

        return response;
    }

    postData = async (route: string, data: any, header: any | null = null) => {

        
        var response = Axios.post(this.baseUrl + route, data,header).then((result) => {
            if (result.status === 200) {
                return result.data;
            } else {
                console.log(result);
                throw (result.headers);
            }
        });

        return response;
    }

}

export default new ApiService();