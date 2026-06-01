import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_URL } from '../services/api';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Categorias'>;

export type Categoria = {
  id: number;
  nome: string;
  descricao: string;
  capacidadePassageiros: number;
  valorAdicional: string;
  veiculos: { id: number; placa: string; modelo: string }[];
};

const CategoriasScreen = ({ navigation }: Props) => {

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategorias = async () => {
    setLoading(true);
    const response = await fetch(`${API_URL}/categorias-veiculo/`);
    const data = await response.json();
    setCategorias(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchCategorias();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/categorias-veiculo/${id}/`, { method: 'DELETE' });
    setCategorias(prev => prev.filter(c => c.id !== id));
  };

  const renderItem = ({ item }: { item: Categoria }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.nome}</Text>
      <Text style={styles.info}>{item.descricao}</Text>
      <Text style={styles.info}>Passageiros: {item.capacidadePassageiros}</Text>
      <Text style={styles.info}>Adicional: R$ {item.valorAdicional}</Text>

      <Text style={styles.subtitle}>Veículos</Text>
      {item.veiculos.length > 0 ? (
        item.veiculos.map(v => (
          <Text key={v.id} style={styles.related}>{v.modelo} ({v.placa})</Text>
        ))
      ) : (
        <Text style={styles.related}>Nenhum</Text>
      )}

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditCategoria', { categoria: item })}
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
      <Text style={styles.title}>Categorias</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={categorias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateCategoria')}
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

export default CategoriasScreen;
