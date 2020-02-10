import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  NativeModules,
} from 'react-native';
import uuid from 'uuid';
import IOSDateTimePicker from './src/components/IOSDateTimePicker';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const {NotificationScheduler} = NativeModules;

const LIST_STORAGE_KEY = 'LIST';

class App extends React.Component {
  state = {
    message: '',
    datetime: null,
    datePickerActive: false,
    data: [],
  };

  async componentDidMount() {
    let data = await AsyncStorage.getItem(LIST_STORAGE_KEY);
    if (data) {
      data = JSON.parse(data);
      this.setState({data});
    } else {
      AsyncStorage.setItem(LIST_STORAGE_KEY, '[]');
    }
  }

  createScheduledNotification = () => {
    const {message, datetime, data} = this.state;
    const id = uuid();
    data.push({id, message, datetime});
    this.setState({message: '', datetime: '', data}, () => {
      AsyncStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(data));
    });

    // Schedule the notification
    NotificationScheduler.scheduleNotification(id, message, datetime.getTime());
  };

  deleteNotification = notificationId => {
    let {data} = this.state;
    data = data.filter(item => item.id !== notificationId);
    this.setState({data}, () => {
      AsyncStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(data));
    });

    // Remove the notification
    NotificationScheduler.removeNotification(notificationId);
  };

  onDateTimePress = () => this.setState({datePickerActive: true});

  onDatePickerCancel = () => this.setState({datePickerActive: false});

  onDatePickerDone = datetime => {
    this.setState({datetime, datePickerActive: false});
  };

  getFormattedDate = (datetime, alt) => {
    return datetime ? moment(datetime).format('MMMM Do YYYY, h:mm:ss a') : alt;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.addContainer}>
            <Text style={styles.title}>Schedule Notifications</Text>
            <TextInput
              value={this.state.message}
              onChangeText={message => this.setState({message})}
              style={styles.field}
              placeholder={'Enter notification message'}
            />
            <TouchableOpacity
              style={styles.field}
              onPress={this.onDateTimePress}>
              <Text
                style={{color: this.state.datetime ? '#000000' : '#555555'}}>
                {this.getFormattedDate(
                  this.state.datetime,
                  'Select Date & Time',
                )}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              disabled={!this.state.datetime || this.state.message.length === 0}
              onPress={this.createScheduledNotification}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.data}
            extraData={this.state}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item}) => (
              <View style={styles.item}>
                <View>
                  <Text style={styles.itemText}>{item.message}</Text>
                  <Text style={styles.datetimeText}>
                    {this.getFormattedDate(item.datetime)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.deleteNotification(item.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <IOSDateTimePicker
          visible={this.state.datePickerActive}
          onCancel={this.onDatePickerCancel}
          onDone={this.onDatePickerDone}
        />
      </SafeAreaView>
    );
  }
}

export default App;

const styles = {
  container: {
    flex: 1,
  },
  content: {
    width: '80%',
    alignSelf: 'center',
    flex: 1,
  },
  addContainer: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    marginTop: 25,
    fontWeight: '500',
  },
  field: {
    padding: 10,
    backgroundColor: '#EEEEEE',
    width: '100%',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'flex-end',
    backgroundColor: '#7f0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 4,
    marginBottom: 5,
  },
  deleteText: {
    color: '#7f0000',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 3,
  },
  datetimeText: {
    fontSize: 12,
    color: '#555555',
  },
  datetimeModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  datetimePicker: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 15,
  },
  iosDatetimeOptions: {
    padding: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iosBlueOptionText: {
    color: 'rgb(14, 122, 254)',
    fontWeight: '500',
    fontSize: 16,
  },
  iosOptionText: {
    color: 'rgb(135, 135, 139)',
    fontWeight: '500',
    fontSize: 16,
  },
};
