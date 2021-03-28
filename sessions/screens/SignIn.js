import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {firebase} from "../config"
import globalStyles from '../styles/global';

function SignIn( { navigation } ) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const onToSignUp = () => {
        navigation.navigate('Sign Up')
    }

    const onSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
            const uid = response.user.uid
            const usersRef = firebase.firestore().collection('users')
            usersRef.doc(uid).get().then(firestoreDocument => {
                if (!firestoreDocument.exists) {
                    alert("User does not exist.")
                    return;
                }
                const user = firestoreDocument.data()
                navigation.navigate('Tabs', {user})
            })
            .catch(error => {
                alert(error)
            })
        })
        .catch(error => {
            alert(error)
        });
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>Sign In</Text>
            <TextInput placeholder='Email' onChangeText={(text) => setEmail(text)} value={email} autoCapitalize="none" style={globalStyles.input}/>
            <TextInput placeholder='Password' onChangeText={(text) => setPassword(text)} value={password} autoCapitalize="none" style={globalStyles.input}/>
            <TouchableOpacity onPress={() => onSignIn()} style={globalStyles.buttonStyle}>
                <Text>Sign in</Text>
            </TouchableOpacity>
            <Text style={globalStyles.fineText}>Don't have an account? <Text onPress={() => onToSignUp()} style={globalStyles.fineText}>Sign up</Text></Text>
        </View>
    )
}

export default SignIn;