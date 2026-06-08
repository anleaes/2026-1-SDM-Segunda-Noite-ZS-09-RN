import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditCliente'>;

const EditClienteScreen = ({ route, navigation }: Props) => {
  const { cliente } = route.params;
  const [nome, setNome] = useState(cliente.nome);
  const [cpf, setCpf] = useState(cliente.cpf);
  const [dataNascimento, setDataNascimento] = useState(cliente.dataNascimento);
  const [ativo, setAtivo] = useState(cliente.ativo);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(cliente.nome);
    setCpf(cliente.cpf);
    setDataNascimento(cliente.dataNascimento);
    setAtivo(cliente.ativo);
  }, [cliente]);

  const handleSave = async () => {
    setSaving(true);
    const response = await fetch(`${API_URL}/clientes/${cliente.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, cpf, dataNascimento, ativo }),
    });
    if (response.ok) {
      navigation.navigate('Clientes');
    } else {
      Alert.alert('Erro', 'Não foi possível salvar. Verifique os dados (datas no formato AAAA-MM-DD).');
    }
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />
      <Text style={styles.label}>CPF</Text>
      <TextInput value={cpf} onChangeText={setCpf} style={styles.input} />
      <Text style={styles.label}>Data de nascimento (AAAA-MM-DD)</Text>
      <TextInput value={dataNascimento} onChangeText={setDataNascimento} style={styles.input} />
      <View style={styles.switchRow}>
        <Text style={styles.label}>Ativo</Text>
        <Switch value={ativo} onValueChange={setAtivo} />
      </View>
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Clientes')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
});

export default EditClienteScreen;
