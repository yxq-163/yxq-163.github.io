import Mock from 'mockjs'
import homeApi from './mockServerData/home'
import userApi from './mockServerData/user'
import loginApi from './mockServerData/promision'

Mock.mock('/api/home/getData',homeApi.getStatisticalData)

Mock.mock('/api/user/createUser', 'post', userApi.createUser)

Mock.mock('/api/user/deleteUser', 'post',userApi.deleteUser)

Mock.mock('/api/user/updateUser', 'post', userApi.updateUser)

Mock.mock(/api\/user\/getUserList/, userApi.getUserList)

Mock.mock(/api\/auth\/getMenu/, 'post', loginApi.getMenu)