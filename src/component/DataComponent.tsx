
import React from 'react';

import { connect } from 'react-redux'

export default function(ComposedComponent:any): any {

    class Authentificated extends React.Component {
        

        componentWillMount(){
            const props:any = this.props

            const {history, isAuth} = props

            if (!isAuth)
                history.push('/login')

            console.log('compnentwill mount in Auth')
            
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

