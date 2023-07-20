import React, { useEffect, useState } from "react";
import { Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import axios from "axios";
import Article from "../components/Article";
import { AppSizes, SafePadding, commonStyles } from "../constants";

const NewsScreen = () => {
  const [articles, setArticles] = useState([]);
  const getNews = () => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=6d3ae0af49a4439b8d4b633eddb65ddb",
        {
          params: {
            category: "health",
            q: "food",
          },
        }
      )
      .then((response) => {
        // handle success
        setArticles(response.data.articles);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <SafeAreaView style={styles.news}>
      <Text style={commonStyles.ribbon}>Food News</Text>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <Article
            urlToImage={item.urlToImage}
            title={item.title}
            description={item.description}
            author={item.author}
            publisedAt={item.publisedAt}
            sourceName={item.source.name}
            url={item.url}
          />
        )}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
  },
  news: {
    flex: 1,
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: AppSizes.HomeScreenElementBorderRadius,
    borderWidth: AppSizes.HomeScreenElementBorderWidth,
    /* height: AppSizes.HomeScreenElementHeight, */
    padding: AppSizes.HomeScreenElementPadding,
  },
});
