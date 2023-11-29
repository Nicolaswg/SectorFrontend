import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import UserSectorForm from "@/components/UserSectorForm"
import { useFormContext } from "@/context/formContext"
import { useEffect } from "react"


function Register() {
  const { formData,setFormData } = useFormContext()

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      name: "",
      sector: "",
      terms: true
    }))
  }, [formData, setFormData])

  return (
    <Card className="max-w-sm mx-auto mt-9 sm:max-w-md md:w-[350px]">
      <CardHeader>
        <CardTitle>User Sector Registration 📫</CardTitle>
        <CardDescription>Please enter your name and pick the Sectors you are currently involved in. 📌</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <UserSectorForm method="post"/>
      </CardContent>
    </Card>
  );
}

export default Register;