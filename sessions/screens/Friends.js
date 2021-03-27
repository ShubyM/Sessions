import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import globalStyles from "../styles/global";
import { firebase } from "../config.js";

function Friends() {
  const [username, setUsername] = useState("");
  const currentUserId = firebase.auth().currentUser.uid;
  const friends = [];

  const addFriend = (username) => {
    firebase
      .firestore()
      .collection("users")
      .where("username", "==", username)
      .get().then((users) => {
        users.forEach((user) => {
          const newFriend = user.data()
          if (newFriend.id != currentUserId) {
            const friend =  {
              id: newFriend.id,
              name: newFriend.name,
              username: newFriend.username,
            }
            firebase
            .firestore()
            .collection("users")
            .doc(currentUserId)
            .update({
              "friends": firebase.firestore.FieldValue.arrayUnion({
              id: newFriend.id,
              name: newFriend.name,
              username: newFriend.username,
            })
            })
            friends.push(friend)
          }
        })
      })
    
  };

  const getFriends = async () => {
    const query = await firebase.firestore().collection("users").doc(currentUserId).get()
    .then((doc) => {
      console.log(doc.data().friends)
      friends.push(doc.data().friends)
    })
  }

  useEffect(() => {
    getFriends();
  }, [])

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("dismissed keyboard");
      }}
    >
      <SafeAreaView style={globalStyles.container}>
        <Text style={globalStyles.titleText}> Find and Add Friend:</Text>
        <View style={globalStyles.buttonAllign}>
          <TextInput
            style={globalStyles.input}
            placeholder="Lookup Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <Button
            onPress={() => addFriend(username)}
            title="Add"
            color="coral"
            buttonStyle={{ justifyContent: "flex-end" }}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default Friends;