import { Pressable, StyleSheet, Text } from 'react-native'
import type { CampusEvent } from '../data/events'

type EventRowProps = {
  event: CampusEvent
  onPress: () => void
  onLongPress: () => void
  saved: boolean
}

export default function EventRow({ event, onPress, onLongPress, saved }: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.date} · {event.place}</Text>
      {saved && <Text>★ Saved</Text>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
  },
  cardPressed: {
    backgroundColor: '#e8e8e8',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
})
