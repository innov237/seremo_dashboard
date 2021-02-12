import React from 'react'

import { useHistory, Redirect } from 'react-router-dom';

import {
	useSelector
} from 'react-redux'

const DataWrapper:any = (propers:any) => {
    const props: any = propers
    
	const Component = props.component

    const auth = useSelector((state:any) => state.auth)
    	
	return (auth.isAuthentificated) ? 
        <Component /> : <Redirect to={{ pathname: '/login' }} />
}

export default DataWrapper;