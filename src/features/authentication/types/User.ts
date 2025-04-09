interface BaseUser {
  fullName: string;
  email: string;
  password: string;
}

interface UpdateUser {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}

interface UserForm extends BaseUser {
  passwordConfirm: string;
}

export type { UserForm, BaseUser, UpdateUser };
