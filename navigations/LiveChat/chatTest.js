import React, { Component } from "react";
import PubNubReact from "pubnub-react";

export default class chatTest extends Component {
   
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-f52924a6-11d1-414a-bcc9-411899a66a19', 
      subscribeKey: 'sub-c-505014c6-5a93-11ea-b451-9a833ea0503a'
     });
    this.pubnub.init(this);
    }

componentWillMount() {
    this.pubnub.subscribe({
        channels: ['channel1'],
        withPresence: true
    });

    this.pubnub.getMessage('channel1', (msg) => {
        console.log(msg);
    });

    this.pubnub.getStatus((st) => {
        this.pubnub.publish({
            message: 'hello world from react',
            channel: 'channel1'
        });
    });
}

componentWillUnmount() {
    this.pubnub.unsubscribe({
        channels: ['channel1']
    });
}

render() {
    const messages = this.pubnub.getMessage('channel1');
    return (
        <div>
            <ul>
                {messages.map((m, index) => <li key={'message' + index}>{m.message}</li>)}
            </ul>
        </div>
    );
}
}
