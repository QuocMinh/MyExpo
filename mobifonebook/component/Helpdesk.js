import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { 
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    ListView,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import { Audio } from "expo";

import Box       from './Box.js';
import Config    from "../util/Config.js";
import AudioLink from "../util/AudioLink.js";

const { width } = Dimensions.get("window");

var dataArray = [
    { soquay: 1, trangthai: 0 },
    { soquay: 2, trangthai: 0 },
    { soquay: 3, trangthai: 0 },
    { soquay: 4, trangthai: 0 },
    { soquay: 5, trangthai: 0 },
    { soquay: 6, trangthai: 0 }
];

class Helpdesk extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(dataArray),
            refreshing: true,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.vTitle}>
                    <View style={styles.vTitleText}>
                        <Text style={styles.title}>TRẠNG THÁI QUẦY</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.vTitleIcon}
                        onPress={() => {
                            this.setState({ refreshing: true });
                            this.loadHelpdesk();
                        }}
                    >
                        <Icon color="white" name="refresh" />
                    </TouchableOpacity>
                </View>
                <View style={styles.vList}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={ (r) =>
                            <TouchableOpacity 
                                onLongPress={() => { this.updateHelpdeskStatus(r.id, r.soquay) }}
                                onPress={() => this.playSound(r.stt, r.soquay)}
                            >
                                <Box 
                                    soquay={r.soquay} 
                                    trangthai={r.trangthai} 
                                    stt={r.stt} 
                                    id={r.id} 
                                    updateHelpdeskStatus={this.updateHelpdeskStatus}
                                />
                            </TouchableOpacity>
                        }
                        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                        enableEmptySections
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => { this.loadHelpdesk() }}
                            />
                        }
                    />
                </View>
            </View>
        );
    }

    playSound = async(stt, soquay) => {
        console.log("---- PLAY SOUND !!");
        if(stt > 0) {
            var sound1      = new Audio.Sound();
            var sound2      = new Audio.Sound();
            var soundStt    = new Audio.Sound();
            var soundQuay   = new Audio.Sound();

            try {
                // Play sound 1
                await sound1    .loadAsync(require("../assets/sounds/read-1.mp3"));
                await sound2    .loadAsync(require("../assets/sounds/read-2.mp3"));
                await soundStt  .loadAsync(AudioLink[stt - 1]);
                await soundQuay .loadAsync(AudioLink[soquay - 1]);

                await sound1.playAsync();
                setTimeout(async() =>  { await soundStt   .playAsync(); }, 1850);
                setTimeout(async() =>  { await sound2     .playAsync(); }, 2700);
                setTimeout(async() =>  { await soundQuay  .playAsync(); }, 3700);

                console.log("Phai play chu!!!!!");
            } catch (error) {
                console.log("ERROR: ");
                console.log(error);
            }
        } else {
            var soundDefault = new Audio.Sound();
            try {
                // Play sound 1
                await soundDefault.loadAsync(require("../assets/sounds/default-voice.mp3"));
                await soundDefault.playAsync();
            } catch (error) {
                console.log("ERROR: ");
                console.log(error);
            }
            console.log("Khong hop le!");
        }
        
    }

    updateHelpdeskStatus(id, soquay) {
        console.log(console.log("HELPDESK - UPDATE_HELPDESK_STATUS !!"));

        var formData = new FormData();
        formData.append('id', id);
        formData.append('soquay', soquay);
        formData.append('trangthai', 1);

        fetch(Config.SERVICE_HOST + ":" + Config.SERVICE_PORT + Config.PATH_UPDATE_HELPDESK_STATUS, {
            method: "POST",
            body: formData
        })
            .then((response) => {
                console.log(response.json);
                if (response._bodyText == 'OK!') {
                    // Reload Heldesk
                    this.loadHelpdesk();
                } else {
                    console.log("HELPDESK - UPDATE_HELPDESK_STATUS - FAILED!");
                    console.log(response);
                }
            })
            .catch((err) => console.log(err));
    }

    loadHelpdesk() {
        console.log('-- load helpdesk');
        fetch(Config.SERVICE_HOST + ":" + Config.SERVICE_PORT + Config.PATH_GET_HELPDESK_AND_CUSTOMER)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.length > 0) {
                    dataArray = [];
                    console.log("OK!");
                }
                dataArray = dataArray.concat(responseJson);
                console.log("HELPDESK - DATA ARRAY: ");
                console.log(dataArray);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(dataArray),
                    refreshing: false,
                });
            })
            .catch(err => {
                console.log(err)
                this.setState({ refreshing: false });
            });
    }

    componentDidMount() {
        this.loadHelpdesk();
    }
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, alignItems: 'center', backgroundColor: '#CCE0EF' },
    vTitle: {
        backgroundColor: "#0063B0",
        height: 40,
        width: width,
        flexDirection: 'row',
        shadowColor: '#111',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
    },
    vTitleText: { flex: 1, justifyContent: "center", alignItems: "center", paddingLeft: (width / 9) + 5 },
    vTitleIcon: { justifyContent: "center", alignItems: "center", backgroundColor: '#3480BF', width: width / 9, marginRight: 5 },
    title: { color: "white", fontSize: 20 },
    vList: { flex: 1, width: width, alignItems: "center", justifyContent: "center" },
});

export default Helpdesk;
