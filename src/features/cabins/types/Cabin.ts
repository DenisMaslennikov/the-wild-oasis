interface BaseCabin {
  description: string;
  discount: number;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

interface CabinApi extends BaseCabin {
  created_at: string;
  id: number;
  image: string;
}

interface Cabin extends BaseCabin {
  createdAt: Date;
  id: number;
  image: string;
}

interface CabinForm extends BaseCabin {
  image: FileList | string;
}

interface NewCabin extends BaseCabin {
  image: File | string;
}

export type { CabinApi, Cabin, CabinForm, NewCabin };
