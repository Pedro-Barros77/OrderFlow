import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { CategoryColor } from "../constants/Enums";

const CategoryCard = (props: {
  label?: string;
  colorTheme?: CategoryColor;
  iconName?: string;
}) => {
  return (
    <TouchableOpacity
    activeOpacity={.7}
      style={[
        styles.container,
        { backgroundColor: getColor(props.colorTheme) , borderColor: getColor(props.colorTheme, true)},
      ]}
    >
      <Text style={styles.label}>{props.label}</Text>
      <MaterialCommunityIcons name="beer" size={24} color={getColor(props.colorTheme, true)} />

    </TouchableOpacity>
  );
};

function getColor(catColor?: CategoryColor, isSecondary?: boolean): string {
  switch (catColor) {
    case CategoryColor.blue:
      if (isSecondary) return Colors.app.catTheme_darkBlue;
      else return Colors.app.catTheme_blue;
    default:
      return Colors.app.gray;
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent:"space-between",
    paddingHorizontal: 10,

    marginVertical: 10,
    marginHorizontal: 5,
    width: "45%",
    height: 50,
    borderWidth: 3,
    borderRadius: 10,
  },

  label:{
    color:"white",
  }
});

export default CategoryCard;
