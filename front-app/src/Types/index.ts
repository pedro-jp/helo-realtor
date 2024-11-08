export type OfficeType = {
  id: string;
  name: string;
  address: string;
  address_city: string;
  phone: string;
  email: string;
  description: string;
  url?: string;
  realtors?: RealtorType[];
};

export type CategoryType = {
  id: string;
  name: string;
};

export type RealtorType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  creci: string;
  whatsapp_message: string;
};

export type ImovelType = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
  local: string;
  quartos: number;
  banheiros: number;
  area: number;
  garagem: number;
  active: boolean;
  ownerId: string;
  officeId: string;
  realtorId: string;
  marker: boolean;
  transaction: string;
  images: Image[];
};
type Image = {
  id: string;
  url: string;
};
