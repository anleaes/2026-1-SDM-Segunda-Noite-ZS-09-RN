import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateFuncionario'>;

const CreateFuncionarioScreen = ({ navigation }: Props) => {

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [matricula, setMatricula] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');
  const [dataContratacao, setDataContratacao] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setNome('');
      setCpf('');
      setDataNascimento('');
      setMatricula('');
      setCargo('');
      setSalario('');
      setDataContratacao('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    const response = await fetch(`${API_URL}/funcionarios/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, cpf, dataNascimento, matricula, cargo, salario, dataContratacao }),
    });
    if (response.ok) {
      navigation.navigate('Funcionarios');
    } else {
      Alert.alert('Erro', 'Não foi possível salvar. Verifique os dados (datas no formato AAAA-MM-DD).');
    }
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo funcionário</Text>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />
      <Text style={styles.label}>CPF</Text>
      <TextInput value={cpf} onChangeText={setCpf} style={styles.input} />
      <Text style={styles.label}>Data de nascimento (AAAA-MM-DD)</Text>
      <TextInput value={dataNascimento} onChangeText={setDataNascimento} style={styles.input} />
      <Text style={styles.label}>Matrícula</Text>
      <TextInput value={matricula} onChangeText={setMatricula} style={styles.input} />
      <Text style={styles.label}>Cargo</Text>
      <TextInput value={cargo} onChangeText={setCargo} style={styles.input} />
      <Text style={styles.label}>Salário</Text>
      <TextInput value={salario} onChangeText={setSalario} style={styles.input} keyboardType="numeric" />
      <Text style={styles.label}>Data de contratação (AAAA-MM-DD)</Text>
      <TextInput value={dataContratacao} onChangeText={setDataContratacao} style={styles.input} />
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Funcionarios')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default CreateFuncionarioScreen;
