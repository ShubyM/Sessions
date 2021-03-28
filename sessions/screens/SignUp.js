import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {firebase} from "../config"
import globalStyles from '../styles/global';

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
                friends: [],
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
        <SafeAreaView style={globalStyles.container}>
            <Text style={globalStyles.titleText}>Sign Up</Text>
            <TextInput placeholder='Email' onChangeText={(text) => setEmail(text)} value={email} autoCapitalize="none" style={globalStyles.input}/>
            <TextInput placeholder='Name' onChangeText={(text) => setName(text)} value={name} autoCapitalize="none" style={globalStyles.input}/>
            <TextInput placeholder='Username' onChangeText={(text) => setUsername(text)} value={username} autoCapitalize="none" style={globalStyles.input}/>
            <TextInput placeholder='Password' onChangeText={(text) => setPassword(text)} value={password} autoCapitalize="none" style={globalStyles.input}/>
            <TouchableOpacity onPress={() =>onSignUp()} style={globalStyles.buttonStyle}>
                <Text>Sign up</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default SignUp;