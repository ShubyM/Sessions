import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import { firebase } from "../config.js";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from "react-native-gesture-handler";

function CreateRoom({ navigation }) {
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')


  const onPressCreate = (name, topic) => {
    const uid = firebase.auth().currentUser.uid;
  firebase
    .firestore()
    .collection("rooms")
    .add({
			host: firebase.auth().currentUser.uid,
      name: name,
			topic: topic,
			createdAt: new Date().getTime(),
			members: [uid]
    })
    .then((docRef) => {
        firebase.firestore().collection("users").doc(uid)
        .update({
        "rooms": firebase.firestore.FieldValue.arrayUnion(docRef.id)
      })
    });
  	navigation.goBack();
  }

  return (
    <SafeAreaView>
      <TextInput placeholder="Enter Room Name" onChangeText={(text) => setName(text)} value={name} />
      <TextInput placeholder="Enter Room Topic" onChangeText={(text) => setTopic(text)} value={topic} />
      <Button title="Start New Room" onPress={() => onPressCreate(name, topic)}/>
    </SafeAreaView>
  )

}

function AllRooms({ navigation }) {
  const rooms = []
  const currentUserId = firebase.auth().currentUser.uid;
  
  const getRooms = async () => {
    try {
      const docRef = firebase.firestore().collection("users").doc(currentUserId);
      const doc = await docRef.get();
      const tRooms = doc.data().rooms;
      for (let i = 0; i < tRooms; i++) {
        const query = firebase.firestore().collection("rooms").doc(tRooms[i])
        const querySnapshot = await query.get().data()
        console.log(tRooms[i])
        // rooms.push({
        //   id: tRooms[i],
        //   name: querySnapshot.name,
        //   topic: querySnapshot.topic,
        // });
      }
    } catch (error) {
      console.log(error)
    }
  }

  const listenForUpdates = () => {
      const query = firebase.firestore().collection("users").doc(currentUserId);
      const unsubscribe = query.onSnapshot((querySnapshot) => {
      const nRooms = querySnapshot.data().rooms
      for (let i = 0; i < nRooms; i++) {
        const query = firebase.firestore().collection("rooms").doc(tRooms[i])
        const roomInfo = query.get().data()
        console.log(nRooms[i])
        // rooms.push({
        //   id: nRooms[i],
        //   name: roomInfo.name,
        //   topic: roomInfo.topic,
        // });
      }
      });
      return unsubscribe
  }
  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      console.log(rooms[i])
    }
    return listenForUpdates();
  }, [])

  return (
    <SafeAreaView>
      <Button onPress={() => navigation.navigate('Create Room')} title="create room" />
    </SafeAreaView>
  )
}

const Stack = createStackNavigator();

function Sessions(props) {
  return (
    <NavigationContainer independent="true">
      <Stack.Navigator>
        <Stack.Screen name="Rooms" component={AllRooms} />
        <Stack.Screen name="Create Room" component={CreateRoom}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Sessions;