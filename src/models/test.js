import { getUrls,getData } from '../services/api';

export default{
	namespace: 'test',
  state:{
    data:{},
  },
	effects:{
		*fetch({payload},{call,put}){
			const response = yield call(getUrls,payload);
			console.log(response)
			yield put({
				type:'reMethod',
				payload:Array.isArray(response) ? response : [],
			});
		},
    *getUrlData({payload},{call,put}){
		  const response=yield call(getData,payload.url,payload);
		  yield put({
        type:'get',
        payload:response,
      })
    }
	},
	reducers:{
		reMethod(state,action){
			console.log(state)
			console.log(action.payload)
      if(action.payload!==undefined){
        return {
          ...state,
          data:action.payload
        }
      }

		},
    get(state,action){
      console.log(state)
      console.log(action.payload)
      if(action.payload!==undefined){
        return {
          ...state,
          data:action.payload
        }
      }

    },
	},

}
