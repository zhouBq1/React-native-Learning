import {observable} from 'mobx'

let index = 0;

class ObservableListStore {

    // 设置observer时候，不设置observable对象，则observer失效.试图停止刷新
    @observable
    list = [];

    addListItem(adList){
        //这里添加的list元素为一个对象类型，封装了三个属性：name ，items ，index
        this.list.push({
            name:adList ,
            items:[] ,
            index
        });
        index++
    }

    removeListItem(rmList){
        this.list = this.list.filter((rmI) => {
            return (rmI.index !== rmList.index);
        })
    }

    addItem(adList ,adItem){
        this.list.forEach((li)=>{
            if (li.index === adList.index)
            {
                li.items.push(adItem);
            }
        });
    }

    listCount(){
        return this.list.length;
    }

}


const observableListStore = new ObservableListStore();
export default observableListStore