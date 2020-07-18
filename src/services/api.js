import request from '@/utils/request';

export async function getUrls(params){
	return request('/testapi/urls?${stringify(params)}');
}
export async function getData(params){
  return request('/testapi/',{
    method:'POST',
    body:{
      ...params,
    }
  });
}
