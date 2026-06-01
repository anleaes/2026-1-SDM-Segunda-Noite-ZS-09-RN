import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import SeletorRelacionado from '../components/SeletorRelacionado';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateManutencao'>;

const CreateManutencaoScreen = ({ navigation }: Props) => {
  const [dataManutencao, setDataManutencao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [custo, setCusto] = useState('');
  const [status, setStatus] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setDataManutencao('');
      setDescricao('');
      setCusto('');
      setStatus('');
      setVeiculo('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${API_URL}/manutencoes/`, {
      method: 'POST',
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
      <Text style={styles.title}>Nova manutenção</Text>
      <Text style={styles.label}>Data da Manutenção (AAAA-MM-DD)</Text>
      <TextInput value={dataManutencao} onChangeText={setDataManutencao} style={styles.input} />
      <Text style={styles.label}>Descrição</Text>
      <TextInput value={descricao} onChangeText={setDescricao} style={styles.input} />
      <Text style={styles.label}>Custo</Text>
      <TextInput value={custo} onChangeText={setCusto} style={styles.input} keyboardType="numeric" />
      <Text style={styles.label}>Status</Text>
      <TextInput value={status} onChangeText={setStatus} style={styles.input} />
      <SeletorRelacionado label="Veículo" endpoint="veiculos" campoNome="modelo" valor={veiculo} onChange={setVeiculo} />
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
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default CreateManutencaoScreen;
