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
});

export const ImovelTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  navegar: false,
  imovel: null,
});

export const cadastrarImovelRequestReducer = state =>
  state.merge({
    navegar: true,
    imovel: null,
  });

export const cadastrarImovelSuccessReducer = (state, { imovel }) => {
  return state.merge({
    navegar: true,
    imovel: imovel,
  });
};

export const cadastrarImovelFailureReducer = state => {
  return state.merge({
    navegar: false,
    imovel: null,
  });
};

export const excluirImovelRequestReducer = state => {
  return state.merge({
    navegar: false,
    imovel: null,
  });
};

export const excluirImovelFailureReducer = state => {
  return state.merge({
    navegar: true,
    imovel: null,
  });
};

export const excluirImovelSuccessReducer = state => {
  return state.merge({
    navegar: true,
    imovel: null,
  });
};

export const editarImovelRequestReducer = state => {
  return state.merge({
    navegar: false,
    imovel: null,
  });
};

export const editarImovelSuccessReducer = (state, { imovel }) => {
  return state.merge({
    navegar: true,
    imovel: imovel,
  });
};

export const editarImovelFailureReducer = state => {
  return state.merge({
    navegar: false,
    imovel: null,
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
});
