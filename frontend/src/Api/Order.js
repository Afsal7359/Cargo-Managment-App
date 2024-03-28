import instance from "./instance."

export const AddOrders = async(payload)=>{
    try {
        const response = await instance.post('orders/add', payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const GetAllOrders = async()=>{
    try {
        const response = await instance.get('orders/get')
        return response.data
    } catch (error) {
        return error.response.data
    }
}