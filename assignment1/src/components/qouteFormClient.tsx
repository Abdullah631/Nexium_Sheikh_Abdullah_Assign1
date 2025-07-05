'use client';

import dynamic from 'next/dynamic';

const QuoteForm = dynamic(() => import('./quoteForm'), { ssr: false });

export default function QuoteFormClientWrapper() {
  return <QuoteForm />;
}
