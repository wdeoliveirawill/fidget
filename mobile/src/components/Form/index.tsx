import { ArrowLeft } from 'phosphor-react-native';
import React from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { Screenshot } from '../Screenshot';
import { FeedbackType } from '../Widget';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { styles } from './styles';
import { api } from '../../libs/api';

interface FormProps {
  feedbackType:FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: FormProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType]; 
  const [screenshot, setScreenshot] = React.useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = React.useState<boolean>(false);
  const [comment, setComment] = React.useState<string>('');

  function handleScreenshot(){
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
    .then(uri => setScreenshot(uri))
    .catch(err => console.log(err));
  }
  function handleScreenshotRemove(){
    setScreenshot(null); 

  }
  async function handleSendFeedback(){
    if(isSendingFeedback){
      return;
    }
    try{
      setIsSendingFeedback(true);
      const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: FileSystem.EncodingType.Base64}); 
      console.log(screenshotBase64)
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: 'data:image/png;base64, '+ screenshotBase64,
        comment,
      })
      console.log("post done")
      onFeedbackSent();

    }catch(err){
      console.log(err);
    }
    finally{
      setIsSendingFeedback(false);
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft size={24} weight="bold" color={theme.colors.text_secondary}></ArrowLeft>
        </TouchableOpacity>
        <View style={styles.titleContainer} >
          <Image source={feedbackTypeInfo.image} style={styles.image}></Image>
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>
      <TextInput 
        multiline 
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo"
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
        ></TextInput>

        <View style={styles.footer}>
          <Screenshot 
          onTakeShot={handleScreenshot} 
          onRemoveShot={handleScreenshotRemove} 
          screenshot={screenshot}>
            
          </Screenshot>
          <Button 
            isLoading={isSendingFeedback}
            onPress={handleSendFeedback}>

          </Button>
        </View>

    </View>
  );
}