import React from 'react-native';
import API from '../api.js';
import style from '../styles.js';
import Story from './story.js';

let {ListView,View,Text,Image,
	TouchableHighlight,
} = React;
let {styles} = style;
class Girl extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			dataSource:new ListView.DataSource({
				rowHasChanged:(r1,r2)=>{
					return r1 !== r2
				},
				loaded:false
			})
		}
	}
	componentDidMount(){
		API.findByType(API.dataTypes.GIRL).then((res)=>{
			this.setState({
				dataSource:this.state.dataSource.cloneWithRows(res.results),
				loaded:true
			})
		}).done();
	}

	render(){
		if(!this.state.loaded){
			return <View>
			<Text>loading</Text>
			</View>
		}

		return (<ListView
						initialListSize={30}
						contentContainerStyle={styles.grid}
						dataSource={this.state.dataSource}
						renderRow={this.renderStory.bind(this)}
						style={[styles.listView]}>
						</ListView>)
	}

	renderStory(story){
		return <TouchableHighlight onPress={this._onTouchMe.bind(this,story)}>
		<View style={styles.girlContainer}>
		<View style={styles.image}>
		<Image  style={[styles.image,{resizeMode: Image.resizeMode.cover}]} source={{uri:story.url}}></Image>
		</View>
		</View>
		</TouchableHighlight>
	}

	_onTouchMe(story,event){
		let date = new Date(story.createdAt);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		this.props.navigator.push({
			title:month+'-'+day,
			component:Story,
			passProps: {
				year:year,
				month:month,
				day:day,
				story:story
			},

		})



	}


}


export default Girl;
