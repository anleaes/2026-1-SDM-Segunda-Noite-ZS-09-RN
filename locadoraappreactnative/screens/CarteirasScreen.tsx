import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Carteiras'>;

export type Carteira = {
  id: number;
  numeroRegistro: string;
  categoria: string;
  dataValidade: string;
  cliente: number;
};

const CarteirasScreen = ({ navigation }: Props) => {

  const [carteiras, setCarteiras] = useState<Carteira[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCarteiras = async () => {
    setLoading(true);
    const response = await fetch(`${API_URL}/carteiras-motorista/`);
    const data = await response.json();
    setCarteiras(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchCarteiras();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/carteiras-motorista/${id}/`, { method: 'DELETE' });
    setCarteiras(prev => prev.filter(c => c.id !== id));
  };

  const renderItem = ({ item }: { item: Carteira }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.numeroRegistro}</Text>
      <Text style={styles.info}>Categoria: {item.categoria}</Text>
      <Text style={styles.info}>Validade: {item.dataValidade}</Text>
      <Text style={styles.info}>Cliente: {item.cliente}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditCarteira', { carteira: item })}
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
      <Text style={styles.title}>Carteiras</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={carteiras}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateCarteira')}
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
  editButton: { backgroundColor: '#4B7BE5', padding: 8, borderRadius: 6, marginRight: 8 },
  editText: { color: '#fff', fontWeight: '500' },
  deleteButton: { backgroundColor: '#E54848', padding: 8, borderRadius: 6 },
  row: { flexDirection: 'row', marginTop: 12 },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#0D47A1', borderRadius: 28, padding: 14 },
});

export default CarteirasScreen;
