import axios from 'axios'
import { FormData } from '@/types/interface'


const api = axios.create({
  baseURL: 'https://sector-backend.vercel.app/api/v1',
})

export const getSectors = async () => {
  const response = await api.get('/sectors')
  return response.data
};

export const postFormSectors = async (formData: FormData) => {
  try {
    const response = await api.post('/sectors/user', formData)
    return response.data 
  }catch(err: string | unknown) {
    throw new Error(err as string)
  }
}

export const UpdateFormSectors = async (data: FormData, id: string) => {
  try {
    const response = await api.patch(`/sectors/user/${id}`, data)
    return response.data 
  }catch(err: string | unknown) {
    throw new Error(err as string)
  }
}