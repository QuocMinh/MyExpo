import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import BookForm from './BookForm.js'

const { height } = Dimensions.get('window');

class BookSo extends Component {
    static navigationOptions = {
        title           : 'Book Số',
        headerStyle     : { backgroundColor: '#0084EB' },
        headerTintColor : 'white'
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('./images/Logo1.png')} />
                    <Text style={styles.title}> Ứng dụng đặt số của mobifone </Text>
                </View>
                <View style={styles.formConatiner}>
                    <BookForm />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        height: height / 5,
        marginTop: 15
    },
    title: {
        color: '#00579c',
        marginTop: 10,
        fontSize: 20
    }
});

export default BookSo;
