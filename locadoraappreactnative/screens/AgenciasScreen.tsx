import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Agencias'>;

export type Agencia = {
  id: number;
  nome: string;
  endereco: string;
  telefone: string;
  ativa: boolean;
  veiculos: { id: number; placa: string; modelo: string }[];
  funcionarios: { id: number; nome: string; cargo: string }[];
};

const AgenciasScreen = ({ navigation }: Props) => {

  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAgencias = async () => {
    setLoading(true);
    const response = await fetch(`${API_URL}/agencias/`);
    const data = await response.json();
    setAgencias(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAgencias();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/agencias/${id}/`, { method: 'DELETE' });
    setAgencias(prev => prev.filter(a => a.id !== id));
  };

  const renderItem = ({ item }: { item: Agencia }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.nome}</Text>
      <Text style={styles.info}>{item.endereco}</Text>
      <Text style={styles.info}>Telefone: {item.telefone}</Text>
      <Text style={styles.info}>Ativa: {item.ativa ? 'Sim' : 'Não'}</Text>

      <Text style={styles.subtitle}>Veículos</Text>
      {item.veiculos.length > 0 ? (
        item.veiculos.map(v => (
          <Text key={v.id} style={styles.related}>#{v.id} {v.modelo} ({v.placa})</Text>
        ))
      ) : (
        <Text style={styles.related}>Nenhum</Text>
      )}

      <Text style={styles.subtitle}>Funcionários</Text>
      {item.funcionarios.length > 0 ? (
        item.funcionarios.map(f => (
          <Text key={f.id} style={styles.related}>#{f.id} {f.nome} - {f.cargo}</Text>
        ))
      ) : (
        <Text style={styles.related}>Nenhum</Text>
      )}

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditAgencia', { agencia: item })}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.editText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agências</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={agencias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateAgencia')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#333', alignSelf: 'center' },
  card: { backgroundColor: '#f0f4ff', padding: 16, borderRadius: 10, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: '600', color: '#222' },
  info: { fontSize: 14, color: '#666', marginTop: 2 },
  subtitle: { fontSize: 14, fontWeight: '600', color: '#444', marginTop: 8 },
  related: { fontSize: 13, color: '#666', marginLeft: 8 },
  editButton: { backgroundColor: '#4B7BE5', padding: 8, borderRadius: 6, marginRight: 8 },
  editText: { color: '#fff', fontWeight: '500' },
  deleteButton: { backgroundColor: '#E54848', padding: 8, borderRadius: 6 },
  row: { flexDirection: 'row', marginTop: 12 },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#0D47A1', borderRadius: 28, padding: 14 },
});

export default AgenciasScreen;
