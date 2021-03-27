import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import {firebase} from "../config"
import { FontAwesome5} from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import Friends from "./Friends";

function Home() {

    return (
        <SafeAreaView>
            {/* <FriendDrawer /> */}
            <Text>Home</Text>
        </SafeAreaView>
    )
}

export default Home;