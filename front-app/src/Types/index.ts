export type OfficeType = {
  id: string;
  name: string;
  address: string;
  address_city: string;
  phone: string;
  email: string;
  description: string;
  url?: string;
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
