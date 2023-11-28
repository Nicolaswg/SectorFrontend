import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { Link } from "react-router-dom"
import { useFormContext } from "@/context/formContext"
import { Button } from "@/components/ui/button"

function UserProfile() {
  const { formData } = useFormContext()
  
  return (
  <Card className="max-w-sm mx-auto mt-9 sm:max-w-md md:w-[350px]">
    <CardHeader>
      <CardTitle>User Profile 👤</CardTitle>
      <CardDescription>Here is your profile data that you can edit 🗂</CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue={formData.name} disabled/>
      </div>

      <div className="space-y-1">
        <Label htmlFor="sector">Sector</Label>
        <Input id="sector" defaultValue={formData.sector}  disabled/>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button>
        <Link to={"/profile/edit"}>Edit profile</Link>
      </Button>
      <Button>
        <Link to={"/"}>Home</Link>
      </Button>
    </CardFooter>
  </Card>
  
  )
}


export default UserProfile