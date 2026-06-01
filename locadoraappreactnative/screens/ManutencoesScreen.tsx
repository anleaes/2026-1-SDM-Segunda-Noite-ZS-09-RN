import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Manutencoes'>;

export type Manutencao = {
  id: number;
  dataManutencao: string;
  descricao: string;
  custo: string;
  status: string;
  veiculo: number;
};

const ManutencoesScreen = ({ navigation }: Props) => {
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchManutencoes = async () => {
    setLoading(true);
    const response = await fetch(`${API_URL}/manutencoes/`);
    const data = await response.json();
    setManutencoes(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchManutencoes();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/manutencoes/${id}/`, { method: 'DELETE' });
    setManutencoes(prev => prev.filter(m => m.id !== id));
  };

  const renderItem = ({ item }: { item: Manutencao }) => (
    <View style={styles.card}>
      <Text style={styles.name}>Manutenção #{item.id}</Text>
      <Text style={styles.info}>Data: {item.dataManutencao}</Text>
      <Text style={styles.info}>Descrição: {item.descricao}</Text>
      <Text style={styles.info}>Custo: R$ {item.custo}</Text>
      <Text style={styles.info}>Status: {item.status}</Text>
      <Text style={styles.info}>Veículo ID: {item.veiculo}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditManutencao', { manutencao: item })}
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
      <Text style={styles.title}>Manutenções</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={manutencoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateManutencao')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  editButton: {
    backgroundColor: '#4B7BE5',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  editText: {
    color: '#fff',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#E54848',
    padding: 8,
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    marginTop: 12,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0D47A1',
    borderRadius: 28,
    padding: 14,
  },
});

export default ManutencoesScreen;
