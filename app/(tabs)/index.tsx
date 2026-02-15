import { View, Text, StyleSheet } from 'react-native';

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ReFrog 🐸</Text>
      <Text style={styles.subtitle}>Remember, you will die</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#22c55e',
  },
});