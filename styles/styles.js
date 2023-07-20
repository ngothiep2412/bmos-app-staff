import { StyleSheet, Platform, StatusBar } from "react-native";

export const colors = {
  color1: "#c70049",
  color1_light: "rgba(227,25,99,1)",
  color1_light2: "rgba(199,0,73,0.8)",
  color2: "white",
  color3: "rgb(45,45,45)",
  color4: "transparent",
  color5: "#f2f2f2",
  color6: "#f7f7f7",
  price: "#17B057",
};

export const defaultStyle = StyleSheet.create({
  padding: 20,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  flex: 1,
  paddingBottom: 0,
  backgroundColor: colors.color2,
});

export const inputStyling = StyleSheet.create({
  height: 50,
  backgroundColor: colors.color2,
  marginVertical: 10,
  marginHorizontal: 20,
});

export const formHeading = {
  fontSize: 25,
  fontWeight: "500",
  textAlign: "center",
  backgroundColor: colors.color3,
  color: colors.color2,
  padding: 5,
  borderRadius: 5,
};

export const inputOptions = {
  style: inputStyling,
  mode: "outlined",
  activeOutlineColor: colors.color1,
};

export const formStyles = StyleSheet.create({
  container: {
    height: 660,
    // flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 10,
    justifyContent: "center",
    elevation: 10,
  },
  heading: {
    marginBottom: 20,
    backgroundColor: colors.color3,
    padding: 10,
    borderRadius: 5,
  },
  headingText: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    color: colors.color2,
  },

  forget: {
    color: colors.color2,
    marginHorizontal: 20,
    marginVertical: 10,
    alignSelf: "flex-end",
    fontWeight: "100",
  },

  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 5,
    borderRadius: 10,
  },

  or: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "100",
    color: colors.color2,
  },

  link: {
    alignSelf: "center",
    color: colors.color2,
    fontSize: 18,
    textTransform: "uppercase",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export const defaultImg =
  "https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png";

export const defaultImgFood =
  "https://www.purinainstitute.com/sites/default/files/what-is-the-difference-between-dry-semi-moist-and-wet-pet-foods.png";

export const defaultImgMeal =
  "https://www.charlesprogers.com/assets/images/noimagedefault.jpg";
