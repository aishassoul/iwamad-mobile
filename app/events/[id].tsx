
import { Stack, useLocalSearchParams } from 'expo-router'
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  StyleSheet,
} from 'react-native'
import { useEvents } from '../../src/hooks/useEvents'
import HolidayNote from '../../src/components/HolidayNote'

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, isPending, isError, error, refetch } = useEvents()

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>Loading events</Text>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Could not load events</Text>
        <Text>{error.message}</Text>
        <Pressable style={styles.retry} onPress={() => refetch()}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    )
  }

  const event = data.find((item) => item.id === Number(id))

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
        <Text>No event with id {id}.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text>Date: {event.date}</Text>
      <HolidayNote date={event.date} />
      <Text>Place: {event.place}</Text>
      <Text>Seats: {event.seats}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  retry: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
