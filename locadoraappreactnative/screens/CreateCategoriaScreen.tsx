import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateCategoria'>;

const CreateCategoriaScreen = ({ navigation }: Props) => {

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [capacidadePassageiros, setCapacidadePassageiros] = useState('');
  const [valorAdicional, setValorAdicional] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setNome('');
      setDescricao('');
      setCapacidadePassageiros('');
      setValorAdicional('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${API_URL}/categorias-veiculo/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        descricao,
        capacidadePassageiros: Number(capacidadePassageiros),
        valorAdicional,
      }),
    });
    navigation.navigate('Categorias');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova categoria</Text>
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
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default CreateCategoriaScreen;
