import React, { useContext, useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Field, reduxForm, change } from 'redux-form';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useDispatch } from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons'
import { Mode } from '../components/DarkMode';

const Form = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState('')
  const [image, setImage] = useState('')
  const { handleSubmit,navigation } = props;
  const {dark} = useContext(Mode)
  const onSubmit = (values) => {
    return (
    navigation.navigate('List')
    )};
  const renderInput = ({ input: { onChange, ...input }, ...rest}) => {
    return (
    <View style={{flexDirection: 'row', marginBottom: 8,borderColor: 'blue',borderWidth: 2,borderRadius: 4}}>
    <TextInput style={{width: '85%'}}onChangeText={onChange} {...input} {...rest} onFocus={data=> console.log(data,"Focus data")} />
    <Icon style={{left: 300, marginTop: 12,position: 'absolute'}}name="list" size={20} color="black" />
    </View>
    )
  };
  const renderDatePicker = ({ input, label, meta: { touched, error }, ...custom }) => {
    return (
        <View>
          {console.log(input.value)}
          {/* <TextInput style = {styles.input} editable={false} value={input.value.toString()} />
        <Button onPress={()=> setOpen(open => !open)} title='Add Date'></Button> */}
        <View style={{flexDirection: 'row',marginTop: 10, marginBottom: 8,borderColor: 'blue',borderWidth: 2,borderRadius: 4}}>
        <TouchableOpacity style = {{width: '90%'}} onPress={()=> setOpen(open => !open)}><TextInput placeholder = {'Deadline of Task'} editable={false} value={input.value.toString()} />
        <Icon style={{left: 300, marginTop: 12,position: 'absolute'}}name="calendar" size={20} color="black" />
        </TouchableOpacity>
        </View>
        {
          open &&
        // <DateTimePicker {...input} {...custom} autoOk={true} value = {new Date(Date.now())} onChange={(event, value) => (setOpen(false), input.onChange(value))} />
        <Calendar
        {...input} {...custom}
  onDayPress={day => {
    console.log('selected day', day),
    setOpen(false),
    input.onChange(day.dateString)
  }}
  monthFormat={'MMM yyyy'}
  hideExtraDays={true}
  disableMonthChange={false}
  firstDay={1}
  hideDayNames={false}
  showWeekNumbers={true}
  onPressArrowLeft={subtractMonth => subtractMonth()}
  onPressArrowRight={addMonth => addMonth()}
  disableAllTouchEventsForDisabledDays={true}
  />
    
        }
        
        </View>
    );
};
const openGallery = (props) => {
  const {input} = props
const options = {
storageOptions: {
path: 'images',
mediaType: 'photo',
},
includeBase64: true,
};

launchImageLibrary(options, response => {
  let source = ""
  if (response.error) {
    console.log('ImagePicker Error: ', response.error)
    } else {
    // You can also display the image using data:
    source = response.assets[0]
    input.onChange(source.uri)
    }
});
};
const renderImage = ({ input, label, meta: { touched, error }, ...custom }) => {
  return( 
  <View style={{flexDirection: 'row',marginTop: 10, marginBottom: 8,borderColor: 'blue',borderWidth: 2,borderRadius: 4}}>
    {/* <TextInput style = {styles.input} editable={false} value={input.value} />
  <Button title="Add Image" {...input} {...custom} onPress={()=> (openGallery({input}))} /> */}
  <TouchableOpacity style = {{width: '100%'}} onPress={()=> openGallery({input})}><TextInput editable={false} placeholder = "Add Image" value={input.value.toString()} />
  <Icon style={{left: 300, marginTop: 12,position: 'absolute'}}name="image" size={20} color="black" />
  </TouchableOpacity>
  </View>
  )
}
const renderLocation = ({ input, label, meta: { touched, error }, ...custom }) => {
  let lat = ''
  let long = ''
  if((input.value.latitude === undefined && input.value.longitude === undefined ) && (lat==='' && long==='')){
    lat = ''
    long = ''
  }
  else {
    lat = input.value.latitude.toString()
    long = input.value.longitude.toString()
  }
  return (
  <View>
    <View style={{flexDirection: 'row',marginBottom: 10}}>
      <TextInput style = {[styles.input,{width: '45%',marginRight: 10}]} placeholder={'Latitude'} editable={false} value={lat} />
      <TextInput style = {[styles.input,{width: '49%',marginLeft: 10}]} placeholder={'Longitude'} editable={false} value={long} />
    </View>
      <Button title="Add Location" {...input}{...custom} onPress={(e)=> (Geolocation.getCurrentPosition(position => {
        const initialPosition = position.coords;
        console.log(initialPosition);
        input.onChange(initialPosition)
        },
        error => Alert.alert('Error', JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}))} 
      />
  </View>
  )
}
  return (
    <View style={dark ? [styles.root,{backgroundColor: 'black'}]:[styles.root,{backgroundColor: 'white'}] }>
      <Text style={dark ? {textAlign: 'center',fontSize: 24, fontWeight: 'bold',margin: 30, color: 'white'}: {textAlign: 'center',fontSize: 24, fontWeight: 'bold',margin: 30, color: 'black'} }>Add New Task</Text>
      <Field
        name={'Task'}
        props={{
          placeholder: 'Task'
        }}
        component={renderInput}
      />
      <Field 
      name={'Date'}
      component={renderDatePicker}
      />
      <Field 
      name={'Image'}
      component={renderImage}
      />
      <Field 
      name={'Location'}
      component={renderLocation}
      />
      <View style={{margin: 100, borderRadius: 6,borderWidth: 2}}>
      <Button title={'Submit'} onPress={handleSubmit(onSubmit)} color={dark ? 'white' : 'black'} />
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  input: {
    padding: 8,
    marginBottom: 8,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 6,
    width: '100%',
    marginTop: 10
  }
});

export default reduxForm({form: 'inputForm',destroyOnUnmount:false})(Form);
// this.props.dispatch(change('JobsForm', 'salary.max_salary', undefined));