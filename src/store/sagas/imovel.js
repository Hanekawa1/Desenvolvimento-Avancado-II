import { incluir, excluir, editar } from '../../services/imovelService';
import { put } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';
import ImovelActions from '../ducks/imovel';

export function* salvar(action) {
  try {
    var retorno = yield incluirImovel(action.imovel);

    if (retorno.tipo === 1) {
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

export function* deletarImovel(action) {
  try {
    var retorno = yield excluirImovel(action.idImovel);

    if (retorno.tipo === 1) {
      yield apresentarMensagemExclusao(2, 'Imóvel excluído com sucesso!');
      return;
    } else {
      yield apresentarMensagemExclusao(1, 'Não foi possível excluir o imóvel');
      return;
    }
  } catch (err) {
    yield apresentarMensagemExclusao(1, err.message);
    return;
  }
}

export function* edicaoImovel(action) {
  try {
    var retorno = yield editarImovel(action.imovel);

    if (retorno.tipo === 1) {
      yield apresentarMensagem(
        2,
        retorno.imovel,
        'Imóvel editado com sucesso!',
      );
      return;
    } else {
      yield apresentarMensagem(1, null, 'Não foi possível editar o imóvel');
      return;
    }
  } catch (err) {
    yield apresentarMensagem(1, null, err.message);
    return;
  }
}

function* incluirImovel(imovel) {
  const retorno = yield incluir(imovel)
    .then(res => {
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

function* excluirImovel(idImovel) {
  const retorno = yield excluir(idImovel)
    .then(res => {
      var ret = {
        tipo: 1,
        mensagem: '',
      };
      return ret;
    })
    .catch(erro => {
      var ret = {
        tipo: 1,
        mensagem: erro,
      };
      return ret;
    });
  return retorno;
}

function* editarImovel(imovel) {
  const retorno = yield editar(imovel)
    .then(res => {
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
  if (tipo === 1) {
    yield put(ImovelActions.cadastrarImovelFailure());
    yield put(ToastActionsCreators.displayError(mensagem));
  } else {
    yield put(ImovelActions.cadastrarImovelSuccess(imovel));
    yield put(ToastActionsCreators.displayInfo(mensagem));
  }
}

function* apresentarMensagemExclusao(tipo, mensagem) {
  if (tipo === 1) {
    yield put(ImovelActions.excluirImovelFailure());
    yield put(ToastActionsCreators.displayError(mensagem));
  } else {
    yield put(ToastActionsCreators.displayInfo(mensagem));
    yield put(ImovelActions.excluirImovelSuccess());
  }
}
