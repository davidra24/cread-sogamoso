import React, { Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';
import { text } from '@fortawesome/fontawesome-svg-core';
 

// Create styles

const Header = styled.Text`
  color: black;
  font-size: 15px;
  text-align: center;
  margin-bottom: 2px;
  text-decoration: underline;
`;

const Subtitle = styled.Text`
  margin-bottom: 20px;
  font-size: 12px;
  
`;
const Title = styled.Text`
  margin: 5px;
  font-size: 12px;
  text-align: center;
  borderStyle: "solid";
  borderWidth: 1, 
`;
const Author = styled.Text`
  font-size: 12px;
  text-align: center;
  margin-bottom: 40px;
`;
const Body = styled.Page`
  padding-top: 35px;
  padding-bottom: 65px;
  padding-right: 35px;
  padding-left: 35px;
`;
const Picture = styled.Image`
  margin: 10px 10px;
`;

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
    table2: {
        display: 'table',
        width: 'auto',
        
    },
    
    tableRow: { margin: 'auto', flexDirection: 'row' },
    
    tableCol: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCell: { margin: 'auto', marginTop: 5, fontSize: 10 },
    tableColHeader: { 
        width: "20%", 
        borderStyle: "solid", 
        borderBottomColor: '#000',
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0
      },
      tableColHeader4: { 
        width: "20%", 
      },
      tableColHeader2: { 
        width: "100%", 
        borderStyle: "solid", 
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0, 
        borderTopWidth: 0
      },
      tableColHeader3: { 
        width: "60%",
             
      },
      tableCellHeader: {
        margin: "auto", 
        margin: 5, 
        fontSize: 12,
        fontWeight: 500
      },   
      tableCellHeader2: {
        margin: "auto",  
        fontSize: 15,
        fontWeight: 500,
        
      }, 
      tableCellHeader3: {
        margin: "5",
        fontSize: 12,
        fontWeight: 500,
        
      },     
});

  
function getTitle(props) {
    let arr=null;
    props.lessons.map((lesson) => {
        arr=<Title>{lesson.name_career}</Title>;
        
            
            });
            return arr;
}
function getSemestre(props) {
    let arr=null;
    props.lessons.map((lesson) => {
        arr=<Text style={styles.tableCellHeader2}><Title>HORARIOS {lesson.title_semester}</Title></Text>;
        
            
            });
            return arr;
}

function getRows(props) {
    let arr = []
    props.lessons.map((lesson) => {
        arr.push(
            <View style={styles.tableRow}
                key={`${lesson.id_subject}0${lesson.start_hour}0${
                    lesson.end_hour
                }`}>       
                
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{lesson.subject_semster}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{lesson.name_subject}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{lesson.name_teacher}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{lesson.phone_teacher}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>
                    {' '}
                    {lesson.name_classroom} - {lesson.location_classroom}
                </Text>
                <Text style={styles.tableCell}>{`${lesson.start_hour} - ${
                    lesson.end_hour
                }`}</Text></View>                
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
            
                                    
                <Body wrap>
                <Header fixed>UNIVERSIDAD PEDAGÓGICA Y TECNOLÓGICA DE COLOMBIA </Header>

                <View style={styles.table2}>
                <View style={styles.tableRow}> 
                       
                       <View style={styles.tableColHeader4}>
                       <View style={styles.tableCellHeader3}><Picture src='../../images/uptc.png'></Picture>
                       </View>
                       </View>
                       
                       <View style={styles.tableColHeader3}>
                       <View style={styles.tableCellHeader3}><Title>FACULTAD DE ESTUDIOS A DISTANCIA     CREAD-SOGAMOSO</Title> 
                       </View>
                       </View>
                       
                       <View style={styles.tableColHeader4}><View style={styles.tableCellHeader3}><Picture src='../../images/logo-cread.png'></Picture></View></View>
                       
                       
                </View>
                </View>
                
                
                
               
                <Subtitle>
                    {getTitle(props)}
                </Subtitle> 
                <View style={styles.table}>
                    <View style={styles.tableRow}> 
                       
                       <View style={styles.tableColHeader2}>
                           <Text>{getSemestre(props)}</Text>
                       </View>
                    </View>
                    <View style={styles.tableRow}> 
                       
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>SEMESTRE</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>ASIGNATURA</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>DOCENTE</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>TELEFONO</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>AULA - HORA</Text>
                        </View>
                    </View>
                        
                      
                    <View >{getRows(props)}</View>
                </View>
            </Body>
            
        </Document>
    );
};

export default MyDocument;
