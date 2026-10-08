import { useCallback, useState } from 'react'
import type { InquiryPrefill } from '@/types'

export function useInquiryPrefill() {
  const [prefill, setPrefill] = useState<InquiryPrefill | undefined>()

  const openInquiry = useCallback((next?: InquiryPrefill) => {
    setPrefill(next)
    const el = document.getElementById('contact')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const clearPrefill = useCallback(() => setPrefill(undefined), [])

  return { prefill, openInquiry, clearPrefill, setPrefill }
}
