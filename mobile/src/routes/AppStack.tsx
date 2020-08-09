import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Landing from '../pages/Landing'
import GiveClasses from '../pages/GiveClasses'
import StudyTabs from './StudyTabs'

const AppStackNavigator = createStackNavigator()

const AppStack = () => {
    return(
        <NavigationContainer>
            <AppStackNavigator.Navigator screenOptions={{ headerShown: false }}>
                <AppStackNavigator.Screen name="Landing" component={Landing} />
                <AppStackNavigator.Screen name="GiveClasses" component={GiveClasses} />
                <AppStackNavigator.Screen name="Study" component={StudyTabs}/>
            </AppStackNavigator.Navigator>
        </NavigationContainer>
    )
}

export default AppStack