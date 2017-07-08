/**
 * Created by zhoubao on 2017/7/7.
 */
import {observable ,action ,computed ,autorun} from 'mobx';
// import {} from ''
import React from 'react';

let index = 0;
class ToDoList
{
    @observable list = [];

    addListItem1(li) {
        this.list.push({
            name : li,
            items:[] ,
            index
        });
        index++
        autorun(()=>{
            console.log('list change and the autorun function did run ' + this.list);
        });
    };

    removeListItem(li) {
       this.list = this.list.filter((rmItm) =>{
           return li.index !== rmItm.index;
       })
    }

    addItemForList(li ,item){
        this.list.forEach((item1) => {
            if(item1.index === li.index){
                li.items.push(item);
            }
        });
    }

}
const ToDoListCls = new ToDoList();
export default ToDoListCls;