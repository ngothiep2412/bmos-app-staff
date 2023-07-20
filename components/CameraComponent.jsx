import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { Avatar } from "react-native-paper";
import { colors, defaultStyle } from "../styles/styles";
import * as ImagePicker from "expo-image-picker";

const CameraComponent = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);

  const openImagePicker = async () => {
    const premissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (premissionResult.granted === false)
      return alert("Permission to access gallery is required");

    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (data.canceled) {
      // Handle case when the user cancels the image picker
      return;
    }

    // log(route.params.updatedMealImg);

    if (route.params?.newProduct)
      return navigation.navigate("newproduct", { image: data.assets[0].uri });

    if (route.params?.updateProduct)
      return navigation.navigate("productimages", {
        image: data.assets[0].uri,
      });

    if (route.params?.updatedMealImg) {
      return navigation.navigate("updatemeal", {
        image: data.assets[0].uri,
      });
    }

    if (route.params?.newMealImg) {
      return navigation.navigate("newmeal", {
        image: data.assets[0].uri,
      });
    }

    if (route.params?.newBirdImg) {
      return navigation.navigate("newbird", {
        image: data.assets[0].uri,
      });
    }

    if (route.params?.updateBirdImg) {
      return navigation.navigate("updatebird", {
        image: data.assets[0].uri,
      });
    }
    if (route.params?.updatedProductImg) {
      return navigation.navigate("updateproduct", {
        image: data.assets[0].uri,
      });
    }

    if (route.params?.addProductImg) {
      return navigation.navigate("newproduct", {
        image: data.assets[0].uri,
      });
    }

    if (route.params?.addMealImg) {
      return navigation.navigate("newmeal", {
        image: data.assets[0].uri,
      });
    }

    if (route.params?.updateProfile)
      return navigation.navigate("updateprofile", {
        image: data.assets[0].uri,
      });
    else {
      // return navigation.navigate("signup", { image: data.assets[0].uri });
    }
  };

  const clickPicture = async () => {
    const data = await camera.takePictureAsync();

    if (route.params?.newProduct)
      return navigation.navigate("newproduct", { image: data.uri });

    if (route.params?.updateProduct)
      return navigation.navigate("productimages", {
        image: data.uri,
      });

    if (route.params?.updatedMealImg) {
      return navigation.navigate("updatemeal", {
        image: data.uri,
      });
    }
    if (route.params?.addProductImg) {
      return navigation.navigate("newproduct", {
        image: data.uri,
      });
    }

    if (route.params?.newMealImg) {
      return navigation.navigate("newmeal", {
        image: data.uri,
      });
    }

    if (route.params?.newBirdImg) {
      return navigation.navigate("newbird", {
        image: data.uri,
      });
    }

    if (route.params?.updateBirdImg) {
      return navigation.navigate("updatebird", {
        image: data.uri,
      });
    }

    if (route.params?.updatedProductImg) {
      return navigation.navigate("updateproduct", {
        image: data.uri,
      });
    }

    if (route.params?.addMealImg) {
      return navigation.navigate("newmeal", {
        image: data.uri,
      });
    }

    if (route.params?.updateProfile)
      return navigation.navigate("updateprofile", { image: data.uri });
    else {
      // return navigation.navigate("signup", { image: data.uri });
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) return <View></View>;
  if (hasPermission === false)
    return (
      <View style={defaultStyle}>
        <Text>No access to camera</Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <Camera
        type={type}
        style={{ flex: 1 }}
        ratio={"1:1"}
        ref={(e) => setCamera(e)}
      ></Camera>

      <View
        style={{
          flexDirection: "row",
          // bottom: 10,
          width: "100%",
          justifyContent: "space-evenly",
          position: "absolute",
          bottom: 50,
        }}
      >
        <MyIcon icon="image" handler={openImagePicker}></MyIcon>
        <MyIcon icon="camera" handler={clickPicture}></MyIcon>
        <MyIcon
          icon="camera-flip"
          handler={() => {
            setType((prepType) =>
              prepType === CameraType.back ? CameraType.front : CameraType.back
            );
          }}
        ></MyIcon>
      </View>
    </View>
  );
};

const MyIcon = ({ icon, handler }) => (
  <TouchableOpacity onPress={handler}>
    <Avatar.Icon
      icon={icon}
      size={40}
      color={colors.color2}
      style={{ backgroundColor: colors.color1 }}
    ></Avatar.Icon>
  </TouchableOpacity>
);

export default CameraComponent;

const styles = StyleSheet.create({});
