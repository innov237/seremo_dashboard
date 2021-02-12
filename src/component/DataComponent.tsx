import React from 'react'

import { useHistory, Redirect } from 'react-router-dom';

import {
	useSelector
} from 'react-redux'


//import LoginPage from './pages/authPage/login';


const DataWrapper:any = (propers:any) => {
    const props: any = propers
    
    console.log(props)

	const Component = props.component

    const auth = useSelector((state:any) => state.auth)
    
    console.log(auth.isAuthentificated)
    console.log(props.location.pathname)
	
	return (auth.isAuthentificated) ? 
        <Component /> : <Redirect to={{ pathname: '/login' }} />


}


export default DataWrapper;