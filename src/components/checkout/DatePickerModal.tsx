import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FONTS } from "@/constants/fonts";

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (time: string, period: string) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
}

export const DatePickerModal = ({
  visible,
  onClose,
  onSubmit,
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
}: DatePickerModalProps) => {
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
    []
  );

  const handleTimeChange = (text: string) => {
    let formattedText = text.replace(/[^0-9]/g, "");
    if (formattedText.length > 2) {
      formattedText =
        formattedText.slice(0, 2) + ":" + formattedText.slice(2, 4);
    }
    setTempTime(formattedText);
  };

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
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const calendarCells = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cells = [];

    for (let i = 0; i < startDay; i++) {
      cells.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

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
        </TouchableOpacity>
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

        <View style={styles.weekDaysRow}>
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <Text key={day} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>{calendarCells}</View>

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

const styles = StyleSheet.create({
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