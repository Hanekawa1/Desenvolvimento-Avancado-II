import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  cadastrarImovelRequest: ['imovel'],
  cadastrarImovelSuccess: ['imovel'],
  cadastrarImovelFailure: null,
  excluirImovelRequest: ['idImovel'],
  excluirImovelSuccess: null,
  excluirImovelFailure: null,
  editarImovelRequest: ['imovel'],
  editarImovelSuccess: null,
  editarImovelFailure: null,
  montarImovel: ['imovel'],
});

export const ImovelTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  navegar: false,
  imovel: null,
  recarregar: false,
});

export const cadastrarImovelRequestReducer = state =>
  state.merge({
    navegar: true,
    imovel: null,
    recarregar: false,
  });

export const cadastrarImovelSuccessReducer = (state, { imovel }) => {
  return state.merge({
    navegar: true,
    imovel: imovel,
    recarregar: true,
  });
};

export const cadastrarImovelFailureReducer = state => {
  return state.merge({
    navegar: false,
    imovel: null,
    recarregar: false,
  });
};

export const excluirImovelRequestReducer = state => {
  return state.merge({
    navegar: false,
    imovel: null,
    recarregar: false,
  });
};

export const excluirImovelFailureReducer = state => {
  return state.merge({
    navegar: true,
    imovel: null,
    recarregar: false,
  });
};

export const excluirImovelSuccessReducer = state => {
  return state.merge({
    navegar: true,
    imovel: null,
    recarregar: true,
  });
};

export const editarImovelRequestReducer = state => {
  return state.merge({
    navegar: false,
    imovel: null,
    recarregar: false,
  });
};

export const editarImovelSuccessReducer = state => {
  return state.merge({
    navegar: true,
    imovel: null,
    recarregar: true,
  });
};

export const editarImovelFailureReducer = state => {
  return state.merge({
    navegar: false,
    imovel: null,
    recarregar: false,
  });
};

export const montarImovelReducer = (state, { imovel }) => {
  return state.merge({
    navegar: false,
    imovel: imovel,
    recarregar: false,
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CADASTRAR_IMOVEL_REQUEST]: cadastrarImovelRequestReducer,
  [Types.CADASTRAR_IMOVEL_SUCCESS]: cadastrarImovelSuccessReducer,
  [Types.CADASTRAR_IMOVEL_FAILURE]: cadastrarImovelFailureReducer,
  [Types.EXCLUIR_IMOVEL_REQUEST]: excluirImovelRequestReducer,
  [Types.EXCLUIR_IMOVEL_FAILURE]: excluirImovelFailureReducer,
  [Types.EXCLUIR_IMOVEL_SUCCESS]: excluirImovelSuccessReducer,
  [Types.EDITAR_IMOVEL_REQUEST]: editarImovelRequestReducer,
  [Types.EDITAR_IMOVEL_SUCCESS]: editarImovelSuccessReducer,
  [Types.EDITAR_IMOVEL_FAILURE]: editarImovelFailureReducer,
  [Types.MONTAR_IMOVEL]: montarImovelReducer,
});
