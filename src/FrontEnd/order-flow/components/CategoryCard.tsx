import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {Colors, GetCategoryColor} from "../constants/Colors";
import { CategoryColor, CategoryIcons } from "../constants/Enums";
import { CategoryIcon } from "../constants/Icons";

const CategoryCard = (props: {
  label?: string;
  colorTheme?: CategoryColor;
  catIcon?: string;
  hidden?: boolean;
}) => {
  return props.hidden ? <View style={{width:"47.5%"}}></View> : (
    
    <TouchableOpacity
    activeOpacity={.7}
      style={[
        styles.container,
        { backgroundColor: GetCategoryColor(props.colorTheme) , borderColor: GetCategoryColor(props.colorTheme, true)},
      ]}
    >
      <Text style={styles.label}>{props.label}</Text>
      <CategoryIcon catIcon={props.catIcon} size={24} color={GetCategoryColor(props.colorTheme, true)}></CategoryIcon>

    </TouchableOpacity>
    );
};



const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent:"space-between",
    paddingHorizontal: 10,
    
    marginVertical: 3,
    // marginHorizontal: 5,
    // marginRight:"auto",
    width: "47.5%",
    height: 35,
    borderWidth: 2,
    borderRadius: 5,
  },

  label:{
    color:"white",
  }
});

export default CategoryCard;
