export interface AuthHookReturn {
  title: string;
  bottomText: string;
  bottomButtonText: string;
  defaultValues: LoginPayload;

  onSubmit: (data: LoginPayload | RegisterPayload) => Promise<void>
}

export type LoginPayload = {
  email: string;
  password: string;
}

export type RegisterPayload = {
  name: string;
} & LoginPayload;
