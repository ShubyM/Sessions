import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button, FlatList } from "react-native";
import { firebase } from "../config.js";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from "react-native-gesture-handler";

import Room from '../components/room'

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
  const [rooms, setRooms] = useState([])
  const currentUserId = firebase.auth().currentUser.uid;

  const listenForUpdates = () => {
      const query = firebase.firestore().collection("users").doc(currentUserId);
      const unsubscribe = query.onSnapshot((querySnapshot) => {
      const nRooms = querySnapshot.data().rooms
      const t = rooms
      for (let i = 0; i < nRooms.length; i++) {
        const query = firebase.firestore().collection("rooms").doc(nRooms[i])
        const roomInfo = query.get().then((rI) => {
          t.push({
            id: nRooms[i],
            name: rI.data().name,
            topic: rI.data().topic,
          });
        })
      }
      setRooms(t);
      });
  }

  useEffect(() => {
    listenForUpdates();
  }, [])

  return (
    <SafeAreaView>
      <Button onPress={() => navigation.navigate('Create Room')} title="create room" />
      <FlatList 
        data={rooms}
        renderItem={({ item }) => {
          return <Room id={item.id} name={item.name} topic={item.topic}/>
        }}
        keyExtractor={item => item.id.toString()}
      />
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