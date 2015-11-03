const BASE_URI = 'http://gank.avosapps.com/api/';

const TYPES = {
	'ANDROID':'android',
	'IOS':'ios',
	'FE':'前端',
	'ALL':'all',
	'GIRL':'福利',
	'VIDEO':'休息视频',
	'RES':'扩展资源'
};

const NOW = new Date();

const YEAR = NOW.getFullYear();

const MONTH = NOW.getMonth() + 1;

const DAY = NOW.getDate();

function formatUrl(params = []){
	return BASE_URI + params.join('/')
}

export default {

	dataTypes:TYPES,

	findByType(type = TYPES.ALL,pageIndex = 1,pageSize = 20){

		return fetch(formatUrl(['data',type,pageSize,pageIndex])).then((res)=>res.json())

	},

	findByDate(year = YEAR,month = MONTH,day = DAY){
		return fetch(formatUrl(['day',year,month,day])).then((res)=>res.json())
	},

	random(type = TYPES.ALL,pageSize = 20){
		fetch(formatUrl(['random','data',type,pageSize]).then((res)=>res.json()))
	}


}
