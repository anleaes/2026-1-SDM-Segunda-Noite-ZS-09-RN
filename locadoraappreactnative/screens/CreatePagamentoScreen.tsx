import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import SeletorRelacionado from '../components/SeletorRelacionado';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreatePagamento'>;

const CreatePagamentoScreen = ({ navigation }: Props) => {
  const [dataPagamento, setDataPagamento] = useState('');
  const [valor, setValor] = useState('');
  const [metodoPagamento, setMetodoPagamento] = useState('');
  const [status, setStatus] = useState('');
  const [reserva, setReserva] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setDataPagamento('');
      setValor('');
      setMetodoPagamento('');
      setStatus('');
      setReserva('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    const response = await fetch(`${API_URL}/pagamentos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dataPagamento,
        valor,
        metodoPagamento,
        status,
        reserva: Number(reserva),
      }),
    });
    if (response.ok) {
      navigation.navigate('Pagamentos');
    } else {
      Alert.alert('Erro', 'Não foi possível salvar. Verifique os dados (datas no formato AAAA-MM-DD).');
    }
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo pagamento</Text>
      <Text style={styles.label}>Data de Pagamento (AAAA-MM-DD)</Text>
      <TextInput value={dataPagamento} onChangeText={setDataPagamento} style={styles.input} />
      <Text style={styles.label}>Valor</Text>
      <TextInput value={valor} onChangeText={setValor} style={styles.input} keyboardType="numeric" />
      <Text style={styles.label}>Método de Pagamento</Text>
      <TextInput value={metodoPagamento} onChangeText={setMetodoPagamento} style={styles.input} />
      <Text style={styles.label}>Status</Text>
      <TextInput value={status} onChangeText={setStatus} style={styles.input} />
      <SeletorRelacionado label="Reserva" endpoint="reservas" campoNome="status" valor={reserva} onChange={setReserva} />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Pagamentos')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default CreatePagamentoScreen;
