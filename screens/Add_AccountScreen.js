import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { add_account, post_account_to_database } from '../redux/actionCreators';

const mapStateToProps = state => {
    return {
        userId: state.user_id,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add_account: (account) => dispatch(add_account(account)),
        post_to_database: (account) => dispatch(post_account_to_database(account))
    }
}

const Add_AccountScreen = (props) => {

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [income, setIncome] = useState('');
    const [expanse, setExpanse] = useState("");


    const handelSubmit = () => {
        if (month == '' || year == '' || income == "" || expanse == "") {
            alert('Please Fillup All Fields !')
        }
        else {
            // /^[a-zA-Z]+$/
            if (/^[a-zA-Z]+$/.test(month.split(" ").join(''))) {
                if (/^[0-9]+$/.test(year)) {
                    if (/^[0-9]+$/.test(income) && /^[0-9]+$/.test(expanse)) {
                        // code will execute

                        const account = {
                            userId: props.userId,
                            month: month,
                            year: year,
                            income: income,
                            expanse: expanse,
                            id: Math.floor(Math.random() * 1000),
                        }
                        props.add_account(account)
                        props.post_to_database(account)
                        setExpanse('');
                        setIncome('')
                        setMonth('')
                        setYear('')
                        props.navigation.navigate("Account")

                    }
                    else {
                        alert("Expense and Income Must be Number !")
                    }

                }
                else {
                    alert('Year Must be Number !')
                }


            } else {
                alert('Month Must Be Character !')
            }
        }

    }
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>

                <TextInput placeholder='Month Name' style={styles.input} value={month} onChangeText={text => setMonth(text)} />
                <TextInput placeholder='Year' style={styles.input} value={year} onChangeText={text => setYear(text)} />
                <TextInput placeholder='Total Income' style={styles.input} value={income} onChangeText={text => setIncome(text)} />
                <TextInput placeholder='Total Expanse' style={styles.input} value={expanse} onChangeText={text => setExpanse(text)} />
            </View>
            <View style={{ width: 240 }}>

                <Button title='ADD' onPress={handelSubmit} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        width: '45%',
        height: 50,
        borderBottomWidth: 1,
        marginBottom: 10,
        borderColor: '#ccc'
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Add_AccountScreen);
