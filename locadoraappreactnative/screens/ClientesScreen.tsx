import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Clientes'>;

export type Cliente = {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  ativo: boolean;
  carteiraMotorista: { id: number; numeroRegistro: string; categoria: string } | null;
  reservas: { id: number; dataInicio: string; dataFim: string; status: string }[];
  multas: { id: number; valor: string; descricao: string }[];
};

const ClientesScreen = ({ navigation }: Props) => {

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClientes = async () => {
    setLoading(true);
    const response = await fetch(`${API_URL}/clientes/`);
    const data = await response.json();
    setClientes(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchClientes();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/clientes/${id}/`, { method: 'DELETE' });
    setClientes(prev => prev.filter(c => c.id !== id));
  };

  const renderItem = ({ item }: { item: Cliente }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.nome}</Text>
      <Text style={styles.info}>CPF: {item.cpf}</Text>
      <Text style={styles.info}>Nascimento: {item.dataNascimento}</Text>
      <Text style={styles.info}>Ativo: {item.ativo ? 'Sim' : 'Não'}</Text>

      <Text style={styles.subtitle}>Carteira</Text>
      {item.carteiraMotorista ? (
        <Text style={styles.related}>
          #{item.carteiraMotorista.id} {item.carteiraMotorista.numeroRegistro} ({item.carteiraMotorista.categoria})
        </Text>
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

      <Text style={styles.subtitle}>Multas</Text>
      {item.multas.length > 0 ? (
        item.multas.map(m => (
          <Text key={m.id} style={styles.related}>
            #{m.id} R$ {m.valor} - {m.descricao}
          </Text>
        ))
      ) : (
        <Text style={styles.related}>Nenhuma</Text>
      )}

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditCliente', { cliente: item })}
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
      <Text style={styles.title}>Clientes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={clientes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateCliente')}
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
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginTop: 8,
  },
  related: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
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

export default ClientesScreen;
