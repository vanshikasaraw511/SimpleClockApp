import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnalogClock({ currentTime, showSeconds, theme }) {
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  const clockSize = 250;
  const radius = clockSize / 2;

  const hourNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.face,
          {
            width: clockSize,
            height: clockSize,
            borderRadius: radius,
            borderColor: theme.border,
            backgroundColor: theme.surface,
          },
        ]}
      >
        {hourNumbers.map((num, i) => {
          const angle = (i * 30 - 60) * (Math.PI / 180);
          const numRadius = radius - 24;
          const x = radius + numRadius * Math.cos(angle) - 10;
          const y = radius + numRadius * Math.sin(angle) - 10;
          return (
            <Text
              key={num}
              style={[
                styles.number,
                { left: x, top: y, color: theme.secondaryText },
              ]}
            >
              {num}
            </Text>
          );
        })}

        {/* Hour Hand */}
        <View
          style={[
            styles.hand,
            styles.hourHand,
            {
              backgroundColor: theme.text,
              transform: [{ rotate: `${hourDeg}deg` }],
            },
          ]}
        />

        {/* Minute Hand */}
        <View
          style={[
            styles.hand,
            styles.minuteHand,
            {
              backgroundColor: theme.text,
              transform: [{ rotate: `${minuteDeg}deg` }],
            },
          ]}
        />

        {/* Second Hand */}
        {showSeconds && (
          <View
            style={[
              styles.hand,
              styles.secondHand,
              {
                backgroundColor: theme.accent,
                transform: [{ rotate: `${secondDeg}deg` }],
              },
            ]}
          />
        )}

        {/* Center Pivot */}
        <View style={[styles.pivot, { backgroundColor: theme.accent }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  face: {
    borderWidth: 2,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    position: 'absolute',
    width: 20,
    height: 20,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  hand: {
    position: 'absolute',
    bottom: '50%',
    borderRadius: 4,
  },
  hourHand: {
    width: 4,
    height: 60,
    transformOrigin: 'bottom center',
  },
  minuteHand: {
    width: 3,
    height: 85,
    transformOrigin: 'bottom center',
  },
  secondHand: {
    width: 2,
    height: 95,
    transformOrigin: 'bottom center',
  },
  pivot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    zIndex: 10,
  },
});