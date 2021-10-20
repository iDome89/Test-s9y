import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MoviesList from './components/MoviesList';

export default function App() {
  return (
    <View style={styles.container}>
        <MoviesList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30,
  },
});
