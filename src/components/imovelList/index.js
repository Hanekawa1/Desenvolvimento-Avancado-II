import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles';
import { View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AccordionObject from '../accordionObject';
import Icon from 'react-native-vector-icons/FontAwesome';

function ImovelList({ imovel }) {
  const [idUsuario, setIdUsuario] = useState(0);

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    setIdUsuario(auth.usuario.idUsuario);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function excluir(idImovel) {
    dispatch({ type: 'EXCLUIR_IMOVEL_REQUEST', idImovel });
  }

  function editar(imovel) {
    console.log(imovel);
  }

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
                {imovel.idUsuario === idUsuario ? (
                  <View>
                    <TouchableOpacity onPress={() => editar(imovel)}>
                      <Icon name="file" size={18} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => excluir(imovel.idImovel)}>
                      <Icon name="remove" size={18} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </ScrollView>
          </View>
        </AccordionObject>
      </ScrollView>
    </View>
  );
}

export default ImovelList;
