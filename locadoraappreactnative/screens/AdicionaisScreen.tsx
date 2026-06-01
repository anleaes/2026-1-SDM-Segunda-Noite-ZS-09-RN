import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Adicionais'>;

export type Adicional = {
  id: number;
  descricao: string;
  valorDiaria: string;
  itens_adicionais: { id: number; reserva: number; quantidade: number }[];
};

const AdicionaisScreen = ({ navigation }: Props) => {
  const [adicionais, setAdicionais] = useState<Adicional[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAdicionais = async () => {
    setLoading(true);
    const response = await fetch(`${API_URL}/adicionais/`);
    const data = await response.json();
    setAdicionais(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAdicionais();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/adicionais/${id}/`, { method: 'DELETE' });
    setAdicionais(prev => prev.filter(a => a.id !== id));
  };

  const renderItem = ({ item }: { item: Adicional }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.descricao}</Text>
      <Text style={styles.info}>Valor Diária: R$ {item.valorDiaria}</Text>

      <Text style={styles.subtitle}>Itens Adicionais</Text>
      {item.itens_adicionais && item.itens_adicionais.length > 0 ? (
        item.itens_adicionais.map(i => (
          <Text key={i.id} style={styles.related}>
            Reserva #{i.reserva} - Qtd: {i.quantidade}
          </Text>
        ))
      ) : (
        <Text style={styles.related}>Nenhum</Text>
      )}

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditAdicional', { adicional: item })}
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
      <Text style={styles.title}>Adicionais</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={adicionais}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateAdicional')}
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

export default AdicionaisScreen;
