import React from "react";
import { StyleSheet, Image, Text, View, Pressable } from "react-native";
import moment from "moment";
import * as WebBrowser from "expo-web-browser";

const Article = (props) => {
  const goToSource = () => {
    console.log(props.url);
    WebBrowser.openBrowserAsync(props.url);
  };

  return (
    <Pressable style={styles.container} onPress={goToSource}>
      {/* image */}
      <Image
        source={{
          uri: props.urlToImage,
        }}
        style={styles.image}
      />
      <View style={{ padding: 20 }}>
        {/* title */}
        <Text style={styles.title}>{props.title}</Text>

        {/* description */}
        <Text style={styles.description} numberofLines={3}>
          {props.description}
        </Text>

        {/* data */}
        <View style={styles.data}>
          <Text style={styles.heading}>
            by: <Text style={styles.author}>{props.author}</Text>
          </Text>
          <Text style={styles.date}>
            {moment(props.publisedAt).format("MMM Do YY")}
          </Text>
        </View>

        {/* source */}
        <View style={{ marginTop: 10 }}>
          <Text>
            source: <Text style={styles.source}> {props.sourceName}</Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Article;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 40,
    shadowOpacity: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 5,
    },
    backgroundColor: "#fff",
    marginTop: 20,
  },
  image: {
    marginTop: 20,
    height: 200,
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    margin: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  heading: {},
  author: {
    fontWeight: "bold",
    fontSize: 15,
  },
  date: {
    fontWeight: "bold",
    color: "#e63946",
    fontSize: 15,
  },
  source: {
    fontWeight: "bold",
    color: "#e63946",
    fontSize: 18,
  },
});
