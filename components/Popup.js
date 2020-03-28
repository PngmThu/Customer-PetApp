import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import {Text, View, StyleSheet} from "react-native";
import React from "react";

class Popup extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Dialog
                width={0.8}
                dialogStyle={styles.container}
                visible={this.props.visible}
                footer={
                <DialogFooter style={styles.footerDialog}>
                    <DialogButton
                    text="CANCEL"
                    style = {styles.buttonDialog}
                    textStyle={styles.buttonTextDialog}
                    onPress={() => {this.props.choice(false)}}
                    />
                    <DialogButton
                    text="OK"
                    style = {styles.buttonDialog}
                    textStyle={styles.buttonTextDialog}
                    onPress={() => {this.props.choice(true)}}
                    />
                </DialogFooter>
                }
            >
                <DialogContent style={styles.dialogContent}>
                    <Text style={styles.text}>{this.props.question}</Text>
                </DialogContent>
            </Dialog>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#333333"
    },
    text: {
        paddingHorizontal: 10,
        fontFamily: 'opensans',
        fontSize: 18,
        fontWeight: "300",
        color: "#fefefe"
    },
    dialogContent: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5
    },
    buttonTextDialog: {
        color: "#fefefe",
        marginTop: -8
    },
    footerDialog: {
        borderTopWidth: 0.5
    },
    buttonDialog: {
        justifyContent: "center",
    }
})
export default Popup;