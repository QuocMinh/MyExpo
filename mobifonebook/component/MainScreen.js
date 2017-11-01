import React, { Component } from 'react';

import Registry from "./Registry.js"
import Helpdesk from "./Helpdesk.js"

import { 
    View, 
    Text, 
    StyleSheet,
    Platform,
    StatusBar,
    Image,
    ScrollView
} from 'react-native';

class MainScreen extends Component {
    static navigationOptions = {
        title             : 'Mobifone Book',
        headerStyle       : { backgroundColor: '#0084EB', marginTop: (Platform.OS === 'android') ? StatusBar.currentHeight : 0 },
        headerTintColor   : 'white',
        headerLeft        : (
            <Image
                style={{ width: 35, height: 30, marginLeft: 20 }}
                source={require('./images/icon-home.png')}
            />
        )
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.formContainer}>
                    <Registry />
                </View>
                <View style={styles.helpdeskContainer}>
                    <Helpdesk />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCE0EF',
    },
    formContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    helpdeskContainer: {
        flex: 1,
        backgroundColor: "#ddd"
    }
});

export default MainScreen;
