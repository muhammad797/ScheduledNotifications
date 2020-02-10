import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

class IOSDateTimePicker extends React.Component {
  state = {
    datetime: new Date(),
  };

  onCancelPress = () => {
    this.props.onCancel();
    this.setState({datetime: new Date()});
  };

  onDonePress = () => {
    this.props.onDone(this.state.datetime);
    this.setState({datetime: new Date()});
  };

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <View style={styles.datetimeModal}>
        <View style={styles.iosDatetimeOptions}>
          <TouchableOpacity onPress={this.onCancelPress}>
            <Text style={styles.iosOptionText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onDonePress}>
            <Text style={styles.iosBlueOptionText}>Done</Text>
          </TouchableOpacity>
        </View>
        <DateTimePicker
          value={this.state.datetime}
          mode={'datetime'}
          style={styles.datetimePicker}
          onChange={(event, datetime) => this.setState({datetime})}
        />
      </View>
    );
  }
}

export default IOSDateTimePicker;

const styles = {
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
