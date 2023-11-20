import React from "react";
import { StyleSheet, View } from "react-native";
import DataComponent from "./component/DataComponent"; // Update the import path based on your project structure

export default function App() {
  return (
    <View style={styles.container}>
      <DataComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
