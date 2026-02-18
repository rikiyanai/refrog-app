import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRandomQuote, TimeOfDay, Quote, QUOTES } from '../data/quotes';

const STORAGE_KEY = '@refrog:shown_quotes';
const NOTIFICATION_KEY = '@refrog:last_scheduled_date';

interface NotificationConfig {
  startTime: string;
  endTime: string;
  notificationsPerDay: number;
}

const DEFAULT_CONFIG: NotificationConfig = {
  startTime: '08:00',
  endTime: '20:00',
  notificationsPerDay: 5,
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') {
    console.log('Notifications not supported on web');
    return false;
  }
  
  if (!Device.isDevice) {
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

async function getShownQuoteIds(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
}

async function addShownQuoteId(quoteId: string): Promise<void> {
  try {
    const shownIds = await getShownQuoteIds();
    shownIds.push(quoteId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(shownIds));
  } catch (error) {
    console.error('Error saving shown quote ID:', error);
  }
}

async function getRandomUnshownQuote(): Promise<Quote | null> {
  const shownIds = await getShownQuoteIds();
  const availableQuotes = [] as Quote[];

  for (const quote of QUOTES) {
    if (!shownIds.includes(quote.id)) {
      availableQuotes.push(quote);
    }
  }

  if (availableQuotes.length === 0) {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return getRandomQuote();
  }

  const randomIndex = Math.floor(Math.random() * availableQuotes.length);
  return availableQuotes[randomIndex];
}

function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  return 'evening';
}

function parseTime(timeString: string): { hour: number; minute: number } {
  const [hour, minute] = timeString.split(':').map(Number);
  return { hour, minute };
}

function getRandomTimeBetween(start: string, end: string): Date {
  const startObj = parseTime(start);
  const endObj = parseTime(end);

  const now = new Date();
  const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startObj.hour, startObj.minute);
  const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endObj.hour, endObj.minute);

  const startTimestamp = startTime.getTime();
  const endTimestamp = endTime.getTime();
  const randomTimestamp = Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) + startTimestamp;

  return new Date(randomTimestamp);
}

export async function scheduleDailyNotifications(
  config: NotificationConfig = DEFAULT_CONFIG
): Promise<void> {
  if (Platform.OS === 'web') {
    console.log('Notifications not supported on web - saving preference only');
    await AsyncStorage.setItem(NOTIFICATION_KEY, new Date().toDateString());
    return;
  }

  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    console.warn('Notification permissions not granted');
    return;
  }

  await Notifications.cancelAllScheduledNotificationsAsync();

  const scheduledTimes = new Set<string>();

  for (let i = 0; i < config.notificationsPerDay; i++) {
    let attempts = 0;
    const maxAttempts = 50;

    while (attempts < maxAttempts) {
      const time = getRandomTimeBetween(config.startTime, config.endTime);
      const timeKey = `${time.getHours()}:${time.getMinutes()}`;

      if (!scheduledTimes.has(timeKey)) {
        scheduledTimes.add(timeKey);

        const timeOfDay = getTimeOfDay(time.getHours());
        let quote = await getRandomUnshownQuote();

        if (!quote) {
          quote = getRandomQuote();
        }

        await addShownQuoteId(quote.id);

        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'ReFrog',
            body: `"${quote.text.substring(0, 100)}${quote.text.length > 100 ? '...' : ''}"`,
            data: { quoteId: quote.id },
            sound: true,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
            hour: time.getHours(),
            minute: time.getMinutes(),
            repeats: false,
          },
        });

        break;
      }

      attempts++;
    }
  }

  await AsyncStorage.setItem(NOTIFICATION_KEY, new Date().toDateString());
}

export async function cancelAllNotifications(): Promise<void> {
  if (Platform.OS === 'web') {
    console.log('Notifications not supported on web');
    return;
  }
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function getNextScheduledNotification(): Promise<any> {
  if (Platform.OS === 'web') {
    return null;
  }
  const notifications = await Notifications.getAllScheduledNotificationsAsync();
  return notifications.length > 0 ? notifications[0] : null;
}
