
import React ,{Component}from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import db from '../config'
import firebase from 'firebase'
import Myheader from '../components/myheader'
export default class BookRequestscreen extends Component{
  constructor(){
    super();
    this.state={userid:firebase.auth().currentUser.email,
    bookname:'',reasontorequest:''}
  }
  addrequest=(bookname, reasontorequest)=>{
    var userID = this.state.userid
    var ranmdomRequestId = this.createUniqueid()
    db.collection('requestbooks').add({userid:userID, 
  bookname:bookname, reasontorequest:reasontorequest,
   requestid:ranmdomRequestId})
  }
  createUniqueid(){return Math.random().toString(36).substring()}
render(){ 
    return (
    <View >
      <Myheader title="Request Book"/>
      <KeyboardAvoidingView style={styles.keyBoardStyle}>
        <TextInput style={styles.formTextInput}
        placeholder={"enterBookName"}
        onChangeText={(text)=>{this.setState({bookname:text})}} 
        value={this.state.bookname} />
        <TextInput style={styles.formTextInput}
        placeholder={"purpose of book"}
        multiline
        numberOfLines={10}
        onChangeText={(text)=>{this.setState({reasontorequest:text})}} 
        value={this.state.reasontorequest} />
      <TouchableOpacity style={styles.button} 
      onPress={()=>{this.addrequest(this.state.bookname, this.state.reasontorequest)}}>
      <Text>REQUEST</Text>
     </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}
}
const styles = StyleSheet.create({ 
  keyBoardStyle : { flex:1, alignItems:'center', justifyContent:'center' }, 
  formTextInput:{ width:"205%", height:35, 
  alignSelf:'center', borderColor:'#ffab91', 
  borderRadius:10, borderWidth:1, marginTop:20,
   padding:10, }, 
   button:{ width:"75%", height:50, 
   justifyContent:'center', alignItems:'center', 
   borderRadius:10, backgroundColor:"#ff5722", 
   shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, 
shadowOpacity: 0.44, shadowRadius: 10.32, 
elevation: 16, marginTop:20 }, } )
