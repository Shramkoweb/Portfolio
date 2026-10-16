const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`)/g;

interface InlineTextProps {
  text: string;
}

export function InlineText(props: InlineTextProps) {
  const { text } = props;

  return (
    <>
      {text.split(TOKEN).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }

        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          return <code key={index}>{part.slice(1, -1)}</code>;
        }

        return part;
      })}
    </>
  );
}
