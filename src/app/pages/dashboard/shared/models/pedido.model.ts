import { Equipe } from './equipe.model';
import { Produto } from "./produto.model";

export class Pedido{
  constructor(
    public id?: number,
    public dataCriacao: Date = new Date,
    public dataEntrega?: Date,
    public endereco?: string,
    public equipe?: Equipe,
    public itens: Produto[] = [],
  ){}
}
