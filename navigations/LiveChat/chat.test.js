import { GiftedChat } from 'react-native-gifted-chat';
import React, { Component } from "react";
import PubNubReact from 'pubnub-react';

export default class App extends Component {

    constructor(props) {
        super(props);
      
        this.id = this.randomid();
        this.pubnub = new PubNubReact({ publishKey: 'pub-c-f52924a6-11d1-414a-bcc9-411899a66a19', subscribeKey: 'sub-c-505014c6-5a93-11ea-b451-9a833ea0503a' });
        this.pubnub.init(this);
      }
      randomid = () => {
        return Math.floor(Math.random() * 100);
      }
    
      componentWillMount() {
        this.pubnub.subscribe({ channels: ['channel1'], withPresence: true });
        
        this.pubnub.getMessage("channel1", m => {
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, m["message"]),
            }));
          });
        
        this.pubnub.getStatus((st) => {
          console.log(st);
          this.pubnub.publish({ message: 'hello world from react', channel: 'channel1' });
        });
 
      }
      
      componentWillUnmount() {
        this.pubnub.unsubscribe({ channels: ['channel1'] });
      }
      onSend(messages = []) {
        this.pubnub.publish({
          message: messages,
          channel: "channel1",
        });
      }
      render() {
        return (
            <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: this.id,
            }}
          />
        );
      }
    }
    
