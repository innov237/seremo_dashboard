
import React from 'react';

import { connect } from 'react-redux'

import {
    AppRoutes
} from '../pages/AppRoute';


import {
    ACTION_REFRESH,
    ACTION_LOGIN
} from '../redux/Auth/Actions'

import  ApiService from '../services/ApiService'



export default function(ComposedComponent:any): any {

    class Authentificated extends React.Component {
        
        builTitle: any = (pathname: String): any => Object.values(AppRoutes).find((route:any) => route.path === pathname)
        

        updateTile: any = (pathname: String) => {
            const route = this.builTitle(pathname);

            document.title = (route) ? `Seremo-dashbord ${route.title}` : `Seremo-dashbord`
           
        }

        async refreshToken() {
            const token = localStorage.getItem("AuthUserData");

            if(token){
                const response = await ApiService.getData('v1/refresh',{
                    headers:{
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })

                return response;
            }else{
                localStorage.removeItem("AuthUserData");
                return false;
            }
        }
        

 

        componentWillMount(){
            const props:any = this.props

            const {history, user, refresh, login} = props

            console.log("user.pageHasbeRefresh",user.pageHasbeRefresh)

            this.updateTile(history.location.pathname)

           
            if (user.pageHasbeRefresh == false){
                this.refreshToken()
                    .then((e:any) => {
                        console.log(e)
                        if (e == false){
                            refresh()
                            history.push('/login')
                        }else
                            login(e.data)
                    })
                    .catch((e:any) => refresh() )

            }else{
                if (!user.isAuthentificated)
                history.push('/login')
            }
            

                      
        }

        componentWillUpdate(){

        }

        render(){
            const props:any = this.props
            const {user} = props;

            if (user.pageHasbeRefresh)
                return (
                    <ComposedComponent {...this.props} />
                )
            else 
                return (
                    <></>
                )
        }
    }

   

    function mapStateToProps(state: any): any {
        return {
            user: state.auth,
        }
    }

    function mapDispatchToProps(dispatch: any): any {
        return {
            refresh: () => dispatch(ACTION_REFRESH()),
            login: (data:any) => dispatch(ACTION_LOGIN(data))
        }
    }
    return connect(mapStateToProps,mapDispatchToProps)(Authentificated)
}

