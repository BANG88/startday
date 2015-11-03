import React from 'react-native';
import API from '../api.js';

import style from '../styles.js';

import ParallaxView from 'react-native-parallax-view';

import Browser from './browser.js';


let {
	ScrollView,ListView,View,Text,Image,
	Modal,
	TouchableHighlight,
} = React;
let {styles} = style;
class Story extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			modalVisible:false,
			dataSource:new ListView.DataSource({
				rowHasChanged:(r1,r2)=>{
					return r1 !== r2
				},
				loaded:false
			})
		}
	}
	componentDidMount(){

		let {year,month,day,url} = this.props;

		url = this.props.story.url;

		this.setState({
			girl:url
		})


		API.findByDate(year,month,day).then((res)=>{
			this.setState({
				dataSource:this.state.dataSource.cloneWithRows([res.results]),
				stories:res.results,
				loaded:true,
			})
		}).done();
	}

	render(){
		if(!this.state.loaded){
			return <View>
			<Text>loading</Text>
			</View>
		}

		return <ParallaxView
		style={styles.parallView}
		contentInset={{top:64,bottom:64}}
		showsVerticalScrollIndicator={false}
		automaticallyAdjustContentInsets={false}
		backgroundSource={{uri:this.state.girl}}
		windowHeight={300} >
		<View>
		{this.renderStory()}
		</View>
		</ParallaxView>
	}

	renderStory(){
		let stories = this.state.stories;
		return		Object.keys(stories).map((s)=>{
			return <View key={s} style={styles.storyView}>
			<Text style={styles.header}>{s}</Text>
			{
				stories[s].map((story)=>{
					return <View  key={story.objectId} style={styles.item} >
					<TouchableHighlight activeOpacity={.8} underlayColor='#fff' onPress={this._openUrl.bind(this,story)}>
					<Text style={styles.link}>{story.desc}</Text>
					</TouchableHighlight>
					</View>
				})
			}
			</View>
		})
	}

	_openUrl(story){
 /*   this.setState({*/
			//modalVisible:false
		//})

		//<Modal transparent={false} animated={true} visible={true}>
		//<View style={[styles.view, {backgroundColor:'#f5fcff'}]}>
		//<Text>{story.objectId}</Text>

		//</View>

 //</Modal>
 this.props.navigator.push({
		title:story.desc,
		component:React.createClass({
			render:function() {
				return <Browser {...story} ></Browser>
			}
		})
 })
	}


}


export default Story;
