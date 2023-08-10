import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { DataTable } from 'react-native-paper';
import { get_accounts_from_database } from '../redux/actionCreators';


const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        token: state.token,
        userId: state.user_id
    }
}
const mapDispatchToProps = dispatch => {
    return {
        get_accounts: () => dispatch(get_accounts_from_database())
    }
}

const ShowAccountScreen = (props) => {
    useEffect(() => {
        props.get_accounts()
    }, [])

    return (
        <View >
            <DataTable >

                <DataTable.Header style={{ backgroundColor: '#7D7463', marginBottom: 5 }}>
                    <DataTable.Title> <Text style={styles.title}>Year</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.title}>Month</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.title}>Income</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.title}>Expanse</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.title}>Remaining</Text></DataTable.Title>
                </DataTable.Header>
            </DataTable>
            <FlatList data={props.accounts} renderItem={({ item }) => {
                if (item.userId == props.userId) {

                    return (<DataTable.Row style={{ backgroundColor: '#A8A196', marginBottom: 5 }}>
                        <DataTable.Cell><Text style={styles.cell}>{item.year}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.cell}>{item.month}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.cell}>{item.income}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.cell}>{item.expanse}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.cell}>{item.income - item.expanse}</Text></DataTable.Cell>
                    </DataTable.Row>)
                }






            }
            } key={item => item.id.toString()} />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontWeight: 'bold'
    },
    cell: {
        backgroundColor: '#A8A196',

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowAccountScreen);