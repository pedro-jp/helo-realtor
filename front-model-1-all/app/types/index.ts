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
  latitude: string;
  longitude: string;
  marker: boolean;
  favorites: string[];
  transaction: string;
};

export type OfficeType = {
  id: string;
  name: string;
  phone: string;
  description: string;
  address: string;
  address_city: string;
  email: string;
  url: string;
  latitude: string;
  longitude: string;
  realtors: RealtorType[];
  imoveis: ImovelType[];
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

export type OfficesType = {
  offices: OfficeType[];
};

export interface Office {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  banner_image?: { url: string };
  realtors?: { name: string }[];
  imoveis?: ImovelType[];
}
