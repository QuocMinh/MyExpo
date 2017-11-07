import React, { Component } from 'react';

import Registry from "./Registry.js"
import Helpdesk from "./Helpdesk.js"
import RegistryIOS from "./RegistryIOS.js"

import { 
    View, 
    Text, 
    StyleSheet,
    Platform,
    StatusBar,
    ScrollView
} from 'react-native';

import { Icon } from 'react-native-elements';

class MainScreen extends Component {
    static navigationOptions = {
        title             : 'Mobifone Book',
        headerStyle       : { backgroundColor: '#0084EB', marginTop: (Platform.OS === 'android') ? StatusBar.currentHeight : 0 },
        headerTintColor   : 'white',
        headerLeft        : (
            <Icon
                name="home"
                color="white"
                size={30}
                iconStyle={{marginLeft: 20}}
            />
        )
    }

    renderForIOS() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.formContainerIOS}>
                    <RegistryIOS />
                </View>
                <View style={styles.helpdeskContainerIOS}>
                    <Helpdesk />
                </View>
            </View>
        );
    }

    renderForAndroid() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.formContainer}>
                    <Registry />
                </View>
                <View style={styles.helpdeskContainer}>
                    <Helpdesk />
                </View>
            </View>
        );
    }

    render() {
        return (
            Platform.OS === "android" ?
                this.renderForAndroid() :
                this.renderForIOS()
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCE0EF',
    },
    formContainer: {
        flex: 0.45,
        backgroundColor: "white"
    },
    helpdeskContainer: {
        flex: 0.55,
        backgroundColor: "#ddd"
    },
    formContainerIOS: {
        flex: 0.46,
        backgroundColor: "white"
    },
    helpdeskContainerIOS: {
        flex: 0.54,
        backgroundColor: "#ddd"
    }
});

export default MainScreen;
