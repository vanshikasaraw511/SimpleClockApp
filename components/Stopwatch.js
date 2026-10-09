import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default function Stopwatch({ theme }) {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (running) {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 30);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  const handleStartStop = () => setRunning(!running);
  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };
  const handleLap = () => {
    if (running) setLaps([time, ...laps]);
  };

  const format = (ms) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(centis).padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.display, { color: theme.text }]}>{format(time)}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: running ? '#e63946' : '#2a9d8f' }]}
          onPress={handleStartStop}
        >
          <Text style={styles.btnText}>{running ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border }]}
          onPress={running ? handleLap : handleReset}
        >
          <Text style={[styles.btnText, { color: theme.text }]}>{running ? 'Lap' : 'Reset'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={laps}
        keyExtractor={(_, index) => index.toString()}
        style={styles.lapList}
        renderItem={({ item, index }) => (
          <View style={[styles.lapRow, { borderBottomColor: theme.border }]}>
            <Text style={{ color: theme.secondaryText }}>Lap {laps.length - index}</Text>
            <Text style={{ color: theme.text, fontWeight: '600' }}>{format(item)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
  display: { fontSize: 56, fontWeight: '200', letterSpacing: 2, marginBottom: 40 },
  buttonRow: { flexDirection: 'row', gap: 20, marginBottom: 30 },
  btn: { width: 110, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  lapList: { width: '100%', maxWidth: 360 },
  lapRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1 }
});
