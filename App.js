import React from 'react'
import {DefaultTheme,  Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from './src/navigation/index.js'
import {Provider as StoreProvider} from 'react-redux'
import store from './src/reducer/store'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
}

export default function App(){
  return (
    <StoreProvider store = {store}>
      <PaperProvider theme={theme}>
      <AppNavigator/>
      </PaperProvider>
    </StoreProvider>
  )
}
