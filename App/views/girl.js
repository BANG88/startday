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
			pageIndex:1,
			pageSize:20

		}
	}
	componentDidMount(){
		this.loadMore();

	}

	loadMore(){
		if(this.state.isLoadingContent){
			return
		}

		this.setState({
			isLoadingContent:true,
		});

		API.findByType(API.dataTypes.GIRL,this.state.pageIndex,this.state.pageSize).then((res)=>{

			let data = res.results;

			if(data.length){

				for (let g in data){
					girls.push(data[g])
				}

				this.setState({
					dataSource:this.state.dataSource.cloneWithRows(girls),
					isLoadingContent:false,
					canLoadMoreContent: !!res.results.length,
					pageIndex: this.state.pageIndex + 1
				})

			}else{

			}

		}).done();


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
