//import 
import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { 
    View, 
    StyleSheet,
    Platform,
    Text,
    TextInput,
    Dimensions,
    Alert,
    Picker
} from 'react-native';

import Config           from "../util/Config.js";
import Validate         from '../util/Validate.js';
import ServerRequest    from "../util/ServerRequest";
import { NewBooking }   from "../util/Booking";

const { height, width } = Dimensions.get("window");
const Item = Picker.Item;
const servicesValue = [
    { serviceCode: 'cskh', serviceName: 'Chăm sóc khách hàng'   },
    { serviceCode: 'dkdv', serviceName: 'Đăng ký dịch vụ'       },
    { serviceCode: 'tthd', serviceName: 'Thanh toán hóa đơn'    },
    { serviceCode: 'dntb', serviceName: 'Đấu nối thuê bao'      },
    { serviceCode: 'htkt', serviceName: 'Hỗ trợ kỷ thuật'       },
];

class Registry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneInput: "",
            selected: "cskh",
        }
    }

    registry() {
        if (Validate.isPhoneFormat(this.state.phoneInput)) {
            fetch(Config.SERVICE_HOST + ":" + Config.SERVICE_PORT + Config.PATH_NEW_CUSTOMER, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: NewBooking(this.state.phoneInput, this.state.selected)
            })
                .then(response => {
                    console.log("===== registry", response);

                    if (response._bodyText === '"booked"') {
                        Alert.alert(
                            "Đặt số Không thành công!",
                            `Khách hàng này đã đặt số trước đó không lâu.`
                        );
                    } else {
                        let responseText = JSON.parse(response._bodyText);
                        let responseJson = JSON.parse(responseText);

                        Alert.alert(
                            "Đặt số thành công!",
                            `KHÁCH HÀNG: ${responseJson.sdt}\n\n-> STT: ${responseJson.stt}\n`
                        );
                    } 
                }) 
                .catch((err) => {
                    Alert.alert("LỖI!", err);
                })
        } else {
            Alert.alert("LỖI!", 'Vui lòng kiểm tra lại số điện thoại');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.vHeader}>
                    <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>ĐĂNG KÝ THÔNG TIN</Text>
                </View>
                <View style={styles.vInputControl}>
                    <View style={styles.vInputName}>
                        <Text style={styles.InputName}>Số điện thoại:</Text>
                    </View>
                    <View style={styles.vInput}>
                        <TextInput
                            onChangeText={(value) => this.setState({ phoneInput: value })}
                            value={this.state.phoneInput}
                            style={{ textAlign: "center", color: "#333", fontSize: 18 }}
                            keyboardType='phone-pad'
                            underlineColorAndroid="#ddd"
                            placeholder="Nhập số điện thoại"
                            returnKeyType="next"
                        />
                    </View>
                </View>
                <View style={styles.vInputControl}>
                    <View style={styles.vInputName}>
                        <Text style={styles.InputName}>Dịch vụ:</Text>
                    </View>
                    <View style={styles.vPicker}>
                        <Picker
                            mode='dropdown'
                            selectedValue={this.state.selected}
                            onValueChange={(value) => this.setState({ selected: value })}
                        >
                            { /* Dung map() render ra cac Item dich vu */
                                servicesValue.map(
                                    (service) => {
                                        // console.log('<Item value=' + service.serviceCode + ' label=' + service.serviceName + ' />');
                                        return <Item value={service.serviceCode} label={service.serviceName} key={service.serviceCode} />
                                    }
                                )
                            }
                        </Picker>
                    </View>
                </View>
                <Button
                    small
                    title="ĐĂNG KÝ"
                    buttonStyle={ styles.btnDangKy }
                    onPress={() => this.registry()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10,
        backgroundColor: '#EFEFEF'
    },
    vHeader: {
        backgroundColor: '#0063B0',
        paddingVertical: 8,
        marginBottom: 10
    },
    btnDangKy: {
        backgroundColor: "#0084EB",
        marginVertical: 10,
    },
    vInputControl: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#ddd",
        marginTop: 10,
        marginHorizontal: 15,
        height: 50,
        paddingHorizontal: 15,
        alignItems: "center"
    },
    vInput: {
        flex: 0.6,
        marginHorizontal: 8
    },
    vPicker: {
        flex: 0.6,
    },
    vInputName: {
        flex: 0.4
    },
    InputName: {
        fontSize: 18,
        color: "#333"
    }
});

export default Registry;
