import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { userAuthenication } from '../redux/actionCreators';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';

const mapStateToProps = state => {
    return {
        auth_loading: state.auth_loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        userAuthenication: (email, password, mode) => dispatch(userAuthenication(email, password, mode))
    }
}

const LoginScreen = (props) => {
    const [mode, setMode] = useState('signup');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("")

    const handelMode = () => {
        setMode(mode == 'signup' ? 'login' : "signup")
    }





    const submitFormData = () => {
        let emailreg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        if (email !== '' && password !== "") {
            if (emailreg.test(email)) {
                if (password.length > 7) {

                    if (mode === 'login') {
                        // login code will be execute
                        props.userAuthenication(email, password, mode)

                    }
                    else {
                        if (password === confirmPassword) {
                            // signup code will execute
                            props.userAuthenication(email, password, mode)

                        }
                        else {
                            alert('Password Does not matched !')
                        }
                    }


                }
                else {
                    alert('Password is Short !')
                }

            }
            else {
                alert('Invalid Email !')
            }

        }
        else {
            alert('Please FillUp All Field!')
        }

    }

    if (props.auth_loading) {
        return <Spinner />
    }

    return (
        <View style={{ width: '90%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ width: 300, height: 30, justifyContent: 'center', backgroundColor: '#FC4F00', alignItems: 'center' }} onPress={handelMode} >
                <Text style={{ color: '#fff' }}>{mode == 'signup' ? "Switch To Login" : "Switch To SignUp"}</Text>
            </TouchableOpacity>
            <View>

                <TextInput placeholder='Email' style={styles.input} value={email} onChangeText={text => setEmail(text)} />
                <TextInput placeholder='Password' style={styles.input} value={password} onChangeText={text => setPassword(text)} />
                {
                    mode == 'signup' && <TextInput placeholder='Confirm Password' style={styles.input} value={confirmPassword} onChangeText={text => setConfirmPassword(text)} />
                }

            </View>
            <TouchableOpacity style={{ width: 100, height: 30, backgroundColor: '#009FBD', justifyContent: 'center', alignItems: 'center', marginTop: 5, borderRadius: 4 }} onPress={() => submitFormData()}>
                <Text style={{ color: '#fff' }}>{mode == 'signup' ? "SignUp" : 'Login'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        height: 40,
        borderBottomWidth: 1,
        marginBottom: 5,
        borderColor: '#ccc'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);