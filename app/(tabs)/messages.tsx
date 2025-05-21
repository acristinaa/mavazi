import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock data for messages
const mockMessages = [
  {
    id: '1',
    name: 'Cristina Ayala',
    lastMessage: 'I love the pink top. I would like to get it!',
    time: '2m ago',
    avatar: '👩🏻',
    unread: true,
  },
  {
    id: '2',
    name: 'Amelie Muñoz',
    lastMessage: 'Thanks for the quick delivery!',
    time: '1h ago',
    avatar: '👩🏻‍🦱',
    unread: false,
  },
  {
    id: '3',
    name: 'Ana Lourenço',
    lastMessage: 'Hi, I am interested in the dress you posted',
    time: '3h ago',
    avatar: '👩🏽',
    unread: true,
  },
  {
    id: '4',
    name: 'Faryd Ghazy',
    lastMessage: 'The jacket looks perfect, when can I pick it up?',
    time: '5h ago',
    avatar: '🧑🏾‍🦱',
    unread: true,
  },
  {
    id: '5',
    name: 'Sohalia Mathur',
    lastMessage: 'The skirt fits perfect. Thank you again!',
    time: '1d ago',
    avatar: '👩🏾‍🦱',
    unread: false,
  },
];

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.messageList}>
        {mockMessages.map((message) => (
          <TouchableOpacity key={message.id} style={styles.messageItem}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{message.avatar}</Text>
              {message.unread && <View style={styles.unreadDot} />}
            </View>
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.name}>{message.name}</Text>
                <Text style={styles.time}>{message.time}</Text>
              </View>
              <Text 
                style={[
                  styles.lastMessage,
                  message.unread && styles.unreadMessage
                ]}
                numberOfLines={1}
              >
                {message.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  messageList: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    fontSize: 32,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    lineHeight: 50,
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#333',
  },
});