import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditItemAdicional'>;

const EditItemAdicionalScreen = ({ route, navigation }: Props) => {
  const { itemAdicional } = route.params;
  const [reserva, setReserva] = useState(String(itemAdicional.reserva));
  const [adicional, setAdicional] = useState(String(itemAdicional.adicional));
  const [quantidade, setQuantidade] = useState(String(itemAdicional.quantidade));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setReserva(String(itemAdicional.reserva));
    setAdicional(String(itemAdicional.adicional));
    setQuantidade(String(itemAdicional.quantidade));
  }, [itemAdicional]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${API_URL}/itens-adicionais/${itemAdicional.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reserva: Number(reserva),
        adicional: Number(adicional),
        quantidade: Number(quantidade),
      }),
    });
    navigation.navigate('ItensAdicionais');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID da Reserva</Text>
      <TextInput value={reserva} onChangeText={setReserva} style={styles.input} keyboardType="numeric" />
      <Text style={styles.label}>ID do Adicional</Text>
      <TextInput value={adicional} onChangeText={setAdicional} style={styles.input} keyboardType="numeric" />
      <Text style={styles.label}>Quantidade</Text>
      <TextInput value={quantidade} onChangeText={setQuantidade} style={styles.input} keyboardType="numeric" />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('ItensAdicionais')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default EditItemAdicionalScreen;
