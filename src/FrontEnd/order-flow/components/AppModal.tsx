import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { Colors, GetCategoryColor } from "../constants/Colors";
import { CategoryColor, CategoryIcons } from "../constants/Enums";
import { CategoryIcon } from "../constants/Icons";

const AppModal = (props: {
  visible: boolean,
  onClose: (() => void),
  title: string,
  message: string,
  buttons?: "ok" | "okcancel" | "yesno" | "close",
  modalType?: "info" | "warning" | "error",
  onCanel?: (() => void),
  onYes?: (() => void),
  onNo?: (() => void),
  showCloseBtn?: boolean,
}) => {

  let titleColor = Colors.app.tint;
  if(props.modalType == "warning"){
    titleColor = Colors.app.catTheme_yellow
  }
  else if(props.modalType == "error"){
    titleColor = Colors.app.redCancel
  }


  return (


    <Modal

      animationType={"fade"}
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onClose}>
      <View style={styles.modalBackDrop}>
        <View style={styles.modalView}>

          {props.showCloseBtn == true || props.showCloseBtn == undefined ?
            <TouchableOpacity onPress={props.onClose} activeOpacity={0.5} style={styles.btnClose}>
              <MaterialCommunityIcons name="close" size={30} color="black" />
            </TouchableOpacity>
            : null}

          <View style={styles.modalContent}>
            <Text style={[styles.title, {color:titleColor}]}>{props.title}</Text>
            <Text style={styles.message}>{props.message}</Text>
          </View>

          <View style={styles.buttonsContainer}>

            {props.buttons == "okcancel" ?
              <TouchableOpacity activeOpacity={0.7} style={[styles.btn, styles.btnCancel]} onPress={props.onCanel}>
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
              : null}


            {props.buttons == "ok" || props.buttons == "okcancel" || props.buttons == undefined ?
              <TouchableOpacity activeOpacity={0.7} style={[styles.btn, styles.btnOk]} onPress={props.onClose}>
                <Text style={styles.btnText}>Ok</Text>
              </TouchableOpacity>
              : null}

            {props.buttons == "yesno" ?
              <TouchableOpacity activeOpacity={0.7} style={[styles.btn, styles.btnNo]} onPress={props.onNo}>
                <Text style={styles.btnText}>Não</Text>
              </TouchableOpacity>
              : null}

            {props.buttons == "yesno" ?
              <TouchableOpacity activeOpacity={0.7} style={[styles.btn, styles.btnYes]} onPress={props.onYes}>
                <Text style={styles.btnText}>Sim</Text>
              </TouchableOpacity>
              : null}

            {props.buttons == "close" ?
              <TouchableOpacity activeOpacity={0.7} style={[styles.btn, styles.btnCancel]} onPress={props.onClose}>
                <Text style={styles.btnText}>Fechar</Text>
              </TouchableOpacity>
              : null}

          </View>

        </View>
      </View>
    </Modal>
  );
};



const styles = StyleSheet.create({

  modalBackDrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalView: {
    width: "90%",
    minHeight: 300,
    maxWidth: "90%",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: "space-around",

    backgroundColor: Colors.app.white,
    borderRadius: 20,
    padding: 10,
    shadowColor: Colors.app.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    marginTop: 30,
  },

  message: {
    marginVertical: 20,
    fontSize: 15,
  },

  buttonsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  btn: {
    display: "flex",
    justifyContent: "center",

    width: "45%",
    height: 50,
    borderRadius: 10,
  },

  btnOk: {
    backgroundColor: Colors.app.tint,
  },

  btnCancel: {
    backgroundColor: Colors.app.redCancel,
  },

  btnNo: {
    backgroundColor: Colors.app.redCancel,
  },

  btnYes: {
    backgroundColor: Colors.app.tintGreen,
  },

  btnText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.app.white,
  },

  btnClose: {
    position: "absolute",
    right: 15,
    top: 15
  },
});

export default AppModal;
