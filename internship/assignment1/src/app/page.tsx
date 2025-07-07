import QuoteFormClientWrapper from '@/components/qouteFormClient';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Quote Generator</h1>
      <QuoteFormClientWrapper />
    </main>
  );
}
