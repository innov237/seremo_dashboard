
import React from 'react';

import { connect } from 'react-redux'

import {
    AppRoutes
} from '../pages/AppRoute';
import { AnyARecord } from 'dns';

export default function(ComposedComponent:any): any {

    class Authentificated extends React.Component {
        
        _builPageTile: any = (pathname: String): any => Object.values(AppRoutes).find((route:any) => route.path === pathname)
        

        componentWillMount(){
            const props:any = this.props

            const {history, isAuth} = props

            const route = this._builPageTile(history.location.pathname);

            document.title = (route) ? `Seremo-dashbord ${route.title}` : `Seremo-dashbord`

            if (!isAuth && history.location.pathname != '/login')
                history.push('/login')            
        }

        componentWillUpdate(){

        }

        render(){
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }

   

    function mapStateToProps(state: any): any {
        return {
            isAuth: state.auth.isAuthentificated,
        }
    }
    return connect(mapStateToProps)(Authentificated)
}

