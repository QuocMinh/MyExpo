import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, 
    TextInput, Picker, TouchableOpacity,  
    ScrollView,
    Alert, AsyncStorage
} from 'react-native';

const Item = Picker.Item;

class BookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sdt : '',
            macv: 'cskh',
            serverAddr: 'localhost',
            serverPort: '8080'
        }
    }

    updateSelectedValue = (selected) => {
        this.setState({
            selected: selected
        });
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

    // ------------------- Chua Test ---------------------------
    booking() {
        var formData = new FormData();
        formData.append('sdt',  this.state.sdt);
        formData.append('macv', this.state.macv);

        if(this.isPhoneFormat(this.state.sdt)) {
            fetch('http://' + this.state.serverAddr + ':' + this.state.serverPort + '/datso', {
                method: 'POST',
                body: formData
            })
            .then((response) => {
                if(response._bodyText == 'OK!') {
                    Alert.alert('Đặt số thành công');

                    // Set null Text input
                    this.setState({ sdt: "" })
                } else {
                    Alert.alert('Đã có lỗi xảy ra. Vui lòng thực hiện lại!');
                }
            })
            .catch((err) => {
                Alert.alert("LỖI!", "Vui lòng kiểm tra lại cấu hình Server. " + err);
                console.log(err);
            })
        } else {
            Alert.alert('Vui lòng kiểm tra lại số điện thoại');
        }
    }

    componentDidMount() {
        AsyncStorage.getItem("@Config:serverAddr").then((value) => {
            if(value !== null)
                this.setState({"serverAddr": value});
        }).done();
        AsyncStorage.getItem("@Config:serverPort").then((value) => {
            if(value !== null)
                this.setState({"serverPort": value});
        }).done();
    }

    render() {
        return (
            <View style={styles.container}
                keyboardDismissMode='none'>
                <Text style={styles.title}>
                    Nhập số điện thoại
                </Text>
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='white'
                    placeholder="Số điện thoại"
                    placeholderTextColor='#d7d7d7'
                    keyboardType='phone-pad'
                    onChangeText={sdt => this.setState({sdt: sdt})}
                    value={this.state.sdt}/>
                <Text style={styles.title}>
                    Chọn dịch vụ
                </Text>
                <View style={styles.selectListView}>
                    <Picker
                        style={styles.selectList}
                        prompt='Chọn dịch vụ'
                        selectedValue={this.state.macv}
                        onValueChange={selected => this.setState({macv: selected})}>
                        <Item label="Hỗ trợ khách hàng"  value="cskh" />
                        <Item label="Đăng ký dịch vụ"    value="dkdv" />
                        <Item label="Thanh toán hóa đơn" value="tthd" />
                    </Picker>
                </View>
                <TouchableOpacity onPress={this.booking.bind(this)}>
                    <Text style={styles.btnBook}>
                        Đặt số
                    </Text>
                </TouchableOpacity>
                {/* <View>
                    <Text>SDT: {this.state.sdt}</Text>
                    <Text>MACV: {this.state.macv}</Text>
                    <Text>http://{this.state.serverAddr}:{this.state.serverPort}/datso</Text>
                </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 45,
        marginBottom: 15,
        fontSize: 16,
        // color: '#0084EB',
        borderColor: '#0084EB',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 3
    },
    selectList: {
        color: '#333',
    },
    selectListView: {
        borderColor: '#0084EB',
        borderWidth: 1,
        height: 45,
        justifyContent: 'center',
        marginBottom: 15,
        borderRadius: 3
    },
    title: {
        marginBottom: 7,
        color: '#00579c'
    }, 
    btnBook: {
        backgroundColor: '#0084EB',
        textAlign: 'center',
        padding: 10,
        color: 'white',
        fontSize: 18,
        borderRadius: 3
    }
});

export default BookForm;
