import React, {createContext,useState, useContext, ReactNode} from "react"
import { FormData, FormContextProps } from "@/types/interface"

const FormContext = createContext<FormContextProps | undefined>(undefined)

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: '',
    sector: '',
    terms: true
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext)
  if(!context) {
    throw new Error("useFormContext must be used within a FormProvider")
  }

  return context
}

