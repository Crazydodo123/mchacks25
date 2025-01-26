import axios from 'axios'
const baseUrl = 'https://boss-previously-grubworm.ngrok-free.app/api/auth'

const register = async (newUser) => {
    const response = await axios.post(`${baseUrl}/register`, newUser)
    return response.data
}

const login = async (loginInfo) => {
    const response = await axios.post(`${baseUrl}/login`, loginInfo)
    return response.data
}

const getUserInfo = async (id) => {
    const response = await axios.post(`${baseUrl}/get_info`, { id })
    return response.data
}

export default { register, login, getUserInfo }