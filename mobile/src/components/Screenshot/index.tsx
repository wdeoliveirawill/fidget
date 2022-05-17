import { Camera, Trash } from 'phosphor-react-native';
import React from 'react';
import { View, TouchableOpacity, Image, TouchableOpacityProps } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface ScreenshotProps extends TouchableOpacityProps{
  screenshot: string | null;
  onTakeShot: ()=>void;
  onRemoveShot: ()=>void;
}

export function Screenshot({ screenshot, onTakeShot, onRemoveShot, ...rest }: ScreenshotProps) {
  return (
    <TouchableOpacity 
      {...rest}
      style={styles.container}
      onPress={screenshot? onRemoveShot: onTakeShot}
      >
        {screenshot
        ?
        <View>
          <Image style={styles.image} source={{uri: screenshot}}></Image>
          <Trash 
            size={22}
            color={theme.colors.text_secondary}
            weight="fill"
            style={styles.removeIcon}
            ></Trash>
        </View>
        :
        <Camera 
          size={22}
          color={theme.colors.text_primary}
          weight="bold"          
          ></Camera>
        }

    </TouchableOpacity>
  );
}