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
          title={imovel.descricaoImovel}
          id={imovel.idImovel}
          icon="user-o">
          <View style={styles.container}>
            <ScrollView>
              <View style={styles.containerImovel}>
                <Text style={styles.texto}>
                  Rua {imovel.logradouroImovel}, nº {imovel.numero}, bairro{' '}
                  {imovel.bairro}
                </Text>
                <Text style={styles.texto}>
                  {imovel.complemento} - {imovel.cidade} - {imovel.uf}
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
