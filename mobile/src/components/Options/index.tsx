import React from 'react';
import { Text, View } from 'react-native';
import { Copyright } from '../Copyright';
import {feedbackTypes} from '../../utils/feedbackTypes';

import { styles } from './styles';
import { Option } from '../Option';
import { FeedbackType } from '../Widget';

interface OptionsProps {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
}

export function Options({ onFeedbackTypeChanged }: OptionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Deixe seu feedback</Text>
      <View style={styles.options}>
        {
          Object.entries(feedbackTypes).map(([key, value]) => (
            <Option key={key} 
            image={value.image} 
            title={value.title} 
            onPress={()=>onFeedbackTypeChanged(key as FeedbackType)}>              
            </Option>
          ))
        }
      </View>
      <Copyright></Copyright>
    </View>
  );
}