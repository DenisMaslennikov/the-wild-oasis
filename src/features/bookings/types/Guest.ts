interface BaseGuest {
  countryFlag: string | null;
  email: string;
  fullName: string;
  nationalID: string;
  nationality: string;
}

interface GuestApi extends BaseGuest {
  id: number;
  created_at: string;
}

interface Guest extends BaseGuest {
  id: number;
  createdAt: Date;
}

export type { GuestApi, Guest };
