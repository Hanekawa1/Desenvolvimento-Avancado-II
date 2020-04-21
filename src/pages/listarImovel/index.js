import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { buscarTodos } from '../../services/imovelService';
import ImovelList from '../../components/imovelList';

import { useSelector } from 'react-redux';

function ListarImovel({ navigation }) {
  const [imoveis, setImoveis] = useState([]);

  const imovelState = useSelector(state => state.imovel);

  useEffect(() => {
    obterImoveis();
  }, []);

  useEffect(() => {
    //navigation.navigate('Main');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imovelState.navegar]);

  async function obterImoveis() {
    const imoveisObtidos = await buscarTodos();
    setImoveis(imoveisObtidos);
  }

  return (
    <View>
      {imoveis.map(imovel => {
        return <ImovelList imovel={imovel} />;
      })}
    </View>
  );
}
export default ListarImovel;
