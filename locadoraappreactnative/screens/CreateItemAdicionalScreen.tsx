import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateItemAdicional'>;

const CreateItemAdicionalScreen = ({ navigation }: Props) => {
  const [reserva, setReserva] = useState('');
  const [adicional, setAdicional] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setReserva('');
      setAdicional('');
      setQuantidade('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${API_URL}/itens-adicionais/`, {
      method: 'POST',
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
      <Text style={styles.title}>Novo item adicional</Text>
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
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default CreateItemAdicionalScreen;
