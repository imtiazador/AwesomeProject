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

export default function App() {
  const [data, setData] = useState([]);
  const [csrfToken, setCsrfToken] = useState(null);
  const url = "https://bau.edu.bd/api/ComplainList";

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    fetch(url)
      .then((res) => {
        const token = res.headers.get("X-CSRF-TOKEN");

        console.log(token);
        console.log(url);
        setCsrfToken(token);
        return res.json();
      })
      .then((json) => {
        // Sort the data array by id in ascending order
        const sortedData = json.sort((a, b) => a.id - b.id);
        setData(sortedData);
      })
      .catch((err) => console.log(err));
  };

  const handleStatusUpdate = (id) => {
    const updateUrl = `https://bau.edu.bd/api/statusUpdate`;
    console.log("Clicked");
    console.log(csrfToken);
    // if (!csrfToken) {
    //   console.error("CSRF token not available");
    //   return;
    // }
    fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({ id: id, status: 1 }, alert("hello")),
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("hello");
          // fetchData(); // Fetch updated data after successful update
        }
        return res.json();
      })
      .then((updatedData) => {
        console.log(updatedData);
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
              <Text style={styles.cell}>Actions</Text>
              {/* Add more headers based on your data */}
            </View>
            {data.map((post) => (
              <View key={post.id}>
                {
                  post.status === 0 ? (
                    <View style={styles.tableRow}>
                      <Text style={styles.cell}>{post.id}</Text>
                      <Text style={styles.cell}>{post.complain_user}</Text>
                      <Text style={styles.cell}>{post.complain_user_desc}</Text>
                      <Text style={styles.cell}>{post.entry_time}</Text>
                      {/* <TouchableOpacity
                        onPress={() => handleStatusUpdate(post.id)}
                      >
                        <Text style={styles.cell}>Update Status</Text>
                      </TouchableOpacity> */}
                      <Button
                        title="update"
                        onPress={() => handleStatusUpdate(post.id)}
                      />
                    </View>
                  ) : null /*(
                    <View style={styles.tableRow}>
                      <Text style={styles.cell}>{post.id}</Text>
                      <Text style={styles.cell}>{post.status}</Text>
                    </View>
                  )*/
                }
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

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
