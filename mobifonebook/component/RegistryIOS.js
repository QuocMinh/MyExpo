import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import Config from "../util/Config.js";
import Validate from '../util/Validate.js';
import {
    View,
    StyleSheet,
    Platform,
    Text,
    TextInput,
    Dimensions,
    Alert,
    PickerIOS,
    TouchableOpacity
} from 'react-native';

const { height, width } = Dimensions.get("window");
const servicesValue = [
    { macv: 'dntb', mota: 'Đấu nối thuê bao'    },
    { macv: 'dkdv', mota: 'Đăng ký dịch vụ'     },
    { macv: 'tthd', mota: 'Thanh toán hóa đơn'  },
    { macv: 'cskh', mota: 'Chăm sóc khách hàng' },
    { macv: 'htkt', mota: 'Hỗ trợ kỷ thuật'     },
];
const Item = PickerIOS.Item;

class RegistryIOS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneInput: "",
            isSelectOn: false,
            selected: 'cskh'
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

    renderServiceName(macv) {
        var obj = servicesValue.find(function (obj) { return obj.macv === macv; });
        return obj.mota;
    }

    formatPicker() {
        if(this.state.isSelectOn) {
            return {
                borderColor: '#339DEF',
                marginTop: 0,
                borderWidth: 1,
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.vHeader}>
                    <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>ĐĂNG KÝ THÔNG TIN</Text>
                </View>

                {/* Phone input will hidden when Picker is selecting : START */}
                {
                    !this.state.isSelectOn &&
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
                                returnKeyType="go"
                                clearButtonMode='always'
                                enablesReturnKeyAutomatically={true}
                                blurOnSubmit={true}
                            />
                        </View>
                    </View>
                }
                {/* Phone input will hidden when Picker is selecting : STOP */}

                {/* Picker Contain : START */}
                <View style={[styles.vPickerControl, this.formatPicker()]}>
                    <TouchableOpacity
                        style={styles.vPickerLeft}
                        onPress={() => this.setState({ isSelectOn: true })}
                    >
                        <View style={styles.vInputNamePicker}>
                            <Text style={styles.InputName}>Dịch vụ:</Text>
                        </View>
                        <View style={styles.vInputPicker}>
                            <Text style={{ fontSize: 18, color: "#444" }}>{this.renderServiceName(this.state.selected)}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnDone}
                        onPress={() => this.setState({ isSelectOn: false })}
                    >
                        <Text style={{color: 'white', fontSize: 14}}>Done</Text>
                    </TouchableOpacity>
                </View>
                {/* Picker Contain : END */}

                {/* Picker on enable : START */}
                {
                    this.state.isSelectOn &&
                    <View style={styles.vPicker}>
                        <PickerIOS
                            mode='dropdown'
                            selectedValue={this.state.selected}
                            onValueChange={(value) => this.setState({ selected: value })}
                        >
                            { /* Dung map() render ra cac Item dich vu */
                                servicesValue.map(
                                    (service) => {
                                        return <Item value={service.macv} label={service.mota} key={service.macv} />
                                    }
                                )
                            }
                        </PickerIOS>
                    </View>
                }
                {/* Picker on enable : END */}
                {
                    !this.state.isSelectOn &&
                    <Button
                        small
                        title="ĐĂNG KÝ"
                        buttonStyle={styles.btnDangKy}
                        onPress={() => this.registry()}
                    />
                }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingBottom: 10, backgroundColor: '#EFEFEF' },
    vHeader: {
        backgroundColor: '#0063B0',
        paddingVertical: 10,
        shadowColor: '#111',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 10
    },
    btnDangKy: {
        backgroundColor: "#0084EB",
        ...Platform.select({
            ios: () => { marginTop: 8 },
        }),
        marginVertical: 15,
        height: 55,
        padding: 0
    },
    vInputControl: {
        flexDirection: "row",
        backgroundColor: "#ddd",
        marginTop: 10,
        marginHorizontal: 15,
        height: 55,
        paddingHorizontal: 15,
        alignItems: "center"
    },
    vInput:         { flex: 0.6, marginHorizontal: 8 },

    vPickerControl: { flexDirection: "row", marginTop: 10, marginHorizontal: 15},
    vPickerLeft: { backgroundColor: '#ddd', flex: 0.85, height: 55, paddingLeft: 15, alignItems: "center", justifyContent: 'center', flexDirection: 'row' },
    vPicker: { backgroundColor: '#DEEFFD', marginHorizontal: 15, paddingTop: 0 },
    vInputPicker: { flex: 0.7 },
    vInputNamePicker: { flex: 0.3 },
    btnDone: { flex: 0.15, backgroundColor: "#339DEF", padding: 5, height: 55, justifyContent: 'center', alignItems: 'center' },

    vInputName:     { flex: 0.4 },
    InputName:      { fontSize: 18, color: "#333" }
});

export default RegistryIOS;
