import 'intl';
import "intl/locale-data/jsonp/pt-BR"
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors, GetCategoryColor } from "../constants/Colors";
import { CategoryColor, CategoryIcons } from "../constants/Enums";
import { CategoryIcon } from "../constants/Icons";
import { Category } from '../models/Category';
import { Product } from '../models/Product';

const ProductCard = (props: {
  product: Product;
  hidden?: boolean;
}) => {

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });


  return props.hidden ? (
    <View style={{ width: "30%" }}></View>
  ) : (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <View
        style={[styles.imgContaier, { backgroundColor: GetCategoryColor(props.product.Category?.ColorTheme, true) }]}>
        {props.product.IsFavorite ?
          <AntDesign style={styles.star} name="star" size={15} color={Colors.app.yellowStar} />
          :
          <></>
        }

        <CategoryIcon
          catIcon={props.product.Category?.CategoryIcon}
          size={50}
          color={GetCategoryColor(props.product.Category?.ColorTheme, false)}
        ></CategoryIcon>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit>
          {props.product.Name}
        </Text>
        <Text style={styles.price} numberOfLines={1} adjustsFontSizeToFit>
          {formatter.format(props.product.Price ?? 0).replace("$", "$ ")}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.7} style={styles.btnAdd}>
        <Text style={styles.btnAddText}>
          Adicionar
        </Text>
      </TouchableOpacity>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.app.white,

    marginVertical: 5,
    width: "30%",
    height: 180,

    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },

  imgContaier: {
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  star: {
    position: "absolute",
    right: 5,
    top: 5,
  },

  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    // display:"flex",
    // alignContent:"flex-start",
  },

  title: {
    marginHorizontal: 1,
    color: Colors.app.text,
    textAlign: "center",
    fontSize: 14,
    letterSpacing: -0.5
  },

  price: {
    marginHorizontal: 1,
    color: Colors.app.currencyGreen,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "bold",
  },

  btnAdd: {
    display: "flex",
    width: "100%",
    height: 30,
    backgroundColor: Colors.app.tintGreen,
    justifyContent: "center",
  },
  btnAddText: {
    color: Colors.app.white,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  }
});

export default ProductCard;
