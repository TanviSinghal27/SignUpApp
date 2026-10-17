import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface ChatIconProps {
  /** Layout box background container sizing. Default is 54. */
  size?: number;
  /** Custom overlay color lines profile choice. Default is "#000000". */
  color?: string;
  /** Extra wrap positioning styles parameters block. */
  style?: ViewStyle;
}

export const ChatIcon: React.FC<ChatIconProps> = ({
  size = 54,
  color = "#000000",
  style,
}) => {
  return (
    <View style={[styles.wrapper, { width: size, height: size }, style]}>
      {/* BACKGROUND/BACK CHAT BUBBLE SHAPE */}
      <View style={[styles.backBubble, { borderColor: color }]}>
        <View style={[styles.backTail, { borderTopColor: color }]} />
      </View>

      {/* FOREGROUND/FRONT MAIN CHAT BUBBLE SHAPE */}
      <View style={[styles.frontBubble, { borderColor: color }]}>
        {/* Dynamic Inner Text Content Indicator Lines */}
        <View style={[styles.line, { backgroundColor: color, width: "75%" }]} />
        <View style={[styles.line, { backgroundColor: color, width: "75%" }]} />
        <View style={[styles.line, { backgroundColor: color, width: "50%" }]} />

        {/* Main Bubble Bottom Tail Pointer Indicator */}
        <View style={[styles.frontTail, { borderTopColor: color }]} />
        <View style={styles.frontTailMask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backBubble: {
    position: "absolute",
    top: 2,
    left: 2,
    width: "74%",
    height: "56%",
    borderRadius: 8,
    borderWidth: 3,
    backgroundColor: "#ffffff",
  },
  backTail: {
    position: "absolute",
    bottom: -9,
    left: 8,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    transform: [{ rotate: "30deg" }],
  },
  frontBubble: {
    position: "absolute",
    bottom: 4,
    right: 2,
    width: "80%",
    height: "60%",
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: "#ffffff",
    padding: 6,
    justifyContent: "center",
    gap: 3,
  },
  line: {
    height: 2.5,
    borderRadius: 1,
  },
  frontTail: {
    position: "absolute",
    bottom: -11,
    left: 14,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  frontTailMask: {
    position: "absolute",
    bottom: -2,
    left: 17,
    width: 6,
    height: 4,
    backgroundColor: "#ffffff",
  },
});

export default ChatIcon;
