export interface Imovel {
  name: string;
  description: string;
  price: number;
  local: string;
  quartos: number;
  banheiros: number;
  area: number;
  garagem: number;
  active: boolean;
  categoryId: string;
  ownerId: string;
  officeId: string;
  realtorId: string;
  latitude: string;
  longitude: string;
  marker: boolean;
  transaction: string;
}

export interface ImovelExtended extends Imovel {
  id: string;
}
