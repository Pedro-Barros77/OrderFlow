import 'intl';
import "intl/locale-data/jsonp/pt-BR"
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Pressable } from "react-native";
import { Colors, GetCategoryColor } from "../constants/Colors";
import { ItemStatus } from "../constants/Enums";
import { CategoryIcon } from "../constants/Icons";
import { Item } from '../models/Item';
import { useRef, useState } from 'react';
import { MenuItem, Menu } from 'react-native-material-menu';
import { InputOutline } from 'react-native-input-outline';
import Checkbox from 'expo-checkbox';

const TableItemCard = (props: {
  item: Item;
  onToggleCard?: (() => void);
  onRemove?: (() => void);
  onChangeCount?: (() => void);
  onChangeStatus?: (() => void);
  onChangePaid?: (() => void);
}) => {

  const [showStatus, setShowStatus] = useState(false);
  const [status, setStatus] = useState(ItemStatus.Pendente);
  const [discount, setDiscount] = useState(0);
  const [additional, setAdditional] = useState(0);
  const [count, setCount] = useState(1);
  const [note, setNote] = useState("");
  const [paid, setPaid] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;


  const [opened, setOpened] = useState(false);

  const statusEnumValues = Object.values(ItemStatus);
  const statusLabels = statusEnumValues.slice(0, statusEnumValues.length / 2)
  const statusValues = statusEnumValues.slice(statusEnumValues.length / 2)

  const statusMap = statusLabels.map(function (item, i) {
    return { label: item.toString(), value: statusValues[i].toString() };
  });


  function onSelectStatus(value: number) {
    if (props.onChangeStatus)
      props.onChangeStatus();
    setStatus(value);
    setShowStatus(false);
  }

  function onNoteChange(value: string) {
    setNote(value);
  }

  function OnPlus() {
    if (count >= 99) return;
    if (props.onChangeCount)
      props.onChangeCount();
    setCount(count + 1);
  }
  function OnMinus() {
    if (count == 1) return;
    if (props.onChangeCount)
      props.onChangeCount();
    setCount(count - 1);
  }

  function onTogglePaid() {
    if (props.onChangePaid)
      props.onChangePaid();


    setPaid(!paid);
  }

  function onToggleCard() {
    if (props.onToggleCard)
      props.onToggleCard();
    if (opened) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      fadeAnim.addListener((val) => {
        if (val.value == 0 && opened) {
          setOpened(false);
          fadeAnim.removeAllListeners();
        }
      })
      return
    }

    setOpened(true)

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  function getPrice() {
    return (props.item.product!.price * props.item.count) + props.item.additional - props.item.discount;
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <View style={styles.container}>
      {paid ?
        <View style={styles.rectPaid} pointerEvents="none"></View>
        : null}
      {paid ?
        <View style={styles.linepaid}></View>
        : null}
      <Pressable style={styles.cardButton} onPress={onToggleCard}>

        <View style={[styles.imgContainer, { backgroundColor: GetCategoryColor(props.item.product?.category.colorTheme) }]}>
          <CategoryIcon catIcon={props.item.product?.category.categoryIcon} size={60} color={GetCategoryColor(props.item.product?.category.colorTheme, true)}></CategoryIcon>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{props.item.product?.title}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>status:</Text>



            <View style={styles.menuDropdownContainer}>
              <Menu
                style={{ transform: [{ translateY: 35 }] }}
                visible={showStatus}
                anchor={
                  <TouchableOpacity style={styles.dropDownContainer} onPress={() => setShowStatus(!showStatus)}>
                    <Text style={styles.dropDownText}>{ItemStatus[status]}</Text>
                    <Entypo name={`triangle-${showStatus ? "up" : "down"}`} size={20} color={paid ? Colors.app.gray : Colors.app.tint} />
                  </TouchableOpacity>
                }
                onRequestClose={() => setShowStatus(false)}
              >

                {
                  statusMap.map(s =>
                  (
                    <MenuItem key={s.value} onPress={() => onSelectStatus(Number.parseInt(s.value))} style={{ width: '100%' }}>
                      <Text>{s.label}</Text>
                    </MenuItem>
                  ))
                }
              </Menu>
            </View>

          </View>
        </View>

        <View style={styles.rightContainer}>
          <View style={styles.countContainer}>
            <MaterialCommunityIcons onPress={OnMinus} name="minus" size={30} color={paid ? Colors.app.gray : Colors.app.tint} />
            <Text style={styles.txtCount}>{count}</Text>
            <MaterialCommunityIcons onPress={OnPlus} name="plus" size={30} color={paid ? Colors.app.gray : Colors.app.tint} />
          </View>
          <View style={styles.priceContainer}>
            <Text style={[styles.txtPrice, { color: paid ? Colors.app.gray : Colors.app.tint }]}>{formatter.format(getPrice()).replace("$", "$ ")}</Text>
          </View>

        </View>

      </Pressable>

      {opened ?
        <Animated.View style={[styles.detailsContainer, {
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-150, 0]
              })
            },
            {
              scaleY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
              })
            }
          ],

        }]}>

          <View style={styles.discountRow}>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="sale" size={30} color={paid ? Colors.app.gray : Colors.app.tint} />
              <InputOutline
                placeholder="Desconto"
                keyboardType='decimal-pad'
                onChangeText={(value) => setDiscount(Number.parseInt(value))}
                value={formatter.format(discount).replace("R$", "")}
                style={styles.input}
                activeColor={Colors.app.tint}
                paddingVertical={8}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="cash-plus" size={30} color={paid ? Colors.app.gray : Colors.app.tint} />
              <InputOutline
                placeholder="Adicional"
                keyboardType='decimal-pad'
                onChangeText={(value) => setAdditional(Number.parseInt(value))}
                value={formatter.format(additional).replace("R$", "")}
                style={styles.input}
                activeColor={Colors.app.tint}
                paddingVertical={8}
              />
            </View>

          </View>
          <View style={styles.noteRow}>
            <InputOutline
              style={[styles.input, { height: "100%", width: "95%" }]}
              activeColor={Colors.app.tint}
              placeholder="Observação"
              onChangeText={onNoteChange}
              numberOfLines={5}
              textAlignVertical={"top"}
              value={note}
              multiline={true}
              maxLength={255}
            />

          </View>
          <View style={styles.paidRow}>
            <View style={styles.checkboxContainer}>
              <Text style={styles.paidLabel}>Pago</Text>
              <Checkbox
                color={Colors.app.tint}
                value={paid}
                onValueChange={onTogglePaid} />
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.removeContainer} onPress={props.onRemove}>
              <MaterialCommunityIcons name="trash-can-outline" size={24} color={Colors.app.redCancel} />
              <Text style={styles.removeLabel}>Remover</Text>
            </TouchableOpacity>
          </View>

        </Animated.View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  cardButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.app.white,


    width: "90%",
    height: 80,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: Colors.app.darkGray,

    shadowColor: Colors.app.black,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },

  imgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "20%",
    backgroundColor: Colors.app.catTheme_yellow,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },

  contentContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "50%",
    height: "100%",
    marginLeft: 10,
  },

  title: {
    color: Colors.app.darkGray,
    fontSize: 18,
    fontWeight: '500',
  },

  statusContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  statusLabel: {
    color: Colors.app.darkGray,
    fontSize: 15,
  },

  menuDropdownContainer: {
    width: "60%",
  },

  dropDownContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    height: 30,
    marginBottom: 5,
    marginLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.app.darkGray,
  },

  dropDownText: {
    color: Colors.app.darkGray,
    fontSize: 13,
  },

  rightContainer: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
  },

  countContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "50%",
  },

  txtCount: {
    fontSize: 23,
  },

  priceContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  txtPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.app.currencyGreen,
    marginBottom: 5,
  },

  detailsContainer: {
    zIndex: -1,
    width: "80%",
    height: 150,
    borderWidth: 1,
    borderColor: Colors.app.darkGray,
    backgroundColor: Colors.app.white,
    transition: "all 1s",
  },

  discountRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "35%",
    justifyContent: "space-evenly",
  },
  noteRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "40%",
    justifyContent: "center",
  },
  paidRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "25%",
    justifyContent: "space-between",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    width: "48%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  input: {
    width: "75%",
    alignSelf: "center",
    height: "70%",
    backgroundColor: Colors.app.white,
  },

  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  paidLabel: {
    fontSize: 16,
    color: Colors.app.darkGray,
    marginHorizontal: 10,
  },

  removeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  removeLabel: {
    fontSize: 16,
    color: Colors.app.redCancel,
    fontWeight: "bold",
    marginRight: 10,
    marginLeft: 3,
  },
  linepaid: {
    position: 'absolute',
    top: 40,
    zIndex: 999,
    left: 10,
    right: 10,
    alignSelf: 'center',
    height: 2,
    backgroundColor: Colors.app.black,
    alignContent: 'center',
    alignItems: 'center',
  },

  rectPaid: {
    position: 'absolute',
    zIndex: 998,
    top: 1,
    left: 20,
    right: 20,
    height: '100%',
    borderRadius: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },


});

export default TableItemCard;
