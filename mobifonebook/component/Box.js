//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Asset, Audio, Constants } from 'expo';
import Color from "../util/Color.js";

const { height, width } = Dimensions.get('window');

// create a component
class Box extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("STT: " + this.props.stt + " - TRANGTHAI: " + typeof this.props.trangthai);

        if(this.props.trangthai === 0) {
            return (
                <TouchableOpacity>
                    <View style={[styles.vBox, { backgroundColor: Color.HELPDESK_WAIT, borderColor: "#3FA9F5"}]}>
                        <Text style={{ fontSize: 18, marginBottom: 5, color: "#00579c", fontWeight: "bold" }}>QUẦY {this.props.soquay}</Text>
                        <Text style={styles.stt}>STT: {this.props.stt}</Text>
                        <Text>Còn lại: {this.props.soluong}</Text>
                    </View>
                </TouchableOpacity>
            );
        } else if (this.props.trangthai === 1) {
            return (
                <View style={[styles.vBox, { backgroundColor: Color.HELPDESK_HANDLING, borderColor: "#FF931E" }]}>
                    <Text style={{ fontSize: 18, marginBottom: 5, color: "#00579c", fontWeight: "bold" }}>QUẦY {this.props.soquay}</Text>
                    <Text style={styles.stt}>STT: {this.props.stt}</Text>
                    <Text>Còn lại: {this.props.soluong}</Text>
                </View>
            );
        } else {
            return (
                <View style={[styles.vBox, { backgroundColor: Color.HELPDESK_COMPLETE, borderColor: "#7AC943" }]}>
                    <Text style={{ fontSize: 18, marginBottom: 5, color: "#00579c", fontWeight: "bold" }}>QUẦY {this.props.soquay}</Text>
                    <Text style={styles.stt}>STT: {this.props.stt}</Text>
                    <Text>Còn lại: {this.props.soluong}</Text>
                </View>
            );
        }
    }

}

// define your styles
const styles = StyleSheet.create({
    vBox: {
        height: width / 3.37,
        width: width / 3.37,
        marginLeft: 10,
        marginTop: 10,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    stt: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#00579c',
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#00579c',
        paddingVertical: 2,
        paddingHorizontal: 8,
        fontSize: 15,
        marginBottom: 5
    }
});

//make this component available to the app
export default Box;
