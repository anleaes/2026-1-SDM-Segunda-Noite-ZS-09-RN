import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditFuncionario'>;

const EditFuncionarioScreen = ({ route, navigation }: Props) => {
  const { funcionario } = route.params;
  const [nome, setNome] = useState(funcionario.nome);
  const [cpf, setCpf] = useState(funcionario.cpf);
  const [dataNascimento, setDataNascimento] = useState(funcionario.dataNascimento);
  const [matricula, setMatricula] = useState(funcionario.matricula);
  const [cargo, setCargo] = useState(funcionario.cargo);
  const [salario, setSalario] = useState(String(funcionario.salario));
  const [dataContratacao, setDataContratacao] = useState(funcionario.dataContratacao);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(funcionario.nome);
    setCpf(funcionario.cpf);
    setDataNascimento(funcionario.dataNascimento);
    setMatricula(funcionario.matricula);
    setCargo(funcionario.cargo);
    setSalario(String(funcionario.salario));
    setDataContratacao(funcionario.dataContratacao);
  }, [funcionario]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${API_URL}/funcionarios/${funcionario.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, cpf, dataNascimento, matricula, cargo, salario, dataContratacao }),
    });
    navigation.navigate('Funcionarios');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
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
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default EditFuncionarioScreen;
