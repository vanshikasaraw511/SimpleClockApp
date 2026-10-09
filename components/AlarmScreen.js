import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Switch,
  Modal,
  TextInput,
  Platform,
  Alert,
} from 'react-native';

export default function AlarmScreen() {
  const [alarms, setAlarms] = useState([
    { id: '1', time: '07:00', label: 'Morning Wakeup', enabled: true },
    { id: '2', time: '08:30', label: 'Standup Meeting', enabled: false },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [hour, setHour] = useState('07');
  const [minute, setMinute] = useState('00');
  const [label, setLabel] = useState('');
  const triggeredAlarmsRef = useRef(new Set());

  const playAlarmSound = () => {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      }
    } catch {
      // Fallback if browser audio autoplay is restricted
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;
      const seconds = now.getSeconds();

      if (seconds === 0) {
        triggeredAlarmsRef.current.clear();
      }

      alarms.forEach((alarm) => {
        if (
          alarm.enabled &&
          alarm.time === currentTimeStr &&
          !triggeredAlarmsRef.current.has(alarm.id)
        ) {
          triggeredAlarmsRef.current.add(alarm.id);
          playAlarmSound();
          Alert.alert('⏰ Alarm', alarm.label || 'Your alarm is ringing!');
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [alarms]);

  const toggleAlarm = (id) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const deleteAlarm = (id) => {
    setAlarms((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddAlarm = () => {
    const cleanHour = Math.min(23, Math.max(0, parseInt(hour, 10) || 0))
      .toString()
      .padStart(2, '0');
    const cleanMinute = Math.min(59, Math.max(0, parseInt(minute, 10) || 0))
      .toString()
      .padStart(2, '0');

    const newAlarm = {
      id: Date.now().toString(),
      time: `${cleanHour}:${cleanMinute}`,
      label: label.trim() || 'Alarm',
      enabled: true,
    };

    setAlarms((prev) => [...prev, newAlarm].sort((a, b) => a.time.localeCompare(b.time)));
    setLabel('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Alarms</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No alarms set.</Text>
            <Text style={styles.emptySubText}>Tap "+ Add" to create one.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.alarmCard}>
            <View style={styles.alarmInfo}>
              <Text style={[styles.alarmTime, !item.enabled && styles.disabledText]}>
                {item.time}
              </Text>
              <Text style={styles.alarmLabel}>{item.label}</Text>
            </View>
            <View style={styles.actionRow}>
              <Switch
                value={item.enabled}
                onValueChange={() => toggleAlarm(item.id)}
                trackColor={{ false: '#374151', true: '#7c3aed' }}
                thumbColor="#ffffff"
              />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteAlarm(item.id)}
              >
                <Text style={styles.deleteButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Set New Alarm</Text>

            <View style={styles.timeInputRow}>
              <TextInput
                style={styles.timeInput}
                keyboardType="numeric"
                maxLength={2}
                value={hour}
                onChangeText={setHour}
                placeholder="HH"
                placeholderTextColor="#9ca3af"
              />
              <Text style={styles.timeColon}>:</Text>
              <TextInput
                style={styles.timeInput}
                keyboardType="numeric"
                maxLength={2}
                value={minute}
                onChangeText={setMinute}
                placeholder="MM"
                placeholderTextColor="#9ca3af"
              />
            </View>
            <Text style={styles.helperText}>24-hour format (00:00 - 23:59)</Text>

            <TextInput
              style={styles.labelInput}
              value={label}
              onChangeText={setLabel}
              placeholder="Alarm label (e.g. Work, Workout)"
              placeholderTextColor="#9ca3af"
            />

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.saveBtn]}
                onPress={handleAddAlarm}
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addButton: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 30,
  },
  alarmCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
  },
  alarmInfo: {
    flex: 1,
  },
  alarmTime: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  disabledText: {
    color: '#64748b',
  },
  alarmLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deleteButton: {
    padding: 6,
    marginLeft: 6,
  },
  deleteButtonText: {
    color: '#ef4444',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 18,
    fontWeight: '500',
  },
  emptySubText: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  timeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  timeInput: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    textAlign: 'center',
    width: 80,
  },
  timeColon: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginHorizontal: 10,
  },
  helperText: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 16,
  },
  labelInput: {
    width: '100%',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    fontSize: 15,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#334155',
  },
  cancelBtnText: {
    color: '#cbd5e1',
    fontWeight: '600',
  },
  saveBtn: {
    backgroundColor: '#7c3aed',
  },
  saveBtnText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
