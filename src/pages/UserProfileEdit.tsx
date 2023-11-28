import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import UserSectorForm from "@/components/UserSectorForm"


function UserProfileEdit() {
  return (
    <Card className="max-w-sm mx-auto mt-9 sm:max-w-md md:w-[350px]">
      <CardHeader>
        <CardTitle>User Profile Edition 📝</CardTitle>
        <CardDescription>Edit your user profile data ✍️</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <UserSectorForm reuse={true} method="put"/>
      </CardContent>
    </Card>
  );
}

export default UserProfileEdit;