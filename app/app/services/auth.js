import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/auth'

const register = async (newUser) => {
    const response = await axios.post(`${baseUrl}/register`, newUser)
    return response.data
}

export default { register }