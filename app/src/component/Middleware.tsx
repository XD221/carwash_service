import { middlewareResult } from "@type/default";
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { M } from "vite/dist/node/types.d-jgA8ss1A";

const Middleware = ({ children, middleware }  : { children?: unknown, middleware?: Array<middlewareResult> | middlewareResult }) => {
    let data: unknown = children ?? <Outlet />
    const { pathname, state, search } = useLocation()
    const urlParams = new URLSearchParams(search);
    const params = Object.keys(state ?? {}).length > 0 ? state : urlParams
    const next = (route?: string)=>{
        if(typeof route !== 'undefined' && route !== ''){
            return { success: false, data: <Navigate to={route} state={state ?? {}} replace /> }
        }
        if(typeof state === 'undefined' || state === null){
            return { success: false, data: <Navigate to={pathname} state={{}} replace /> }
        }
        return { success: true,  data: children ?? <Outlet /> }
    }
    if(middleware !== undefined && typeof middleware !== 'function') middleware.forEach((m: middlewareResult, inx) =>{
        const result = m(params, next, pathname)
        if(!result.success || (inx+1) === middleware.length) data = result.data
    })
    return (typeof middleware === 'function' ? middleware(params, next, pathname).data : data) as JSX.Element
}

export default Middleware