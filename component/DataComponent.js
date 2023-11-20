import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";

const DataComponent = () => {
  const [data, setData] = useState([]);
  const url = "https://bau.edu.bd/api/ComplainList";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const sortedData = json.sort((a, b) => a.id - b.id);
        setData(sortedData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.cell}>ID</Text>
              <Text style={styles.cell}>Name</Text>
              <Text style={styles.cell}>Address</Text>
              <Text style={styles.cell}>date</Text>
              {/* Add more headers based on your data */}
            </View>
            {data.map((post) => (
              <View key={post.id}>
                {post.status === 0 ? (
                  <View style={styles.tableRow}>
                    <Text style={styles.cell}>{post.id}</Text>
                    <Text style={styles.cell}>{post.complain_user}</Text>
                    <Text style={styles.cell}>{post.complain_user_desc}</Text>
                    <Text style={styles.cell}>{post.entry_time}</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DataComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: "#000",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  cell: {
    flex: 1,
    padding: 8,
  },
});
