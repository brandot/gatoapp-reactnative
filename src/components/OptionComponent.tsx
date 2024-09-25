import { Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

const OptionComponent = ({ onSelected, label, isSelected }) => {
    return (
        <Pressable
            onPress={onSelected}
            style={({ pressed }) => [
                styles.square,
                isSelected ? styles.squarePressed : styles.square,
                pressed && styles.squarePressed
            ]}
        >
            <Text style={isSelected ? [styles.label, styles.labelPressed] : styles.label}>{label}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    square: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 150,
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 15,
        borderColor: Colors.buttonPrimaryColor,
        backgroundColor: Colors.primaryColor,
        margin: 15
    },
    label: {
        fontSize: 100,
        fontWeight: 'bold',
        color: Colors.buttonPrimaryColor,
    },
    squarePressed: {
        backgroundColor: Colors.buttonSecondaryColor,
    },
    labelPressed: {
        color: Colors.primaryColor,
    },
});

export default OptionComponent;
