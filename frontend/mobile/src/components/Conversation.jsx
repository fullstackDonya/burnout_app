import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchConversations, createConversation } from "../../redux/slices/conversationSlice";
import { fetchMessages } from "../../redux/slices/messageSlice"; 
import { selectConversations, selectUserId, selectUsers } from "../../redux/selectors";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, CheckBox, Alert } from 'react-native';

const Conversations = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const conversations = useSelector(selectConversations);
  const users = useSelector(selectUsers);
  const userId = useSelector(selectUserId);
  const [selectedUsers, setSelectedUsers] = useState([userId]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchConversations());
    }
  }, [dispatch, userId]);

  const handleUserSelection = (id) => {
    if (id === userId) return;
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const handleCreateConversation = () => {
    if (selectedUsers.length < 2) {
      Alert.alert("Erreur", "Veuillez sélectionner au moins un autre utilisateur.");
      return;
    }
    dispatch(createConversation({ users: selectedUsers }))
      .unwrap()
      .then((newConversation) => {
        dispatch(fetchMessages(newConversation._id));
        navigation.navigate("Chat", { conversationId: newConversation._id });
      })
      .catch((error) => {
        Alert.alert("Erreur", error.message);
      });
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <CheckBox
        value={selectedUsers.includes(item._id)}
        onValueChange={() => handleUserSelection(item._id)}
      />
      <Text style={styles.userName}>{item.name}</Text>
    </View>
  );

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => navigation.navigate("Chat", { conversationId: item._id })}
    >
      <Text style={styles.conversationName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversations</Text>
      <FlatList
        data={conversations}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item._id}
        style={styles.conversationList}
      />
      <Text style={styles.title}>Utilisateurs</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item._id}
        style={styles.userList}
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreateConversation}>
        <Text style={styles.createButtonText}>Créer une conversation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  conversationList: {
    marginBottom: 20,
  },
  conversationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  conversationName: {
    fontSize: 18,
  },
  userList: {
    marginBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    marginLeft: 10,
    fontSize: 18,
  },
  createButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Conversations;