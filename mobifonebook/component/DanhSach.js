import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, ListView, 
    Dimensions, AsyncStorage, Picker, 
    Alert, TextInput,
    TouchableOpacity,
    RefreshControl,
    ToastAndroid 
} from 'react-native';
import { 
    SearchBar,
    Icon,
    CheckBox
} from 'react-native-elements';

import Item         from './Item.js';
import SimpleToggle from './SimpleToggle.js';

const { height, width } = Dimensions.get('window');
const ItemPicker = Picker.Item;

var mang = [];

class DanhSach extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            serverAddr: 'locahost',
            serverPort: '8080',
            txtSearch: '',
            refreshing: false,
            onSearching: false,
            currNum: 0,
            isNullData: false
        }
    }

    static navigationOptions = {
        title           : 'Danh sách book số',
        headerStyle     : { backgroundColor: '#0084EB' },
        headerTintColor : 'white'
    }

    fectchingData = async() => {
        await AsyncStorage.getItem("@Config:serverAddr").then(value => {
            if(value !== null) {
                const serverAddr = value;
                AsyncStorage.getItem("@Config:serverPort").then(value => {
                    if(value !== null) {
                        const serverPort = value;

                        this.setState({
                            serverAddr: serverAddr,
                            serverPort: serverPort
                        });

                        fetch("http://" + this.state.serverAddr + ":" + this.state.serverPort + "/datso/danhsach")
                        .then((response) => response.json())
                        .then((responseJson) => {
                            mang = [];
                            mang = mang.concat(responseJson);
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(mang),
                                currNum: responseJson[responseJson.length - 1].id
                            });
                            console.log(this.state.currNum);
                        })
                        .catch(err => {
                            Alert.alert (
                                "LỖI!",
                                "Vui lòng kiểm tra lại cấu hình Server. " + err,
                                [ 
                                    { 
                                        text: 'Đi đến cài đặt', 
                                        onPress: () => this.props.navigation.navigate('ServerConfig')
                                    } 
                                ]
                            )
                            console.log(err);
                        });

                        console.log(this.state.dataSource);
                        console.log(this.state.serverAddr);
                        console.log(this.state.serverPort);
                        
                    }
                })
            };
        });
        
    }

    componentDidMount() {
        this.fectchingData();
    }

    feactAllData() {
        console.log('feactAllData');

        fetch("http://" + this.state.serverAddr + ":" + this.state.serverPort + "/datso/danhsach/")
        .then((response) => response.json())
        .then((responseJson) => {
            mang = [];
            mang = mang.concat(responseJson);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(mang),
                isNullData: false,
                currNum: responseJson[responseJson.length - 1].id,
                onSearching: false,
            });
            
            console.log(this.state.currNum);
        })
        .catch(err => {
            Alert.alert (
                "LỖI!",
                "Vui lòng kiểm tra lại cấu hình Server. " + err,
                [ 
                    { 
                        text: 'Đi đến cài đặt', 
                        onPress: () => this.props.navigation.navigate('ServerConfig')
                    } 
                ]
            )
            console.log(err);
        });
    }

    feactDataByPhone(phone) {
        fetch("http://" + this.state.serverAddr + ":" + this.state.serverPort + "/datso/searching/" + phone)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseJson)
            });
        })
        .catch(err => {
            Alert.alert (
                "LỖI!",
                "Vui lòng kiểm tra lại cấu hình Server. " + err,
                [ 
                    { 
                        text: 'Đi đến cài đặt', 
                        onPress: () => this.props.navigation.navigate('ServerConfig')
                    } 
                ]
            )
            console.log(err);
        });
    }

    searching(phoneX) {
        var phone = phoneX.trim();

        if (phone != '') {
            // Set searching is true
            this.setState({ onSearching: true });

            console.log("*** " + phone);

            var firstNumber = phone.substring(0, 2);
            if(firstNumber === '01') {
                if (phone.length === 4 || phone.length === 11) {
                    console.log("OK: " + phone);

                    this.feactDataByPhone(phone);
                }
            } else if (firstNumber === '09' || firstNumber === '08') {
                if (phone.length === 3 || phone.length === 10) {
                    console.log("OK: " + phone);

                    this.feactDataByPhone(phone);
                }
            }
            
        } else {
            // Set searching is false
            this.setState({ onSearching: false });

            this.feactAllData();
        }
    }

    loadNewData() {
        if(this.state.txtSearch === '' || this.state.txtSearch === null) {
            if (!this.state.onSearching || this.state.currNum !== 0) {
                console.log('loadNewData');
                if (!this.state.isNullData) {
                    fetch("http://" + this.state.serverAddr + ":" + this.state.serverPort + "/datso/loadnew/" + this.state.currNum)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            mang = mang.concat(responseJson);
                            var maxId = responseJson[responseJson.length - 1].id;
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(mang),
                                currNum: responseJson[responseJson.length - 1].id,
                                isNullData: maxId < 20 ? true : false
                            });

                            console.log(this.state.currNum);
                        })
                        .catch(err => {
                            Alert.alert(
                                "LỖI!",
                                "Vui lòng kiểm tra lại cấu hình Server. " + err,
                                [
                                    {
                                        text: 'Đi đến cài đặt',
                                        onPress: () => this.props.navigation.navigate('ServerConfig')
                                    }
                                ]
                            )
                            console.log(err);
                        });
                } else {
                    ToastAndroid.show('Đã hết dữ liệu', ToastAndroid.SHORT);
                }
            }
        }
        
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.number}>STT</Text>
                    <Text style={styles.phone}>Số điện thoại</Text>
                    <Text style={styles.date}>Ngày đặt</Text>
                </View>
                
                {/* <Item number='1' phone='01239496986' date='28/10/1995' trangthai='1' /> */}

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(r) =>
                        <Item number={r.stt} phone={r.sdt} date={r.ngaybd} trangthai={r.trangthai} />
                    }
                    enableEmptySections
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {}}
                        />
                    }
                    onEndReached={() => this.loadNewData()}
                    onEndReachedThreshold={5}
                    initialListSize={20}
                />
                <View style={styles.footer}>
                    <View style={{ flex: 1 }}>
                        <SearchBar
                            lightTheme
                            icon={{ color: '#333', name: 'search' }}
                            placeholder='Tìm kiếm theo số điện thoại'
                            inputStyle={{ color: '#333', backgroundColor: '#F4F4F4' }}
                            containerStyle={{ backgroundColor: '#E6E6E6', borderTopWidth: 1, borderTopColor: '#ccc' }}
                            round={true}
                            onChangeText={(phone) => {
                                this.setState({ txtSearch: phone });
                                this.searching(phone);
                            }}
                            value={this.state.txtSearch}
                            clearIcon={{ color: '#333', name: 'clear' }} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    header: {
        backgroundColor: '#1E8BC3',
        width: width,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    number: {
        flex: 0.2,
        color: 'white'
    },
    phone: {
        flex: 0.4,
        color: 'white'
    },
    date: {
        flex: 0.4,
        color: 'white'
    },
    filterView: {
        flexDirection: 'row'
    },
    footer: {
        flexDirection: 'row',
        width: width,
        backgroundColor: '#ccc',
    }
});

export default DanhSach;
