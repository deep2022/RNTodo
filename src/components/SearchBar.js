import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SearchComponent = ({ onSearchEnter }) => {
  const [term, setTerm] = useState("");

  return (
    <View style={styles.searchWrapperStyle}>
      <Icon size={18} name="search" color="black" style={styles.iconStyle} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="black"
        style={styles.searchInputStyle}
        value={term}
        onChangeText={(newText) => {
          setTerm(newText);
          onSearchEnter(newText);
        }}
        onEndEditing={() => {
          onSearchEnter(term);
        }}
      />
      <Icon
        size={18}
        name="close"
        color="black"
        style={styles.iconStyle}
        onPress={() => {
          setTerm("");
          onSearchEnter("");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapperStyle: {
    backgroundColor: "#f5eded",
    flexDirection: "row",
    justifyContent: "center",
    left: 10,
    borderRadius: 20,
    width: '95%'
  },
  iconStyle: {
    marginTop: 12,
    marginHorizontal: 8,
  },
  searchInputStyle: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
});

export default SearchComponent;