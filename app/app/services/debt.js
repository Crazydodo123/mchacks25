import axios from 'axios'
const baseUrl = 'https://boss-previously-grubworm.ngrok-free.app/api/debt'

const extractReceipt = async (photo) => {
    try {
        const response = await axios.post(`${baseUrl}/extract-receipt`, photo)
        return response.data.subtotal
    } catch (e) {
        alert(e)
    }
}

export default { extractReceipt }