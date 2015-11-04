import React from 'react-native';
let {StyleSheet,Dimensions} = React;
let {width,scale,height} = Dimensions.get('window');

let common={
	tintColor:'#fff',
	barTintColor:'#000',
	bg:'#f5f5f5'
}

let styles = StyleSheet.create({
	view:{
		flex:1
	},
	container:{
		flex:1,
	},
	listView:{
		marginTop:64
	},
	parallView:{
		top:64
	},
	grid:{
		flexDirection:'row',
		flexWrap:'wrap',
		justifyContent:'center'
	},
	image:{
		flex:1,
		height:120,
	},
	girlContainer:{
		width:(width)/2,
		opacity:.9,
		backgroundColor:common.bg,
	},
	text:{
		color:'#fff'
	},
	storyView:{
		margin:8
	},
	header:{
		color:'#ddd',
		fontSize:20,
		marginBottom:10
	},
	link:{
		color:'#09f',
		marginBottom:10
	},
	item:{
	}
});


export default {styles,common}
