import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Reservas'>;

export type Reserva = {
  id: number;
  dataReserva: string;
  dataInicio: string;
  dataFim: string;
  valorTotal: string;
  status: string;
  cliente: number;
  veiculo: number;
  agencia: number;
  pagamento: { id: number; dataPagamento: string; valor: string; metodoPagamento: string; status: string } | null;
  itens_adicionais: { id: number; adicional: number; quantidade: number }[];
  multas: { id: number; valor: string; descricao: string; dataInfracao: string; pago: boolean }[];
};

const ReservasScreen = ({ navigation }: Props) => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReservas = async () => {
    setLoading(true);
    const response = await fetch(`${API_URL}/reservas/`);
    const data = await response.json();
    setReservas(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchReservas();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/reservas/${id}/`, { method: 'DELETE' });
    setReservas(prev => prev.filter(r => r.id !== id));
  };

  const renderItem = ({ item }: { item: Reserva }) => (
    <View style={styles.card}>
      <Text style={styles.name}>Reserva #{item.id}</Text>
      <Text style={styles.info}>Data da Reserva: {item.dataReserva}</Text>
      <Text style={styles.info}>Período: {item.dataInicio} a {item.dataFim}</Text>
      <Text style={styles.info}>Valor Total: R$ {item.valorTotal}</Text>
      <Text style={styles.info}>Status: {item.status}</Text>
      <Text style={styles.info}>Cliente ID: {item.cliente}</Text>
      <Text style={styles.info}>Veículo ID: {item.veiculo}</Text>
      <Text style={styles.info}>Agência ID: {item.agencia}</Text>

      <Text style={styles.subtitle}>Pagamento</Text>
      {item.pagamento ? (
        <Text style={styles.related}>
          #{item.pagamento.id} - R$ {item.pagamento.valor} ({item.pagamento.metodoPagamento}) - {item.pagamento.status}
        </Text>
      ) : (
        <Text style={styles.related}>Nenhum</Text>
      )}

      <Text style={styles.subtitle}>Itens Adicionais</Text>
      {item.itens_adicionais && item.itens_adicionais.length > 0 ? (
        item.itens_adicionais.map(i => (
          <Text key={i.id} style={styles.related}>
            Adicional #{i.adicional} - Qtd: {i.quantidade}
          </Text>
        ))
      ) : (
        <Text style={styles.related}>Nenhum</Text>
      )}

      <Text style={styles.subtitle}>Multas</Text>
      {item.multas && item.multas.length > 0 ? (
        item.multas.map(m => (
          <Text key={m.id} style={styles.related}>
            #{m.id} - R$ {m.valor} - {m.descricao} ({m.pago ? 'Pago' : 'Pendente'})
          </Text>
        ))
      ) : (
        <Text style={styles.related}>Nenhuma</Text>
      )}

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditReserva', { reserva: item })}
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
      <Text style={styles.title}>Reservas</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateReserva')}
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

export default ReservasScreen;
