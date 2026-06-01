import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditMulta'>;

const EditMultaScreen = ({ route, navigation }: Props) => {
  const { multa } = route.params;
  const [valor, setValor] = useState(multa.valor);
  const [descricao, setDescricao] = useState(multa.descricao);
  const [dataInfracao, setDataInfracao] = useState(multa.dataInfracao);
  const [pago, setPago] = useState(multa.pago);
  const [reserva, setReserva] = useState(String(multa.reserva));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setValor(multa.valor);
    setDescricao(multa.descricao);
    setDataInfracao(multa.dataInfracao);
    setPago(multa.pago);
    setReserva(String(multa.reserva));
  }, [multa]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${API_URL}/multas/${multa.id}/`, {
      method: 'PUT',
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
      <Text style={styles.label}>ID da Reserva</Text>
      <TextInput value={reserva} onChangeText={setReserva} style={styles.input} keyboardType="numeric" />
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
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
});

export default EditMultaScreen;
