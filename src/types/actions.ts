export type ActionState<T> =
  | {
      success: false;
      errors: Record<string, string[]>;
      data?: Partial<T>;
      message?: string;
    }
  | {
      success: true;
      data?: T;
      message?: string;
      userId?: string;
      fromAPI?: boolean;
    };
