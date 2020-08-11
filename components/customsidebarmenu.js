import React,{Component} from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase'
import db from '../config'
import {Avatar} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default class CustomSideBarMenu extends Component {
    state = {userid:firebase.auth().currentUser.email,image:"#",name:'',docid:''}
    selectpicture = async()=>{const{cancelled,uri}=await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.All,
        allowsEditing:true,
        aspect:[4,3],
        quality:1
    })
    if (!cancelled){this.uploadImage(uri,this.state.userid)
    this.setState({image:uri})
}
}

uploadImage = async(uri,imagename)=>{
    var response = await fetch(uri)
    var blob = await response.blob()
    var ref = firebase.storage().ref().child("user_profiles/"+imagename)
    return ref.put(blob).then((response)=>{
        this.fetchimage(imagename)
    })
}

fetchimage = (imagename)=>{
    var storageref = firebase.storage().ref().child("user_profiles/"+imagename)
    storageref.getDownloadURL().then((url)=>{
        this.setState({image:url})
    })
        .catch((error)=>{
            this.setState({image:"#"})
      })
}

getuserprofile(){
    db.collection("users").where("emailid","==",this.state.userid).onSnapshot((querySnapshot)=>
    {querySnapshot.forEach((doc)=>{this.setState({
        name:doc.data().firstname+" "+doc.data().lastname
    })
})
})
}

componentDidMount(){this.fetchimage(this.state.userid);
this.getuserprofile();}

render(){
        return(
            <View style = {{flex:1}}>
                <View style = {{flex:0.5,alignItems:'center',backgroundColor:'blue'}}>
                    <Avatar 
                    rounded
                    source = {{uri:this.state.image}}
                    size = "medium"
                    onPress = {()=>this.selectpicture()}
                    containerStyle = {styles.imageContainer}
                    showEditButton
                    />
                    <Text style = {{fontWeight:"100",fontSize:"18"}}>
                        {this.state.name}
                    </Text>                     
                </View>
            <View style = {styles.container}>
                <View style = {styles.DrawerItemsContainer}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style = {styles.logOutContainer}>
                    <TouchableOpacity style = {styles.logOutButton} 
                    onPress={()=>{
                        this.props.navigation.navigate('Loginscreen')
                        firebase.auth().signOut()
                    }}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        )
    }
}


var styles = StyleSheet.create({ container: { flex: 1, }, drawerItemsContainer: { flex: 0.8, }, logOutContainer: { flex: 0.2, justifyContent: "flex-end", paddingBottom: 30, }, logOutButton: { height: 30, width: "100%", justifyContent: "center", padding: 10, }, imageContainer: { flex: 0.75, width: "40%", height: "20%", marginLeft: 20, marginTop: 30, borderRadius: 40, }, logOutText: { fontSize: 30, fontWeight: "bold", }, });