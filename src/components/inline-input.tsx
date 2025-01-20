import { type ChangeEventHandler, type KeyboardEventHandler } from 'react';

type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onKeyDown' | 'onBlur'
>;

export const InlineInput = ({ onChange, ...props }: Props) => {
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.currentTarget.blur();
    }
  };

  const onBlur: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (onChange && event.target.value.trim() !== '') {
      onChange(event);
    }
  };

  return (
    <input
      type="text"
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onChange={onChange}
      {...props}
    />
  );
};
