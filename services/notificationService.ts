import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRandomQuote, Quote, QUOTES } from '../data/quotes';

const STORAGE_KEY = '@refrog:shown_quotes';
const NOTIFICATION_KEY = '@refrog:last_scheduled_date';
const NOTIFICATION_CONFIG_KEY = '@refrog:notification_config';

export interface NotificationConfig {
  startTime: string;
  endTime: string;
  notificationsPerDay: number;
}

export interface NotificationSettings {
  enabled: boolean;
  config: NotificationConfig;
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

export async function saveNotificationSettings(settings: NotificationSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(NOTIFICATION_CONFIG_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving notification settings:', error);
  }
}

export async function loadNotificationSettings(): Promise<NotificationSettings> {
  try {
    const data = await AsyncStorage.getItem(NOTIFICATION_CONFIG_KEY);
    if (data) return JSON.parse(data);
  } catch (error) {}
  return { enabled: false, config: DEFAULT_CONFIG };
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
  const availableQuotes: Quote[] = [];

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

function parseTime(timeString: string): { hour: number; minute: number } {
  const [hour, minute] = timeString.split(':').map(Number);
  return { hour, minute };
}

/**
 * Returns a random Date between start and end times on the given targetDate.
 * If targetDate is today and now is past startTime, effectiveStart is used instead.
 */
function getRandomTimeBetween(start: string, end: string, targetDate: Date): Date {
  const startObj = parseTime(start);
  const endObj = parseTime(end);

  const startTime = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
    startObj.hour,
    startObj.minute,
    0,
    0
  );
  const endTime = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
    endObj.hour,
    endObj.minute,
    0,
    0
  );

  const startTimestamp = startTime.getTime();
  const endTimestamp = endTime.getTime();
  const randomTimestamp =
    Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) + startTimestamp;

  return new Date(randomTimestamp);
}

/**
 * Determines the target date for scheduling:
 * - Tomorrow if we've already passed the end of today's window
 * - Today otherwise (but we clamp the effective start to now+5min)
 */
function getScheduleTarget(
  config: NotificationConfig
): { targetDate: Date; effectiveStart: string } {
  const now = new Date();
  const endObj = parseTime(config.endTime);
  const endToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    endObj.hour,
    endObj.minute,
    0,
    0
  );

  if (now >= endToday) {
    // Past today's window — schedule for tomorrow
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return { targetDate: tomorrow, effectiveStart: config.startTime };
  }

  // Within today's window — clamp start to now+5 minutes
  const nowPlus5 = new Date(now.getTime() + 5 * 60 * 1000);
  const startObj = parseTime(config.startTime);
  const startToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    startObj.hour,
    startObj.minute,
    0,
    0
  );

  if (nowPlus5 > startToday) {
    const h = String(nowPlus5.getHours()).padStart(2, '0');
    const m = String(nowPlus5.getMinutes()).padStart(2, '0');
    return { targetDate: now, effectiveStart: `${h}:${m}` };
  }

  return { targetDate: now, effectiveStart: config.startTime };
}

export async function scheduleDailyNotifications(
  config: NotificationConfig = DEFAULT_CONFIG
): Promise<void> {
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(NOTIFICATION_KEY, new Date().toDateString());
    return;
  }

  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    console.warn('Notification permissions not granted');
    return;
  }

  await Notifications.cancelAllScheduledNotificationsAsync();

  const { targetDate, effectiveStart } = getScheduleTarget(config);

  const effectiveStartObj = parseTime(effectiveStart);
  const effectiveEndObj = parseTime(config.endTime);

  // Verify there's enough window to schedule (need at least 1 minute)
  const effectiveStartMs = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
    effectiveStartObj.hour,
    effectiveStartObj.minute
  ).getTime();
  const effectiveEndMs = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
    effectiveEndObj.hour,
    effectiveEndObj.minute
  ).getTime();

  if (effectiveEndMs <= effectiveStartMs) {
    console.warn('No valid scheduling window available');
    return;
  }

  const scheduledTimes = new Set<string>();

  for (let i = 0; i < config.notificationsPerDay; i++) {
    let attempts = 0;
    const maxAttempts = 50;

    while (attempts < maxAttempts) {
      const time = getRandomTimeBetween(effectiveStart, config.endTime, targetDate);
      const timeKey = `${time.getHours()}:${time.getMinutes()}`;

      if (!scheduledTimes.has(timeKey)) {
        scheduledTimes.add(timeKey);

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
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: time,
          },
        });

        break;
      }

      attempts++;
    }
  }

  await AsyncStorage.setItem(NOTIFICATION_KEY, targetDate.toDateString());
}

/**
 * Called on each app open. Reschedules if notifications haven't been
 * scheduled for today (or tomorrow if past the window).
 */
export async function checkAndRescheduleIfNeeded(): Promise<void> {
  if (Platform.OS === 'web') return;

  const settings = await loadNotificationSettings();
  if (!settings.enabled) return;

  const lastScheduled = await AsyncStorage.getItem(NOTIFICATION_KEY);
  const { targetDate } = getScheduleTarget(settings.config);
  const targetDateStr = targetDate.toDateString();

  if (lastScheduled === targetDateStr) return;

  await scheduleDailyNotifications(settings.config);
}

export async function cancelAllNotifications(): Promise<void> {
  if (Platform.OS === 'web') return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function getNextScheduledNotification(): Promise<any> {
  if (Platform.OS === 'web') return null;
  const notifications = await Notifications.getAllScheduledNotificationsAsync();
  return notifications.length > 0 ? notifications[0] : null;
}
