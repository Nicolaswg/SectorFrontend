export interface FormData {
  id?: string,
  name: string,
  sector: string,
  terms: boolean
}

export interface FormContextProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}
