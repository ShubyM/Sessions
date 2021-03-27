import React, { useState, useEffect }from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { globalStyles } from './styles/global';
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Chats from "./screens/Chatrooms";
import Profile from "./screens/Profile";
import { StyleSheet, Text, View } from 'react-native';
import {firebase} from "./config"
import { NavigationContainer } from '@react-navigation/native';
import Friends from "./screens/Friends";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => {
        setLoading(false);
      }, 1000)
    }
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef.doc(user.uid).get().then((document) => {
          const userData = document.data()
          setLoading(false)
          setUser(userData)
        })
        .catch((error) => {
          setLoading(false)
        });
      }
      else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign In" component={SignIn}/>
        <Stack.Screen name="Sign Up" component={SignUp}/>
        <Stack.Screen name="Tabs">
          {props => <Tabs {...props} data={user}/>}
        </Stack.Screen>
      </Stack.Navigator>
      {/* <Stack.Navigator>
        { user ? (
          <>
            <Stack.Screen name="Home">
              {props => <Tabs {...props} data={user}/>}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Sign In" component={SignIn}/>
            <Stack.Screen name="Sign Up" component={SignUp}/>
          </>
        )}
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function Tabs( props, { navigation } ) {
  // console.log(props);
  return (
    <Tab.Navigator>
      <Tab.Screen 
      name="Home" component={Home}  options={{tabBarIcon: ({focused}) =>
                focused ? (<MaterialIcons name='home' size={40} color='#58CCE5' />)
                : (<MaterialIcons name='home' size={30} color='black' />),
            }} />
      <Tab.Screen name="Chats" children={() => <Chats id={props.data.id} name={props.data.name} username={props.data.username}/>} options={{tabBarIcon: ({focused}) =>
                focused ? (<MaterialIcons name='chat' size={40} color='#58CCE5' />)
                : (<MaterialIcons name='chat' size={30} color='black' />),
            }} />
      <Tab.Screen name="Profile" children={() => <Profile name={props.data.name} username={props.data.username}/>} options={{tabBarIcon: ({focused}) =>
                focused ? (<FontAwesome5 name='user-circle' size={37} color='#58CCE5' />)
                : (<FontAwesome5 name='user-circle' size={27} color='black' />),
            }} />
      <Tab.Screen name="Friends" component={Friends} options={{tabBarIcon: ({focused}) =>
                focused ? (<FontAwesome5 name='user-plus' size={30} color='#58CCE5' />)
                : (<FontAwesome5 name='user-plus' size={20} color='black' />),
            }} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
