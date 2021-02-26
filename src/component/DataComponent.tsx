import React from 'react'

import { useHistory, Redirect } from 'react-router-dom';

import {
	useSelector
} from 'react-redux'

const DataWrapper:any = (propers:any) => {
    const props: any = propers
    const adminRoutes = ["/admin/access-log","/admin/detailtransactionUser","/admin/all-users","/admin/dashboard"]

    const isAdmin = (adminRoutes.find(e => e == props.location.pathname)) ? true : false    
	const Component = props.component

    const auth = useSelector((state:any) => state.auth)
	
    return  (auth.isAuthentificated) 
            ?  (isAdmin) 
                ? (25 != auth.user.attributes.level.rank) 
                    ? <Component />
                    : <Redirect to={{ pathname: '/admin/retrait' }} />
                : <Component /> 
            : <Redirect to={{ pathname: '/login' }} />
}

export default DataWrapper;