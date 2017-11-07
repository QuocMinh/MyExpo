import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

class Card extends Component {
    render() {
        return (
            <View style={styles.cardContainer}>
                <TouchableOpacity onPress={() => this.props.navigate(this.props.screenName)}>
                    <Image 
                        style={styles.img} 
                        source={this.props.img} />
                </TouchableOpacity>
                <Text style={styles.nameCard}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    img: {
        height: 100,
        width: 100,
        backgroundColor: 'white',
    },
    nameCard: {
        fontSize: 16,
        marginTop: 8,
        color: '#00579c',
        textAlign: 'center'
    }
});

export default Card;
