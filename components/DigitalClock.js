import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DigitalClock({ currentTime, is24Hour, showSeconds, theme }) {
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  let displayHours = hours;
  let ampm = '';

  if (!is24Hour) {
    ampm = displayHours >= 12 ? 'PM' : 'AM';
    displayHours = displayHours % 12 || 12;
  }

  const pad = (num) => String(num).padStart(2, '0');

  const formattedHours = is24Hour ? pad(displayHours) : pad(displayHours);
  const formattedMinutes = pad(minutes);
  const formattedSeconds = pad(seconds);

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentTime.toLocaleDateString(undefined, dateOptions);

  return (
    <View style={styles.container}>
      <View style={styles.timeRow}>
        <Text style={[styles.timeText, { color: theme.text }]}>
          {formattedHours}:{formattedMinutes}
        </Text>
        {showSeconds && (
          <Text style={[styles.secondsText, { color: theme.accent }]}>
            :{formattedSeconds}
          </Text>
        )}
        {!is24Hour && (
          <Text style={[styles.ampmText, { color: theme.secondaryText }]}>
            {ampm}
          </Text>
        )}
      </View>
      <Text style={[styles.dateText, { color: theme.secondaryText }]}>
        {formattedDate}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  timeText: {
    fontSize: 64,
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
    letterSpacing: 2,
  },
  secondsText: {
    fontSize: 28,
    fontWeight: '400',
    marginLeft: 2,
    fontVariant: ['tabular-nums'],
  },
  ampmText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    letterSpacing: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 14,
    letterSpacing: 0.5,
  },
});