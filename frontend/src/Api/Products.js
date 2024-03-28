import instance from "./instance."

export const addproduct = async (payload)=>{
    try {
        const response = await instance.post('product/add', payload)
            return response.data
    } catch (error) {
        console.log(error.response.data)
       return error.response.data
    }
}
export const getproducts = async()=>{
    try{
        const response = await instance.get('product/get')
        return response.data
    }catch (error) {
        return error.response.data
    }
}
export const SearchProduct = async(payload)=>{
    try {
        const response = await instance.get(`product/search/${payload}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}