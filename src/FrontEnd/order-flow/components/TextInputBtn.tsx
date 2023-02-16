import { InputOutline } from "react-native-input-outline";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const TextInputBtn = React.forwardRef((props: any, ref:any) => {

    return (
      <View style={styles.inputContainer}>
        <InputOutline
          {...props}
          ref={ref}
          style={styles.input}
          activeColor={Colors.app.tint}
        />
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
          <MaterialCommunityIcons
            name="magnify"
            size={30}
            color={Colors.app.tint}
          />
        </TouchableOpacity>
      </View>
    );
})

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",

    marginVertical: 10,
    width: "100%",
  },

  input: {
    width: "70%",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  button: {
    backgroundColor: Colors.app.secondaryTint,
    width: "12%",
    height: "100%",
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderColor: Colors.app.tint,
    borderWidth: 1,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});


export default TextInputBtn;