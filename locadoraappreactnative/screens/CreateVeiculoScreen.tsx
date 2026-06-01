import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateVeiculo'>;

const CreateVeiculoScreen = ({ navigation }: Props) => {

  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [valorDiaria, setValorDiaria] = useState('');
  const [ipvaPago, setIpvaPago] = useState(false);
  const [disponivel, setDisponivel] = useState(true);
  const [agencia, setAgencia] = useState('');
  const [categoria, setCategoria] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setPlaca('');
      setModelo('');
      setAno('');
      setValorDiaria('');
      setIpvaPago(false);
      setDisponivel(true);
      setAgencia('');
      setCategoria('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${API_URL}/veiculos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        placa,
        modelo,
        ano: Number(ano),
        valorDiaria,
        ipvaPago,
        disponivel,
        agencia: Number(agencia),
        categoria: Number(categoria),
      }),
    });
    navigation.navigate('Veiculos');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo veículo</Text>
      <Text style={styles.label}>Placa</Text>
      <TextInput value={placa} onChangeText={setPlaca} style={styles.input} />
      <Text style={styles.label}>Modelo</Text>
      <TextInput value={modelo} onChangeText={setModelo} style={styles.input} />
      <Text style={styles.label}>Ano</Text>
      <TextInput value={ano} onChangeText={setAno} style={styles.input} keyboardType="numeric" />
      <Text style={styles.label}>Valor da diária</Text>
      <TextInput value={valorDiaria} onChangeText={setValorDiaria} style={styles.input} keyboardType="numeric" />
      <View style={styles.switchRow}>
        <Text style={styles.label}>IPVA pago</Text>
        <Switch value={ipvaPago} onValueChange={setIpvaPago} />
      </View>
      <View style={styles.switchRow}>
        <Text style={styles.label}>Disponível</Text>
        <Switch value={disponivel} onValueChange={setDisponivel} />
      </View>
      <Text style={styles.label}>ID da agência</Text>
      <TextInput value={agencia} onChangeText={setAgencia} style={styles.input} keyboardType="numeric" />
      <Text style={styles.label}>ID da categoria</Text>
      <TextInput value={categoria} onChangeText={setCategoria} style={styles.input} keyboardType="numeric" />
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Veiculos')} />
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

export default CreateVeiculoScreen;
