import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Pessoa'>;

const PessoaScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>Pessoa</Text>
    <Text style={styles.text}>
      Pessoa é a estrutura base do sistema. Cliente e Funcionário herdam dela os
      atributos nome, CPF e data de nascimento.
    </Text>
    <Text style={styles.item}>• Nome</Text>
    <Text style={styles.item}>• CPF</Text>
    <Text style={styles.item}>• Data de nascimento</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  item: {
    fontSize: 15,
    color: '#444',
    marginTop: 6,
  },
});

export default PessoaScreen;
