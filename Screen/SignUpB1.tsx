import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

function SignUpB1({navigation}): React.JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
    hoTen: '',
  });
  const [erTaiKhoan, setErTaiKhoan] = useState('');
  const [erMatKhau, setErMatKhau] = useState('');
  const [erHoTen, setErHoTen] = useState('');
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userState => {
      setUser(userState);
      if (initializing) {
        setInitializing(false);
      }
    });
    return subscriber;
  }, []);
  
  const taoTaiKhoan = () => {
    let check = true;
    if (!userInput.email.trim()) {
      setErTaiKhoan('Vui lòng điền Email!');
      check = false;
    } else {
      setErTaiKhoan('');
    }
    if (!userInput.password.trim()) {
      setErMatKhau('Vui lòng nhập mật khẩu!');
      check = false;
    } else {
      setErMatKhau('');
    }
    if (!userInput.hoTen.trim()) {
      setErHoTen('Vui lòng nhập họ tên!');
      check = false;
    } else {
      setErHoTen('');
    }
    if (!check) {
      return;
    }
    auth()
      .createUserWithEmailAndPassword(userInput.email, userInput.password)
      .then(() => {
        ToastAndroid.show('Tạo tài khoản thành công', ToastAndroid.SHORT);
        navigation.navigate('Login', {
          email: userInput.email,
          password: userInput.password,
          hoTen: userInput.hoTen
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show('Tài khoản email đã tồn tại!', ToastAndroid.SHORT);
        }
        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show('Email của bạn không hợp lệ!', ToastAndroid.SHORT);
        }
        console.log(error);
      });
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} source={require('./image/image.png')}>
        <Text style={{color: 'black', fontSize: 25, marginBottom: 40, fontWeight: 'bold'}}>
          Đăng ký tài khoản
        </Text>
        <TextInput
          onChangeText={text => {
            setUserInput(prevState => ({
              ...prevState,
              hoTen: text,
            }));
          }}
          placeholder="Họ và tên"
          placeholderTextColor={'black'}
          style={{
            width: '80%',
            borderRadius: 10,
            borderWidth: 1,
            paddingLeft: 15,
            color: 'black'
          }}
        />
        {erHoTen ? (
          <View style={{width: '100%'}}>
            <Text style={styles.error}>{erHoTen}</Text>
          </View>
        ) : null}
        <TextInput
          onChangeText={text => {
            setUserInput(prevState => ({
              ...prevState,
              email: text,
            }));
          }}
          placeholder="Email"
          placeholderTextColor={'black'}
          style={{
            width: '80%',
            borderRadius: 10,
            borderWidth: 1,
            paddingLeft: 15,
            marginTop: 15,
            color: 'black'
          }}
        />
        {erTaiKhoan ? (
          <View style={{width: '100%'}}>
            <Text style={styles.error}>{erTaiKhoan}</Text>
          </View>
        ) : null}
        <TextInput
          onChangeText={text => {
            setUserInput(prevState => ({
              ...prevState,
              password: text,
            }));
          }}
          placeholder="Mật khẩu"
          placeholderTextColor={'black'}
          style={{
            width: '80%',
            borderRadius: 10,
            borderWidth: 1,
            paddingLeft: 15,
            marginTop: 15,
            color: 'black'
          }}
        />
        {erMatKhau ? (
          <View style={{width: '100%'}}>
            <Text style={styles.error}>{erMatKhau}</Text>
          </View>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            taoTaiKhoan();
          }}
          style={{
            width: 140,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#978BBC',
            borderRadius: 10,
            marginVertical: 25,
          }}>
          <Text style={{fontSize: 17, color: 'white', fontWeight: 'bold'}}>
            Đăng ký
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'black', fontSize: 18}}>Bạn đã có tài khoản? Bấm </Text>
        <TouchableOpacity onPress={() => {navigation.navigate('Login')}}><Text style={{color: 'blue', fontWeight: 'bold', fontSize: 18}}>Đăng nhập</Text></TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

export default SignUpB1;

const styles = StyleSheet.create({
  error: {
    marginLeft: 45,
    marginTop: 5,
    color: 'red',
    fontSize: 15,
  },
});
