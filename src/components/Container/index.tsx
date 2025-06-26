// src/components/Container/index.tsx
import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface ContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // パディングを指定できるように
  margin?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';   // マージンを指定できるように
  flex?: number; // flexプロパティを指定できるように
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  backgroundColor?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  padding,
  margin,
  flex,
  alignItems,
  justifyContent,
  backgroundColor,
}) => {
  const theme = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      flex: flex,
      alignItems: alignItems,
      justifyContent: justifyContent,
      backgroundColor: backgroundColor,
    },
  });

  return (
    <View style={[dynamicStyles.container, style]}>
      {children}
    </View>
  );
};