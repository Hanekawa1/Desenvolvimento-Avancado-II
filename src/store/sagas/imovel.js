import {incluir} from '../../services/imovelService';
import {put} from 'redux-saga/effects';
import {ToastActionsCreators} from 'react-native-redux-toast';
import ImovelActions from '../ducks/imovel';

export function* salvar(action) {
  console.log('cheguei aqui, no saga do imovel');
  try {
    console.log('beleza, vou mandar incluir o imovel');
    var retorno = yield incluirImovel(action.imovel);
    console.log(retorno);

    if (retorno.tipo === 1) {
      console.log('retorno é 1, inseriu, mostra mensagem de cadastro sucesso!');
      yield apresentarMensagem(
        2,
        retorno.imovel,
        'Imóvel cadastrado com sucesso!',
      );
      return;
    } else {
      yield apresentarMensagem(1, null, 'Não foi possível cadastrar o imóvel');
      return;
    }
  } catch (err) {
    yield apresentarMensagem(1, null, err.message);
    return;
  }
}

function* incluirImovel(imovel) {
  console.log('cheguei na função de incluir com o imovel');
  console.log(imovel);
  const retorno = yield incluir(imovel)
    .then(res => {
      console.log('resolveu a promise');
      var ret = {
        tipo: 1,
        mensagem: '',
        imovel: res,
      };
      return ret;
    })
    .catch(erro => {
      var ret = {
        tipo: 0,
        mensagem: erro,
        imovel: null,
      };
      return ret;
    });

  return retorno;
}

function* apresentarMensagem(tipo, imovel, mensagem) {
  console.log('Chegou no apresentar mensagem');
  if (tipo === 1) {
    yield put(ImovelActions.cadastrarImovelFailure);
    yield put(ToastActionsCreators.displayError(mensagem));
  } else {
    console.log('vou mostrar a mensagem de sucesso');
    yield put(ImovelActions.cadastrarImovelSuccess(imovel));
    console.log('aqui a mensagem é exibida');
    yield put(ToastActionsCreators.displayInfo(mensagem));
  }
}
