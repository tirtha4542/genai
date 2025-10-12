import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownRendererProps = {
  content: string;
};

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="markdown-content w-full min-w-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        // Custom styling for different markdown elements
        h1: ({ children }) => (
          <h1 className="text-xl font-bold mb-3 mt-4 text-gray-900 border-b border-gray-200 pb-2">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-semibold mb-2 mt-3 text-gray-900">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-semibold mb-2 mt-3 text-gray-900">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-2 text-gray-800 leading-relaxed">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="mb-2 ml-4 list-disc text-gray-800">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-2 ml-4 list-decimal text-gray-800">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="mb-1 text-gray-800">
            {children}
          </li>
        ),
        code: ({ children, className }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          }
          return (
            <code className="block bg-gray-100 text-gray-800 p-3 rounded-lg text-sm font-mono overflow-x-auto my-2">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-gray-100 text-gray-800 p-3 rounded-lg text-sm font-mono overflow-x-auto my-2">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 my-2 italic text-gray-700 bg-blue-50 py-2 rounded-r">
            {children}
          </blockquote>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-800">
            {children}
          </em>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-3 max-w-full">
            <table className="min-w-full border border-gray-300 rounded-lg">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="bg-white">
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="border-b border-gray-200">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-2 text-left font-semibold text-gray-900 border-r border-gray-300 last:border-r-0">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2 text-gray-800 border-r border-gray-300 last:border-r-0">
            {children}
          </td>
        ),
        hr: () => (
          <hr className="my-4 border-gray-300" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
