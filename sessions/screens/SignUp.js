import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {firebase} from "../config"

function SignUp( { navigation } ) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSignUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                username,
                name,
                rooms: [],
            };
            const usersRef = firebase.firestore().collection('users')
            usersRef.doc(uid).set(data).then(() => {
                navigation.navigate('Tabs', {user: data})
            })
            .catch((error) => {
                alert(error)
            });
        })
        .catch((error) => {
            alert(error)
        });
    }

    return (
        <SafeAreaView>
            <Text>Sign Up</Text>
            <TextInput placeholder='Email' onChangeText={(text) => setEmail(text)} value={email} autoCapitalize="none"/>
            <TextInput placeholder='Name' onChangeText={(text) => setName(text)} value={name} autoCapitalize="none"/>
            <TextInput placeholder='Username' onChangeText={(text) => setUsername(text)} value={username} autoCapitalize="none"/>
            <TextInput placeholder='Password' onChangeText={(text) => setPassword(text)} value={password} autoCapitalize="none"/>
            <Button title="Sign Up" onPress={() =>onSignUp()}/>
        </SafeAreaView>
    )
}

export default SignUp;