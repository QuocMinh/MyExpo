import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class SimpleToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: true
        }
    }

    toggle() {
        this.setState({
            check: !this.state.check
        })
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.toggle()}>
                <View style={styles.container}>
                    <Text style={styles.text}>{this.state.check ? 'Hôm nay' : 'Tất cả'}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    text: {
        color: 'white'
    }
});

export default SimpleToggle;
