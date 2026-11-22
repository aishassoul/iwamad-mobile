
import { useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native'
import { router } from 'expo-router'
import { useEvents } from '../../src/hooks/useEvents'
import { useSavedIds } from '../../src/hooks/useSavedIds'
import EventRow from '../../src/components/EventRow'

export default function EventsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents()
  const { savedIds, toggleSaved } = useSavedIds()
  const [search, setSearch] = useState('')

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text style={styles.empty}>Loading events</Text>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Could not load events</Text>
        <Text style={styles.empty}>{error.message}</Text>
        <Pressable
          style={styles.retry}
          onPress={() => refetch()}
        >
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    )
  }

  const filteredEvents = (data ?? []).filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>

      <TextInput
        style={styles.search}
        value={search}
        onChangeText={setSearch}
        placeholder="Search events"
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(event) => String(event.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSaved(item.id)}
          />
        )}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        ListEmptyComponent={<Text style={styles.empty}>No events match</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  info: {
    marginHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
  },
  search: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  empty: {
    margin: 20,
    textAlign: 'center',
  },
  error: {
    margin: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  retry: {
    marginHorizontal: 20,
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
