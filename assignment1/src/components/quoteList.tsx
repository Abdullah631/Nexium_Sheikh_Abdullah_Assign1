interface Quote {
  text: string;
  topic: string;
}

interface Props {
  quotes: Quote[];
}

export function QuoteList({ quotes }: Props) {
  if (quotes.length === 0) {
    return <p className="text-gray-500">No quotes found for this topic.</p>;
  }

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
