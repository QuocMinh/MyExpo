import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Toa } from 'react-native';

import Color    from "../util/Color.js";
import Config   from "../util/Config.js";

const { height, width } = Dimensions.get('window');

class Box extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("BOX - ID: "        + this.props.id);
        console.log("BOX - SOQUAY: "    + this.props.soquay);
        console.log("BOX - STT: "       + this.props.stt);
        console.log("BOX - TRANGTHAI: " + this.props.trangthai);

        return (
            // <TouchableOpacity
            //     onLongPress={() => this.updateStatus()}
            // >
                <View style={[styles.vBox, this.colorStatus()]}>
                    <Text style={{ fontSize: 18, marginBottom: 5, color: "#00579c", fontWeight: "bold" }}>QUẦY {this.props.soquay}</Text>
                    <Text style={styles.stt}>STT: {this.props.stt}</Text>
                    <Text>{this.checkStatus()}</Text>
                </View>
            // </TouchableOpacity>
        );
    }

    updateStatus() {
        if(this.props.trangthai === 0) {
            console.log(console.log("BOX - UPDATE_STATUS !!"));
            this.props.updateHelpdeskStatus(this.props.id, this.props.soquay);
        }
    }

    checkStatus() {
        return this.props.trangthai === 1 ? "Đang xử lý" : "Đang chờ ...";
    }

    colorStatus() {
        return this.props.trangthai === 1 ? 
            { backgroundColor: Color.HELPDESK_HANDLING, borderColor: "#FF931E" } :
            { backgroundColor: Color.HELPDESK_WAIT,     borderColor: "#3FA9F5" }
    }

}

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

export default Box;


// loadCustomer() {
//     fetch(Config.SERVICE_HOST + ":" + Config.SERVICE_PORT + Config.PATH_GET_CUSTOMER_BY_HELPDESDK + this.state.soquay)
//         .then((response) => response.json())
//         .then((responseJson) => {
//             console.log("LOAD CUSTOMER");
//             console.log(responseJson);
//             this.setState({
//                 customer: responseJson
//             });
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     console.log('-- load customer');
// }

// componentDidMount() {
//     // this.loadCustomer();
// }
