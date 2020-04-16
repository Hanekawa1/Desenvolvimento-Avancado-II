import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {buscarTodos} from '../../services/imovelService';

import styles from './styles';

function ListarImovel({navigation}) {
  const [imoveis, setImoveis] = useState([]);

  useEffect(() => {
    obterImoveis();
  }, []);

  async function obterImoveis() {
    const imoveisObtidos = await buscarTodos();
    setImoveis(imoveisObtidos);
    console.log(imoveis);
  }

  return (
    <View>
      <View>
        {imoveis.map(imovel => {
          return <Text>{imovel.bairro}</Text>;
        })}
        <Text>Teste</Text>
      </View>
    </View>
  );
}
export default ListarImovel;
