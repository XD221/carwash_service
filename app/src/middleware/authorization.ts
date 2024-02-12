
const { VITE_REACT_APP_INFO_NAME} = import.meta.env

const getInfoName = () => {
    return btoa(VITE_REACT_APP_INFO_NAME)
}

const authorization = () => {
    const getUserInfo = localStorage.getItem(getInfoName())
    if(!getUserInfo) return false
}

export default authorization