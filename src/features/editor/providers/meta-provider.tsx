import { Helmet } from 'react-helmet-async';

import { useCodeStore } from '../stores/editor';

interface Props {
  children: React.ReactNode;
}

export const MetatagsProvider: React.FC<Props> = ({ children }) => {
  const { title } = useCodeStore();

  return (
    <>
      <Helmet>
        <title>JSoD - {title ? title : 'Script'}</title>
      </Helmet>
      {children}
    </>
  );
};
