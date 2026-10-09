import React, { useState, useEffect } from 'react';
import { View, Text, Switch, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function AlarmScreen({ theme, currentTime }) {
  const [alarms, setAlarms] = useState([
    { id: '1', time: '07:00 AM', label: 'Wake up', enabled: true, hour: 7, minute: 0 },
    { id: '2', time: '08:30 AM', label: 'Work/Class', enabled: false, hour: 8, minute: 30 },
    { id: '3', time: '10:00 PM', label: 'Wind Down', enabled: true, hour: 22, minute: 0 },
  ]);

  // Check if alarm matches current clock minute
  useEffect(() => {
    const ch = currentTime.getHours();
    const cm = currentTime.getMinutes();
    const cs = currentTime.getSeconds();

    if (cs === 0) {
      alarms.forEach((a) => {
        if (a.enabled && a.hour === ch && a.minute === cm) {
          Alert.alert('⏰ Alarm', `${a.label} (${a.time})`);
        }
      });
    }
  }, [currentTime]);

  const toggleAlarm = (id) => {
    setAlarms((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Alarms</Text>
      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        style={{ width: '100%', maxWidth: 400 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <View>
              <Text style={[styles.alarmTime, { color: item.enabled ? theme.text : theme.secondaryText }]}>
                {item.time}
              </Text>
              <Text style={{ color: theme.secondaryText, marginTop: 4 }}>{item.label}</Text>
            </View>
            <Switch
              value={item.enabled}
              onValueChange={() => toggleAlarm(item.id)}
              trackColor={{ false: theme.border, true: theme.accent }}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 40, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', alignSelf: 'flex-start', marginBottom: 20 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12
  },
  alarmTime: { fontSize: 28, fontWeight: '300' }
});
