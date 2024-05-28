export interface Imovel {
  name: string;
  description: string;
  price: string;
  local: string;
  quartos: string;
  banheiros: string;
  area: string;
  garagem: string;
  active: boolean;
  categoryId: string;
  ownerId: string;
}

export interface ImovelExtended extends Imovel {
  id: string;
}
