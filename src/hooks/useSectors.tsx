import { useState, useEffect } from "react"
import { getSectors } from "@/api/api";

interface Sector {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function useSectors() {
  const [data, setData] = useState<Sector[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSectors()
        setData(response)
      } catch (error: string | unknown) {
        setError(error as string)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    data,
    loading,
    error
  }
}

export default  useSectors