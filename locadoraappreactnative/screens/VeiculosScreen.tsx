import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Veiculos'>;

export type Veiculo = {
  id: number;
  placa: string;
  modelo: string;
  ano: number;
  valorDiaria: string;
  ipvaPago: boolean;
  disponivel: boolean;
  agencia: number;
  categoria: number;
  manutencoes: { id: number; descricao: string; status: string }[];
  reservas: { id: number; dataInicio: string; dataFim: string; status: string }[];
};

const VeiculosScreen = ({ navigation }: Props) => {

  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVeiculos = async () => {
    setLoading(true);
    const response = await fetch(`${API_URL}/veiculos/`);
    const data = await response.json();
    setVeiculos(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchVeiculos();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/veiculos/${id}/`, { method: 'DELETE' });
    setVeiculos(prev => prev.filter(v => v.id !== id));
  };

  const renderItem = ({ item }: { item: Veiculo }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.modelo} ({item.placa})</Text>
      <Text style={styles.info}>Ano: {item.ano}</Text>
      <Text style={styles.info}>Diária: R$ {item.valorDiaria}</Text>
      <Text style={styles.info}>IPVA pago: {item.ipvaPago ? 'Sim' : 'Não'}</Text>
      <Text style={styles.info}>Disponível: {item.disponivel ? 'Sim' : 'Não'}</Text>

      <Text style={styles.subtitle}>Manutenções</Text>
      {item.manutencoes.length > 0 ? (
        item.manutencoes.map(m => (
          <Text key={m.id} style={styles.related}>{m.descricao} - {m.status}</Text>
        ))
      ) : (
        <Text style={styles.related}>Nenhuma</Text>
      )}

      <Text style={styles.subtitle}>Reservas</Text>
      {item.reservas.length > 0 ? (
        item.reservas.map(r => (
          <Text key={r.id} style={styles.related}>
            #{r.id} {r.dataInicio} a {r.dataFim} - {r.status}
          </Text>
        ))
      ) : (
        <Text style={styles.related}>Nenhuma</Text>
      )}

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditVeiculo', { veiculo: item })}
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
      <Text style={styles.title}>Veículos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={veiculos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateVeiculo')}
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

export default VeiculosScreen;
