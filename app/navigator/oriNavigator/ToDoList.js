/**
 * Created by zhoubao on 2017/7/7.
 */
import {observable ,action ,computed ,autorun} from 'mobx';
import React from 'react';

let index = 0;
class ToDoList
{
    @observable list = [];

    @action
    addListItem1(li) {
        this.list.push({
            name : li,
            items:[] ,
            index
        });
        index++
    };

    @action
    removeListItem(li) {
       this.list = this.list.filter((rmItm) =>{
           return li.index !== rmItm.index;
       })
    }

    @action
    addItemForList(li ,item){
        this.list.forEach((item1) => {
            if(item1.index === li.index){
                li.items.push(item);
            }
        });
    }

}

const ToDoListCls = new ToDoList();
autorun(()=>{
    console.log('list change and the autorun function did run ' + ToDoListCls.list);
});
export default ToDoListCls;