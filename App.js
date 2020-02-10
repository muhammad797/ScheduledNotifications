import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import uuid from 'uuid';

class App extends React.Component {
  state = {
    message: '',
    datetime: '',
    data: [
      {message: 'Go to doctor', id: '1', datetime: 1581323191903},
      {message: 'Write a book', id: '2', datetime: 1581294495768},
      {message: 'Manage schedule', id: '3', datetime: 1581312513229},
    ],
  };

  createScheduledNotification = () => {
    const {message, datetime, data} = this.state;
    const id = uuid();
    // TODO: Create notification
    data.push({message, datetime, id});
    this.setState({message: '', datetime: '', data});
  };

  deleteNotification = notificationId => {
    let {data} = this.state;
    // TODO: Delete notification
    data = data.filter(item => item.id !== notificationId);
    this.setState({data});
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
            <TextInput
              value={this.state.datetime}
              onChangeText={datetime => this.setState({datetime})}
              style={styles.field}
              placeholder={'Enter Date & Time'}
            />
            <TouchableOpacity
              style={styles.button}
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
                  <Text style={styles.datetimeText}>{item.datetime}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.deleteNotification(item.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
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
    // alignItems: 'center',
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
};
