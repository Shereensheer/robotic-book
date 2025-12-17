import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import ChatbotWidget from './ChatbotWidget';


export default function LayoutWrapper(props) {
  return (
    
      <OriginalLayout {...props}>
        {props.children}
        <ChatbotWidget />
      </OriginalLayout>
    
  );
}