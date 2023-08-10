import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

const Icon = (props) => {
    return (
        <TouchableOpacity onPress={props.action}>
            <Icons name={props.name} size={props.size} color={props.color} />
        </TouchableOpacity>
    )
}

export default Icon;