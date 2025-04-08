// useAnalyticsData.ts

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { MonthlyData, CategoryData, WeekdayData } from "../types/analytics"

export function useAnalyticsData() {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])
  const [weekdayData, setWeekdayData] = useState<WeekdayData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubMonthly = onSnapshot(collection(db, "monthlyData"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data() as MonthlyData)
      setMonthlyData(data)
    })

    const unsubCategory = onSnapshot(collection(db, "categoryData"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data() as CategoryData)
      setCategoryData(data)
    })

    const unsubWeekday = onSnapshot(collection(db, "weekdayData"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data() as WeekdayData)
      setWeekdayData(data)
      setLoading(false) // When final snapshot arrives, we're done loading
    })

    return () => {
      unsubMonthly()
      unsubCategory()
      unsubWeekday()
    }
  }, [])

  return { monthlyData, categoryData, weekdayData, loading }
}
