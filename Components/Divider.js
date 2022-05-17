import { Text, View } from "react-native";

const Divider = (props) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
      <View style={{ flex: 1, height: 3, backgroundColor: "#ffdab9" }} />
      <View>
        <Text style={{ width: 80, textAlign: "center", fontSize: props.size }}>
          {props.text}
        </Text>
      </View>
      <View style={{ flex: 1, height: 3, backgroundColor: "#ffdab9" }} />
    </View>
  );
};

export default Divider;
