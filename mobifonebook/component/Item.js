import React, { Component } from 'react';
import { 
    View, Text, StyleSheet,
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');

class Item extends Component {
    render() {
        if(Number(this.props.trangthai) === 1) {
            return (
                <View style={styles.container}>
                    <View style={styles.item}>
                        <View style={styles.numberContainer}>
                            <Text style={styles.number_ok}>{this.props.number}</Text>
                        </View>
                        <Text style={styles.phone}>{this.props.phone}</Text>
                        <Text style={styles.date}>{this.props.date}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.item}>
                        <View style={styles.numberContainer}>
                            <Text style={styles.number_none}>{this.props.number}</Text>
                        </View>
                        <Text style={styles.phone}>{this.props.phone}</Text>
                        <Text style={styles.date}>{this.props.date}</Text>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: width
    },
    item: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        flexDirection: 'row',
        
    },
    numberContainer: {
        flex: 0.2
    },
    number_none: {
        width: 22,
        height: 22,
        borderWidth: 1,
        borderRadius: 11,
        borderColor: '#00579c',
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#00579c',
        paddingTop: 1
    },
    number_ok: {
        width: 22,
        height: 22,
        borderWidth: 1,
        borderRadius: 11,
        borderColor: 'green',
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'green',
        paddingTop: 1
    },
    phone: {
        flex: 0.4,
        color: '#00579c'
    },
    date: {
        flex: 0.4,
        color: '#00579c'
    }
});

export default Item;
