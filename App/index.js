import React from 'react-native';
import style from './styles.js';
import Girl from './views/girl.js';

let {
	View,
	Text,
	NavigatorIOS ,
	StatusBarIOS,
} = React;

let {styles,common} = style;

StatusBarIOS.setStyle('light-content');

class StartDay extends React.Component{

	constructor(props){
		super(props);
	}
	render(){
		return	<NavigatorIOS
				tintColor={common.tintColor}
				titleTextColor={common.tintColor}
				barTintColor={common.barTintColor}
				style={styles.view} initialRoute={{ title: '妹子们',component:Girl}} />
}
}

export default StartDay;