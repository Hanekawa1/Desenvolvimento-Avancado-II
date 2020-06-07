import React from 'react';

import styles from './styles';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AccordionObject from '../accordionObject';

function ImovelList({ imovel }) {
  return (
    <View key={imovel.idImovel} style={styles.containerPerfil}>
      <ScrollView>
        <AccordionObject
          title={imovel.DescricaoImovel}
          id={imovel._id}
          icon="user-o">
          <View style={styles.container}>
            <ScrollView>
              <View style={styles.containerImovel}>
                <Text style={styles.texto}>
                  Rua {imovel.LogradouroImovel}, nº {imovel.Numero}, bairro{' '}
                  {imovel.Bairro}
                </Text>
                <Text style={styles.texto}>
                  {imovel.Complemento} - {imovel.Cidade} - {imovel.Uf}
                </Text>
              </View>
            </ScrollView>
          </View>
        </AccordionObject>
      </ScrollView>
    </View>
  );
}

export default ImovelList;
