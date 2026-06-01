import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditAgencia'>;

const EditAgenciaScreen = ({ route, navigation }: Props) => {
  const { agencia } = route.params;
  const [nome, setNome] = useState(agencia.nome);
  const [endereco, setEndereco] = useState(agencia.endereco);
  const [telefone, setTelefone] = useState(agencia.telefone);
  const [ativa, setAtiva] = useState(agencia.ativa);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(agencia.nome);
    setEndereco(agencia.endereco);
    setTelefone(agencia.telefone);
    setAtiva(agencia.ativa);
  }, [agencia]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${API_URL}/agencias/${agencia.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, endereco, telefone, ativa }),
    });
    navigation.navigate('Agencias');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />
      <Text style={styles.label}>Endereço</Text>
      <TextInput value={endereco} onChangeText={setEndereco} style={styles.input} />
      <Text style={styles.label}>Telefone</Text>
      <TextInput value={telefone} onChangeText={setTelefone} style={styles.input} />
      <View style={styles.switchRow}>
        <Text style={styles.label}>Ativa</Text>
        <Switch value={ativa} onValueChange={setAtiva} />
      </View>
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Agencias')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
});

export default EditAgenciaScreen;
