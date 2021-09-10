/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';


import io from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
    };
  }




  componentDidMount() {
    this.socket = io("http://127.0.0.1:3000");
    this.socket.on("chat message", msg => {
      this.setState({
        chatMessages: [...this.state.chatMessages, msg]
      });
    });
  }

  submitChatMessage() {
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({ chatMessage: '' });
  }
  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text style={{ borderWidth: 2, top: 500, borderColor: "white" }}>{chatMessage}</Text>
    ));
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <Text style={{
          color: "white",
          backgroundColor: 'black',
          width: "100%",
          textAlign: 'center',
          justifyContent: 'center',
          paddingTop: 10,
          fontWeight:"500",
          paddingBottom: 10
        }}>{"SocketDemo"}
        </Text>
        <View style={styles.container}>

          {chatMessages}
          <TextInput
            style={{ height: 40, borderWidth: 1, top: 600, margin: 30,borderRadius:5,padding:2}}
            autoCorrect={false}
            placeholder={"Type Msg here"}
            value={this.state.chatMessage}
            onSubmitEditing={() => this.submitChatMessage()}
            onChangeText={chatMessage => {
              this.setState({ chatMessage });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {

    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
