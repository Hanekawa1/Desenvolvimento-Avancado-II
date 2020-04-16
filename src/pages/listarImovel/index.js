import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {buscarTodos} from '../../services/imovelService';

import styles from './styles';

function ListarImovel({navigation}) {
  const [imoveis, setImoveis] = useState([]);

  useEffect(() => {
    buscarTodos();
    //const arrayImoveis = pegarImoveis();
    //setImoveis(arrayImoveis);
    console.log(imoveis);
  }, []);

  async function pegarImoveis() {
    //const array = await buscarTodos();
    //return array;
  }

  return (
    <View>
      <Text>Teste</Text>
    </View>
  );
}
export default ListarImovel;
