import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, ScrollView, 
    Dimensions, Image, TextInput, TouchableOpacity, 
    AsyncStorage, Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation';

const { height } = Dimensions.get('window');
const imgSetting  = require('./images/icon-setting.png');

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

class ServerConfig extends Component {
    static navigationOptions = {
        title           : 'Cài đặt Server',
        headerStyle     : { backgroundColor: '#0084EB' },
        headerTintColor : 'white'
    }

    constructor(props) {
        super(props);
        this.state = {
            serverAddr: 'localhost',
            serverPort: '8080'
        }
    }

    saveSetting() {
        try {
            AsyncStorage.setItem('@Config:serverAddr', this.state.serverAddr);
            AsyncStorage.setItem('@Config:serverPort', this.state.serverPort);

            Alert.alert(
                'OK!', 
                'Đã lưu cấu hình.',
                [ 
                    { 
                        text: 'Về trang chủ', 
                        // onPress: () => this.props.navigation.navigate('Home')
                        onPress: () => this.props.navigation.dispatch(resetAction)
                    } 
                ]
            )
        } catch (err) {
            console.log(err);
            Alert.alert('LỖI', 'Rất tiếc! Đã xãy ra lỗi, vui lòng thực hiện lại.');
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={imgSetting} />
                    <Text style={styles.titleLogo}> Cài đặt cấu hình cho Server </Text>
                </View>
                <View style={styles.formConatiner}>
                    <Text style={styles.title}>Nhập địa chỉ Server</Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='white'
                        placeholder="Server address"
                        placeholderTextColor='#d7d7d7'
                        onChangeText={serverAddr => this.setState({ serverAddr: serverAddr })}
                        value={this.state.serverAddr}/>
                    <Text style={styles.title}>Cổng</Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='white'
                        placeholder="Port"
                        placeholderTextColor='#d7d7d7'
                        keyboardType='phone-pad'
                        onChangeText={serverPort => this.setState({ serverPort: serverPort })}
                        value={this.state.serverPort}/>
                    <Text style={styles.review}>Xem lại: http://{this.state.serverAddr}:{this.state.serverPort}/</Text>
                    <TouchableOpacity onPress={this.saveSetting.bind(this)}>
                        <Text style={styles.btnBook}>Lưu cài đặt</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    componentDidMount() {
        AsyncStorage.getItem("@Config:serverAddr").then((value) => {
            if(value !== null)
                this.setState({"serverAddr": value});
        }).done();
        AsyncStorage.getItem("@Config:serverPort").then((value) => {
            if(value !== null)
                this.setState({"serverPort": value});
        }).done();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        height: height / 4,
        marginTop: 15
    },
    titleLogo: {
        color: '#333',
        marginTop: 10,
        fontSize: 16
    },
    formConatiner: {
        padding: 20
    },
    input: {
        height: 45,
        marginBottom: 15,
        fontSize: 16,
        borderColor: '#0084EB',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 3
    },
    title: {
        marginBottom: 7,
        color: '#00579c'
    }, 
    btnBook: {
        backgroundColor: '#0084EB',
        textAlign: 'center',
        padding: 10,
        color: 'white',
        fontSize: 18,
        borderRadius: 3
    },
    review: {
        marginBottom: 15,
        fontSize: 16,
        color: '#00579c'
    }
});

export default ServerConfig;
