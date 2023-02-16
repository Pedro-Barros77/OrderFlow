import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import React from "react";

const HorizontalDivider = (props: {
  label?: string;
  lineColor?: string;
  lineWidth?: number;
}) => {

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.leftLine,
          {
            backgroundColor: props.lineColor
              ? props.lineColor
              : Colors.app.gray,
            height: props.lineWidth ? props.lineWidth : 1,
          },
        ]}>
        
      </View>

      <Text style={[styles.label, {color:props.lineColor ? props.lineColor : Colors.app.gray}]}>{props.label}</Text>

      <View 
        style={[
          styles.rightLine,
          {
            backgroundColor: props.lineColor
              ? props.lineColor
              : Colors.app.gray,
            height: props.lineWidth ? props.lineWidth : 1,
          },
        ]}>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",

    marginVertical: 10,
    width: "80%",
  },

  leftLine: {
    width: "5%",
    marginRight: 5,
  },

  label: {},

  rightLine: {
    width:"5%",
    marginLeft: 5,
    flex:1,
  },
});

export default HorizontalDivider;
