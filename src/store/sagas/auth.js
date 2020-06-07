import { put } from 'redux-saga/effects';
import NetInfo from '@react-native-community/netinfo';
//import AsyncStorage from '@react-native-community/async-storage';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { ValidarEmail } from '../../utils/validarEmail';
import AsyncStorage from '@react-native-community/async-storage';

import AuthActions from '../ducks/auth';

import { post, putAxios } from '../../services/api';

export function* login(action) {
  try {
    const { isConnected } = yield NetInfo.fetch();
    if (isConnected) {
      var mensagemErro = yield consistirDadosUsuario(1, action.user);

      if (mensagemErro !== '') {
        yield apresentarMensagem(1, action.user, mensagemErro);
        return;
      }

      ToastActionsCreators.displayInfo('Autenticando');

      var retornoRequest = yield pesquisarUsuarioApi(action.user)
        .then(resp => {
          var retorno = {
            tipo: 2,
            mensagem: 'Autenticação efetuada com sucesso',
            usuario: resp.usuario,
            token: resp.token,
          };
          return retorno;
        })
        .catch(erro => {
          var retornoErro = {
            tipo: 1,
            mensagem: erro,
            usuario: action.user,
            token: '',
          };
          return retornoErro;
        });

      if (retornoRequest.tipo === 1) {
        yield apresentarMensagem(1, action.user, retornoRequest.mensagem);
      } else {
        yield AsyncStorage.setItem('@Aula:token', retornoRequest.token);

        yield apresentarMensagem(
          2,
          retornoRequest.usuario,
          'Autenticação efetuada com sucesso',
        );
      }
    } else {
      yield apresentarMensagem(1, action.user, 'Sem conexão com internet');
      return;
    }
  } catch (err) {
    yield apresentarMensagem(1, action.user, err.message);
    return;
  }
}

/* função para apresentar o erro */

function* apresentarMensagem(tipo, user, mensagem) {
  if (tipo === 1) {
    yield put(AuthActions.signInFailure(user));
    yield put(ToastActionsCreators.displayError(mensagem));
  } else if (tipo === 3) {
    yield put(ToastActionsCreators.displayInfo(mensagem));
    yield put(AuthActions.createSuccess());
  } else {
    yield put(AuthActions.signInSuccess(user));
    yield put(ToastActionsCreators.displayInfo(mensagem));
  }
}

/* Função para pesquisar o usuário a partir do IdeUsuario */

// function* pesquisarUsuarioPorIdentificacaoDoUsuario(ideUsuario) {
//   const retorno = yield obterPorIdeUsuario(ideUsuario)
//     .then(resp => {
//       var ret = {
//         tipo: 1,
//         mensagem: '',
//         usuario: resp,
//       };
//       return ret;
//     })
//     .catch(erro => {
//       var ret = {
//         tipo: 2,
//         mensagem: erro,
//         usuario: null,
//       };
//       return ret;
//     });
//   return retorno;
// }

// /* Função para pesquisar o usuário a partir do IdeUsuario */

// function* pesquisarUsuarioPorEmail(email) {
//   const retorno = yield obterPorEmail(email)
//     .then(resp => {
//       var ret = {
//         tipo: 1,
//         mensagem: '',
//         usuario: resp,
//       };
//       return ret;
//     })
//     .catch(erro => {
//       var ret = {
//         tipo: 2,
//         mensagem: erro,
//         usuario: null,
//       };
//       return ret;
//     });
//   return retorno;
// }

/* Função para incluir um usuário */

function* incluir(usuario) {
  const retorno = yield cadastrarUsuarioApi(usuario)
    .then(resp => {
      var ret = {
        tipo: 1,
        mensagem: '',
        usuario: resp,
      };

      return ret;
    })
    .catch(erro => {
      var ret = {
        tipo: 2,
        mensagem: erro,
        usuario: null,
      };
      return ret;
    });
  return retorno;
}

/* Função para alterar o usuário  */

function* alterar(usuario) {
  const retorno = yield alterarUsuarioApi(usuario)
    .then(resp => {
      var ret = {
        tipo: 1,
        mensagem: '',
        usuario: resp,
      };

      return ret;
    })
    .catch(erro => {
      var ret = {
        tipo: 2,
        mensagem: erro,
        usuario: null,
      };
      return ret;
    });
  return retorno;
}

/* Função para cadastrar um usuário */
export function* manterUsuario(action) {
  try {
    const { isConnected } = yield NetInfo.fetch();
    if (isConnected) {
      var mensagemErro = yield consistirDadosUsuario(2, action.user);
      if (mensagemErro !== '') {
        yield apresentarMensagem(1, action.user, mensagemErro);
        return;
      }

      // Pesquisar se existe um usuário com esta identificação
      // var retorno = yield pesquisarUsuarioPorIdentificacaoDoUsuario(
      //   action.user.ideUsuario,
      // );

      // if (
      //   retorno.tipo === 1 &&
      //   retorno.usuario.idUsuario !== action.user.idUsuario
      // ) {
      //   yield apresentarMensagem(
      //     1,
      //     action.user,
      //     'Identificação do Usuário já existente',
      //   );
      //   return;
      // }
      // Pesquisar se existe um usuário com este email
      // var retorno = yield pesquisarUsuarioPorEmail(action.user.email);

      // if (
      //   retorno.tipo === 1 &&
      //   retorno.usuario.idUsuario !== action.user.idUsuario
      // ) {
      //   yield apresentarMensagem(
      //     1,
      //     action.user,
      //     'Email do Usuário já existente',
      //   );
      //   return;
      // }

      // Atualizar usuário
      if (action.user.idUsuario === 0) {
        ToastActionsCreators.displayInfo('Incluindo Usuário');
        var retorno = yield incluir(action.user);

        //console.log(retorno.usuario);

        //o usuário não deve entrar sem efetuar autenticação para pegar o token
        if (retorno.tipo === 1) {
          yield apresentarMensagem(
            3,
            retorno.usuario,
            'Inclusão efetuada com sucesso. Faça login para validar o usuário.',
          );
          return;
        } else {
          yield apresentarMensagem(1, action.user, retorno.mensagem);
          return;
        }
      } else {
        ToastActionsCreators.displayInfo('Atualizando Usuário');
        console.log(action.user);

        var retorno = yield alterar(action.user);
        if (retorno.tipo === 1) {
          yield apresentarMensagem(
            3,
            retorno.usuario,
            'Alteração efetuada com sucesso',
          );
          return;
        } else {
          yield apresentarMensagem(1, action.user, retorno.mensagem);
          return;
        }
      }
    } else {
      yield apresentarMensagem(1, action.user, 'Sem conexão com internet');
    }
  } catch (err) {
    yield apresentarMensagem(1, action.user, err.message);
    return;
  }
}

function consistirDadosUsuario(origem, user) {
  if (origem === 2) {
    if (user.nomeUsuario === '') {
      return 'Favor informar o Nome do Usuário.';
    }
    if (user.email === '') {
      return 'Favor informar o EMail do Usuário.';
    }
    if (ValidarEmail(user.email) === false) {
      return 'Favor informar o EMail do Usuário válido.';
    }
  }
  if (user.ideUsuario === '') {
    return 'Favor informar a Identificação do Usuário.';
  }

  if (user.senhaUsuario === '') {
    return 'Favor informar a senha do Usuário.';
  }
  return '';
}

/* Alterações para a api */

function pesquisarUsuarioApi(user) {
  const data = {
    IdeUsuario: user.ideUsuario,
    SenhaUsuario: user.senhaUsuario,
  };

  return new Promise((resolve, reject) => {
    post('/usuario/autenticar', 'SEM_TOKEN_JSON', data, 'S')
      .then(response => {
        var retorno = {
          tipo: '1',
          usuario: response.data.usuario,
          token: response.data.token,
        };

        resolve(retorno);
      })
      .catch(error => {
        reject(error.response.data.error);
      });
  });
}

function cadastrarUsuarioApi(user) {
  const data = {
    NomeUsuario: user.nomeUsuario,
    IdeUsuario: user.ideUsuario,
    SenhaUsuario: user.senhaUsuario,
    Email: user.email,
  };

  return new Promise((resolve, reject) => {
    post('/usuario', 'SEM_TOKEN_JSON', data, 'S')
      .then(response => {
        var retorno = {
          tipo: '1',
          usuario: response.data,
        };

        resolve(retorno);
      })
      .catch(error => {
        reject(error.response.data.error);
      });
  });
}

function alterarUsuarioApi(user) {
  const data = {
    NomeUsuario: user.nomeUsuario,
    IdeUsuario: user.ideUsuario,
    SenhaUsuario: user.senhaUsuario,
    Email: user.email,
  };

  console.log(user.idUsuario);

  return new Promise((resolve, reject) => {
    putAxios('/usuario/' + user.idUsuario, 'COM_TOKEN_USUARIO', data, 'S')
      .then(response => {
        var retorno = {
          tipo: '1',
          usuario: response.data,
        };

        resolve(retorno);
      })
      .catch(error => {
        reject(error.response.data.error);
      });
  });
}
