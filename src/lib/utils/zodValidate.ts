import { type ZodType, z } from 'zod/v4';

type TreeifyError = {
  errors?: string[];
  properties?: Record<string, TreeifyError>;
};

type ErrorMap<T extends ZodType> = Partial<Record<keyof z.infer<T>, string[]>>;

type ValidationErrorResult<T extends ZodType> = {
  success: false;
  errors: ErrorMap<T>;
  data: Partial<z.infer<T>>;
};

type ValidationSuccessResult<T extends ZodType> = {
  success: true;
  data: z.infer<T>;
};

const zodValidate = <T extends ZodType>(
  rawData: unknown,
  zodSchema: T
): ValidationErrorResult<T> | ValidationSuccessResult<T> => {
  const parsed = zodSchema.safeParse(rawData);

  if (!parsed.success) {
    const errs = {} as ErrorMap<T>;
    const tree = z.treeifyError(parsed.error) as TreeifyError;

    if (tree.properties) {
      for (const [key, value] of Object.entries(tree.properties)) {
        if (value.errors) {
          errs[key as keyof z.infer<T>] = value.errors;
        }
      }
    }

    return {
      success: false,
      errors: errs,
      data: rawData as Partial<z.infer<T>>
    };
  }

  return {
    success: true,
    data: parsed.data
  };
};

export default zodValidate;
