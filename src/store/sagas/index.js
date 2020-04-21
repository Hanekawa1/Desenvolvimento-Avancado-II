import { all, takeLatest } from 'redux-saga/effects';

// Importar os métodos
import { login, manterUsuario } from './auth';
import { apresentarMensagem } from './mensagem';
import { salvar, deletarImovel, edicaoImovel } from './imovel';

// Importar os types
import { AuthTypes } from '../ducks/auth';
import { MensagemTypes } from '../ducks/mensagem';
import { ImovelTypes } from '../ducks/imovel';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, login),
    takeLatest(AuthTypes.CADASTRAR_USUARIO_REQUEST, manterUsuario),
    takeLatest(MensagemTypes.SET_MENSAGEM, apresentarMensagem),
    takeLatest(ImovelTypes.CADASTRAR_IMOVEL_REQUEST, salvar),
    takeLatest(ImovelTypes.EXCLUIR_IMOVEL_REQUEST, deletarImovel),
    takeLatest(ImovelTypes.EDITAR_IMOVEL_REQUEST, edicaoImovel),
  ]);
}
