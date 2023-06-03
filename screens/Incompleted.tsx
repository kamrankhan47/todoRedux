import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType } from '../redux/store';
import { addTask, addtoCompleted, fetchTasks } from '../redux/slices/TaskSlice';
import Completed from './Completed';

const Incompleted = () => {
    const [currentDate, setCurrentDate] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const {tasks,error,loading } = useSelector((state:StateType) => state.tasksSlice)
    useEffect(() => {
        dispatch(fetchTasks())
    }, [])  
    const refresh = () => {
        dispatch(fetchTasks())
    }
    
  useEffect(() => {
    var monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var date = new Date().getDate();
    var month = monthNames[new Date().getMonth()];
    var year = new Date().getFullYear();
    setCurrentDate(month + ' ' + date + ',' + year);
  }, []);

  const add = (payload:any) => {
    
    const newpayload={
        title:payload.title,
        completed:!payload.completed,
        id:payload.id
    }
    dispatch(addtoCompleted(newpayload))    
  }
  return (
    <View style={{backgroundColor: '#141419',flex:1}}>
        
      <View>
        <Text style={{fontSize:30,marginLeft:20,marginTop:20,color:'#DADADA',fontFamily:"Inter-Black"}}>{currentDate}</Text>
        <Text style={{marginLeft:20,color: '#575767', fontSize: 14,fontFamily:"Inter-Black"}}>{tasks.length} Incompleted,2 completed</Text>
      </View>
      <View>
        <Text
          style={{
            color: '#EBEBEB' && '#FFFFFF',
            fontSize: 18,
            marginLeft: 20,
            marginTop: 10,
          }}>
          Incomplete
        </Text>
      </View>
      <View style={{height:200}}>
        <FlatList
        data={tasks}
        refreshing={false}
        onRefresh={refresh}
        renderItem={({item})=>{
            return(
                item.completed===false?   <TouchableOpacity onPress={()=>add(item)}>
                <Text style={{color:'#DADADA',fontSize:20,marginLeft:20,marginTop:20,fontFamily:"Inter-Black"}}>{item.title}</Text>
                </TouchableOpacity>:null
            )
        }}
          
        />
      </View>
      
    </View>
  );
};

export default Incompleted;

const styles = StyleSheet.create({});
function getTodos(): any {
    throw new Error('Function not implemented.');
}

