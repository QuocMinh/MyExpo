//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// create a component
class Box extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.trangthai === 0) {
            return (
                <TouchableOpacity onPress={() => this.docSo()}>
                    <View style={[styles.vBox, { backgroundColor: "#8CCBF9", borderColor: "#3FA9F5"}]}>
                        <Text style={{ fontSize: 18, marginBottom: 5, color: "#00579c", fontWeight: "bold" }}>QUẦY {this.props.soquay}</Text>
                        <Text style={styles.stt}>{this.props.stt}</Text>
                    </View>
                </TouchableOpacity>
            );
        } else if (this.props.trangthai === 1) {
            return (
                <View style={[styles.vBox, { backgroundColor: "#FFBE78", borderColor: "#FF931E" }]}>
                    <Text style={{ fontSize: 18, marginBottom: 5, color: "#00579c", fontWeight: "bold" }}>QUẦY {this.props.soquay}</Text>
                    <Text style={styles.stt}>{this.props.stt}</Text>
                </View>
            );
        } else {
            return (
                <View style={[styles.vBox, { backgroundColor: "#AFDF8E", borderColor: "#7AC943" }]}>
                    <Text style={{ fontSize: 18, marginBottom: 5, color: "#00579c", fontWeight: "bold" }}>QUẦY {this.props.soquay}</Text>
                    <Text style={styles.stt}>{this.props.stt}</Text>
                </View>
            );
        }
    }

    docSo() {
        Alert.alert("OUT: ", this.props.soquay + " " + this.props);
    }
}

// define your styles
const styles = StyleSheet.create({
    vBox: {
        height: 105,
        width: 105,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 8,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    stt: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#00579c',
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#00579c',
        paddingTop: 4,
        fontSize: 16,
    }
});

//make this component available to the app
export default Box;
