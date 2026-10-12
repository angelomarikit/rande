import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getStaticSiteContent } from '@/data/defaults'
import { loadSiteContent } from '@/lib/content'
import type { SiteContent } from '@/types/cms'

interface ContentContextValue {
  content: SiteContent
  loading: boolean
  refresh: () => Promise<void>
}

const ContentContext = createContext<ContentContextValue | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => getStaticSiteContent())
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const next = await loadSiteContent()
      setContent(next)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const value = useMemo(
    () => ({ content, loading, refresh }),
    [content, loading, refresh],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useSiteContent(): ContentContextValue {
  const ctx = useContext(ContentContext)
  if (!ctx) {
    throw new Error('useSiteContent must be used within ContentProvider')
  }
  return ctx
}
