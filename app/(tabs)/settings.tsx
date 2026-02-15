import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { scheduleDailyNotifications, cancelAllNotifications, getNextScheduledNotification } from '../../services/notificationService';

const NOTIFICATIONS_PER_DAY = [3, 4, 5, 6, 7];
const TIME_WINDOWS = [
  { label: '8 AM - 8 PM', start: '08:00', end: '20:00' },
  { label: '9 AM - 9 PM', start: '09:00', end: '21:00' },
  { label: '7 AM - 10 PM', start: '07:00', end: '22:00' },
];

export default function SettingsScreen() {
  const [frequency, setFrequency] = useState(5);
  const [timeWindow, setTimeWindow] = useState(0);
  const [enabled, setEnabled] = useState(false);

  const handleToggleNotifications = async () => {
    if (enabled) {
      await cancelAllNotifications();
      setEnabled(false);
      Alert.alert('Disabled', 'Daily notifications have been disabled.');
    } else {
      await scheduleDailyNotifications({
        notificationsPerDay: frequency,
        startTime: TIME_WINDOWS[timeWindow].start,
        endTime: TIME_WINDOWS[timeWindow].end,
      });
      setEnabled(true);
      Alert.alert('Success', `${frequency} daily notifications scheduled from ${TIME_WINDOWS[timeWindow].label} 🐸`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure your reminders</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Daily Reminders</Text>
          <TouchableOpacity
            style={[styles.toggle, enabled && styles.toggleOn]}
            onPress={handleToggleNotifications}
          >
            <View style={[styles.toggleKnob, enabled && styles.toggleKnobOn]} />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Frequency</Text>
        <View style={styles.optionsContainer}>
          {NOTIFICATIONS_PER_DAY.map((freq) => (
            <TouchableOpacity
              key={freq}
              style={[styles.option, frequency === freq && styles.optionSelected]}
              onPress={() => setFrequency(freq)}
              disabled={enabled}
            >
              <Text style={[styles.optionText, frequency === freq && styles.optionTextSelected]}>
                {freq}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Time Window</Text>
        <View style={styles.optionsContainer}>
          {TIME_WINDOWS.map((window, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, timeWindow === index && styles.optionSelected]}
              onPress={() => setTimeWindow(index)}
              disabled={enabled}
            >
              <Text
                style={[styles.optionTextSmall, timeWindow === index && styles.optionTextSelected]}
                numberOfLines={2}
              >
                {window.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={cancelAllNotifications}>
        <Text style={styles.resetButtonText}>Reset All Notifications</Text>
      </TouchableOpacity>
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
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#16a34a',
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  optionText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  toggle: {
    width: 50,
    height: 28,
    backgroundColor: '#d1d5db',
    borderRadius: 14,
    padding: 3,
  },
  toggleOn: {
    backgroundColor: '#22c55e',
  },
  toggleKnob: {
    width: 22,
    height: 22,
    backgroundColor: '#ffffff',
    borderRadius: 11,
  },
  toggleKnobOn: {
    marginLeft: 'auto',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  option: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  optionSelected: {
    borderColor: '#22c55e',
    backgroundColor: '#dcfce7',
  },
  optionTextSmall: {
    fontSize: 14,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#16a34a',
    fontWeight: '600',
  },
  resetButton: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});