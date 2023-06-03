import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Incompleted from './screens/Incompleted'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Completed from './screens/Completed'
const App = () => {
  return (
    <Provider store={store}>
    <Incompleted/>
    <Completed/>
    </Provider>
  )
}

export default App

