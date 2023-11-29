import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"





import { registerSchema } from "@/validators/register"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UpdateFormSectors, postFormSectors } from "@/api/api"
import { useFormContext } from "@/context/formContext"
import useSectors from "@/hooks/useSectors"
import { useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"



interface Props {
  method: "post" | "put",
  reuse?: boolean
}

type Input = z.infer<typeof registerSchema>


function UserSectorForm({reuse = false, method}: Props) {
  const {data, loading, error} = useSectors()
  const {toast} = useToast()
  const {formData, setFormData} = useFormContext()
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)
  const location = useLocation()

  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: formData.name,
      sector: formData.sector,
      terms: true,
    }
  })


  useEffect(() => {

  }, [formData])

  const submitForm = async(inputData: Input) => {
    const {name, sector, terms} = inputData
    if (formRef.current) {

      if(method.toLocaleLowerCase() === "post") {
        const response = await postFormSectors({name: name.toLocaleLowerCase(), sector, terms})
        const { user } = response
        setFormData((prevData) => ({
          ...prevData,
           id: user._id,
          name: user.name,
          sector: user.sector,
          terms: user.terms
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

      if(method.toLocaleLowerCase() === "put"){
      const userId:string = formData.id || "" 
      await UpdateFormSectors({name: name.toLocaleLowerCase(), sector, terms}, userId)
       setFormData((prevData) => ({
         ...prevData,
          name: name.toLocaleLowerCase(),
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
    
    formRef.current.reset()
    navigate("/profile/home")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-7" ref={formRef}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name..." onChange={field.onChange}  defaultValue={reuse ? formData.name : ""}/>
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
              <Select onValueChange={field.onChange} defaultValue={reuse ? formData.sector : ""}>
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
        {!reuse && (
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
        )}
        <div className="flex justify-between">
        <Button type="submit">Submit</Button>
        {location.pathname !== "/" && (
        <Button onClick={() => setFormData({id:"", name: "", sector: "", terms: true})}>
          <Link to={"/"}>Home</Link>
        </Button>
        )}
        </div>
      </form>
    </Form>
  )
}

export default UserSectorForm