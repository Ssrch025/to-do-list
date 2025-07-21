import React from 'react';

import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native';

import { Colors } from '@/constants/Colors';

const ActivityLoading = () => (
    <View style={[styles.container]}>
        <ActivityIndicator color={Colors.custom.primary} size="large" />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default ActivityLoading;