'use client';

import { useState, useRef, useEffect } from 'react';
import conditionalClasses from '@/lib/utils/conditionalClasses';
import { INPUT_STYLE } from './Input';

type TelephoneInputProps = {
  id: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  pattern?: string;
  required?: boolean;
};

const TelephoneInput: React.FC<TelephoneInputProps> = ({
  id,
  name,
  placeholder = '+1 (123) 555-4321',
  defaultValue = '',
  className,
  pattern = '\\+1 \\([0-9]{3}\\) [0-9]{3}-[0-9]{4}',
  required = true
}) => {
  const [value, setValue] = useState(`+1 ${defaultValue}`);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(formatPhoneNumber(`+1 ${defaultValue}`));
  }, [defaultValue]);

  const formatPhoneNumber = (input: string): string => {
    let digits = input.replace(/[^\d]/g, '');

    if (digits.startsWith('1')) {
      digits = digits.slice(1);
    }

    digits = digits.slice(0, 10);
    let formatted = '+1 ';

    if (digits.length > 0) {
      formatted += `(${digits.slice(0, 3)}`;
    }
    if (digits.length > 3) {
      formatted += ')';
    }
    if (digits.length > 3) {
      formatted += ` ${digits.slice(3, 6)}`;
    }
    if (digits.length > 6) {
      formatted += `-${digits.slice(6, 10)}`;
    }

    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (!inputValue.startsWith('+1 ')) {
      setValue('+1 ');
      return;
    }

    const formattedValue = formatPhoneNumber(inputValue);
    setValue(formattedValue);

    const caretPos = e.target.selectionStart || formattedValue.length;
    let newCaretPos = caretPos + (formattedValue.length - inputValue.length);

    if (
      formattedValue[newCaretPos] === ')' ||
      formattedValue[newCaretPos] === ' ' ||
      formattedValue[newCaretPos] === '-'
    ) {
      newCaretPos++;
    }
    newCaretPos = Math.min(newCaretPos, formattedValue.length);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          newCaretPos;
      }
    }, 0);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const digits = pastedText.replace(/[^\d]/g, '').slice(0, 10);
    const formattedValue = formatPhoneNumber('+1 ' + digits);
    setValue(formattedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      const caretPos = inputRef.current.selectionStart || 0;
      const selectionEnd = inputRef.current.selectionEnd || 0;
      if (
        (e.key === 'Backspace' || e.key === 'Delete') &&
        caretPos <= 3 &&
        selectionEnd <= 3
      ) {
        e.preventDefault();
      }
    }
  };

  return (
    <input
      ref={inputRef}
      id={id}
      name={name}
      type="tel"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      className={conditionalClasses(INPUT_STYLE, className)}
      required={required}
      pattern={pattern}
    />
  );
};

export default TelephoneInput;
