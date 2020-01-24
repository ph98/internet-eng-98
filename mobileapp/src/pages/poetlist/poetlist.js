import React, { Component } from 'react'
import { View, TouchableOpacity  ,FlatList } from 'react-native'
import { Container,  ListItem, Thumbnail, Text, Left, Body, Toast} from 'native-base'
import {Header} from '../../components/header'
import { Colors, server } from '../../config'
import Axios from 'axios'
export class PoetList extends Component {
	state = {
		data : []
	}
	componentDidMount(){
		Axios.get('poets/').then(({data})=>{
			this.setState({data})
		}).catch(err=>{
			Toast.show({text:'خطا در برقراری ارتباط!'})
			console.log(err.response || err )
		})
	}
	render() {
		return (
			<Container>
				<Header title='لیست شعرا' />
				<View style={{flex:1}}>
					{
						this.state.data.length > 0 ? 
							<FlatList 
								data={this.state.data} 
								keyExtractor={item=>'n' + item.id}
								renderItem={({item})=>(
									<ListItem thumbnail onPress={()=>{
										this.props.navigation.push('Poet', {data : item})
									}}>
										<Left>
											<Thumbnail square source={{ uri: item.picture.length > 0 ? server + item.picture[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNj6gNL3_ywCjBPOsZgwwoneojOhdatg3Tr6PtCCCLVFRZbefEA' }} />
										</Left>
										<Body>
											<Text style={{textAlign :'right' }}>{item.name}</Text>
											<Text style={{textAlign :'right' , direction:'rtl' }} note numberOfLines={1}>{item.description}</Text>
										</Body>
										{/* <Right style={{ padding:10 }}>
											<Button icon rounded onPress={ _=>this.props.navigation.navigate('ContactPage' , { id : item.id})}>
												<Icon name='call' />
											</Button>
										</Right> */}
									</ListItem>
								)}	
							/>

							: 
							<Text> شاعری در سیستم ثبت نشده است! </Text>
					}

				</View>

			</Container>
		)
	}
}

export default PoetList
