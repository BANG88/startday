import React from 'react-native';
import API from '../api.js';
import style from '../styles.js';
import Story from './story.js';

let {ListView,View,Text,Image,
	TouchableHighlight,
} = React;
let {styles} = style;
let ds  = new ListView.DataSource({
	rowHasChanged:(r1,r2)=>{
		return r1 !== r2
	}
})

let girls = [];

class Girl extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			dataSource: ds.cloneWithRows(girls),
			canLoadMoreContent:true,
			isLoadingContent:false,
			pageIndex:0,
			pageSize:20

		}
	}
	componentDidMount(){
		this.loadMore();

	}

	loadMore(){
		var pageIndex = this.state.pageIndex;

		if(this.state.isLoadingContent){
			return
		}

		this.setState({
			isLoadingContent:true,
			pageIndex: pageIndex + 1
		});

		API.findByType(API.dataTypes.GIRL,this.state.pageIndex,this.state.pageSize)
		.catch((error)=>{
			this.setState({
				isLoadingContent:false
			})
		})
		.then((res)=>{

			let data = res.results;

			if(data.length){
							this.setState({
								dataSource:this.getDataSource(data),
								isLoadingContent:false,
								canLoadMoreContent: !!res.results.length,
				})

			}else{

			}

		}).done();


	}

	getDataSource(girl):ListView.DataSource{
		girls = girls.concat(girl);
		return this.state.dataSource.cloneWithRows(girls)
	}
	render(){
		if(this.state.isLoadingContent){
			return <View>
			<Text>loading</Text>
			</View>
		}

		return (<ListView
						initialListSize={30}
						ref="listview"
						pageSize={4}
						scrollRenderAheadDistance={2000}
						onEndReached={this.loadMore.bind(this)}
						showsVerticalScrollIndicator={false}
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
