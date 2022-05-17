import React from 'react';
import { Image, ImageProps, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';


import { styles } from './styles';

interface OptionProps extends TouchableOpacityProps{
  title: string;
  image: ImageProps
}

export function Option({ title, image, ...rest }: OptionProps) {
  return (
    <TouchableOpacity style={styles.container}
    {...rest}
    >
      <Image source={image} style={styles.image}></Image>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}