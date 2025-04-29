type LoginFormDataType = {
  email: string;
  password: string;
};

type RegisterFormDataType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type { LoginFormDataType, RegisterFormDataType };
