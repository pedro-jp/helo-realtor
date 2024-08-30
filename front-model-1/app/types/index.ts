export type ImovelType = {
  name: string;
  description: string;
  images: {
    url: string;
  }[];
  id: string;
  price: string;
  local: string;
  quartos: string;
  banheiros: string;
  area: string;
  garagem: string;
  categoryId: string;
  active: boolean;
};

export type OfficeType = {
  id: string;
  name: string;
  phone: string;
  description: string;
  address: string;
  address_city: string;
  email: string;
  realtors: RealtorType[];
};

export type RealtorType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  creci: string;
  whatsapp_message: string;
  officeId: string;
};
