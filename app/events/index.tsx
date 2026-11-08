import { useState } from 'react'
import { FlatList, Text, TextInput, View, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { events } from '../../src/data/events'
import EventRow from '../../src/components/EventRow'

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([])
  const [search, setSearch] = useState('')

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  )

  const toggleSaved = (id: number) => {
    setSavedIds((ids) =>
      ids.includes(id)
        ? ids.filter((savedId) => savedId !== id)
        : [...ids, id]
    )
  }

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
})