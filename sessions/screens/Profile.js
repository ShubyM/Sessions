import React, {useState}from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

function Profile(props) {
    return (
        <SafeAreaView>
            <Text>Name: {props.name}</Text>
            <Text>Username: {props.username}</Text>
        </SafeAreaView>
    )
}

export default Profile;