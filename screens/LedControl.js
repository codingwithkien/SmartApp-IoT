import React, { useEffect, useState } from "react";
import { Text, SafeAreaView } from "react-native";
import WebSocket from "react-native-websocket";

export default function LedControl() {
  const [receivedMessage, setReceivedMessage] = useState("Loading...");

  const handleMessage = (message) => {
    console.log("Received message");
    setReceivedMessage(message);
  };

  useEffect(() => {
    const socketUrl = "ws://localhost:3000"; // Fix the WebSocket URL
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (e) => {
      console.log("111");
      handleMessage(e.data);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <SafeAreaView>
      <Text style={{ color: "black" }}>
        Received Message: {receivedMessage}
      </Text>

      <Text>Message: {receivedMessage}</Text>
    </SafeAreaView>
  );
}
