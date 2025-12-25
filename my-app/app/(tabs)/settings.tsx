import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import {Stack} from 'expo-router';



export default function SettingsScreen(){
    return (
        <>
         <Stack.Screen
       options={{ title : 'Settings' ,
        headerStyle : {backgroundColor : '#ffffffff'},
        headerTitleStyle : {color :'black' , fontWeight:'bold'},
        headerTintColor:"black",
        headerShown : true,
        headerTitleAlign : 'center',
       }}
     />
        <ThemedView style={{ flex : 1}} />
        </>
    )
}