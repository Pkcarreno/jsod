interface DefaultProps {
  children: React.ReactNode;
}

export const InlineCode: React.FC<DefaultProps> = ({ children }) => {
  return (
    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
};

export const UnorderedList: React.FC<DefaultProps> = ({ children }) => {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>;
};

export const Paragraph: React.FC<DefaultProps> = ({ children }) => {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
};
