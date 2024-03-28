import instance from "./instance."

export const addarea =async(payload)=>{
    try {
        const response = await instance.post('area/add',payload);
        return response.data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }
}
export const getarea= async()=>{
    try {
        const response = await instance.get('area/get')
        return response.data
    } catch (error) {
        console.log(error);
        return error.response.data
    }
}