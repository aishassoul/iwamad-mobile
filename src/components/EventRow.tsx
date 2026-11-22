
import { Pressable, StyleSheet, Text } from 'react-native'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated'
import type { CampusEvent } from '../data/events'

type EventRowProps = {
  event: CampusEvent
  onPress: () => void
  onToggleSaved: () => void
  saved: boolean
}

export default function EventRow({
  event,
  onPress,
  onToggleSaved,
  saved,
}: EventRowProps) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
    >
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved()
              swipeable.close()
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>
              {saved ? 'Unsave' : 'Save'}
            </Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text>{event.date} · {event.place}</Text>

          {saved && (
            <Animated.Text entering={ZoomIn}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
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
    backgroundColor: '#fff',
  },
  cardPressed: {
    backgroundColor: '#e8e8e8',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  action: {
    minHeight: 44,
    marginVertical: 8,
    marginRight: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
