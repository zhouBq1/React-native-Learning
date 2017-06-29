
/**
 * Created by zhoubao on 2017/6/24.
 */
import React ,{Component} from 'react';
import {
    StyleSheet,
    Text ,
    View ,
    Image,
    TextInput ,
    ScrollView ,
    FlatList ,

    SectionList ,

} from 'react-native';

var styles=StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    section: {
        padding: 10,
        fontSize: 25,
        height: 40
    },
});

export default class FlexBoxTest extends Component{
    constructor(props){
        super(props);
        console.log('constructor方法执行');
    }

    render(){
        //justfifyContent: 将子视图的空间进行分配，
        //alignItem: 在侧轴方向上将当前行上的元素进行对其，默认为stretch
        /*
         * flex之后跟随的数字表明了在分配空间时候所占的权重。权重越高 ，所占剩余父试图的比重越大， 默认flex值为0 ，自动分配。
         * */
        return (<View style={{flexDirection :'column' ,flexWrap:'wrap',justifyContent:'space-around',backgroundColor:'darkgray' ,marginTop:20 ,height:500 ,alignItems:'flex-start'}}>

            {/*<FlatList data={[*/}
                {/*{key: 'Devin'},*/}
                {/*{key: 'Jackson'},*/}
                {/*{key: 'James'},*/}
                {/*{key: 'Joel'},*/}
                {/*{key: 'John'},*/}
                {/*{key: 'Jillian'},*/}
                {/*{key: 'Jimmy'},*/}
                {/*{key: 'Julie'},*/}
            {/*]}*/}
                      {/*renderItem={({item}) => <Text>{item.key}</Text>*/}
                      {/*}*/}
            {/*></FlatList>*/}

            <SectionList
                sections={[
                    {title:'D' ,data:['Devin']} ,
                    {title:'J' ,data:['Jackin' ,'James' ,'Jilliams' ,'Jimmy' ,'Joel' ,'John' ,'Julie']}
                ]}
                renderItem={({item})=> <Text style={styles.item}>{item}</Text>
                }
                renderSectionHeader={({section})=> <Text style={styles.section}>{section.title}</Text>
                }

           />
            {/*<SectionList*/}
                {/*sections={[*/}
                    {/*{title: 'D', data: ['Devin']},*/}
                    {/*{title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},*/}
                {/*]}*/}
                {/*renderItem={({item}) => <Text style={styles.item}>{item}</Text>}*/}
                {/*renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}*/}
            {/*/>*/}


            <ScrollView style={{width:300  ,height:700}}>
                <Text style={{fontSize:20}}>Scroll me plz</Text>
                <Image source={require('./img/backgroundImg.jpeg')}/>
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Text style={{fontSize:20}}>If you like</Text>
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Text style={{fontSize:20}}>Scrolling down</Text>
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Text style={{fontSize:20}}>What's the best</Text>
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Text style={{fontSize:20}}>Framework around?</Text>
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Image source={require('./img/backgroundImg.jpeg')} />
                <Text style={{fontSize:20}}>React Native</Text>
            </ScrollView>
        </View>);
    };
}