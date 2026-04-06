import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

import { Product } from '../types/Product';


export default function ProductFormScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  function handleSave() {
    if (!name || !price || !date || !time) {
      Alert.alert('Erro', 'Nome, preço, data e hora são obrigatórios');
      return;
    }
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      price,
      description,
      date,
      time,
    };

    setProducts((prev) => [...prev, newProduct]);

    Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');

    setName('');
    setPrice('');
    setDescription('');
    setDate('');
    setTime('');
  }

  function handleDelete(id: string) {
    setProducts((prev) => prev.filter(product => product.id !== id));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <Text style={styles.title}>Cadastro de Pedidos</Text>

                <TextInput
                  placeholder="Nome do produto"
                  placeholderTextColor="#888"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                />

                <TextInput
                  placeholder="Preço"
                  placeholderTextColor="#888"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                  style={styles.input}
                />

                <TextInput
                  placeholder="Descrição"
                  placeholderTextColor="#888"
                  value={description}
                  onChangeText={setDescription}
                  style={styles.input}
                />

                <TextInput
                  placeholder="Data (ex: 01/01/2026)"
                  placeholderTextColor="#888"
                  value={date}
                  onChangeText={setDate}
                  style={styles.input}
                />

                <TextInput
                  placeholder="Hora (ex: 12:00)"
                  placeholderTextColor="#888"
                  value={time}
                  onChangeText={setTime}
                  style={styles.input}
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Cadastrar</Text>
                </TouchableOpacity>

                <Text style={styles.subtitle}>Produtos Cadastrados:</Text>
              </>
            }
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.cardText}>R$ {item.price}</Text>
                    <Text style={styles.cardText}>{item.description}</Text>
                    <Text style={styles.cardText}>Data: {item.date}</Text>
                    <Text style={styles.cardText}>Hora: {item.time}</Text>
                    <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                      <Text style={styles.deleteButtonText}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ff0000',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 15,
    fontWeight: 'bold',
    color: '#ff0000',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ff0000',
    backgroundColor: '#111111',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ff0000',
    marginBottom: 5,
  },
  cardText: {
    color: '#ffffff',
    marginBottom: 2,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ff0000',
    backgroundColor: '#111111',
    color: '#ffffff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#ff0000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
