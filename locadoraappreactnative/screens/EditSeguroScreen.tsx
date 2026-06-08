import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditSeguro'>;

const EditSeguroScreen = ({ route, navigation }: Props) => {
  const { seguro } = route.params;
  const [descricao, setDescricao] = useState(seguro.descricao);
  const [franquia, setFranquia] = useState(seguro.franquia);
  const [valorDiaria, setValorDiaria] = useState(seguro.valorDiaria);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDescricao(seguro.descricao);
    setFranquia(seguro.franquia);
    setValorDiaria(seguro.valorDiaria);
  }, [seguro]);

  const handleSave = async () => {
    setSaving(true);
    const response = await fetch(`${API_URL}/seguros/${seguro.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao, franquia, valorDiaria }),
    });
    if (response.ok) {
      navigation.navigate('Seguros');
    } else {
      Alert.alert('Erro', 'Não foi possível salvar. Verifique os dados (datas no formato AAAA-MM-DD).');
    }
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput value={descricao} onChangeText={setDescricao} style={styles.input} />
      <Text style={styles.label}>Franquia</Text>
      <TextInput value={franquia} onChangeText={setFranquia} style={styles.input} keyboardType="numeric" />
      <Text style={styles.label}>Valor da Diária</Text>
      <TextInput value={valorDiaria} onChangeText={setValorDiaria} style={styles.input} keyboardType="numeric" />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Seguros')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default EditSeguroScreen;
