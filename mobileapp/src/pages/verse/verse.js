import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { Text, Container, ListItem, Left, Thumbnail, Body, Form, Item, Input, Label, Button, Toast } from 'native-base'
import { Header } from '../../components/header'
import { server } from '../../config'
import Axios from 'axios'

export class Verse extends Component {
	data = this.props.navigation.getParam('data', {})
	state = {
		data: {
			comments: []
		},
		loading:false, 
	}
	componentDidMount() {
		// this.setState()
		// console.log(this.state.data)
		console.log('this.data', this.data)
		Axios.get(`verses/${this.data._id}`).then(({ data }) => {
			console.log(data)
			this.setState({ data })
		}).catch(err => {
			console.log(err.response)
		})
	}

	submitData(){
		Axios.post('/comments' ,{text: this.state.text, verse: this.state.data._id} ).then(({data})=>{
			console.log(data)
			Toast.show({text:'پیام شما با موفقیت ثبت شد و پس از تایید نمایش داده می‌شود!'})
		}).catch(err => {
			console.log(err.response)
		})
	}
	render() {
		console.log(this.state.data)
		return (
			<Container>
				<Header title={'بحث در مورد بیت'} />
				<View style={{ minHeight: 10 }}>
					<Text style={{ textAlign: 'center', padding: 10, fontSize: 15, fontFamily: 'IRANSansMobile(FaNum)_Black' }}>{this.state.data.text}</Text>
				</View>
				<View style={{ flex: 1 }}>
					<FlatList
						ListEmptyComponent={() => <Text style={{ textAlign: 'center' }}>اولین نظر در مورد این مصرع را شما بدهید!</Text>}
						data={this.state.data.comments.filter(item=>item.confirm)}
						renderItem={({ item }) => <EachItem {...item} navigation={this.props.navigation} />}
					/>
				</View>
				<View>
					<Form style={{padding:10}}>
						<Item bordered style={{flexDirection:'row-reverse'}}>
							<Label style={{fontFamily: 'IRANSansMobile(FaNum)_Black'}}>نظر شما</Label>
							<Input style={{textAlign:'right'}} onChangeText={text=>{this.setState({text})}} />
						</Item>
						<Item >
							<Button rounded onPress={()=>{this.submitData()}}>
								<Text>ثبت نظر!</Text>
							</Button>	
							
						</Item>
					</Form>
				</View>
			</Container>
		)
	}
}

const EachItem = (props) => (
	<ListItem thumbnail onPress={() => {
		props.navigation.push('Comment', { data: props })
	}}>
		{/* <Left>
			<Thumbnail square source={{ uri: props.photo.length > 0 ? server + props.photo[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNj6gNL3_ywCjBPOsZgwwoneojOhdatg3Tr6PtCCCLVFRZbefEA' }} />
		</Left> */}
		<Body>
			<Text style={{textAlign :'right' }}>{props.username} میگه:</Text>
			<Text style={{ textAlign: 'right', direction: 'rtl' }} note numberOfLines={1}>{props.text}</Text>
		</Body>
		{/* <Right style={{ padding:10 }}>
			<Button icon rounded onPress={ _=>this.props.navigation.navigate('ContactPage' , { id : item.id})}>
				<Icon name='call' />
			</Button>
		</Right> */}
	</ListItem>
)