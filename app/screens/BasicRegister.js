import React, { Component } from "react";
import { StyleSheet,KeyboardAvoidingView, Text,ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { Container } from '../components/Container';
import { PrimaryHeader } from '../components/Headers';
import {DefaultInput,PhoneInput} from '../components/TextInputs';
import {ErrorText} from '../components/Texts';
import { BlockButton, Buttons, VoidButton } from '../components/Buttons';
import Icon from '@expo/vector-icons/FontAwesome';
import md5 from 'md5';
import { Content,H3 } from 'native-base';
import {AddUsers,root} from '../config';

class BasicRegister extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
          firstName: '',
          lastName:'',
          phone:'',
          email:'',
          password:'',
          ValidFname:null,
          ValidLname:null,
          ValidNumber:null,
          ValidPass:null,
          ValidEmail:null,        
        };
      }
      SaveAccountInfo=()=>{
          var IsValid=false;
        if(this.state.firstName=='' || /\d/.test(this.state.firstName))
        {
            this.setState({ValidFname:false});
            IsValid=false;
        }
        if(this.state.lastName=='' ||  /\d/.test(this.state.lastName))
        {
            this.setState({ValidLname:false});
            IsValid=false;
        }
        if(this.state.phone==null || this.state.phone.length<9)
        {
            this.setState({ValidNumber:false});
            IsValid=false;
        }
        if(this.state.email!='' && !/\b[a-z0-9-_.]+@[a-z0-9-_.]+(\.[a-z0-9]+)+/.test(this.state.emai))
        {
            this.setState({ValidEmail:false});
            IsValid=false;
        }
        if(this.state.password==null || this.state.password.length<6)
        {
            this.setState({ValidPass:false});
            IsValid=false;
        }
        if(this.state.ValidPass==true && this.state.ValidFname==true && this.state.ValidLname==true && this.state.ValidNumber==true && this.state.ValidEmail==true)
        {
            IsValid=true;
        }
        console.log(IsValid);
        ////////////////////////////////////////       
        if(IsValid)
        {
            var CorrectPhone="249"+this.state.phone.substring(1);
            console.log("Root: "+root);
            console.log("Correct Phone: "+CorrectPhone);
            //TODO: Send SMS to Phone
            var userInfo={
                FirstName:this.state.firstName,
                LastName:this.state.lastName,
                Phone:CorrectPhone,
                PhoneView:this.state.phone.substring(1),
                Email:this.state.email,
                Password:md5(this.state.password)
            };
            this.props.navigation.navigate("CodeActivation",{userInfo:userInfo});
            /*this.props.navigation.navigate("CodeActivation",{
                FirstName:this.state.firstName,
                LastName:this.state.lastName,
                Phone:CorrectPhone,
                Email:this.state.email,
                Password:md5(this.state.password)
            });*/
        }
      }
    render() {
        return (
           
                <PrimaryHeader
                    LeftText="Back"
                    leftOnPress={()=>this.props.navigation.navigate("Login")}
                    leftIconName="ios-arrow-back"
                    TitleText="New Account"
                    hasRight={false}
                >
                    <Content contentContainerStyle={{marginTop:30, alignItems: 'center' }}>                
                        <H3 style={{alignSelf:'flex-start', marginLeft:10, color:'rgba(83, 172, 211,0.6)'}}>Personal Information</H3>                    
                        <View>
                            <DefaultInput
                                placeholder="First Name"
                                IconName="id-card-o"
                                returnKeyType="next"
                                inputRef={(input)=> this.FirstNameInput=input}
                                onSubmitEditing={() => this.lastNameInput.focus()} 
                                onChangeText={(firstName)=>this.setState({firstName,ValidFname:true})}                            
                            />
                            {this.state.ValidFname==false ?<ErrorText ErrText="* Invalid first name"/> 
                                :  null                                                     
                            }                        
                                   
                        <DefaultInput
                            placeholder="Last Name"
                            IconName="id-card-o"
                            returnKeyType="next"
                            inputRef={(input)=>this.lastNameInput=input}
                            onSubmitEditing={() => this.PhoneInput.focus()} 
                            onChangeText={(lastName)=>this.setState({lastName,ValidLname:true})}                             
                        />
                        {this.state.ValidLname==false ?<ErrorText ErrText="* Invalid last name"/>  
                                : null                                                     
                            }                           
                        <PhoneInput
                            placeholder="Phone Number"                    
                            keyboardType="numeric"
                            inputRef={(input)=>this.PhoneInput.focus()}
                            onChangeText={(phone)=>this.setState({phone,ValidNumber:true})}                         
                        />    
                        {this.state.ValidNumber==false ?<ErrorText ErrText="* Invalid phone number"/>   
                                :null                                                        
                            }                                      
                        <DefaultInput
                            placeholder="Email (Optional)"
                            IconName="envelope-o"
                            returnKeyType="next"
                            onSubmitEditing={() => this.PasswordInput.focus()} 
                            keyboardType="email-address"
                            onChangeText={(email)=>this.setState({email,ValidEmail:true})}                             
                        />
                        {this.state.ValidEmail==false ?<ErrorText ErrText="* Invalid Email"/> 
                                : null                                                  
                            }   
                        <DefaultInput
                            placeholder="Password"
                            IconName="lock"    
                            inputRef={(input)=>this.PasswordInput=input}                       
                            onChangeText={(password)=>this.setState({password,ValidPass:true})}   
                            secureTextEntry
                            returnKeyType="go"
                        />
                        {this.state.ValidPass==false ?<ErrorText ErrText="* Password must be at least 6 characters"/>
                                :null                                                           
                            }  
                            </View>  
                            <ActivityIndicator color="#53acd3"/>    
                        <View style={{marginTop:20}}>
                            <Buttons theme="primary" hasIcon leftIcon={false} size="normal" IconName="angle-right" text="Next" onPress={this.SaveAccountInfo}/>                         
                        </View>                                                                  
                </Content>

                </PrimaryHeader> 
        );
    }
}
export default BasicRegister;