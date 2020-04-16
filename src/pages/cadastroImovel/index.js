import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View, StatusBar, TextInput, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

import Imovel from '../../model/imovel';

function CadastroImovel({navigation}) {
  const [descricaoImovel, setDescricaoImovel] = useState('');
  const [email, setEmail] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUF] = useState('');

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const imovelState = useSelector(state => state.imovel);

  useEffect(() => {
    navigation.navigate('Main');
  }, [imovelState.navegar]);

  function cadastrar() {
    var imovel = new Imovel();
    var idUsuario = auth.usuario.idUsuario;

    imovel.descricaoImovel = descricaoImovel;
    imovel.email = email;
    imovel.logradouro = logradouro;
    imovel.numero = numero;
    imovel.complemento = complemento;
    imovel.cep = cep;
    imovel.bairro = bairro;
    imovel.cidade = cidade;
    imovel.uf = uf;
    imovel.idUsuario = idUsuario;

    console.log(auth.usuario.idUsuario);
    console.log(imovel);

    dispatch({type: 'CADASTRAR_IMOVEL_REQUEST', imovel});
  }

  function voltar() {
    navigation.navigate('Main');
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.form}>
        <View style={styles.form}>
          <Icon name="file-text" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Descrição do Imóvel"
            autoCapitalize="none"
            autoCorrect={false}
            value={descricaoImovel}
            onChangeText={text => setDescricaoImovel(text)}
          />
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.form}>
          <Icon name="at" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Email do responsável"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.form}>
          <Icon name="road" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Logradouro do imóvel"
            autoCapitalize="none"
            autoCorrect={false}
            value={logradouro}
            onChangeText={text => setLogradouro(text)}
          />
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.form}>
          <Icon name="sort-numeric-asc" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Número do imóvel"
            autoCapitalize="none"
            autoCorrect={false}
            value={numero}
            onChangeText={text => setNumero(text)}
          />
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.form}>
          <Icon name="building" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Complemento do imóvel"
            autoCapitalize="none"
            autoCorrect={false}
            value={complemento}
            onChangeText={text => setComplemento(text)}
          />
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.form}>
          <Icon name="send" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Cep do imóvel"
            autoCapitalize="none"
            autoCorrect={false}
            value={cep}
            onChangeText={text => setCep(text)}
          />
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.form}>
          <Icon name="fort-awesome" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Bairro do imóvel"
            autoCapitalize="none"
            autoCorrect={false}
            value={bairro}
            onChangeText={text => setBairro(text)}
          />
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.form}>
          <Icon name="university" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Cidade do imóvel"
            autoCapitalize="none"
            autoCorrect={false}
            value={cidade}
            onChangeText={text => setCidade(text)}
          />
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.form}>
          <Icon name="flag" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="UF do imóvel"
            autoCapitalize="none"
            autoCorrect={false}
            value={uf}
            onChangeText={text => setUF(text)}
          />
        </View>
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={() => cadastrar()}>
          <Text style={styles.buttonText}> Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => voltar()}>
          <Text style={styles.buttonText}> Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CadastroImovel;

//  <Icon name="file-o" size={18} style={styles.inlineImg} />
