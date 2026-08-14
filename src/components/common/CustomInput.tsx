import { FONTS } from "@/constants/fonts";
import {
  StyleSheet,
  Text,
  View,
  TextInput,

} from "react-native";
interface CustomInputProps {
  label?: string; 
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: any;
}
const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
} : CustomInputProps) => (
  <View style={styles.inputContainer}>
    {value ? <Text style={styles.inputLabel}>{label}</Text> : null}
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#A0A0A0"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCorrect={false}
    />
  </View>
);
export default CustomInput
const styles = StyleSheet.create({
inputContainer: {
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 9,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontFamily: FONTS.regular,
    color: "#8E8E93",
    marginBottom: -3,
  },
  input: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: "#301F1F",
    padding: 0,
  },})