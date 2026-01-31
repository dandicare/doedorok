import React from 'react';

import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

type Props = {
    onPress?: () => void;
};

export function HeaderBackButton({ onPress }: Props) {
    const color = useThemeColor({ light: '#11181C', dark: '#ECEDEE' }, 'text');

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel="뒤로가기"
            hitSlop={10}
            style={styles.button}
            onPress={() => (onPress ? onPress() : router.back())}
        >
            <IconSymbol name="chevron.left" size={26} color={color} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 4,
        paddingVertical: 6,
    },
});

