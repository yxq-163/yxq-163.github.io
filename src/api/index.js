import http from '../utils/request'


export const getData =() => {
    return http.get('/home/getData')
}


export const getUserList =(params) => {
    console.log(params,'params')
    return http.get('/user/getUserList',params)
}

export const createUser =(data) => {
    return http.post('/user/createUser',data)
}

export const deleteUser =(data) => {
    return http.post('/user/deleteUser',data)
}

export const updateUser =(data) => {
    return http.post('/user/updateUser',data)
}

export const getMenu = (data) => {
    return http.post('/auth/getMenu',data)
}
