import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { colors } from "../styles/styles";

const screenWidth = Dimensions.get("screen").width - 60 - 75;

const Chart = ({
  createdOrder,
  confirmOrder,
  orderCompleted,
  orderCancel,
  backgroundColor = colors.color2,
  legendFontColor = colors.color3,
}) => {
  const data = [
    {
      name: "Created",
      population: createdOrder,
      color: colors.color1,
      legendFontColor: legendFontColor,
    },
    {
      name: "Confirm",
      population: confirmOrder,
      color: "yellow",
      legendFontColor: legendFontColor,
    },
    {
      name: "Completed",
      population: orderCompleted,
      color: colors.price,
      legendFontColor: legendFontColor,
    },
    {
      name: "Cancel",
      population: orderCancel,
      color: "red",
      legendFontColor: legendFontColor,
    },
  ];

  const chartConfig = {
    color: (opacity = 1) => `rgba(26,255,146,${opacity})`,
  };

  return (
    <View>
      <PieChart
        data={data}
        width={screenWidth}
        height={160}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={backgroundColor}
        absolute
      ></PieChart>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({});
