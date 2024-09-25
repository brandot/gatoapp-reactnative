import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';

const SquareComponent = ({label, onSelected}) => {
  return (
    <Pressable onPress={onSelected} style={({pressed}) => [styles.square, pressed && styles.squarePressed]}>
        <Text style={styles.label}>{label}</Text>
    </Pressable>
  )
};

const styles = StyleSheet.create({
    square: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 90,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.borderColor,
        backgroundColor: Colors.primaryColor,
        margin: 5
    },
    squarePressed: {
        backgroundColor: Colors.secondaryColor
    },
    label: {
        fontSize: 70,
        fontWeight: 'bold',
        color: Colors.textColor
    }
});

export default SquareComponent