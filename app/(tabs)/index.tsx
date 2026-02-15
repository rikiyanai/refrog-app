import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { getRandomQuote, Quote } from '../../data/quotes';
import { scheduleDailyNotifications, requestNotificationPermissions } from '../../services/notificationService';
import { addToFavorites, removeFromFavorites, isFavorite } from '../../services/journalService';

export default function IndexScreen() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    loadRandomQuote();
  }, []);

  useEffect(() => {
    if (quote) {
      checkFavorite();
    }
  }, [quote]);

  const checkFavorite = async () => {
    if (!quote) return;
    const fav = await isFavorite(quote.id);
    setIsFav(fav);
  };

  const loadRandomQuote = async () => {
    const randomQuote = getRandomQuote();
    setQuote(randomQuote);
    setLoading(false);
  };

  const toggleFavorite = async () => {
    if (!quote) return;

    if (isFav) {
      await removeFromFavorites(quote.id);
      setIsFav(false);
    } else {
      const added = await addToFavorites(quote);
      if (added) {
        setIsFav(true);
      }
    }
  };

  const handleScheduleNotifications = async () => {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Please enable notifications to receive daily reminders.');
      return;
    }

    await scheduleDailyNotifications();
    Alert.alert('Success', '5 daily notifications scheduled! 🐸');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ReFrog 🐸</Text>
      <Text style={styles.subtitle}>Remember, you will die</Text>

      <View style={styles.quoteCard}>
        <Text style={styles.quoteText}>{quote?.text}</Text>
        <View style={styles.quoteFooter}>
          <Text style={styles.author}>— {quote?.author}</Text>
          <TouchableOpacity
            style={[styles.favoriteButton, isFav && styles.favoriteButtonActive]}
            onPress={toggleFavorite}
          >
            <Text style={[styles.favoriteIcon, isFav && styles.favoriteIconActive]}>
              {isFav ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={loadRandomQuote}>
        <Text style={styles.buttonText}>New Quote</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={handleScheduleNotifications}
      >
        <Text style={styles.buttonText}>Set Up Daily Reminders</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    padding: 24,
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
    marginBottom: 32,
  },
  text: {
    fontSize: 16,
    color: '#22c55e',
  },
  quoteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  quoteText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#1a1a1a',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  quoteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  favoriteButtonActive: {
    backgroundColor: '#dcfce7',
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#22c55e',
  },
  favoriteIconActive: {
    color: '#16a34a',
  },
  button: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: '#16a34a',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});