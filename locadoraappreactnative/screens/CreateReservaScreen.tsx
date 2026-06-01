import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import SeletorRelacionado from '../components/SeletorRelacionado';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateReserva'>;

const CreateReservaScreen = ({ navigation }: Props) => {
  const [dataReserva, setDataReserva] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [status, setStatus] = useState('');
  const [cliente, setCliente] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [agencia, setAgencia] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setDataReserva('');
      setDataInicio('');
      setDataFim('');
      setValorTotal('');
      setStatus('');
      setCliente('');
      setVeiculo('');
      setAgencia('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${API_URL}/reservas/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dataReserva,
        dataInicio,
        dataFim,
        valorTotal,
        status,
        cliente: Number(cliente),
        veiculo: Number(veiculo),
        agencia: Number(agencia),
      }),
    });
    navigation.navigate('Reservas');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova reserva</Text>
      <Text style={styles.label}>Data da Reserva (AAAA-MM-DD)</Text>
      <TextInput value={dataReserva} onChangeText={setDataReserva} style={styles.input} />
      <Text style={styles.label}>Data de Início (AAAA-MM-DD)</Text>
      <TextInput value={dataInicio} onChangeText={setDataInicio} style={styles.input} />
      <Text style={styles.label}>Data de Fim (AAAA-MM-DD)</Text>
      <TextInput value={dataFim} onChangeText={setDataFim} style={styles.input} />
      <Text style={styles.label}>Valor Total</Text>
      <TextInput value={valorTotal} onChangeText={setValorTotal} style={styles.input} keyboardType="numeric" />
      <Text style={styles.label}>Status</Text>
      <TextInput value={status} onChangeText={setStatus} style={styles.input} />
      <SeletorRelacionado label="Cliente" endpoint="clientes" campoNome="nome" valor={cliente} onChange={setCliente} />
      <SeletorRelacionado label="Veículo" endpoint="veiculos" campoNome="modelo" valor={veiculo} onChange={setVeiculo} />
      <SeletorRelacionado label="Agência" endpoint="agencias" campoNome="nome" valor={agencia} onChange={setAgencia} />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Reservas')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default CreateReservaScreen;
