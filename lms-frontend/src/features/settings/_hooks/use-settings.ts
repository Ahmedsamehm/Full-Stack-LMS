import { useState, useEffect } from 'react'

import { settingsPageData } from '../_data/settings.mock'
import type { SettingsPageData } from '../_types/settings.types'

interface UseSettingsResult {
  data: SettingsPageData | null
  isLoading: boolean
}

export function useSettings(): UseSettingsResult {
  const [data, setData] = useState<SettingsPageData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(settingsPageData)
      setIsLoading(false)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return { data, isLoading }
}
