import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import SeletorRelacionado from '../components/SeletorRelacionado';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditReserva'>;

const EditReservaScreen = ({ route, navigation }: Props) => {
  const { reserva } = route.params;
  const [dataReserva, setDataReserva] = useState(reserva.dataReserva);
  const [dataInicio, setDataInicio] = useState(reserva.dataInicio);
  const [dataFim, setDataFim] = useState(reserva.dataFim);
  const [valorTotal, setValorTotal] = useState(reserva.valorTotal);
  const [status, setStatus] = useState(reserva.status);
  const [cliente, setCliente] = useState(String(reserva.cliente));
  const [veiculo, setVeiculo] = useState(String(reserva.veiculo));
  const [agencia, setAgencia] = useState(String(reserva.agencia));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDataReserva(reserva.dataReserva);
    setDataInicio(reserva.dataInicio);
    setDataFim(reserva.dataFim);
    setValorTotal(reserva.valorTotal);
    setStatus(reserva.status);
    setCliente(String(reserva.cliente));
    setVeiculo(String(reserva.veiculo));
    setAgencia(String(reserva.agencia));
  }, [reserva]);

  const handleSave = async () => {
    setSaving(true);
    const response = await fetch(`${API_URL}/reservas/${reserva.id}/`, {
      method: 'PUT',
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
    if (response.ok) {
      navigation.navigate('Reservas');
    } else {
      Alert.alert('Erro', 'Não foi possível salvar. Verifique os dados (datas no formato AAAA-MM-DD).');
    }
    setSaving(false);
  };

  return (
    <View style={styles.container}>
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
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default EditReservaScreen;
