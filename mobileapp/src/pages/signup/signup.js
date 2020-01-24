import React, { Component } from 'react'
import { View , StyleSheet } from 'react-native'
import { Container, Header, Content, Form, Item, Input , Text ,Button, Icon, Spinner, Toast} from 'native-base'
import { Colors, server } from '../../config'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

export class SignUpPage extends Component {

	state = {
		username: '',
		email: '',
		password: '' , 
		loading : false
	}
	SignUp(){
		this.setState({loading :true})
		Axios.post('/auth/local/register/' , this.state).then( async ({data}) => {
			console.log(data)
			try{
				await AsyncStorage.setItem('Token' , data.jwt)
				await AsyncStorage.setItem('Profile' , JSON.stringify(data.user))
			}catch(err){
				console.log(err)
			}
			Toast.show({
				type :'success' , 
				text :'ثبت نام موفقیت آمیز بود، در حال ورود به سیستم...' 
			})
			this.props.navigation.navigate('LoadingPage')

		}).catch(err=>{
			console.log(err.response  || err)
			Toast.show({
				type :'danger' , 
				text :'اطلاعات ورودی اشتباه است' 
			})
		}).finally( _=>{
			this.setState({loading : false})
		})
	}
	render() {
		return (
			<Container style={{flex:1 , backgroundColor :Colors.light}}> 
				<Content>

					<Text style={{textAlign:'center' , fontFamily :'IRANSansMobile(FaNum)_Bold' , color :Colors.primary , padding:50 , fontSize:30}}> ثبت نام در سیستم </Text>
					<Form style={{justifyContent :'center' , padding:40}}>
						
						<Item rounded style={styles.item}>
							<Input  value={this.state.username} onChangeText={val=>this.setState({username : val})}  style={styles.input} placeholder="نام کاربری" />
						</Item>

						<Item rounded style={styles.item}>
							<Input  value={this.state.email} onChangeText={val=>this.setState({email : val})}  style={styles.input} placeholder="ایمیل" />
						</Item>

						<Item rounded style={styles.item} last>
							<Input  value={this.state.password} onChangeText={val=>this.setState({password : val})}  style={styles.input} secureTextEntry placeholder="پسورد" />
						</Item>
						{
							this.state.loading ? 
								<Spinner color={Colors.primary} /> : 
								<Button style={styles.button} full rounded  onPress={ _=>{
									this.SignUp()
								}}>
									<Icon name='person-add' />
									<Text> ثبت نام </Text>
								</Button>
						}
						<Button style={styles.button} full rounded bordered onPress={ _=>{
							this.props.navigation.navigate('LoginPage')
						}}>
							<Icon name='person' />
							<Text> ورود به سیستم</Text>
						</Button>
						
					</Form>
				</Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	item : { margin :10 ,borderColor:Colors.dark , paddingRight:10 } , 
	input : { fontFamily :'IRANSansMobile(FaNum)'} , 
	button : {margin:10}
})
export default SignUpPage
