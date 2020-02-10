import React from 'react';
import {SafeAreaView, Text, TextInput, TouchableOpacity} from 'react-native';

class App extends React.Component {
  state = {
    message: '',
    datetime: '',
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Schedule Notifications</Text>
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default App;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
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
  }
};
