import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, StateType} from '../redux/store';
import {addTask, addtoCompleted} from '../redux/slices/TaskSlice';

const Completed = () => {
  const [addnewtask, setaddnewtask] = useState('');
  const add = () => {
    const newtask = {
      title: addnewtask,
    };
    dispatch(addTask(newtask));
    setModalVisible(false);
  };
  const adda = (payload:any) => {
    
    const newpayload={
        title:payload.title,
        completed:!payload.completed,
        id:payload.id
    }
    dispatch(addtoCompleted(newpayload))    
  }
  const dispatch = useDispatch<AppDispatch>();
  const {tasks} = useSelector((state:StateType) => state.tasksSlice)
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: '#141419'}}>
      <View>
        <Text
          style={{
            color: '#EBEBEB' && '#FFFFFF',
            fontSize: 18,
            marginLeft: 20,
            marginTop: 10,
          }}>
          Completed
        </Text>
      </View>
      <View style={{height:149}}>
      <FlatList
        data={tasks}
        renderItem={({item})=>{
            return(
                item.completed===true?   <TouchableOpacity onPress={()=>adda(item)}>
                <Text style={{color:'#DADADA',fontSize:20,marginLeft:20,marginTop:20,fontFamily:"Inter-Black"}}>{item.title}</Text>
                </TouchableOpacity>:null
            )
        }}/>
      </View>
    
          
        
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            backgroundColor: '#575767',
            height: 200,
            marginTop: 300,
            marginHorizontal: 20,
            borderRadius: 10,
          }}>
          <TextInput
            placeholder="Enter your task"
            style={{
              backgroundColor: 'grey',
              marginHorizontal: 20,
              marginTop: 20,
              borderRadius: 10,
            }}
            value={addnewtask}
            onChangeText={setaddnewtask}
          />

          <TouchableOpacity
            style={{alignItems: 'center', marginTop: 10}}
            onPress={add}>
            <View
              style={{
                height: 30,
                width: 80,
                backgroundColor: 'yellow',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Add Task</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View
          style={{
            backgroundColor: '#515CC6',
            borderRadius: 1000,
            width: 56,
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            marginLeft: 300,
            marginTop: 100,
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 30}}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Completed;

const styles = StyleSheet.create({});
