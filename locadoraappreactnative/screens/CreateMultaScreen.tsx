import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import SeletorRelacionado from '../components/SeletorRelacionado';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateMulta'>;

const CreateMultaScreen = ({ navigation }: Props) => {
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataInfracao, setDataInfracao] = useState('');
  const [pago, setPago] = useState(false);
  const [reserva, setReserva] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setValor('');
      setDescricao('');
      setDataInfracao('');
      setPago(false);
      setReserva('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${API_URL}/multas/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        valor,
        descricao,
        dataInfracao,
        pago,
        reserva: Number(reserva),
      }),
    });
    navigation.navigate('Multas');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova multa</Text>
      <Text style={styles.label}>Valor</Text>
      <TextInput value={valor} onChangeText={setValor} style={styles.input} keyboardType="numeric" />
      <Text style={styles.label}>Descrição</Text>
      <TextInput value={descricao} onChangeText={setDescricao} style={styles.input} />
      <Text style={styles.label}>Data da Infração (AAAA-MM-DD)</Text>
      <TextInput value={dataInfracao} onChangeText={setDataInfracao} style={styles.input} />
      <View style={styles.switchRow}>
        <Text style={styles.label}>Pago</Text>
        <Switch value={pago} onValueChange={setPago} />
      </View>
      <SeletorRelacionado label="Reserva" endpoint="reservas" campoNome="status" valor={reserva} onChange={setReserva} />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Multas')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
});

export default CreateMultaScreen;
