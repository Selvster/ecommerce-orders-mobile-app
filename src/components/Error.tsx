
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';

export default function Error({error} : {error : string}) {
    return (
        <View style={styles.errorContainer}>
           <AlertTriangle size={24} color="#721c24" /> 
            <Text style={styles.errorText}>{error}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    errorContainer: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#f8d7da',
        borderRadius: 10,
        margin: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#721c24',
        fontFamily: 'Raleway-Bold',
        marginLeft: 10,
    },
});