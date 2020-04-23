import React, { useState, useEffect } from 'react';
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
  var objeto = navigation.getParam('objeto');
  console.log(objeto);

  function pesquisar() {}

  return (
    <View style={Styles.container}>
      <ScrollView>
        <View>
          <View>
            <Icon name="fort-awesome" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Bairro do imóvel"
              autoCapitalize="none"
              autoCorrect={false}
              value={query}
              onChangeText={text => setQuery(text)}
            />
          </View>
        </View>
        <TouchableOpacity style={Styles.button} onPress={() => pesquisar()}>
          <Text style={Styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default Detalhar;
