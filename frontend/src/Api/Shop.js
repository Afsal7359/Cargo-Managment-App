import instance from "./instance.";

export const addshop = async(payload)=>{
    try {
        const response = await instance.post('shop/add' , payload);
        return response.data
    } catch (error) {
        console.log( error.response.data);
        return error.response.data  
    }
}
export const getshop = async()=>{
    try {
        console.log("hhhhhhhhai");
        const response = await instance.get('shop/get')
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}