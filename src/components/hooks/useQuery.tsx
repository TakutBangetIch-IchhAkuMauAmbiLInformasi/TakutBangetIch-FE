// hooks/useQuery.ts
'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { queryResponse } from '../models/queryResponse'

export function useQuery(query: string) {
  const [data, setData] = useState<queryResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query) return

    setLoading(true)
    setError(null)

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}search/`,
        { query, limit: 20, offset: 0 },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(res => {
        setData(res.data.data as queryResponse)
      })
      .catch(err => {
        setError(err.message || 'Error fetching data')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [query])

  console.log(data)  
  return { data, loading, error }
}
