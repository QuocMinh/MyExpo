import Validate     from '../util/Validate.js';
import Config       from "../util/Config.js";
import { Alert }    from 'react-native';

module.exports = {
    registry: (sdt, macv) => {
        var formData = new FormData();
        formData.append('sdt', sdt);
        formData.append('macv', macv);

        var flag = false;

        if (Validate.isPhoneFormat(sdt)) {
            fetch(Config.SERVICE_HOST + ":" + Config.SERVICE_PORT + Config.PATH_NEW_CUSTOMER, {
                method: 'POST',
                body: formData
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);

                    Alert.alert(
                        "Đặt số thành công!",
                        `KHÁCH HÀNG: ${responseJson.sdt}\n\n-> STT: ${responseJson.stt}\n`
                    );

                    return true;
                })
                .catch((err) => {
                    Alert.alert("LỖI!", "Vui lòng kiểm tra lại cấu hình Server. " + err);
                    console.log(err);
                })
        } else {
            Alert.alert("LỖI!", 'Vui lòng kiểm tra lại số điện thoại');
        }

        return false;
    },

    // Dang lam
    loadCustomer() {
        var customer;

        fetch(Config.SERVICE_HOST + ":" + Config.SERVICE_PORT + Config.PATH_GET_CUSTOMER_BY_HELPDESDK + this.props.soquay)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("LOAD CUSTOMER");
                console.log(responseJson);
                customer = responseJson;
            })
            .catch(err => {
                console.log(err);
            });

        console.log('-- load customer');

        return customer;
    }
}