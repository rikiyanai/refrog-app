import AsyncStorage from '@react-native-async-storage/async-storage';
import { Quote } from '../data/quotes';

const JOURNAL_KEY = '@refrog:journal';
const HISTORY_KEY = '@refrog:history';
const FAVORITES_KEY = '@refrog:favorites';

export interface JournalEntry {
  quote: Quote;
  timestamp: number;
}

export async function addToHistory(quote: Quote): Promise<void> {
  try {
    const history = await getHistory();
    const entry: JournalEntry = {
      quote,
      timestamp: Date.now(),
    };
    history.unshift(entry);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 100)));
  } catch (error) {
    console.error('Error adding to history:', error);
  }
}

export async function getHistory(): Promise<JournalEntry[]> {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
}

export async function addToFavorites(quote: Quote): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    const isAlreadyFavorited = favorites.some(f => f.id === quote.id);

    if (isAlreadyFavorited) {
      return false;
    }

    const entry: JournalEntry = {
      quote,
      timestamp: Date.now(),
    };
    favorites.unshift(entry);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
}

export async function removeFromFavorites(quoteId: string): Promise<void> {
  try {
    const favorites = await getFavorites();
    const updated = favorites.filter(f => f.quote.id !== quoteId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
}

export async function getFavorites(): Promise<JournalEntry[]> {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
}

export async function isFavorite(quoteId: string): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    return favorites.some(f => f.quote.id === quoteId);
  } catch (error) {
    return false;
  }
}