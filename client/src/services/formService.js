import axios from 'axios';

const API_URL = 'http://localhost:8000/api/forms';

export const getForms = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createForm = async (form) => {
  const response = await axios.post(API_URL, form);
  return response.data;
};

export const getFormById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateForm = async (id, form) => {
  const response = await axios.put(`${API_URL}/${id}`, form);
  return response.data;
};

export const delateForm = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
      } catch (error) {
        console.error('Error deleting form:', error);
      }
  };


export const submitFormData=async(formdata)=>{
  try {
    const response=await axios.post(`${API_URL}/submit`,formdata)
    return response
    
  } catch (error) {
    console.log(error)

  }
}
  
