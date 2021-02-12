/*import React from 'react';

import { connect } from 'react-redux'

import {
    Redirect, useHistory
} from 'react-router-dom';


import LoginPage from '../pages/authPage/login';

import {
    AppRoutes
} from '../pages/AppRoute';

import {
    useSelector
} from 'react-redux'


export default function(ComposedComponent:any): any {

    return (props:any) => {

        const history = useHistory()

        const auth = useSelector((state:any) => state.auth )

        const builTitle = (pathname: String): any => Object.values(AppRoutes).find((route:any) => route.path === pathname)
        

        const updateTile = (pathname: String) => {
            const route = builTitle(pathname);

            document.title = (route) ? `Seremo-dashbord ${route.title}` : `Seremo-dashbord`
        }

        React.useEffect(() => {

        },[])

        console.log(history.location.pathname)
        console.log(auth)
        
        if (auth.isAuthentificated)
            return <ComposedComponent {...props} />

    }
}*/

import React from 'react';

import { connect } from 'react-redux'

import {
    Redirect, Route, useHistory
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

            console.log(history.location.pathname)
             
        }


        componentWillUpdate(){

        }

        render(){


            const props:any = this.props
            const {user} = props;

            console.log(user.isAuthentificated)


            return <Route 
                    render = { (props:any) => {
                        if (user.isAuthentificated)
                            return (
                                <ComposedComponent {...this.props} />
                            )            
                        else 
                            return (
                                <Redirect to='/login' />
                        )
                    }}
            />
           
        }
    }

   

    function mapStateToProps(state: any): any {
        return {
            user: state.auth,
        }
    }

    
    return connect(mapStateToProps)(Authentificated)
} 
