import React, {useContext, useState} from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Field, reduxForm, change} from 'redux-form';
import {Calendar} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
import {Mode} from '../components/DarkMode';
import I18n from '../components/I18n';

let theme;
// Modal screen to add new Task with added language property
const renderInput = ({input}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 8,
        borderColor: 'blue',
        borderWidth: 2,
        borderRadius: 4,
      }}>
      <TextInput
        style={
          theme === 'light' ? {width: '85%'} : {color: 'white', width: '85%'}
        }
        onChangeText={e => {
          input.onChange(e);
        }}
        placeholder={'Text'}
        placeholderTextColor={theme === 'light' ? 'black' : 'white'}
      />
      <Icon
        style={{left: 300, marginTop: 12, position: 'absolute'}}
        name="list"
        size={20}
        color="black"
      />
    </View>
  );
};
const Form = props => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const {handleSubmit, navigation} = props;
  const {dark} = useContext(Mode);
  theme = dark;
  const onSubmit = values => {
    return navigation.navigate('List');
  };
  const renderDatePicker = ({
    input,
    label,
    meta: {touched, error},
    ...custom
  }) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 8,
            borderColor: 'blue',
            borderWidth: 2,
            borderRadius: 4,
          }}>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => setOpen(open => !open)}>
            <TextInput
              style={dark === 'light' ? {color: 'black'} : {color: 'white'}}
              placeholder={'Deadline of Task'}
              placeholderTextColor={dark === 'light' ? 'black' : 'white'}
              editable={false}
              value={input.value.toString()}
            />
            <Icon
              style={{left: 300, marginTop: 12, position: 'absolute'}}
              name="calendar"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {open && (
          <Calendar
            {...input}
            {...custom}
            onDayPress={day => {
              setOpen(false), input.onChange(day.dateString);
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
        )}
      </View>
    );
  };
  const openGallery = props => {
    const {input} = props;
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      let source = '';
      if (response.error) {
      } else if (response.didCancel) {
      } else {
        // You can also display the image using data:
        source = response.assets[0];
        input.onChange(source.uri);
      }
    });
  };
  const renderImage = ({input, label, meta: {touched, error}, ...custom}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          marginBottom: 8,
          borderColor: 'blue',
          borderWidth: 2,
          borderRadius: 4,
        }}>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => openGallery({input})}>
          <TextInput
            style={dark === 'light' ? {color: 'black'} : {color: 'white'}}
            editable={false}
            placeholder="Add Image"
            placeholderTextColor={dark === 'light' ? 'black' : 'white'}
            value={input.value.toString()}
          />
          <Icon
            style={{left: 300, marginTop: 12, position: 'absolute'}}
            name="image"
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderLocation = ({
    input,
    label,
    meta: {touched, error},
    ...custom
  }) => {
    let lat = '';
    let long = '';
    if (
      input.value.latitude === undefined &&
      input.value.longitude === undefined &&
      lat === '' &&
      long === ''
    ) {
      lat = '';
      long = '';
    } else {
      lat = input.value.latitude.toString();
      long = input.value.longitude.toString();
    }
    return (
      <View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <TextInput
            style={
              dark === 'light'
                ? [
                    styles.input,
                    {width: '45%', marginRight: 10, color: 'black'},
                  ]
                : [
                    styles.input,
                    {width: '45%', marginRight: 10, color: 'white'},
                  ]
            }
            placeholder={'Latitude'}
            editable={false}
            value={lat}
            placeholderTextColor={dark === 'light' ? 'black' : 'white'}
          />
          <TextInput
            style={
              dark === 'light'
                ? [
                    styles.input,
                    {width: '49%', marginRight: 10, color: 'black'},
                  ]
                : [
                    styles.input,
                    {width: '49%', marginRight: 10, color: 'white'},
                  ]
            }
            placeholder={'Longitude'}
            editable={false}
            value={long}
            placeholderTextColor={dark === 'light' ? 'black' : 'white'}
          />
        </View>
        <Button
          title="Add Location"
          {...input}
          {...custom}
          onPress={e =>
            Geolocation.getCurrentPosition(
              position => {
                const initialPosition = position.coords;
                input.onChange(initialPosition);
              },
              error => Alert.alert('Error', JSON.stringify(error)),
              {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
            )
          }
        />
      </View>
    );
  };
  return (
    <View
      style={
        dark == 'dark'
          ? [styles.root, {backgroundColor: 'black'}]
          : [styles.root, {backgroundColor: 'white'}]
      }>
      <Text
        style={
          dark == 'dark'
            ? {
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 'bold',
                margin: 30,
                color: 'white',
              }
            : {
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 'bold',
                margin: 30,
                color: 'black',
              }
        }>
        {I18n.t('Task')}
      </Text>
      <Field name={'Task'} component={renderInput} blurOnSubmit={false} />
      <Field name={'Date'} component={renderDatePicker} />
      <Field name={'Image'} component={renderImage} />
      <Field name={'Location'} component={renderLocation} />
      <View style={{margin: 100, borderRadius: 6, borderWidth: 2}}>
        <Button
          title={'Submit'}
          onPress={handleSubmit(onSubmit)}
          color={dark == 'dark' ? 'green' : 'black'}
        />
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
    marginTop: 10,
  },
});

export default reduxForm({form: 'inputForm', destroyOnUnmount: false})(Form);
