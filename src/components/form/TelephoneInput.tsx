'use client';

import {
  useState,
  useRef,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
  type FocusEvent
} from 'react';
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
  if (digits.length > 2) {
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

const TelephoneInput = ({
  id,
  name,
  placeholder = '+1 (123) 555-4321',
  defaultValue = '',
  className,
  pattern = '\\+1 \\([0-9]{3}\\) [0-9]{3}-[0-9]{4}',
  required = true
}: TelephoneInputProps) => {
  const [value, setValue] = useState(() =>
    formatPhoneNumber(`+1 ${defaultValue}`)
  );
  const [prevDefaultValue, setPrevDefaultValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  if (defaultValue !== prevDefaultValue) {
    setPrevDefaultValue(defaultValue);
    setValue(formatPhoneNumber(`+1 ${defaultValue}`));
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const digits = pastedText.replace(/[^\d]/g, '').slice(0, 10);
    const formattedValue = formatPhoneNumber('+1 ' + digits);
    setValue(formattedValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;

    const caretPos = inputRef.current.selectionStart || 0;
    const selectionEnd = inputRef.current.selectionEnd || 0;

    if (
      (e.key === 'Backspace' || e.key === 'Delete') &&
      caretPos <= 3 &&
      selectionEnd <= 3
    ) {
      e.preventDefault();
      return;
    }

    if (caretPos === selectionEnd) {
      if (e.key === 'Backspace') {
        const charBefore = value[caretPos - 1];
        if (charBefore && !/\d/.test(charBefore)) {
          let idx = caretPos - 1;
          while (idx >= 3 && !/\d/.test(value[idx])) {
            idx--;
          }
          if (idx >= 3) {
            e.preventDefault();
            const newValue = value.slice(0, idx) + value.slice(idx + 1);
            const formatted = formatPhoneNumber(newValue);
            setValue(formatted);
            setTimeout(() => {
              if (inputRef.current) {
                inputRef.current.setSelectionRange(idx, idx);
              }
            }, 0);
          }
        }
      } else if (e.key === 'Delete') {
        const charAt = value[caretPos];
        if (charAt && !/\d/.test(charAt)) {
          let idx = caretPos;
          while (idx < value.length && !/\d/.test(value[idx])) {
            idx++;
          }
          if (idx < value.length) {
            e.preventDefault();
            const newValue = value.slice(0, idx) + value.slice(idx + 1);
            const formatted = formatPhoneNumber(newValue);
            setValue(formatted);
            setTimeout(() => {
              if (inputRef.current) {
                inputRef.current.setSelectionRange(caretPos, caretPos);
              }
            }, 0);
          }
        }
      }
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTimeout(() => {
      if (inputRef.current) {
        const isSelectionAll =
          inputRef.current.selectionStart === 0 &&
          inputRef.current.selectionEnd === val.length;

        if (isSelectionAll || val === '+1 ') {
          inputRef.current.setSelectionRange(val.length, val.length);
        }
      }
    }, 0);
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
      onFocus={handleFocus}
      className={conditionalClasses(INPUT_STYLE, className)}
      required={required}
      pattern={pattern}
    />
  );
};

export default TelephoneInput;
