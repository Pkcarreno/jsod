import { OnCloseBehavior } from './on-close-behavior';

interface Props {
  children: React.ReactNode;
}
export const EditorBehaviorProvider: React.FC<Props> = ({ children }) => {
  return <OnCloseBehavior>{children}</OnCloseBehavior>;
};
