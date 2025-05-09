'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import { queryResponse } from "../models/queryResponse"

export function useQuery(query: string) {
    const [data, setData] = useState<queryResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
  if (!query) return;

  const fetchData = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`, {
        query,
        limit: 20,
        offset: 0
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const rawData = res.data.data;

      const formattedData: queryResponse = {
        ...rawData,
      };

      setData(formattedData);
    } catch (err: any) {
      setError(err.message || "Error fetching request detail");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [query]); 
}
