
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { PRIMARY_COLOR } from '../constants';

export default function LoadingIndicator() {

    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});