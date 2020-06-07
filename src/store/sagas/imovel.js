import { editar, pesquisar } from '../../services/imovelService';
import { put } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';
import ImovelActions from '../ducks/imovel';

import { post, deleteAxios, putAxios, get } from '../../services/api';

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

export function* pesquisarImovel(action) {
  try {
    var retorno = yield pesquisaImovel(action.query);
    console.log(retorno);

    if (retorno.tipo === 1) {
      yield apresentarMensagemPesquisa(
        2,
        retorno.imoveis,
        'Pesquisa concluída com sucesso',
      );
      return;
    } else {
      yield apresentarMensagem(1, null, 'Não foi possível realziar a pesquisa');
      return;
    }
  } catch (err) {
    yield apresentarMensagem(1, null, err.message);
    return;
  }
}

function* incluirImovel(imovel) {
  const retorno = yield incluirImovelApi(imovel)
    .then(res => {
      console.log(res);
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
  const retorno = yield excluirImovelApi(idImovel)
    .then(res => {
      console.log(res);
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
  const retorno = yield editarImovelApi(imovel)
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

function* pesquisaImovel(query) {
  const retorno = yield pesquisarApi(query)
    .then(res => {
      var ret = {
        tipo: 1,
        mensagem: '',
        imoveis: res,
      };
      return ret;
    })
    .catch(erro => {
      var ret = {
        tipo: 0,
        mensagem: erro,
        imoveis: null,
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

function* apresentarMensagemPesquisa(tipo, resposta, mensagem) {
  if (tipo === 1) {
    yield put(ImovelActions.pesquisaImovelFailure());
    yield put(ToastActionsCreators.displayError(mensagem));
  } else {
    yield put(ToastActionsCreators.displayInfo(mensagem));
    yield put(ImovelActions.pesquisaImovelSuccess(resposta));
  }
}

function incluirImovelApi(imovel) {
  const data = {
    DescricaoImovel: imovel.descricaoImovel,
    Email: imovel.email,
    LogradouroImovel: imovel.logradouro,
    Numero: imovel.numero,
    Complemento: imovel.complemento,
    Cep: imovel.cep,
    Bairro: imovel.bairro,
    Cidade: imovel.cidade,
    Uf: imovel.uf,
    SituacaoImovel: 'D',
  };

  return new Promise((resolve, reject) => {
    post('/imovel', 'COM_TOKEN_USUARIO', data, 'S')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response.data.error);
      });
  });
}

function excluirImovelApi(idImovel) {
  return new Promise((resolve, reject) => {
    deleteAxios('/imovel/' + idImovel, 'COM_TOKEN_USUARIO')
      .then(response => {
        console.log(response);
        resolve(response);
      })
      .catch(error => {
        reject(error.response.data.error);
      });
  });
}

function editarImovelApi(imovel) {
  console.log(imovel);
  const data = {
    DescricaoImovel: imovel.descricaoImovel,
    Email: imovel.email,
    LogradouroImovel: imovel.logradouro,
    Numero: imovel.numero,
    Complemento: imovel.complemento,
    Cep: imovel.cep,
    Bairro: imovel.bairro,
    Cidade: imovel.cidade,
    Uf: imovel.uf,
    SituacaoImovel: 'D',
  };

  return new Promise((resolve, reject) => {
    putAxios('/imovel/' + imovel.idImovel, 'COM_TOKEN_USUARIO', data, 'S')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response.data.error);
      });
  });
}

function pesquisarApi(query) {
  console.log(query);

  return new Promise((resolve, reject) => {
    get('/imovel/find/' + query, 'COM_TOKEN_USUARIO')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response.data.error);
      });
  });
}
