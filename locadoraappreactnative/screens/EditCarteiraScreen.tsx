import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import SeletorRelacionado from '../components/SeletorRelacionado';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditCarteira'>;

const EditCarteiraScreen = ({ route, navigation }: Props) => {
  const { carteira } = route.params;
  const [numeroRegistro, setNumeroRegistro] = useState(carteira.numeroRegistro);
  const [categoria, setCategoria] = useState(carteira.categoria);
  const [dataValidade, setDataValidade] = useState(carteira.dataValidade);
  const [cliente, setCliente] = useState(String(carteira.cliente));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNumeroRegistro(carteira.numeroRegistro);
    setCategoria(carteira.categoria);
    setDataValidade(carteira.dataValidade);
    setCliente(String(carteira.cliente));
  }, [carteira]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${API_URL}/carteiras-motorista/${carteira.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numeroRegistro, categoria, dataValidade, cliente: Number(cliente) }),
    });
    navigation.navigate('Carteiras');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Número de registro</Text>
      <TextInput value={numeroRegistro} onChangeText={setNumeroRegistro} style={styles.input} />
      <Text style={styles.label}>Categoria</Text>
      <TextInput value={categoria} onChangeText={setCategoria} style={styles.input} />
      <Text style={styles.label}>Data de validade (AAAA-MM-DD)</Text>
      <TextInput value={dataValidade} onChangeText={setDataValidade} style={styles.input} />
      <SeletorRelacionado label="Cliente" endpoint="clientes" campoNome="nome" valor={cliente} onChange={setCliente} />
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Carteiras')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default EditCarteiraScreen;
