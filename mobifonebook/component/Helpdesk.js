//import liraries
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    ListView
} from 'react-native';

import Box from './Box.js';

const { height, width } = Dimensions.get("window");
const dataArray = [
    { soquay: '1', stt: '1', trangthai: '0' },
    { soquay: '2', stt: '2', trangthai: '0' },
    { soquay: '3', stt: '3', trangthai: '0' },
    { soquay: '4', stt: '4', trangthai: '0' },
    { soquay: '5', stt: '5', trangthai: '0' },
    { soquay: '6', stt: '6', trangthai: '0' },
]

// create a component
class Helpdesk extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(dataArray)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.vTitle}>
                    <Text style={styles.title}>TRẠNG THÁI QUẦY</Text>
                </View>
                <View style={styles.vList}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={ (r) =>
                            <Box 
                                soquay={r.soquay}
                                stt={r.stt}
                                trangthai={r.trangthai}
                            />
                        }
                        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                    />
                </View>
            </View>
        );
    }

    loadHelpdesk() {
        fetch("http://10.151.124.85:8080/api/book/get")
            .then((response) => response.json())
            .then((responseJson) => {
                dataArray = [];
                dataArray = dataArray.concat(responseJson);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(dataArray),
                });
            })
            .catch(err => {
                Alert.alert(
                    "LỖI!",
                    err
                )
            });
    }

    componentDidMount() {
        this.loadHelpdesk();
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#CCE0EF',
        height: 300
    },
    vTitle: {
        backgroundColor: "#0063B0",
        height: 40,
        width: width,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: "white",
        fontSize: 20
    },
    vList: {
        flex: 1,
        width: width,
        alignItems: "center",
        justifyContent: "center"
    },
});

//make this component available to the app
export default Helpdesk;
