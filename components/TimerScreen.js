import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function TimerScreen({ theme }) {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [initialSeconds, setInitialSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (running && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setRunning(false);
            Alert.alert('Time Up!', 'Your countdown timer has completed.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running, secondsLeft]);

  const addTime = (secs) => {
    if (!running) {
      const next = Math.max(0, secondsLeft + secs);
      setSecondsLeft(next);
      setInitialSeconds(next);
    }
  };

  const format = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.display, { color: theme.text }]}>{format(secondsLeft)}</Text>
      
      {!running && (
        <View style={styles.presets}>
          {[1, 5, 10, 15].map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.presetBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}
              onPress={() => {
                setSecondsLeft(m * 60);
                setInitialSeconds(m * 60);
              }}
            >
              <Text style={{ color: theme.text }}>+{m}m</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: running ? '#e63946' : '#2a9d8f' }]}
          onPress={() => secondsLeft > 0 && setRunning(!running)}
        >
          <Text style={styles.btnText}>{running ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border }]}
          onPress={() => {
            setRunning(false);
            setSecondsLeft(initialSeconds);
          }}
        >
          <Text style={[styles.btnText, { color: theme.text }]}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 80, paddingHorizontal: 20 },
  display: { fontSize: 64, fontWeight: '200', letterSpacing: 3, marginBottom: 30 },
  presets: { flexDirection: 'row', gap: 10, marginBottom: 30 },
  presetBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 16, borderWidth: 1 },
  buttonRow: { flexDirection: 'row', gap: 20 },
  btn: { width: 110, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});
