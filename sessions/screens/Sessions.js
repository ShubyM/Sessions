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
	// *** code for adding friends based off of user id ***
	// firebase.firestore().collection('users').doc(uid).collection("friends").add({id : "randomid"})
	
	
	//firebase.auth().currentUser.uid
	// *** room creation ***
  firebase
    .firestore()
    .collection("rooms")
    .add({
			host: firebase.auth().currentUser.uid,
      name: name,
			topic: topic,
			createdAt: new Date().getTime(),
			members: [uid]
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
  const [rooms, setrooms] = usestate([]);

  const getRooms = async () => {

  }

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