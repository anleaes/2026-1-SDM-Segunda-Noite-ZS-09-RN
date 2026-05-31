import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateCarteira'>;

const CreateCarteiraScreen = ({ navigation }: Props) => {

  const [numeroRegistro, setNumeroRegistro] = useState('');
  const [categoria, setCategoria] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [cliente, setCliente] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setNumeroRegistro('');
      setCategoria('');
      setDataValidade('');
      setCliente('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${API_URL}/carteiras-motorista/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numeroRegistro, categoria, dataValidade, cliente: Number(cliente) }),
    });
    navigation.navigate('Carteiras');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova carteira</Text>
      <Text style={styles.label}>Número de registro</Text>
      <TextInput value={numeroRegistro} onChangeText={setNumeroRegistro} style={styles.input} />
      <Text style={styles.label}>Categoria</Text>
      <TextInput value={categoria} onChangeText={setCategoria} style={styles.input} />
      <Text style={styles.label}>Data de validade (AAAA-MM-DD)</Text>
      <TextInput value={dataValidade} onChangeText={setDataValidade} style={styles.input} />
      <Text style={styles.label}>ID do cliente</Text>
      <TextInput value={cliente} onChangeText={setCliente} style={styles.input} keyboardType="numeric" />
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
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default CreateCarteiraScreen;
