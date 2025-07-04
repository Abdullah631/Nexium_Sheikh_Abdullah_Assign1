interface Quote {
  text: string;
  topic: string;
}

interface Props {
  quotes: Quote[];
  hasSubmitted: boolean;
}

export function QuoteList({ quotes, hasSubmitted }: Props) {
  if (hasSubmitted && quotes.length === 0) {
    return <p className="text-gray-500">No quotes found for this topic.</p>;
  }

  if (quotes.length === 0) return null;

  return (
    <ul className="space-y-4">
      {quotes.map((q, idx) => (
        <li key={idx} className="border p-4 rounded-xl shadow-sm bg-gray-50 text-gray-900">
          “{q.text}”
        </li>
      ))}
    </ul>
  );
}
