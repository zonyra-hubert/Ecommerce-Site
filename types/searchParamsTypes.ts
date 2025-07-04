type params = {
  id: string;
};

type SearchParam = {
  name: string;
  image: string;
  unit_amount: number | null;
  id: string;
  description: string;
  features: string;
  quantity?: number | 1;
};

export type SearchParamType = {
  params: params;
  searchParams: SearchParam;
};
