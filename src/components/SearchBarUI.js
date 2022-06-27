import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// functional component for searchbar
const SearchComponent = ({ onSearchEnter }) => {
  const [term, setTerm] = useState("");

  return (
    <View style={styles.searchWrapperStyle}>
      <Icon size={18} name="search" color="black" style={styles.iconStyle} />
      <TextInput
        placeholder={"Activity"}
        placeholderTextColor="black"
        style={styles.searchInputStyle}
        value={term}
        autoFocus={true}
        onChangeText={(newText) => {
          setTerm(newText);
        }}
        onEndEditing={()=> {
            onSearchEnter(false)
        }}
      />
      <Icon
        size={18}
        name="close"
        color="black"
        style={styles.iconStyle}
        onPress={() => {
          setTerm("");
          onSearchEnter(false)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapperStyle: {
    backgroundColor: "#f5eded",
    flexDirection: "row",
    justifyContent: 'center',
    borderRadius: 20,
    width: '87%',
    marginHorizontal:25,
    marginVertical:10
  },
  iconStyle: {
    marginTop: 15,
    marginHorizontal: 8,
  },
  searchInputStyle: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
});

export default SearchComponent;