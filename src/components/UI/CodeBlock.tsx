import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CodeBlockProps = {
  code: string;
};

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="code-block">
      <button className="icon-button code-copy" type="button" onClick={copyCode} aria-label="Copy code">
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
