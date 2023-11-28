export interface FormData {
  name: string,
  sector: string,
  terms: boolean
}

export interface FormContextProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}
