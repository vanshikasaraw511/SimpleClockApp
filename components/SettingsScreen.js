import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen({ settings, updateSetting, theme }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.secondaryText }]}>
        CLOCK DISPLAY
      </Text>

      {/* Clock Style Selector (Digital vs Analog) */}
      <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Clock Mode</Text>
          <View style={styles.segmentContainer}>
            <TouchableOpacity
              onPress={() => updateSetting('clockType', 'digital')}
              style={[
                styles.segmentButton,
                settings.clockType === 'digital' && { backgroundColor: theme.accent },
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  { color: settings.clockType === 'digital' ? '#fff' : theme.secondaryText },
                ]}
              >
                Digital
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => updateSetting('clockType', 'analog')}
              style={[
                styles.segmentButton,
                settings.clockType === 'analog' && { backgroundColor: theme.accent },
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  { color: settings.clockType === 'analog' ? '#fff' : theme.secondaryText },
                ]}
              >
                Analog
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.separator, { backgroundColor: theme.border }]} />

        {/* 24-Hour Format Switch */}
        <View style={styles.row}>
          <View>
            <Text style={[styles.label, { color: theme.text }]}>24-Hour Format</Text>
            <Text style={[styles.subLabel, { color: theme.secondaryText }]}>
              Display time as 00:00 - 23:59
            </Text>
          </View>
          <Switch
            value={settings.is24Hour}
            onValueChange={(val) => updateSetting('is24Hour', val)}
            trackColor={{ false: theme.border, true: theme.accent }}
            thumbColor={'#fff'}
          />
        </View>

        <View style={[styles.separator, { backgroundColor: theme.border }]} />

        {/* Show Seconds Switch */}
        <View style={styles.row}>
          <View>
            <Text style={[styles.label, { color: theme.text }]}>Show Seconds</Text>
            <Text style={[styles.subLabel, { color: theme.secondaryText }]}>
              Display ticking seconds
            </Text>
          </View>
          <Switch
            value={settings.showSeconds}
            onValueChange={(val) => updateSetting('showSeconds', val)}
            trackColor={{ false: theme.border, true: theme.accent }}
            thumbColor={'#fff'}
          />
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.secondaryText, marginTop: 24 }]}>
        APPEARANCE
      </Text>

      {/* Dark Mode Switch */}
      <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <View style={styles.row}>
          <View>
            <Text style={[styles.label, { color: theme.text }]}>Dark Mode</Text>
            <Text style={[styles.subLabel, { color: theme.secondaryText }]}>
              Use a darker color theme
            </Text>
          </View>
          <Switch
            value={settings.darkMode}
            onValueChange={(val) => updateSetting('darkMode', val)}
            trackColor={{ false: theme.border, true: theme.accent }}
            thumbColor={'#fff'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  subLabel: {
    fontSize: 13,
    marginTop: 2,
  },
  separator: {
    height: 1,
    marginLeft: 16,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(128,128,128,0.15)',
    borderRadius: 8,
    padding: 3,
  },
  segmentButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
