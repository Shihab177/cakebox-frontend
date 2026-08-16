import React, { useState, useCallback, useMemo } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import CustomInput from "@/components/common/CustomInput";
import ScreenHeader from "@/components/common/ScreenHeader";
import { DeliveryTimeSelector } from "@/components/checkout/DeliveryTimeSelector";
import { DatePickerModal } from "@/components/checkout/DatePickerModal";
import { CheckoutBottomBar } from "@/components/checkout/CheckoutBottomBar";


const CheckoutScreen = () => {
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [deliveryType, setDeliveryType] = useState<"ASAP" | "Later">("ASAP");
  const [scheduledLabel, setScheduledLabel] = useState("");

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [currentDate, setCurrentDate] = useState(new Date(today));
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(today));

  const isFormValid = useMemo(() => {
    const isPhoneValid = phone.replace(/[^0-9]/g, "").length >= 10;
    return (
      address.trim().length > 3 &&
      name.trim().length > 2 &&
      isPhoneValid &&
      (deliveryType === "ASAP" ||
        (deliveryType === "Later" && scheduledLabel !== ""))
    );
  }, [address, name, phone, deliveryType, scheduledLabel]);

  const handleDateSubmit = useCallback(
    (time: string, period: string) => {
      if (selectedDate) {
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];
        const monthName = months[selectedDate.getMonth()];
        const day = selectedDate.getDate();
        setScheduledLabel(`${monthName} ${day}, ${time} ${period}`);
      }
      setIsDatePickerVisible(false);
    },
    [selectedDate]
  );

  const handleCheckoutSubmit = () => {
    if (!isFormValid) return;
    const orderData = { address, name, phone, deliveryType, scheduledLabel };
    console.log("Order Ready:", orderData);
    router.push("/checkout/payment");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScreenHeader title="Checkout" />
      
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <CustomInput
          label="Address"
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />
        <CustomInput
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        <CustomInput
          label="Phone number"
          placeholder="Enter phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <DeliveryTimeSelector
          deliveryType={deliveryType}
          scheduledLabel={scheduledLabel}
          onSelectAsap={() => {
            setDeliveryType("ASAP");
            setScheduledLabel("");
          }}
          onSelectLater={() => {
            setDeliveryType("Later");
            setIsDatePickerVisible(true);
          }}
        />
      </ScrollView>

      <DatePickerModal
        visible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onSubmit={handleDateSubmit}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <CheckoutBottomBar
        isFormValid={isFormValid}
        onPress={handleCheckoutSubmit}
      />
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { paddingHorizontal: 20, paddingTop: 30 },
});