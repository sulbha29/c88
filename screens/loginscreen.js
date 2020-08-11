import React,{Component} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert,
    KeyboardAvoidingView, Modal, ScrollView} from 'react-native'
import db from '../config';
import firebase from 'firebase';
//import SantaAnimation from '../components/santaclaus';

export default class Loginscreen extends Component{
    constructor(){
        super();
        this.state={emailid:'', password:'',isModalVisible:false,
         firstname: "", lastname:"", address:"", mobno:"", confirmpassword:""}
    }
    showModal=()=>{
        return(<Modal animationType="fade" transparent={true} 
        visible={this.state.isModalVisible}>
            <View style={styles.modalContainer}>
                <ScrollView style={{width:'100%'}}>
                    <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                        <Text>REGISTRATION</Text>
                        <TextInput style={styles.formTextInput}
                        placeholder={"firstname"}
                        maxLength={10}
                        onChangeText={(text)=>{this.setState({firstname:text})}}/>
                        
                        <TextInput style={styles.formTextInput}
                        placeholder={"lastname"}
                        maxLength={10}
                        onChangeText={(text)=>{this.setState({lastname:text})}}/>
                    
                    <TextInput style={styles.formTextInput}
                        placeholder={"mobno"}
                        maxLength={10}
                        keyboardType={'numeric'}
                        onChangeText={(text)=>{this.setState({mobno:text})}}/>

<TextInput style={styles.formTextInput}
                        placeholder={"address"}
                        multiline={true}
                        onChangeText={(text)=>{this.setState({address:text})}}/>
                    
                    <TextInput style={styles.formTextInput}
                        placeholder={"emailid"}
                        keyboardType={'email-address'}
                        onChangeText={(text)=>{this.setState({emailid:text})}}/>
                    
                    <TextInput style={styles.formTextInput}
                        placeholder={"password"}
                        secureTextEntry={true}
                        onChangeText={(text)=>{this.setState({password:text})}}/>
                    
                    <TextInput style={styles.formTextInput}
                        placeholder={"confirmpassword"}
                        secureTextEntry={true}
                        onChangeText={(text)=>{this.setState({confirmpassword:text})}}/>
                    <View><TouchableOpacity style={styles.registerButton}
                    onPress={()=>{this.usersignup(this.state.emailid, 
                    this.state.password,this.state.confirmpassword)}}>
                        <Text style={styles.registerButtonText}>Register</Text>
                        </TouchableOpacity></View>
                        <View><TouchableOpacity style={styles.cancelButton}
                        onPress={()=>{this.setState({"isModalVisible":false})}}>
                             <Text style={{color:'#ff5722'}}>Cancel</Text>
                            </TouchableOpacity></View>
                    

                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </Modal>)
    }
    userlogin=(emailid, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailid, password).then
        (()=>{
            this.props.navigation.navigate('donatebook')
            return Alert.alert("successfully loggeed in") })
    .catch((error)=>{var errorcode=error.code; 
    var errormessage=error.message;
return Alert.alert(errormessage)})
    }
    usersignup=(emailid, password, confirmpassword)=>{
    if(password !== confirmpassword){
        return Alert.alert("password does not match" )
    } else{firebase.auth().createUserWithEmailAndPassword(emailid, password).then
        (()=>{
            db.collection('user').add({
                firstname:this.state.firstname,
                lastname:this.state.lastname,
                mobno:this.state.mobno,
                emailid:this.state.emailid,
                address:this.state.address,
                })
            
return Alert.alert("successfully created user",'',
        [
          {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
        ]
    );
 })
 .catch((error)=> {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   return Alert.alert(errorMessage)
 })
   

}
    }



    render(){
        return(
            <View style = {styles.container}>
                
        <Text>BOOK SANTA</Text>
            <View style={{ justifyContent:'center', alignItems:'center'}}></View>
                {this.showModal()}
                <Text style={styles.title}>Book Santa</Text>
            <TextInput style={styles.loginbox}placeholder="abc@example.com"
            keyboardType='email-address'
            onChangeText={(text)=>{this.setState({emailid:text})}}/>
            <TextInput style={styles.loginbox}placeholder="enter password"
            secureTextEntry={true}
            onChangeText={(text)=>{this.setState({password:text})}}/>
            <TouchableOpacity style={styles.button}onPress={()=>
                {this.userlogin(this.state.emailid, this.state.password)}}>
                    <Text>login</Text></TouchableOpacity>

            <TouchableOpacity style={styles.button} 
            onPress={()=>this.setState({isModalVisible : true})}>
                <Text style={styles.buttonText}>SignUp</Text></TouchableOpacity> 
            </View>

        )

    }
    
}
const styles = StyleSheet.create({
    container:{flex:1, 
        backgroundColor:'red'},
    loginbox:{width:100,
        height:50, 
        fontSize:16, 
        margin:10},
    button:{ width:300, 
        height:50, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:25, 
        backgroundColor:"#ff9800", 
        shadowColor: "#000", 
        shadowOffset: { width: 0, 
            height: 8, }, 
            shadowOpacity: 0.30, 
            shadowRadius: 10.32, 
            elevation: 16, },
            modalContainer:{ flex:1,
                 borderRadius:20,
                  justifyContent:'center', 
                  alignItems:'center', 
                  backgroundColor:"#ffff", 
                  marginRight:30, 
                  marginLeft : 30, 
                  marginTop:80,
             marginBottom:80, },
             KeyboardAvoidingView:{ flex:1, 
                justifyContent:'center', 
                alignItems:'center' },     
                formTextInput:{ width:"75%", height:35, alignSelf:'center', 
                borderColor:'#ffab91', 
                borderRadius:10, borderWidth:1, marginTop:20, padding:10 },
                registerButton:{ width:200, height:40, alignItems:'center', 
                justifyContent:'center', borderWidth:1, borderRadius:10, marginTop:30 }, 
                registerButtonText:{ color:'#ff5722', fontSize:15, fontWeight:'bold' },
                cancelButton:{ width:200, 
                    height:30, justifyContent:'center', 
                    alignItems:'center', marginTop:5, },
            })