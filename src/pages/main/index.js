import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { withNavigationFocus } from 'react-navigation';
import ContactList from '../../components/contactList';
import CadastroUsuario from '../cadastroUsuario';
import ListarImovel from '../listarImovel';

function Main({ navigation, isFocused }) {
  const [telas, setTelas] = useState({
    Pasta1: () => NavegarPasta1(),
    Pasta2: () => NavegarPasta2(),
    Pasta3: () => NavegarPasta3(),
  });
  const [tab, setTab] = useState(1);

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const imovelState = useSelector(state => state.imovel);

  useEffect(() => {
    if (isFocused) {
      telas[`${navigation.state.routeName}`]();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  function NavegarPasta1() {
    console.tron.log('NavegarPasta1');
    setTab(1);
  }
  function NavegarPasta2() {
    setTab(2);
  }
  function NavegarPasta3() {
    setTab(3);
  }

  saibaMais = objeto => {
    //navigation.navigate("Detalhar", { objeto });
  };

  if (tab === 1) {
    return <ListarImovel navigation={navigation} />;
  }
  if (tab === 2) {
    return <CadastroUsuario tipoManutencaoParametro="Alteracao" />;
  }
  if (tab === 3) {
    return <ContactList />;
  }
}

export default withNavigationFocus(Main);
