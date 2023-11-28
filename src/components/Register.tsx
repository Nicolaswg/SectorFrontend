import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

import { useForm } from "react-hook-form"
import { registerSchema } from "@/validators/register"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { postFormSectors } from "@/api/api"
import useSectors from "@/hooks/useSectors"
import { useFormContext } from "@/context/formContext"
type Input = z.infer<typeof registerSchema>


function Register() {
  const {data, loading, error} = useSectors()
  const {toast} = useToast()
  const {setFormData} = useFormContext()

  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      sector: "",
      terms: true,
    }
  })

  const submitForm = async(inputData: Input) => {
    
    const {name, sector, terms} = inputData
    
    await postFormSectors({name: name.toLocaleLowerCase(), sector, terms})
    
    setFormData((prevData) => ({
      ...prevData,
      name,
      sector,
      terms
    }))

    toast({
      title: "Data send to backend",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white p-2">{JSON.stringify(inputData, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Card className="max-w-sm mx-auto mt-9 sm:max-w-md md:w-[350px]">
      <CardHeader>
        <CardTitle>User Sector Registration 📫</CardTitle>
        <CardDescription>Please enter your name and pick the Sectors you are currently involved in. 📌</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-7">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name..." onChange={field.onChange}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="sector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sector</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger >
                    <SelectValue placeholder="Select your sector" {...field }/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {loading && <p>Loading sectors...</p>}
                  {error && <p>Error fetching sectors: {error}</p>}
                  {data.map((sector) => (
                    <SelectItem key={sector._id} value={sector.name}>
                      {sector.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    <span className="text-sm font-medium">Agree to the terms</span>
                  </FormLabel>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </CardContent>
    </Card>
  );
}

export default Register;