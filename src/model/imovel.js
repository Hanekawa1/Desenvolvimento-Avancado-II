export default class Imovel {
  idImovel: int;
  descricaoImovel: String;
  email: String;
  logradouroImovel: String;
  numero: String;
  complemento: String;
  cep: String;
  bairro: String;
  cidade: String;
  uf: String;
  idUsuario: int;
  situacaoImovel: String;

  constructor() {
    this.idImovel = 0;
    this.descricaoImovel = '';
    this.email = '';
    this.logradouroImovel = '';
    this.numero = '';
    this.complemento = '';
    this.cep = '';
    this.bairro = '';
    this.cidade = '';
    this.uf = '';
    this.situacaoImovel = 'd';
    this.idUsuario = 0;
  }
}
