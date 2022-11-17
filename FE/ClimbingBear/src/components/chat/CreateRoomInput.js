import { TextInput } from "react-native-gesture-handler"
import { SafeAreaView, StyleSheet } from "react-native";

const CreateRoomInput = ({value, title}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, onChangeText] = useState("");

  return (
    <View>
      <Text>채팅방명</Text>
      <TextInput
        onChangeText={onChangeText}
        value={text}
      ></TextInput>
      

    </View>
  )
}

export default CreateRoomInput;

const styles = StyleSheet.create({

})