import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import ViewNotes from '../screens/ViewNotes'
import AddEditNotes from '../screens/AddEditNotes'

const StackNavigator = createStackNavigator({
        ViewNotes: {
            screen: ViewNotes
        },
        AddEditNotes: {
            screen: AddEditNotes
        }
    },
    {
        initialRouteName: 'ViewNotes',
        headerMode : 'none',
        mode: 'modal'
    }
)

export default createAppContainer(StackNavigator)