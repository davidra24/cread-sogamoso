import React, { Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: { margin: 'auto', flexDirection: 'row' },
    tableCol: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCell: { margin: 'auto', marginTop: 5, fontSize: 10 },
});

function getRows(props) {
    let arr = [];
    props.lessons.map((lesson) => {
        arr.push(
            <View
                key={`${lesson.id_subject}0${lesson.start_hour}0${
                    lesson.end_hour
                }`}>
                <Text style={styles.tableCell}>{lesson.subject_semster}</Text>
                <Text style={styles.tableCell}>{lesson.name_subject}</Text>
                <Text style={styles.tableCell}>{lesson.name_teacher}</Text>
                <Text style={styles.tableCell}>{lesson.phone_teacher}</Text>
                <Text style={styles.tableCell}>
                    {' '}
                    {lesson.name_classroom} - {lesson.location_classroom}
                </Text>
                <Text style={styles.tableCell}>{`${lesson.start_hour} - ${
                    lesson.end_hour
                }`}</Text>
            </View>,
        );
    });
    console.log(arr);

    return arr;
}
// Create Document Component
const MyDocument = (props) => {
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>Semestre</Text>
                        <Text style={styles.tableCol}>Asignatura</Text>
                        <Text style={styles.tableCol}>Docente</Text>
                        <Text style={styles.tableCol}>Teléfono</Text>
                        <Text style={styles.tableCol}>Aula</Text>
                        <Text style={styles.tableCol}>Hora</Text>
                    </View>
                    <View>{getRows(props)}</View>
                </View>
            </Page>
        </Document>
    );
};

export default MyDocument;
