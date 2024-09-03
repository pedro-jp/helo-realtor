export interface Imovel {
  name: string;
  description: string;
  local: string;
  price: number;
  quartos: number;
  banheiros: number;
  area: number;
  garagem: number;
  active: boolean;
  categoryId: string;
  ownerId: string;
  id?: string;
  officeId?: string;
  realtorId?: string;
}

export interface ImovelExtended extends Imovel {
  id: string;
}
