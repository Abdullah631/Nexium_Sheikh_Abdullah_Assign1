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
    return <p className="text-center text-gray-500">No quotes found for this topic.</p>;
  }

  if (quotes.length === 0) return null;

  return (
    <ul className="space-y-4">
      {quotes.map((q, idx) => (
        <li
          key={idx}
          className="border p-4 rounded-xl shadow-md bg-white text-gray-800 text-lg italic"
        >
          “{q.text}”
        </li>
      ))}
    </ul>
  );
}
