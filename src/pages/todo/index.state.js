import { observable, action, toJS } from 'mobx';

class State {
  @observable data = [];
  @observable columns = [
    {
      title: 'name',
  dataIndex: 'name',
  width: '25%',
  editable: true
},
{
  title: 'age',
  dataIndex: 'age',
  width: '15%',
  editable: true
},
{
  title: 'address',
  dataIndex: 'address',
  width: '40%',
  editable: true
},
{
  title: 'edit',
  dataIndex: 'edit'
}
];
}
export default new State();
