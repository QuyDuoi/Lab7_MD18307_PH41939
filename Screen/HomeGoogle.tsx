import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

function HomeGoogle({navigation}): React.JSX.Element {
    const [userEmail, setUserEmail] = useState('');
    const [userDisplayName, setUserDisplayName] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');

    useEffect(() => {
        // Lấy thông tin người dùng đã đăng nhập bằng Google
        async function fetchUserInfo() {
            try {
                const userInfo = await GoogleSignin.getCurrentUser();
                if (userInfo) {
                    setUserEmail(userInfo.user.email);
                    setUserDisplayName(userInfo.user.givenName);
                    setUserPhoneNumber(userInfo.user.familyName);
                }
            } catch (error) {
                console.log('Error fetching user info:', error);
            }
        }

        fetchUserInfo();
    }, []);

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            setUserEmail('');
            setUserDisplayName('');
            setUserPhoneNumber('');
            ToastAndroid.show("Đăng xuất thành công!", ToastAndroid.SHORT);
            navigation.navigate('Login');
        } catch (error) {
            console.log('Error signing out:', error);
        }
    };

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>Chào mừng người chơi {userDisplayName}</Text>
            <Text style={{color: 'black', fontSize: 16}}>Email: {userEmail}</Text>
            {userPhoneNumber && <Text style={{color: 'black', fontSize: 16}}>Số điện thoại: 0363244466</Text>}
            <TouchableOpacity style={{width: 120, height: 50, borderRadius: 10, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', marginVertical: 10}} onPress={signOut}>
                <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeGoogle

const styles = StyleSheet.create({})
