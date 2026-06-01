import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import SeletorRelacionado from '../components/SeletorRelacionado';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditVeiculo'>;

const EditVeiculoScreen = ({ route, navigation }: Props) => {
  const { veiculo } = route.params;
  const [placa, setPlaca] = useState(veiculo.placa);
  const [modelo, setModelo] = useState(veiculo.modelo);
  const [ano, setAno] = useState(String(veiculo.ano));
  const [valorDiaria, setValorDiaria] = useState(String(veiculo.valorDiaria));
  const [ipvaPago, setIpvaPago] = useState(veiculo.ipvaPago);
  const [disponivel, setDisponivel] = useState(veiculo.disponivel);
  const [agencia, setAgencia] = useState(String(veiculo.agencia));
  const [categoria, setCategoria] = useState(String(veiculo.categoria));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setPlaca(veiculo.placa);
    setModelo(veiculo.modelo);
    setAno(String(veiculo.ano));
    setValorDiaria(String(veiculo.valorDiaria));
    setIpvaPago(veiculo.ipvaPago);
    setDisponivel(veiculo.disponivel);
    setAgencia(String(veiculo.agencia));
    setCategoria(String(veiculo.categoria));
  }, [veiculo]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${API_URL}/veiculos/${veiculo.id}/`, {
      method: 'PUT',
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
      <SeletorRelacionado label="Agência" endpoint="agencias" campoNome="nome" valor={agencia} onChange={setAgencia} />
      <SeletorRelacionado label="Categoria" endpoint="categorias-veiculo" campoNome="nome" valor={categoria} onChange={setCategoria} />
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
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
});

export default EditVeiculoScreen;
