import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { Text, Container, ListItem, Left, Thumbnail, Body,  } from 'native-base'
import {Header} from '../../components/header'
import { server } from '../../config'

export class Poet extends Component {
	state = { 
		data: this.props.navigation.getParam('data', {})
	}
	componentDidMount() {
		// this.setState({data: )
		// console.log(this.state.data)
	}
	
	render() {		
		console.log(this.state.data)
		return (
			<Container>
				<Header title={this.state.data.name} />
				
				<View style={{ justifyContent:'center'}}>
					<Thumbnail style={{alignSelf:'center', marginTop:10}} large source={{ uri: this.state.data.picture.length > 0 ? server + this.state.data.picture[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNj6gNL3_ywCjBPOsZgwwoneojOhdatg3Tr6PtCCCLVFRZbefEA' }} />
				</View>
				<View style={{ minHeight:100}}>
					<Text style={{textAlign:'center', padding: 10, fontSize:12}}>{this.state.data.description}</Text>
				</View>
				<View style={{ minHeight:10}}>
					<Text style={{}}>لیست کتاب های سعدی :</Text>
				</View>
				<View style={{flex:1}}>
					<FlatList
						data={this.state.data.books}
						renderItem={ ({item})=> <EachItem {...item} navigation={this.props.navigation} /> }
					/>
				</View>
			</Container>
		)
	}
}

const EachItem = (props) =>(
	<ListItem thumbnail onPress={()=>{
		props.navigation.push('Book', {data : props})
	}}>
		<Left>
			<Thumbnail square source={{ uri: props.photo.length > 0 ? server + props.photo[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNj6gNL3_ywCjBPOsZgwwoneojOhdatg3Tr6PtCCCLVFRZbefEA' }} />
		</Left>
		<Body>
			<Text style={{textAlign :'right' }}>{props.name}</Text>
			<Text style={{textAlign :'right' , direction:'rtl' }} note numberOfLines={1}>{props.description}</Text>
		</Body>
		{/* <Right style={{ padding:10 }}>
			<Button icon rounded onPress={ _=>this.props.navigation.navigate('ContactPage' , { id : item.id})}>
				<Icon name='call' />
			</Button>
		</Right> */}
	</ListItem>
)