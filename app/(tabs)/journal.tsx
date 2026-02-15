import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { getFavorites, JournalEntry } from '../../services/journalService';

export default function JournalScreen() {
  const [favorites, setFavorites] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
    setLoading(false);
  };

  const renderFavorite = ({ item }: { item: JournalEntry }) => (
    <View style={styles.quoteCard}>
      <Text style={styles.quoteText}>{item.quote.text}</Text>
      <Text style={styles.author}>— {item.quote.author}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Journal</Text>
        <Text style={styles.subtitle}>Your favorite quotes</Text>
      </View>

      {loading ? (
        <View style={styles.centerContent}>
          <Text style={styles.text}>Loading...</Text>
        </View>
      ) : favorites.length === 0 ? (
        <View style={styles.centerContent}>
          <Text style={styles.text}>No favorites yet</Text>
          <Text style={styles.hint}>Tap the heart icon when viewing quotes to save them here</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavorite}
          keyExtractor={(item) => item.quote.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#22c55e',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  text: {
    fontSize: 16,
    color: '#22c55e',
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
  quoteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1a1a1a',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  author: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
});