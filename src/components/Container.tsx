
import { StyleSheet, StatusBar, SafeAreaView, View } from "react-native";
import React from "react";
import { PRIMARY_COLOR } from "../constants";

interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <>
            <View style={styles.container}>

                <SafeAreaView style={styles.safeArea}>
                    <StatusBar barStyle="dark-content" backgroundColor={PRIMARY_COLOR} />
                    {children}
                </SafeAreaView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 25,
        paddingTop: 45,
        backgroundColor: '#fff',
    },
    safeArea: {
        flex: 1,
    },
});