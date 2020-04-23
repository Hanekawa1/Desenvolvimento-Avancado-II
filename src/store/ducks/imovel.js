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
  pesquisaImovelRequest: ['query'],
  pesquisaImovelSuccess: ['imoveis'],
  pesquisaImovelFailure: null,
});

export const ImovelTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  navegar: false,
  imovel: null,
  imoveis: null,
  pesquisa: null,
  irPraMain: false,
  edicao: false,
});

export const cadastrarImovelRequestReducer = state =>
  state.merge({
    navegar: true,
    imovel: null,
    edicao: false,
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
    edicao: true,
  });
};

export const editarImovelSuccessReducer = state => {
  return state.merge({
    navegar: true,
    imovel: null,
    edicao: false,
  });
};

export const editarImovelFailureReducer = state => {
  return state.merge({
    navegar: false,
    imovel: null,
  });
};

export const montarImovelReducer = (state, { imovel }) => {
  return state.merge({
    navegar: false,
    imovel: imovel,
  });
};

export const pesquisaImovelRequestReducer = state => {
  return state.merge({
    navegar: true,
    imovel: null,
  });
};

export const pesquisaImovelSuccessReducer = (state, { imoveis }) => {
  return state.merge({
    navegar: true,
    imovel: null,
    imoveis: imoveis,
    pesquisa: true,
    irPraMain: true,
  });
};

export const pesquisaImovelFailureReducer = state => {
  return state.merge({
    navegar: true,
    imovel: null,
    imoveis: null,
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
  [Types.PESQUISA_IMOVEL_REQUEST]: pesquisaImovelRequestReducer,
  [Types.PESQUISA_IMOVEL_SUCCESS]: pesquisaImovelSuccessReducer,
  [Types.PESQUISA_IMOVEL_FAILURE]: pesquisaImovelFailureReducer,
});
