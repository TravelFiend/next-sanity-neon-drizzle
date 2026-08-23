type FormErrorsProps = {
  errors?: Record<string, string[]>;
  message?: string;
  className?: string;
  keysToHide?: string[];
};

const FormErrors = ({
  errors = {},
  message,
  className,
  keysToHide = []
}: FormErrorsProps) => {
  const hasErrors = Object.keys(errors).length > 0;

  if (!hasErrors && !message) return null;

  return (
    <ul className={className}>
      {message ? <li className="text-sm text-success">{message}</li> : null}

      {hasErrors
        ? Object.entries(errors).map(([key, value]) => {
            return keysToHide.includes(key)
              ? null
              : value.map((err, idx) => (
                  <li key={`${key}-${idx}`} className="text-sm text-error">
                    {err}
                  </li>
                ));
          })
        : null}
    </ul>
  );
};

export default FormErrors;
