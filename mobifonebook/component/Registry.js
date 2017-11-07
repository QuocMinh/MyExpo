//import 
import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import Config from "../util/Config.js";
import Validate from '../util/Validate.js';
import ServerRequest from "../util/ServerRequest.js";
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

const { height, width } = Dimensions.get("window");
const Item = Picker.Item;
const servicesValue = [
    { serviceCode: 'cskh', serviceName: 'Cham soc khach hang' },
    { serviceCode: 'dkdv', serviceName: 'Dang ky dich vu' },
    { serviceCode: 'tthd', serviceName: 'Thanh toan hoa don' },
    { serviceCode: 'dntb', serviceName: 'Cham soc khach hang' },
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
        var formData = new FormData();
        formData.append('sdt', this.state.phoneInput);
        formData.append('macv', this.state.selected);

        if (Validate.isPhoneFormat(this.state.phoneInput)) {
            fetch(Config.SERVICE_HOST + ":" + Config.SERVICE_PORT + Config.PATH_NEW_CUSTOMER, {
                method: 'POST',
                body: formData
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);

                    Alert.alert(
                        "Đặt số thành công!",
                        `KHÁCH HÀNG: ${responseJson.sdt}\n\n-> STT: ${responseJson.stt}\n-> QUẦY SỐ: ${responseJson.soquay}` 
                    );

                    // Set null Text input
                    this.setState({ phoneInput: '', selected: 'cskh' })
                })
                .catch((err) => {
                    Alert.alert("LỖI!", "Vui lòng kiểm tra lại cấu hình Server. " + err);
                    console.log(err);
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
                            {
                                servicesValue.map(
                                    (service) => {
                                        console.log('<Item value=' + service.serviceCode + ' label=' + service.serviceName + ' />');
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
