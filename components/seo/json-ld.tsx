interface JsonLdProps {
  data: unknown[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <>
      {data.map((entry, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
