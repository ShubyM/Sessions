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

function Room(props) {
    return (
        <View>
            <Text>Room</Text>
            <Text>id: {props.id}</Text>
            <Text>name: {props.name}</Text>
            <Text>topic: {props.topic}</Text>
        </View>
    )
}

export default Room