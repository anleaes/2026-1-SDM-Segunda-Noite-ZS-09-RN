import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API_URL } from '../services/api';

type Item = { id: number; [key: string]: any };

type Props = {
  label: string;
  endpoint: string;
  campoNome: string;
  valor: string;
  onChange: (valor: string) => void;
};

const SeletorRelacionado = ({ label, endpoint, campoNome, valor, onChange }: Props) => {
  const [itens, setItens] = useState<Item[]>([]);

  useEffect(() => {
    const buscar = async () => {
      const response = await fetch(`${API_URL}/${endpoint}/`);
      const data = await response.json();
      setItens(data);
    };
    buscar();
  }, [endpoint]);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.box}>
        <Picker selectedValue={valor} onValueChange={(v) => onChange(String(v))}>
          <Picker.Item label="Selecione..." value="" />
          {itens.map((item) => (
            <Picker.Item
              key={item.id}
              label={`${item[campoNome]} (#${item.id})`}
              value={String(item.id)}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  box: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
});

export default SeletorRelacionado;
