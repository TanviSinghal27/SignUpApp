import { ChatIcon } from "@/components/chatIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import * as Device from "expo-device";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function getDevMenuHint() {
  if (Platform.OS === "web") {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  // For simulators/emulators, provide the appropriate shortcut based on the platform
  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [screenMessage, setScreenMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSignIn = () => {
    setScreenMessage("");
    setIsError(false);
    if (!email.trim()) {
      setIsError(true);
      setScreenMessage("Please enter a email address.");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      setIsError(true);
      setScreenMessage("Please enter a valid email address.");
      return;
    }
    if (!isOtpSent) {
      // Step 1: Send OTP to the user's email
      if (!email) {
        setScreenMessage("Please enter a valid email address.");
        return;
      }
      setScreenMessage(`OTP sent successfully to ${email}`);
      setIsOtpSent(true);
      console.log("OTP requested for:", email);
    } else {
      // Step 2: Verify OTP and log in
      if (!otp) {
        setScreenMessage("Please enter the OTP.");
        return;
      }
      setScreenMessage(`Logged in successfully for ${email}`);
      console.log("Verifying OTP:", otp, "for", email);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <ThemedView style={styles.heroSection}>
            {/* <Image
              source={require("@/assets/images/icon.png")}
              style={{ width: 40, height: 40 }}
            /> */}
            <ChatIcon size={52} color="#0077b5" />
            <ThemedText type="title" style={styles.title}>
              Messenger
            </ThemedText>
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            {screenMessage ? (
              <ThemedText
                style={
                  screenMessage.includes("successfully")
                    ? styles.successMessage
                    : styles.errorMessage
                }
              >
                {screenMessage}
              </ThemedText>
            ) : null}

            <DistributedLayoutTitle
              formTitle={isOtpSent ? "Verify OTP" : "Sign In"}
            />

            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isOtpSent} // Prevent editing email after OTP is sent
            />

            {/* Step 2 field conditionally rendered */}
            {isOtpSent && (
              <TextInput
                placeholder="Enter 6-digit OTP"
                placeholderTextColor="#888"
                value={otp}
                onChangeText={setOtp}
                style={styles.input}
                keyboardType="number-pad"
                maxLength={6}
              />
            )}

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <ThemedText style={styles.buttonText}>
                {isOtpSent ? "Verify & Login" : "Send OTP"}
              </ThemedText>
            </TouchableOpacity>

            {/* Back to Home Page link */}
            <ThemedView style={styles.loginLinkContainer}>
              <Link
                href="/"
                style={[styles.loginLink, { textDecorationLine: "underline" }]}
              >
                Back to Home Screen
              </Link>
            </ThemedView>
          </ThemedView>

          <ThemedText type="code" style={styles.code}>
            Made with ❤️ by {"Tanvi Singhal"} {"\n"}
            <Link
              href="https://linkedin.com"
              style={{ color: "#0077b5", textDecorationLine: "underline" }}
            >
              @TanviSinghal27
            </Link>
          </ThemedText>

          {Platform.OS === "web" && <WebBadge />}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

// Simple internal helper component for managing title changes cleanly
function DistributedLayoutTitle({ formTitle }: { formTitle: string }) {
  return <ThemedText style={styles.formTitle}>{formTitle}</ThemedText>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    maxWidth: MaxContentWidth,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three + 40,
    gap: Spacing.three,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: 20,
  },
  stepContainer: {
    padding: 24,
    backgroundColor: "#f4f7fA",
    borderRadius: 16,
    justifyContent: "center",
  },
  formTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 28,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: "#0077b5",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginLink: {
    color: "#0077b5",
    fontWeight: "bold",
    fontSize: 15,
  },
  successMessage: {
    backgroundColor: "#E6F4EA",
    color: "#137333",
    padding: 12,
    borderRadius: 8,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 16,
    fontSize: 15,
  },
  errorMessage: {
    backgroundColor: "#FCE8E6",
    color: "#C5221F",
    padding: 12,
    borderRadius: 8,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 16,
    fontSize: 15,
  },
});
