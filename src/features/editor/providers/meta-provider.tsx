import { useCodeStore } from '../stores/editor';

interface Props {
  children: React.ReactNode;
}

export const MetatagsProvider: React.FC<Props> = ({ children }) => {
  const { title } = useCodeStore();

  return (
    <>
      <title>{`JSoD - ${title ? title : 'Script'}`}</title>
      {children}
    </>
  );
};
