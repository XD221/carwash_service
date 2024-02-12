
const { VITE_REACT_APP_INFO_NAME} = import.meta.env

const getInfoName = () => {
    return btoa(VITE_REACT_APP_INFO_NAME)
}

const authorization = (params: unknown, next: Function, pathname: string) => {
    const getUserInfo = localStorage.getItem(getInfoName())
    if(!getUserInfo) if(pathname !== '/cuenta/login') next('/cuenta/login')
}

export default authorization