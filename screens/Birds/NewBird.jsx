import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { FlashList } from "@shopify/flash-list";
import {
  colors,
  defaultImgFood,
  defaultImgMeal,
  defaultStyle,
  formHeading,
  inputOptions,
} from "../../styles/styles";
import Loader from "../../components/Loader";
import { Avatar, Button, TextInput } from "react-native-paper";

import { useMessageAndErrorBird } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Modal from "react-native-modal";

import plus from "../../assets/plus.png";
import mime from "mime";
import { createBird } from "../../redux/actions/birdAction";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;
export const iconOptions = {
  size: 25,
  style: {
    borderRadius: 5,
    backgroundColor: colors.color5,
    weight: 30,
    height: 30,
  },
};

const NewBird = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [birdName, setBirdName] = useState(null);
  const [imageBird, setImageBird] = useState("");

  const [visibleBird, setVisibleBird] = useState(false);

  const [colorsPicker, setColorsPicker] = useState([
    { id: 1, name: "Red", value: "#FF0000" },
    { id: 2, name: "Green", value: "#00FF00" },
    { id: 3, name: "Yellow", value: "#FFFF33" },
    { id: 4, name: "Black", value: "black" },
    { id: 5, name: "White", value: "#fff" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);

  const disableBtnCondition = !birdName || !selectedColors || !imageBird;

  const handleColorSelection = (color) => {
    if (selectedColorIndex !== null) {
      setSelectedColors((prevColors) =>
        prevColors.map((item, index) =>
          index === selectedColorIndex ? color : item
        )
      );
      setSelectedColorIndex(null);
    } else {
      setSelectedColors((prevColors) => [...prevColors, color]);
    }
    setModalVisible(false);
    // Thực hiện các thao tác khác khi đã chọn màu
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleColorSelection(item)}>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: item.value,
            marginRight: 10,
          }}
        />
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const loading = useMessageAndErrorBird(dispatch, navigation, "birds");

  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append("file", {
      uri: imageBird,
      type: mime.getType(imageBird),
      name: imageBird.split("/").pop(),
    });

    const birdColor = selectedColors.map((color) => color.name).join(" ");
    // console.log("birdColor" + birdColor);
    dispatch(createBird(birdName, birdColor, myForm));

    // setBirdName("");
    // setColorsPicker([]);
    // setImageBird(null);
  };

  useEffect(() => {
    if (route.params?.image) {
      setImageBird(route.params.image);
      // dispatch updatePic Here
    }
  }, [route.params, isFocused]);

  return (
    <View
      style={{
        ...defaultStyle,
        backgroundColor: colors.color5,
      }}
    >
      {!visibleBird ? (
        <Header back={true} color={colors.color3} editMeal={false}></Header>
      ) : null}
      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formHeading}>New Bird</Text>
      </View>

      <ScrollView
        style={{
          padding: 20,
          elevation: 10,
          borderRadius: 10,
          backgroundColor: colors.color3,
          maxHeight: 650,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            minHeight: 600,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              alignSelf: "center",
              marginBottom: 20,
            }}
          >
            <Avatar.Image
              size={80}
              style={{
                backgroundColor: colors.color1,
              }}
              source={{
                uri: !imageBird ? defaultImgMeal : imageBird,
              }}
            />
          </View>
          <Button
            onPress={() =>
              navigation.navigate("camera", {
                newBirdImg: true,
              })
            }
            textColor={colors.color1}
          >
            Change Image
          </Button>
          <Text style={{ color: "white" }}>Name</Text>
          <TextInput
            {...inputOptions}
            placeholder="Name"
            value={birdName}
            onChangeText={setBirdName}
          />

          <Text style={{ color: "white" }}>Bird Color</Text>

          <View style={{ marginTop: 20 }}>
            <View style={{ width: "100%" }}>
              <Modal
                isVisible={modalVisible}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                onBackdropPress={() => setModalVisible(false)}
                style={styles.modal}
              >
                <View style={styles.modalContent}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      marginBottom: 10,
                    }}
                  >
                    Colors:
                  </Text>
                  <FlashList
                    showsVerticalScrollIndicator={false}
                    data={colorsPicker}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2} // Hiển thị 2 cột
                    estimatedItemSize={47}
                    columnWrapperStyle={styles.columnWrapper} // Style cho wrapper của cột
                  />
                  <Button
                    textColor={colors.color2}
                    contentStyle={{ backgroundColor: colors.color1 }}
                    onPress={() => setModalVisible(false)}
                  >
                    Close
                  </Button>
                </View>
              </Modal>

              <ScrollView
                horizontal
                contentContainerStyle={{
                  alignItems: "center",
                }}
                showsHorizontalScrollIndicator={false}
              >
                {selectedColors?.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                      setSelectedColorIndex(index);
                    }}
                    key={item.id}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 30,
                      backgroundColor: item.value,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 5,
                    }}
                  ></TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 30,
                    backgroundColor: colors.color5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => setModalVisible(true)}
                >
                  <Image
                    source={plus}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: colors.color3,
                    }}
                  ></Image>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>

          <Button
            textColor={colors.color2}
            style={{
              backgroundColor: colors.color1,
              margin: 20,
              marginVertical: 30,
              padding: 6,
              //   marginBottom: 20,
            }}
            icon={"plus"}
            onPress={submitHandler}
            loading={loading}
            disabled={disableBtnCondition || loading}
          >
            Add
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewBird;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    // paddingVertical: 40,
    height: 380,
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: "contain",
    height: 200,
    marginTop: 20,
  },
  quantity: {
    backgroundColor: colors.color4,
    padding: 6,
    // textAlignVertical: "auto",
    // alignItems: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color5,
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    paddingVertical: 18,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 35,
    flexDirection: "row",
  },

  productContainer: {
    // width: "100%",
    // height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderColor: "#EBEBEB",
    shadowColor: "black",
    borderRadius: 8,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 0.2,
    shadowOpacity: 0.5,
    backgroundColor: colors.color2,
    // marginBottom: 30,
    // overflow: "hidden",
  },

  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.color5,
    width: "80%",
    height: 250,
    borderRadius: 8,
    padding: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
