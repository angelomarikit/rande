import type { FaqItem } from '@/types'
import { siteConfig } from './site'

export const faqs: FaqItem[] = [
  {
    id: 'inquire',
    question: 'How can I inquire about a tour package?',
    answer: `Use the Plan My Trip form on this site, or reach us at ${siteConfig.phoneDisplay} / ${siteConfig.email}. Share the package name (or destination), preferred dates, and group size so we can prepare a quotation.`,
  },
  {
    id: 'custom',
    question: 'Can I request a customized itinerary?',
    answer:
      'Yes. Tell us where you want to go, how many are traveling, and what kind of trip you have in mind — private day tours, resort stays, or longer journeys. We’ll help shape an itinerary around your preferences.',
  },
  {
    id: 'domestic-intl',
    question: 'Do you offer domestic and international tours?',
    answer:
      'Yes. We organize domestic tours across the Philippines and select international packages. Availability depends on the season and the specific departure you’re interested in.',
  },
  {
    id: 'quote-info',
    question: 'What information should I provide for a quotation?',
    answer:
      'Helpful details include: destination or package name, preferred travel dates (or flexibility), number of travelers (including kids/seniors if relevant), and whether you need transfers from San Juan, Batangas or another pickup point.',
  },
  {
    id: 'availability',
    question: 'How will I know whether my preferred travel dates are available?',
    answer:
      'After you send an inquiry, our team will check the schedule and confirm whether your preferred dates (or nearby alternatives) work. An inquiry is a request — arrangements are confirmed once we respond and you proceed with booking.',
  },
  {
    id: 'after-submit',
    question: 'What happens after I submit an inquiry?',
    answer:
      'We’ll review your details and follow up using your preferred contact method. You can expect a conversation about itinerary options, inclusions, and next steps — not an automatic booking confirmation.',
  },
]
