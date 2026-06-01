import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditManutencao'>;

const EditManutencaoScreen = ({ route, navigation }: Props) => {
  const { manutencao } = route.params;
  const [dataManutencao, setDataManutencao] = useState(manutencao.dataManutencao);
  const [descricao, setDescricao] = useState(manutencao.descricao);
  const [custo, setCusto] = useState(manutencao.custo);
  const [status, setStatus] = useState(manutencao.status);
  const [veiculo, setVeiculo] = useState(String(manutencao.veiculo));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDataManutencao(manutencao.dataManutencao);
    setDescricao(manutencao.descricao);
    setCusto(manutencao.custo);
    setStatus(manutencao.status);
    setVeiculo(String(manutencao.veiculo));
  }, [manutencao]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${API_URL}/manutencoes/${manutencao.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dataManutencao,
        descricao,
        custo,
        status,
        veiculo: Number(veiculo),
      }),
    });
    navigation.navigate('Manutencoes');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Data da Manutenção (AAAA-MM-DD)</Text>
      <TextInput value={dataManutencao} onChangeText={setDataManutencao} style={styles.input} />
      <Text style={styles.label}>Descrição</Text>
      <TextInput value={descricao} onChangeText={setDescricao} style={styles.input} />
      <Text style={styles.label}>Custo</Text>
      <TextInput value={custo} onChangeText={setCusto} style={styles.input} keyboardType="numeric" />
      <Text style={styles.label}>Status</Text>
      <TextInput value={status} onChangeText={setStatus} style={styles.input} />
      <Text style={styles.label}>ID do Veículo</Text>
      <TextInput value={veiculo} onChangeText={setVeiculo} style={styles.input} keyboardType="numeric" />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Manutencoes')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default EditManutencaoScreen;
