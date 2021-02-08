
import React from 'react';

import { connect } from 'react-redux'

import {
    Redirect, useHistory
} from 'react-router-dom';

import {
    AppRoutes
} from '../pages/AppRoute';



export default function(ComposedComponent:any): any {

    class Authentificated extends React.Component {
        
        builTitle: any = (pathname: String): any => Object.values(AppRoutes).find((route:any) => route.path === pathname)
        historyPage: any = () => useHistory()

        updateTile: any = (pathname: String) => {
            const route = this.builTitle(pathname);

            document.title = (route) ? `Seremo-dashbord ${route.title}` : `Seremo-dashbord`
           
        }

        componentWillMount(){
            const props:any = this.props

            const {history, user, refresh, login} = props
            
            this.updateTile(history.location.pathname)

            if (!user.isAuthentificated && user.pageHasbeRefresh && history.location.pathname !== '/login')
                history.push('/login')
             
        }

        componentWillUpdate(){

        }

        render(){
            const props:any = this.props
            const {user} = props;

            {    return (user.isAuthentificated) ? <ComposedComponent {...this.props} /> : <></>
                            
           }
        }
    }

   

    function mapStateToProps(state: any): any {
        return {
            user: state.auth,
        }
    }

    
    return connect(mapStateToProps)(Authentificated)
}

