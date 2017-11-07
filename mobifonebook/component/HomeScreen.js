//import liraries
import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, Button, TouchableOpacity, Image, 
    ScrollView, Dimensions, AsyncStorage, StatusBar, Platform
} from 'react-native';

import Card from './Card.js'

const imgBookSo    = require('./images/icon-bookso.png');
const imgDanhSach  = require('./images/icon-danhsach.png');
const imgSetting  = require('./images/icon-setting.png');
const { height, width } = Dimensions.get('window');

class HomeScreen extends Component {
    static navigationOptions = {
        title             : 'Mobifone Service',
        headerStyle       : { backgroundColor: '#0084EB', marginTop: (Platform.OS === 'android') ? StatusBar.currentHeight : 0 },
        headerTintColor   : 'white',
        headerLeft        : (
            <Image style={{ width: 35, height: 30, marginLeft: 20 }}
                   source={require('./images/icon-home.png')}
            />
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            serverAddr: 'localhost',
            serverPort: '8080'
        }
    }

    componentDidMount() {
        AsyncStorage.getItem("serverAddr").then((value) => {
            if(value !== null)
                this.setState({"serverAddr": value});
        }).done();
        AsyncStorage.getItem("serverPort").then((value) => {
            if(value !== null)
                this.setState({"serverPort": value});
        }).done();
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                <Text style={styles.title}>Tiện ích</Text>
                <View style={styles.appContainer}>
                    <ScrollView horizontal={true}
                                snapToAlignment={"center"}
                                alwaysBounceHorizontal={true}>
                        <Card screenName='BookSo'   title='Đặt số thứ tự'    img={imgBookSo}    navigate={navigate} />
                        <Card screenName='DanhSach' title='Danh sách đặt số' img={imgDanhSach}  navigate={navigate} />
                    </ScrollView>
                </View>
                <Text style={styles.title}>Nâng cao</Text>
                <View style={styles.appContainer}>
                    <ScrollView horizontal={true}
                                snapToAlignment={"center"}
                                alwaysBounceHorizontal={true}>
                        <Card screenName='ServerConfig' title='Cài đặt Server' img={imgSetting}  navigate={navigate} />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    title: {
        color: '#333',
        marginBottom: 10,
        marginTop: 5
    },
    appContainer: {
        height: height/4.5,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    }
});

export default HomeScreen;
