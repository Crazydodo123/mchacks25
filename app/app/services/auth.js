import axios from 'axios'
const baseUrl = 'https://boss-previously-grubworm.ngrok-free.app/api/auth'

const register = async (newUser) => {
    try {
        const response = await axios.post(`${baseUrl}/register`, newUser)
        return response.data
    } catch (e) {
        alert(e)
    }
}

const login = async (loginInfo) => {
    try {
        const response = await axios.post(`${baseUrl}/login`, loginInfo)
        return response.data
    } catch (e) {
        alert(e)
    }
}

const getUserInfo = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/get_info/${id}`, {
            headers: {
                "ngrok-skip-browser-warning": true
            }
        })
        console.log(`${baseUrl}/get_info/${id}`)
        return response.data
    } catch (e) {
        alert(e)
    }
}

export default { register, login, getUserInfo }