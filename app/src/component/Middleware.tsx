import { useLocation, Navigate, Outlet } from "react-router-dom"

const Middleware = ({ children, middleware }  : { children?: any, middleware?: Array<(params: unknown, next: Function, pathname: string) => void> | ((params: unknown, next:Function, pathname: string) => void) }) => {
    const { pathname, state, search } = useLocation()
    const urlParams = new URLSearchParams(search);
    const params = Object.keys(state ?? {}).length > 0 ? state : urlParams
    const next = (route?: string)=>{
        if(typeof route !== 'undefined' && route !== '') return <Navigate to={route} replace /> //navigate(route, { state: state ?? {} })
        else if(typeof state === 'undefined' && state === null) return <Navigate to={pathname} replace state={state} /> //navigate(pathname, { replace: true, state: state ?? {} })
        return <Outlet />
    }
    if(typeof middleware === 'function') middleware(params, next, pathname)
    else if(typeof middleware !== 'undefined') middleware.map((m: Function) => m(params, next, pathname))
    return children ?? <Outlet />
}

export default Middleware