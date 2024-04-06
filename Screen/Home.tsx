import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from "@react-native-firebase/auth"

function Home({navigation, route}): React.JSX.Element {
    const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (route.params && route.params.email) {
      setUserEmail(route.params.email);
    }
  }, [route.params]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>Chào mừng người chơi {userEmail}</Text>
      <TouchableOpacity style={{width: 120, height: 50, borderRadius: 10, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', marginVertical: 10}} onPress={() => {
        auth().signOut().then(() => {
            ToastAndroid.show("Đăng xuất thành công!", ToastAndroid.SHORT);
            navigation.navigate('Login');
        })
      }}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})