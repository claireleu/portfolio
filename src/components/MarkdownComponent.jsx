
const MarkdownComponent = {
  h1: (props) =>
    <h1 className="text-4xl font-bold mt-8 mb-4 font-inconsolata" {...props} />,
  h2: (props) =>
    <h2 className="text-2xl font-semibold mt-6 mb-3 font-inconsolata" {...props} />,
  h3: (props) => 
    <h3 className="text-xl font-medium mt-4 mb-2 font-inconsolata" {...props} />,
  p: (props) =>
    <p className="my-4 text-[18px] leading-7 font-inconsolata" {...props} />,
  ul: (props) =>
    <ul className="list-disc pl-6 my-4 font-inconsolata text-[18px] leading-5" {...props} />,
  ol: (props) =>
    <ol className="list-decimal pl-6 my-4 font-inconsolata text-[18px]" {...props} />,
  li: (props) => 
    <li className="mb-2 text-[18px]" {...props} />,
  code: (props) =>
    <code className="bg-gray-800 text-pink-400 px-1 rounded font-inconsolata" {...props} />,
  pre: (props) =>
    <pre className="bg-gray-900 p-4 rounded my-6 overflow-x-auto font-inconsolata" {...props} />,

  a: ({ href, children, node}) => {
    const isInternal = href?.startsWith('/');

    if (isInternal) {
      return (
        <a
          href={href}
          className="text-blue-600 hover:underline font-inconsolata"
        >
          {children}
        </a>
      );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 underline font-inconsolata"
        >
            {children}
        </a>
        );
    },

    img: ({ src, alt }) => (
    <div className="my-8 flex justify-center">
      <img
        src={src}
        alt={alt}
        className="max-w-full rounded-lg shadow-md"
      />
    </div>
  ),
};

export default MarkdownComponent;
