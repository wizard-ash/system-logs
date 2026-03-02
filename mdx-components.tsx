import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-terminal-red text-3xl font-bold mb-4 text-glow-red">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-terminal-red text-2xl font-bold mt-10 mb-3 text-glow-red">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-terminal-cyan text-xl font-bold mt-8 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-terminal-cyan text-lg font-bold mt-6 mb-2">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-terminal-green/90 leading-relaxed mb-4">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-terminal-cyan underline hover:text-terminal-green transition-colors"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="text-terminal-green/90 list-disc list-inside mb-4 space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="text-terminal-green/90 list-decimal list-inside mb-4 space-y-1">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="text-terminal-green/90">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-terminal-cyan pl-4 italic text-terminal-green/60 my-4">
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }) => {
      // Don't style inline code if it's inside a pre (rehype-pretty-code handles that)
      const isBlock =
        props &&
        typeof props === "object" &&
        "data-language" in (props as Record<string, unknown>);
      if (isBlock) {
        return <code {...props}>{children}</code>;
      }
      return (
        <code className="bg-terminal-darkbg text-terminal-cyan px-1.5 py-0.5 rounded text-sm border border-terminal-green/20">
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }) => (
      <pre
        className="bg-terminal-darkbg border border-terminal-green/30 rounded-md p-4 overflow-x-auto my-6 shadow-[0_0_10px_rgba(0,255,0,0.05)]"
        {...props}
      >
        {children}
      </pre>
    ),
    hr: () => (
      <hr className="border-0 border-t border-dashed border-terminal-green/40 my-8" />
    ),
    strong: ({ children }) => (
      <strong className="text-terminal-green font-bold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-terminal-cyan italic">{children}</em>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm text-terminal-green/90 border border-terminal-green/30">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-terminal-green/30 px-3 py-2 text-left text-terminal-cyan font-bold bg-terminal-darkbg">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-terminal-green/30 px-3 py-2">{children}</td>
    ),
    ...components,
  };
}
