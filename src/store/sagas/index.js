import {all, takeLatest} from 'redux-saga/effects';

// Importar os métodos
import {login, manterUsuario} from './auth';
import {apresentarMensagem} from './mensagem';
import {salvar} from './imovel';

// Importar os types
import {AuthTypes} from '../ducks/auth';
import {MensagemTypes} from '../ducks/mensagem';
import {ImovelTypes} from '../ducks/imovel';

export default function* rootSaga() {
  console.log('cheguei aqui, no saga index');
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, login),
    takeLatest(AuthTypes.CADASTRAR_USUARIO_REQUEST, manterUsuario),
    takeLatest(MensagemTypes.SET_MENSAGEM, apresentarMensagem),
    takeLatest(ImovelTypes.CADASTRAR_IMOVEL_REQUEST, salvar),
  ]);
}
