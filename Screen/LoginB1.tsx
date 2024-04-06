import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '172705089074-g47bji17581fqqbph5va51mf8lrma7fe.apps.googleusercontent.com',
});

function LoginB1({navigation, route}): React.JSX.Element {
  const [taiKhoan, setTaiKhoan] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [erTaiKhoan, setErTaiKhoan] = useState('');
  const [erMatKhau, setErMatKhau] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const thayDoiTrangThai = () => {
    setShowPassword(!showPassword);
  };

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);
      ToastAndroid.show('Đăng nhập bằng Gmail thành công', ToastAndroid.SHORT);
      navigation.navigate('Google');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (route.params && route.params.email && route.params.password) {
      setTaiKhoan(route.params.email);
      setMatKhau(route.params.password);
      setHoTen(route.params.hoTen);
    }
  }, [route.params]);

  const dangNhap = () => {
    let check = true;
    if (!taiKhoan.trim()) {
      setErTaiKhoan('Vui lòng nhập email!');
      check = false;
    } else {
      setErTaiKhoan('');
    }

    if (!matKhau.trim()) {
      setErMatKhau('Vui lòng nhập mật khẩu!');
      check = false;
    } else {
      setErMatKhau('');
    }

    if (!check) {
      return;
    }

    auth()
      .signInWithEmailAndPassword(taiKhoan, matKhau)
      .then(() => {
        ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
        navigation.navigate('Home', {
          email: taiKhoan,
          hoTen: hoTen,
        });
      });
  };
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Image
        style={styles.hinhTron}
        source={require('./image/background1.png')}
      />
      <View style={styles.box1}>
        <Text style={styles.textDangNhap}>Đăng nhập tài khoản</Text>
        <Image style={styles.imgUser} source={require('./image/user.png')} />
      </View>
      <Text style={styles.textWc}>Welcome back {hoTen}</Text>
      <View style={styles.box2}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.tenCty}>
            Bridal <Text style={styles.toMau}>Studio</Text>
          </Text>
        </View>

        <TextInput
          style={styles.textInputTk}
          placeholder="Tài khoản"
          value={taiKhoan}
          onChangeText={text => {
            setTaiKhoan(text);
          }}
        />
        {erTaiKhoan ? <Text style={styles.error}>{erTaiKhoan}</Text> : null}
        <View style={styles.textInputMk}>
          <TextInput
            style={{paddingLeft: 14}}
            placeholder="Mật khẩu"
            value={matKhau}
            secureTextEntry={showPassword}
            onChangeText={text => {
              setMatKhau(text);
            }}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={thayDoiTrangThai}>
            <Image
              source={
                showPassword
                  ? require('./image/show.png')
                  : require('./image/hide.png')
              }
              style={styles.eyeIconImage}
            />
          </TouchableOpacity>
        </View>
        {erMatKhau ? <Text style={styles.error}>{erMatKhau}</Text> : null}
        <TouchableOpacity onPress={() => dangNhap()} style={styles.btnDangNhap}>
          <Text
            style={{
              padding: 10,
              color: 'black',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <View style={styles.box3}>
          <Image source={require('./image/Vector.png')} />
          <Text style={styles.text}>Or sign up with</Text>
          <Image source={require('./image/Vector.png')} />
        </View>
        <View style={styles.box3}>
          <TouchableOpacity onPress={onGoogleButtonPress} style={styles.box4}>
            <Image style={styles.box5} source={require('./image/google.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.box4}>
            <Image
              style={styles.box5}
              source={require('./image/facebook.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 18}}>
            Bạn không có tài khoản?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={{color: 'orange', fontSize: 18, fontWeight: 'bold'}}>
              Tạo tài khoản
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginB1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  hinhTron: {
    backgroundColor: '#FFF4CC',
    position: 'absolute',
    width: 550,
    height: 450,
    top: -250,
    left: -50,
  },
  box1: {
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center',
    position: 'absolute',
    top: 20,
  },
  box2: {
    position: 'absolute',
    top: 250,
    left: 0,
    right: 0,
  },
  textDangNhap: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  imgUser: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  textWc: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 20,
    position: 'absolute',
    top: 60,
  },
  tenCty: {
    color: 'black',
    fontWeight: '900',
    fontSize: 64,
    marginBottom: 20,
  },
  toMau: {
    color: '#FFC600',
  },
  textInputTk: {
    borderRadius: 10,
    borderWidth: 1,
    color: 'black',
    borderColor: 'gray',
    marginHorizontal: 20,
    paddingLeft: 15,
    marginTop: 10,
  },
  textInputMk: {
    borderRadius: 10,
    borderWidth: 1,
    color: 'black',
    borderColor: 'gray',
    marginHorizontal: 20,
    marginTop: 10,
  },
  btnDangNhap: {
    backgroundColor: '#FFC600',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 30,
  },
  error: {
    marginLeft: 35,
    marginTop: 10,
    color: 'red',
    fontSize: 15,
  },
  box3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginHorizontal: 10,
    color: 'black',
    fontSize: 16,
  },
  box4: {
    width: 80,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
    elevation: 2,
  },
  box5: {
    width: 40,
    height: 40,
  },
  eyeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  eyeIconImage: {
    width: 30,
    height: 30,
  },
});
