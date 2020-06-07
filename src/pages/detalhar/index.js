import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Styles from './styles';

function Detalhar({ navigation }) {
  const [query, setQuery] = useState('');
  const imovelState = useSelector(state => state.imovel);

  const dispatch = useDispatch();

  useEffect(() => {
    if (imovelState.navegar === true) {
      navigation.navigate('Main');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imovelState.navegar]);

  function pesquisar() {
    dispatch({ type: 'PESQUISA_IMOVEL_REQUEST', query });
  }

  return (
    <View style={Styles.container}>
      <ScrollView>
        <Text>
          Digite o que você desejaria encontrar na descrição do imóvel
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Pesquise aqui"
          autoCapitalize="none"
          autoCorrect={false}
          value={query}
          onChangeText={text => setQuery(text)}
        />

        <TouchableOpacity style={Styles.button} onPress={() => pesquisar()}>
          <Text style={Styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default Detalhar;
