import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FONTS } from "@/constants/fonts";
import CustomInput from "@/components/common/CustomInput";
import ScreenHeader from "@/components/common/ScreenHeader";

const DatePickerModal = ({
  visible,
  onClose,
  onSubmit,
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
}: any) => {
  const [tempTime, setTempTime] = useState("11:38");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  const months = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    [],
  );

  // Format Time Input automatically (e.g., 1130 -> 11:30)
  const handleTimeChange = (text: string) => {
    let formattedText = text.replace(/[^0-9]/g, "");
    if (formattedText.length > 2) {
      formattedText =
        formattedText.slice(0, 2) + ":" + formattedText.slice(2, 4);
    }
    setTempTime(formattedText);
  };

  // Validate standard 12-hour format (01:00 - 12:59)
  const isValidTime = (timeStr: string) => {
    const timeRegex = /^(1[0-2]|0?[1-9]):([0-5][0-9])$/;
    return timeRegex.test(timeStr);
  };

  const handleLocalSubmit = () => {
    if (!isValidTime(tempTime)) {
      alert("Please enter a valid time (e.g., 11:30)");
      return;
    }
    onSubmit(tempTime, period);
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  // Optimized Calendar Generation with Past Date Disabling
  const calendarCells = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cells = [];

    // Empty slots
    for (let i = 0; i < startDay; i++) {
      cells.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Actual days
    for (let day = 1; day <= totalDays; day++) {
      const cellDate = new Date(year, month, day);
      const isPastDate = cellDate < today;
      const isSelected =
        selectedDate && selectedDate.getTime() === cellDate.getTime();

      cells.push(
        <TouchableOpacity
          key={`day-${day}`}
          style={[styles.dayCell, isSelected && styles.selectedDayCell]}
          onPress={() => !isPastDate && setSelectedDate(cellDate)}
          disabled={isPastDate}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.dayText,
              isSelected && styles.selectedDayText,
              isPastDate && styles.disabledDayText,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>,
      );
    }
    return cells;
  }, [currentDate, selectedDate, setSelectedDate]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.bottomSheetContainer}
      >
        <View style={styles.sheetHandle} />

        {/* Header */}
        <View style={styles.monthHeaderRow}>
          <Text style={styles.monthTitle}>
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
          <View style={styles.navIconsRow}>
            <TouchableOpacity onPress={handlePrevMonth} style={styles.navBtn}>
              <Ionicons name="chevron-back" size={20} color="#1A1A1A" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextMonth} style={styles.navBtn}>
              <Ionicons name="chevron-forward" size={20} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Days Header */}
        <View style={styles.weekDaysRow}>
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <Text key={day} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>{calendarCells}</View>

        {/* Time Picker */}
        <View style={styles.timeRow}>
          <Text style={styles.timeLabel}>Time</Text>
          <View style={styles.timeInputBox}>
            <TextInput
              style={styles.timeInput}
              value={tempTime}
              onChangeText={handleTimeChange}
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>

          <View style={styles.periodToggle}>
            <TouchableOpacity
              style={[
                styles.periodBtn,
                period === "AM" && styles.activePeriodBtn,
              ]}
              onPress={() => setPeriod("AM")}
            >
              <Text style={styles.periodText}>AM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.periodBtn,
                period === "PM" && styles.activePeriodBtn,
              ]}
              onPress={() => setPeriod("PM")}
            >
              <Text style={styles.periodText}>PM</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={styles.modalSubmitBtn}
          activeOpacity={0.8}
          onPress={handleLocalSubmit}
        >
          <Text style={styles.modalSubmitText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(today),
  );

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
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const monthName = months[selectedDate.getMonth()];
        const day = selectedDate.getDate();
        setScheduledLabel(`${monthName} ${day}, ${time} ${period}`);
      }
      setIsDatePickerVisible(false);
    },
    [selectedDate],
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

        <View style={styles.deliverySection}>
          <Text style={styles.sectionTitle}>TIME OF DELIVERY</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.toggleBtn,
                deliveryType === "ASAP" && styles.activeToggleBtn,
              ]}
              onPress={() => {
                setDeliveryType("ASAP");
                setScheduledLabel("");
              }}
            >
              <Text
                style={[
                  styles.toggleBtnText,
                  deliveryType === "ASAP" && styles.activeToggleText,
                ]}
              >
                ASAP
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.toggleBtn,
                deliveryType === "Later" && styles.activeToggleBtn,
              ]}
              onPress={() => {
                setDeliveryType("Later");
                setIsDatePickerVisible(true);
              }}
            >
              <Text
                style={[
                  styles.toggleBtnText,
                  deliveryType === "Later" && styles.activeToggleText,
                ]}
              >
                {scheduledLabel ? scheduledLabel : "Later"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!isFormValid}
          style={[
            styles.continueBtn,
            isFormValid ? styles.activeContinueBtn : styles.disabledContinueBtn,
          ]}
          onPress={handleCheckoutSubmit}
        >
          <Text
            style={[
              styles.continueText,
              isFormValid
                ? styles.activeContinueText
                : styles.disabledContinueText,
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 16, fontFamily: FONTS.medium, color: "#301F1F" },
  container: { paddingHorizontal: 20, paddingTop: 30,  },

  deliverySection: { marginTop: 12 },
  sectionTitle: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    color: "#301F1F",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  toggleRow: { flexDirection: "row", gap: 10 },
  toggleBtn: {
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  activeToggleBtn: { backgroundColor: "#FFF0E6" },
  toggleBtnText: { fontSize: 14, fontFamily: FONTS.medium, color: "#1A1A1A" },
  activeToggleText: { color: "#FF7A28" },

  bottomBar: {
    paddingHorizontal: 20,
    marginBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  continueBtn: {
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledContinueBtn: { backgroundColor: "#F8F8F8" },
  activeContinueBtn: { backgroundColor: "#FF7A28" },
  continueText: { fontSize: 16, fontFamily: FONTS.medium },
  disabledContinueText: { color: "#828282" },
  activeContinueText: { color: "#FFFFFF" },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.4)" },
  bottomSheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  sheetHandle: {
    width: 36,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  monthHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthTitle: { fontSize: 16, fontFamily: FONTS.bold, color: "#1A1A1A" },
  navIconsRow: { flexDirection: "row", gap: 12 },
  navBtn: { padding: 4 },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  weekDayText: {
    width: "14.28%",
    textAlign: "center",
    fontSize: 11,
    fontFamily: FONTS.medium,
    color: "#8E8E93",
  },
  calendarGrid: { flexDirection: "row", flexWrap: "wrap", marginBottom: 20 },
  dayCell: {
    width: "14.28%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  selectedDayCell: { backgroundColor: "#FF7A28" },
  dayText: { fontSize: 14, fontFamily: FONTS.medium, color: "#1A1A1A" },
  disabledDayText: { color: "#D3D3D3" },
  selectedDayText: { color: "#FFFFFF", fontFamily: FONTS.bold },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  timeLabel: { fontSize: 14, fontFamily: FONTS.medium, color: "#1A1A1A" },
  timeInputBox: {
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  timeInput: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: "#1A1A1A",
    letterSpacing: 1,
  },
  periodToggle: {
    flexDirection: "row",
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    padding: 2,
  },
  periodBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
  activePeriodBtn: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  periodText: { fontSize: 13, fontFamily: FONTS.medium, color: "#1A1A1A" },
  modalSubmitBtn: {
    backgroundColor: "#FF7800",
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: "center",
  },
  modalSubmitText: { fontSize: 16, fontFamily: FONTS.medium, color: "#FFFFFF" },
});
