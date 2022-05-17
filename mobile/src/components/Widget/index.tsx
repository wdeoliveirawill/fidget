import React, { useRef } from 'react';
import {  TouchableOpacity } from 'react-native';
import {ChatTeardropDots } from 'phosphor-react-native'

import { styles } from './styles';
import { theme } from '../../theme';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet';
import { Options } from '../Options';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';
import { Success } from '../Success';


export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = React.useState<FeedbackType|null>(null);
  const [feedbackSent, setFeedbackSent] = React.useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleOpen(){{
    bottomSheetRef.current?.expand()
  }}
  function handleRestartFeedback(){
    setFeedbackSent(false);
    setFeedbackType(null);
  }
  function handleFeedbackSent(){
    setFeedbackSent(true);
  }

  return (
   <>
   <TouchableOpacity style={styles.button} onPress={handleOpen}>
     <ChatTeardropDots size={24} weight="bold" color={theme.colors.text_on_brand_color}
     ></ChatTeardropDots>
     
   </TouchableOpacity>
   <BottomSheet ref={bottomSheetRef} 
   snapPoints={[1,280]} 
   backgroundStyle={styles.modal} 
   handleIndicatorStyle={styles.indicator}>
     {feedbackSent ? (
        <Success onSendAnotherFeedback={handleRestartFeedback}/>
      ) : (
        <>
        {feedbackType ?
          <Form 
            feedbackType={feedbackType} 
            onFeedbackCanceled={handleRestartFeedback} 
            onFeedbackSent={handleFeedbackSent}/>
          :
          <Options onFeedbackTypeChanged={setFeedbackType}/>
        }
        </>
        
      )}
    
     
    
   </BottomSheet>
   </>
  );
}

export default gestureHandlerRootHOC(Widget);