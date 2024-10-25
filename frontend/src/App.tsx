import {useEffect, useState} from 'react';
import './App.css';
import { EventsOn } from "../wailsjs/runtime/runtime";

function withEvent(eventName: string) {
  const [event, setEvent] = useState<String|null>(null);
  useEffect(() => {
    EventsOn(eventName, (data) => {
      console.log("Server started", data)
      setEvent(JSON.stringify(data))
    })
  }, []);
  return event
}

function App() {
    const event = withEvent("ServerStarted");
    return (
        <div id="App">
            <h1>View Events</h1>
            <pre style={{
              color: "white",
              border: "1px solid red"
            }}>{event}</pre>
        </div>
    )
}

export default App
