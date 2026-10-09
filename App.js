import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import DigitalClock from './components/DigitalClock';
import AnalogClock from './components/AnalogClock';
import Stopwatch from './components/Stopwatch';
import TimerScreen from './components/TimerScreen';
import AlarmScreen from './components/AlarmScreen';
import SettingsScreen from './components/SettingsScreen';

const STORAGE_KEY = '@clock_app_settings';

const lightTheme = {
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#1A1A1A',
  secondaryText: '#757575',
  border: '#E5E7EB',
  accent: '#2563EB',
  navBackground: '#FFFFFF',
};

const darkTheme = {
  background: '#0F172A',
  surface: '#1E293B',
  text: '#F8FAFC',
  secondaryText: '#94A3B8',
  border: '#334155',
  accent: '#3B82F6',
  navBackground: '#0F172A',
};

export default function App() {
  const [currentTab, setCurrentTab] = useState('clock');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [settings, setSettings] = useState({
    clockType: 'digital',
    is24Hour: false,
    showSeconds: true,
    darkMode: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setSettings((prev) => ({ ...prev, ...JSON.parse(stored) }));
      } catch (err) {
        console.warn('Failed to load settings', err);
      }
    })();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const updateSetting = async (key, value) => {
    const nextSettings = { ...settings, [key]: value };
    setSettings(nextSettings);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextSettings));
    } catch (err) {
      console.warn('Failed to persist settings', err);
    }
  };

  const theme = settings.darkMode ? darkTheme : lightTheme;

  const tabs = [
    { key: 'clock', label: 'Clock', icon: 'time-outline', activeIcon: 'time' },
    { key: 'alarm', label: 'Alarm', icon: 'alarm-outline', activeIcon: 'alarm' },
    { key: 'stopwatch', label: 'Stopwatch', icon: 'stopwatch-outline', activeIcon: 'stopwatch' },
    { key: 'timer', label: 'Timer', icon: 'hourglass-outline', activeIcon: 'hourglass' },
    { key: 'settings', label: 'Settings', icon: 'settings-outline', activeIcon: 'settings' },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={settings.darkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        {currentTab === 'clock' && (
          settings.clockType === 'digital' ? (
            <DigitalClock currentTime={currentTime} is24Hour={settings.is24Hour} showSeconds={settings.showSeconds} theme={theme} />
          ) : (
            <AnalogClock currentTime={currentTime} showSeconds={settings.showSeconds} theme={theme} />
          )
        )}
        {currentTab === 'alarm' && <AlarmScreen theme={theme} currentTime={currentTime} />}
        {currentTab === 'stopwatch' && <Stopwatch theme={theme} />}
        {currentTab === 'timer' && <TimerScreen theme={theme} />}
        {currentTab === 'settings' && <SettingsScreen settings={settings} updateSetting={updateSetting} theme={theme} />}
      </View>

      <View style={[styles.navBar, { backgroundColor: theme.navBackground, borderTopColor: theme.border }]}>
        {tabs.map((tab) => {
          const isActive = currentTab === tab.key;
          return (
            <TouchableOpacity key={tab.key} style={styles.navItem} onPress={() => setCurrentTab(tab.key)}>
              <Ionicons name={isActive ? tab.activeIcon : tab.icon} size={22} color={isActive ? theme.accent : theme.secondaryText} />
              <Text style={[styles.navLabel, { color: isActive ? theme.accent : theme.secondaryText }]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { flex: 1 },
  navBar: {
    flexDirection: 'row',
    height: 64,
    borderTopWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
  },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navLabel: { fontSize: 11, marginTop: 3, fontWeight: '500' },
});
