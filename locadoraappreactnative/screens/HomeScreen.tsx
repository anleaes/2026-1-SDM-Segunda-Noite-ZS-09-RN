import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>Locadora de Veículos</Text>
    <Text style={styles.text}>Use o menu lateral para acessar os cadastros.</Text>

    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Clientes')}>
      <Text style={styles.botaoTexto}>Clientes</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Veiculos')}>
      <Text style={styles.botaoTexto}>Veículos</Text>
    </TouchableOpacity>
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
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#4B7BE5',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
    width: 200,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default HomeScreen;
