import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { getRandomQuote, getDeathQuotes, Quote, QuoteCategory } from '../data/quotes';
import { scheduleDailyNotifications, requestNotificationPermissions, cancelAllNotifications } from '../services/notificationService';
import { addToFavorites, removeFromFavorites, isFavorite, getFavorites, addCustomQuote, getCustomQuotes, CustomQuote } from '../services/journalService';
import { useTheme, g, spacing, fontSizes } from './theme';

type Page = 'home' | 'journal';

const NOTIFICATIONS_PER_DAY = [3, 4, 5];
const TIME_WINDOWS = [
  { label: '8-8', start: '08:00', end: '20:00' },
  { label: '9-9', start: '09:00', end: '21:00' },
];

interface AccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  theme: any;
}

function Accordion({ title, isOpen, onToggle, children, theme }: AccordionProps) {
  return (
    <View style={{ marginBottom: spacing.sm }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: spacing.md,
          backgroundColor: theme.backgroundModal,
          borderWidth: 1,
          borderColor: theme.border,
        }}
        onPress={onToggle}
      >
        <Text style={{ ...g.text(theme), fontWeight: '600' }}>{title}</Text>
        <Text style={g.text(theme)}>{isOpen ? '[-]' : '[+]'}</Text>
      </TouchableOpacity>
      
      {isOpen && (
        <View style={{
          padding: spacing.md,
          backgroundColor: theme.backgroundInput,
          borderWidth: 1,
          borderTopWidth: 0,
          borderColor: theme.border,
        }}>
          {children}
        </View>
      )}
    </View>
  );
}

export default function AppScreen() {
  const { theme } = useTheme();
  const [page, setPage] = useState<Page>('home');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isFav, setIsFav] = useState(false);
  const [customQuotes, setCustomQuotes] = useState<CustomQuote[]>([]);
  const [journalInput, setJournalInput] = useState('');
  const [favorites, setFavorites] = useState<any[]>([]);
  
  // Settings accordion states
  const [openSection, setOpenSection] = useState<string | null>('notifications');
  const [frequency, setFrequency] = useState(5);
  const [timeWindow, setTimeWindow] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    loadQuote();
    loadCustomQuotes();
    loadFavorites();
  }, []);

  const loadQuote = () => {
    const deathQuotes = getDeathQuotes();
    const defaultQuote = getRandomQuote(deathQuotes);
    const customAsQuotes: Quote[] = customQuotes.map(cq => ({
      id: cq.id,
      text: cq.text,
      author: cq.author || 'Anonymous',
      category: 'philosophy' as QuoteCategory,
      timeOfDay: 'any' as const
    }));
    
    const allQuotes = [defaultQuote, ...customAsQuotes];
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    setQuote(allQuotes[randomIndex]);
    checkFavorite(allQuotes[randomIndex].id);
  };

  const checkFavorite = async (quoteId: string) => {
    const fav = await isFavorite(quoteId);
    setIsFav(fav);
  };

  const loadCustomQuotes = async () => {
    const quotes = await getCustomQuotes();
    setCustomQuotes(quotes);
  };

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
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

  const handleAddQuote = async () => {
    if (!journalInput.trim()) {
      Alert.alert('Error', 'Please enter a quote');
      return;
    }

    await addCustomQuote(journalInput.trim());
    setJournalInput('');
    loadCustomQuotes();
    Alert.alert('Success', 'Quote added to rotation!');
  };

  const handleToggleNotifications = async () => {
    if (notificationsEnabled) {
      await cancelAllNotifications();
      setNotificationsEnabled(false);
      Alert.alert('Disabled', 'Notifications disabled.');
    } else {
      const hasPermission = await requestNotificationPermissions();
      if (!hasPermission) {
        Alert.alert('Permission Required', 'Please enable notifications in system settings.');
        return;
      }
      await scheduleDailyNotifications({
        notificationsPerDay: frequency,
        startTime: TIME_WINDOWS[timeWindow].start,
        endTime: TIME_WINDOWS[timeWindow].end,
      });
      setNotificationsEnabled(true);
      Alert.alert('Success', `${frequency} daily notifications scheduled!`);
    }
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Render Home Page
  const renderHome = () => (
    <View style={{ flex: 1 }}>
      {/* Alert Banner - Centered Quote */}
      <View style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: spacing.lg,
      }}>
        <View style={{
          backgroundColor: theme.backgroundModal,
          borderWidth: 1,
          borderColor: theme.border,
          padding: spacing.xl,
        }}>
          <Text style={{ ...g.text(theme), fontStyle: 'italic', lineHeight: 24, textAlign: 'center' }}>
            "{quote?.text}"
          </Text>
          <Text style={{ ...g.text(theme), textAlign: 'center', marginTop: spacing.lg, opacity: 0.7 }}>
            — {quote?.author}
          </Text>
        </View>

        {/* Heart button below quote */}
        <View style={{ alignItems: 'center', marginTop: spacing.xl }}>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              backgroundColor: isFav ? theme.focusedForeground : theme.backgroundInput,
              borderWidth: 1,
              borderColor: theme.border,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={toggleFavorite}
          >
            <Text style={{
              color: isFav ? theme.background : theme.text,
              fontSize: 24,
            }}>
              {isFav ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={{ padding: spacing.lg, gap: spacing.sm }}>
        <TouchableOpacity style={{ 
          backgroundColor: theme.text, 
          padding: spacing.md, 
          borderWidth: 1, 
          borderColor: theme.border 
        }} onPress={loadQuote}>
          <Text style={{ color: theme.background, textAlign: 'center', fontWeight: '600', fontFamily: theme.fontFamily }}>
            [ NEW QUOTE ]
          </Text>
        </TouchableOpacity>
      </View>

      {/* Settings Accordion */}
      <View style={{ padding: spacing.lg, paddingTop: 0 }}>
        <Accordion
          title="[ SETTINGS ]"
          isOpen={openSection === 'settings'}
          onToggle={() => toggleSection('settings')}
          theme={theme}
        >
          {/* Notifications */}
          <View style={{ marginBottom: spacing.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
              <Text style={g.text(theme)}>Notifications</Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: notificationsEnabled ? theme.text : theme.backgroundInput,
                  borderWidth: 1,
                  borderColor: theme.border,
                  paddingHorizontal: spacing.sm,
                  paddingVertical: spacing.xs,
                }}
                onPress={handleToggleNotifications}
              >
                <Text style={{
                  color: notificationsEnabled ? theme.background : theme.text,
                  fontWeight: '600',
                  fontSize: fontSizes.sm,
                }}>
                  {notificationsEnabled ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ ...g.text(theme), opacity: 0.7, marginBottom: spacing.xs }}>Frequency:</Text>
            <View style={{ flexDirection: 'row', gap: spacing.xs, marginBottom: spacing.sm }}>
              {NOTIFICATIONS_PER_DAY.map((freq) => (
                <TouchableOpacity
                  key={freq}
                  style={{
                    paddingHorizontal: spacing.md,
                    paddingVertical: spacing.xs,
                    backgroundColor: frequency === freq ? theme.text : theme.backgroundModal,
                    borderWidth: 1,
                    borderColor: theme.border,
                  }}
                  onPress={() => setFrequency(freq)}
                  disabled={notificationsEnabled}
                >
                  <Text style={{ color: frequency === freq ? theme.background : theme.text }}>
                    {freq}x
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={{ ...g.text(theme), opacity: 0.7, marginBottom: spacing.xs }}>Time:</Text>
            <View style={{ flexDirection: 'row', gap: spacing.xs }}>
              {TIME_WINDOWS.map((window, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={{
                    paddingHorizontal: spacing.md,
                    paddingVertical: spacing.xs,
                    backgroundColor: timeWindow === idx ? theme.text : theme.backgroundModal,
                    borderWidth: 1,
                    borderColor: theme.border,
                  }}
                  onPress={() => setTimeWindow(idx)}
                  disabled={notificationsEnabled}
                >
                  <Text style={{ color: timeWindow === idx ? theme.background : theme.text }}>
                    {window.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#cc3333',
              padding: spacing.sm,
              borderWidth: 1,
              borderColor: theme.border,
            }}
            onPress={() => {
              cancelAllNotifications();
              setNotificationsEnabled(false);
              Alert.alert('Reset', 'All notifications cancelled.');
            }}
          >
            <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600', fontFamily: theme.fontFamily }}>
              [ RESET ALL ]
            </Text>
          </TouchableOpacity>
        </Accordion>
      </View>
    </View>
  );

  // Render Journal Page
  const renderJournal = () => (
    <View style={{ flex: 1 }}>
      {/* Input + ADD Button */}
      <View style={{ padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: theme.border }}>
        <Text style={{ ...g.text(theme), marginBottom: spacing.sm }}>[ ADD QUOTE ]</Text>
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: theme.backgroundInput,
              borderWidth: 1,
              borderColor: theme.border,
              padding: spacing.md,
              color: theme.text,
              fontFamily: theme.fontFamily,
              fontSize: fontSizes.md,
            }}
            placeholder="Enter your quote..."
            placeholderTextColor={theme.text + '80'}
            value={journalInput}
            onChangeText={setJournalInput}
            multiline
          />
          <TouchableOpacity
            style={{
              backgroundColor: theme.text,
              padding: spacing.md,
              borderWidth: 1,
              borderColor: theme.border,
              justifyContent: 'center',
            }}
            onPress={handleAddQuote}
          >
            <Text style={{ color: theme.background, fontWeight: '600', fontFamily: theme.fontFamily }}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Saved Quotes List */}
      <Text style={{ ...g.text(theme), padding: spacing.lg, paddingBottom: spacing.sm }}>[ SAVED QUOTES ]</Text>
      
      {customQuotes.length === 0 && favorites.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ ...g.text(theme), opacity: 0.6 }}>No saved quotes</Text>
          <Text style={{ ...g.text(theme), opacity: 0.4, marginTop: spacing.sm }}>Add custom quotes or save from home</Text>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: spacing.lg, paddingTop: 0 }}>
          {customQuotes.map((cq) => (
            <View key={cq.id} style={{ 
              backgroundColor: theme.backgroundModal, 
              borderWidth: 1, 
              borderColor: theme.border, 
              padding: spacing.md, 
              marginBottom: spacing.sm 
            }}>
              <Text style={{ ...g.text(theme), fontStyle: 'italic' }}>"{cq.text}"</Text>
              <Text style={{ ...g.text(theme), textAlign: 'right', opacity: 0.7, marginTop: spacing.xs }}>
                — {cq.author || 'Anonymous'}
              </Text>
            </View>
          ))}
          
          {favorites.length > 0 && (
            <>
              <Text style={{ ...g.text(theme), marginTop: spacing.md, marginBottom: spacing.sm, opacity: 0.7 }}>[ FAVORITES ]</Text>
              {favorites.map((fav, idx) => (
                <View key={idx} style={{ 
                  backgroundColor: theme.backgroundModal, 
                  borderWidth: 1, 
                  borderColor: theme.border, 
                  padding: spacing.md, 
                  marginBottom: spacing.sm 
                }}>
                  <Text style={{ ...g.text(theme), fontStyle: 'italic' }}>"{fav.quote.text}"</Text>
                  <Text style={{ ...g.text(theme), textAlign: 'right', opacity: 0.7, marginTop: spacing.xs }}>
                    — {fav.quote.author}
                  </Text>
                </View>
              ))}
            </>
          )}
        </ScrollView>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, maxWidth: 480, alignSelf: 'center', width: '100%' }}>
      {/* Header */}
      <View style={{ 
        padding: spacing.lg, 
        borderBottomWidth: 1, 
        borderBottomColor: theme.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <TouchableOpacity>
          <Text style={g.text(theme)}>[ ≡ ]</Text>
        </TouchableOpacity>
        <Text style={{ ...g.title(theme), fontSize: fontSizes.xl }}>ReFrog</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Content */}
      {page === 'home' ? renderHome() : renderJournal()}

      {/* Bottom Action Bar */}
      <View style={{ 
        flexDirection: 'row', 
        borderTopWidth: 1, 
        borderTopColor: theme.border,
        backgroundColor: theme.backgroundModal,
      }}>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: spacing.md,
            backgroundColor: page === 'home' ? theme.text : 'transparent',
            borderRightWidth: 1,
            borderRightColor: theme.border,
          }}
          onPress={() => setPage('home')}
        >
          <Text style={{
            textAlign: 'center',
            color: page === 'home' ? theme.background : theme.text,
            fontWeight: '600',
            fontFamily: theme.fontFamily,
          }}>
            {page === 'home' ? '◉ HOME' : '○ HOME'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            flex: 1,
            padding: spacing.md,
            backgroundColor: page === 'journal' ? theme.text : 'transparent',
          }}
          onPress={() => setPage('journal')}
        >
          <Text style={{
            textAlign: 'center',
            color: page === 'journal' ? theme.background : theme.text,
            fontWeight: '600',
            fontFamily: theme.fontFamily,
          }}>
            {page === 'journal' ? '◉ JOURNAL' : '○ JOURNAL'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
