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
    Alert
} from 'react-native';

const { height, width } = Dimensions.get("window");


class Registry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneInput: "",
            serviceInput: ""
        }
    }

    isPhoneFormat(sdt) {
        var phone = sdt.trim();
        phone = phone.replace('(+84)', '0');
        phone = phone.replace('+84', '0');
        phone = phone.replace('0084', '0');
        phone = phone.replace(/ /g, '');
        var flag = false;

        if (phone != '') {
            var firstNumber = phone.substring(0, 2);
            if ((firstNumber == '09' || firstNumber == '08') && phone.length == 10) {
                if (phone.match(/^\d{10}/)) {
                    flag = true;
                }
            } else if (firstNumber == '01' && phone.length == 11) {
                if (phone.match(/^\d{11}/)) {
                    flag = true;
                }
            }
        }

        return flag;
    }

    registry() {
        var formData = new FormData();
        formData.append('sdt', this.state.phoneInput);
        formData.append('macv', this.state.serviceInput);

        if (this.isPhoneFormat(this.state.phoneInput)) {
            fetch('http://10.151.124.85:8080/api/book/new', {
                method: 'POST',
                body: formData
            })
                .then((response) => {
                    if (response._bodyText == 'OK!') {
                        Alert.alert('Đặt số thành công');

                        // Set null Text input
                        this.setState({ phoneInput: "", serviceInput: "" })
                    } else {
                        Alert.alert('LỖI!', 'Đã có lỗi xảy ra. Vui lòng thực hiện lại!');
                    }
                })
                .catch((err) => {
                    Alert.alert("LỖI!", "Vui lòng kiểm tra lại cấu hình Server. " + err);
                    console.log(err);
                })
        } else {
            Alert.alert("LỖI!", 'Vui lòng kiểm tra lại số điện thoại');
        }

        // Cap nhat thong tin quay 
        this.updateHelpdesk();
    }

    updateHelpdesk() {
        // Do something ... 
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: "#0084EB", textAlign: "center", marginVertical: 15, fontSize: 24 }}>ĐĂNG KÝ THÔNG TIN</Text>
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
                            underlineColorAndroid="#eee"
                            placeholder="Nhập số điện thoại"
                        />
                    </View>
                </View>
                <View style={styles.vInputControl}>
                    <View style={styles.vInputName}>
                        <Text style={styles.InputName}>Dịch vụ:</Text>
                    </View>
                    <View style={styles.vInput}>
                        <TextInput
                            onChangeText={(value) => this.setState({ serviceInput: value })}
                            value={this.state.serviceInput}
                            style={{ textAlign: "center", color: "#333", fontSize: 18 }}
                            underlineColorAndroid="#eee"
                            placeholder="Nhập mã dịch vụ"
                        />
                    </View>
                </View>
                <Button
                    large
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
        marginVertical: 10
    },
    btnDangKy: {
        backgroundColor: "#0084EB",
        ...Platform.select({
            ios: () => { marginTop: 8 },
        }),
        marginVertical: 10,
        borderRadius: 8
    },
    vInputControl: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#eee",
        marginTop: 10,
        marginHorizontal: 15,
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: "center"
    },
    vInput: {
        flex: 0.6,
        marginHorizontal: 8
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
