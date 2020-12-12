import Axios from 'axios';
import 'react';

class ApiService {
    baseUrl: String = "https://seremoworld.com/seremoapi/public/api/";
    imageUrl : String = "https://seremoworld.com/seremoapi/public/storage/";

    getData = async (route: string) => {
        var response = Axios.get(this.baseUrl + route).then((result) => {
            if (result.status == 200) {
                return result.data;
            } else {
                throw (result.headers);
            }
        });

        return response;
    }

    postData = async (route: string, data: any) => {
        var response = Axios.post(this.baseUrl + route, data).then((result) => {
            if (result.status == 200) {
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