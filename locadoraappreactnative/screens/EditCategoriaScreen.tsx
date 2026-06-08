import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditCategoria'>;

const EditCategoriaScreen = ({ route, navigation }: Props) => {
  const { categoria } = route.params;
  const [nome, setNome] = useState(categoria.nome);
  const [descricao, setDescricao] = useState(categoria.descricao);
  const [capacidadePassageiros, setCapacidadePassageiros] = useState(String(categoria.capacidadePassageiros));
  const [valorAdicional, setValorAdicional] = useState(String(categoria.valorAdicional));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(categoria.nome);
    setDescricao(categoria.descricao);
    setCapacidadePassageiros(String(categoria.capacidadePassageiros));
    setValorAdicional(String(categoria.valorAdicional));
  }, [categoria]);

  const handleSave = async () => {
    setSaving(true);
    const response = await fetch(`${API_URL}/categorias-veiculo/${categoria.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        descricao,
        capacidadePassageiros: Number(capacidadePassageiros),
        valorAdicional,
      }),
    });
    if (response.ok) {
      navigation.navigate('Categorias');
    } else {
      Alert.alert('Erro', 'Não foi possível salvar. Verifique os dados (datas no formato AAAA-MM-DD).');
    }
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />
      <Text style={styles.label}>Descrição</Text>
      <TextInput value={descricao} onChangeText={setDescricao} style={[styles.input, { height: 80 }]} multiline />
      <Text style={styles.label}>Capacidade de passageiros</Text>
      <TextInput value={capacidadePassageiros} onChangeText={setCapacidadePassageiros} style={styles.input} keyboardType="numeric" />
      <Text style={styles.label}>Valor adicional</Text>
      <TextInput value={valorAdicional} onChangeText={setValorAdicional} style={styles.input} keyboardType="numeric" />
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Categorias')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default EditCategoriaScreen;
