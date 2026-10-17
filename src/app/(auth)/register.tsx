import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import * as Device from "expo-device";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
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
  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [screenMessage, setScreenMessage] = useState("");

  const [isError, setIsError] = useState(false);
  const handleCreateAccount = () => {
    setScreenMessage("");
    setIsError(false);

    if (!name.trim() || !email.trim() || !mobile.trim() || !location.trim()) {
      setIsError(true);
      setScreenMessage("Please fill all fields.");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email.trim())) {
      setIsError(true);
      setScreenMessage("Please enter a valid email address.");
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile.trim())) {
      setIsError(true);
      setScreenMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setScreenMessage(`Account created for ${name}`);
    console.log("Creating account for:", { name, email, mobile, location });
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
            {/* <AnimatedIcon /> */}

            <Image
              source={require("@/assets/images/icon.png")}
              style={{ width: 40, height: 40 }}
            />

            <ThemedText type="title" style={styles.title}>
              Messenger
            </ThemedText>
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            {screenMessage ? (
              <ThemedText
                style={[
                  styles.messageText,
                  isError ? styles.errorMessage : styles.successMessage,
                ]}
              >
                {screenMessage}
              </ThemedText>
            ) : null}

            <ThemedText style={styles.formTitle}>Create Account</ThemedText>

            <TextInput
              placeholder="Enter your name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
              style={styles.input}
              autoCapitalize="words"
            />
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Enter your mobile number"
              placeholderTextColor="#888"
              value={mobile}
              onChangeText={setMobile}
              style={styles.input}
              keyboardType="phone-pad"
            />
            <TextInput
              placeholder="Enter your location"
              placeholderTextColor="#888"
              value={location}
              onChangeText={setLocation}
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleCreateAccount}
            >
              <ThemedText style={styles.buttonText}>Create Account</ThemedText>
            </TouchableOpacity>

            <ThemedView>
              <Link
                href="/login"
                style={[styles.loginLink, { textDecorationLine: "underline" }]}
              >
                Already have a Account? Log in
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
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 35,
    marginBottom: 25,
  },
  loginText: {
    color: "#666",
    fontSize: 15,
  },
  loginLink: {
    color: "#0077b5",
    fontWeight: "bold",
    fontSize: 15,
  },
  successMessage: {
    backgroundColor: "#E6F4EA", // Light soft green background
    color: "#137333", // Dark green text
    padding: 12,
    borderRadius: 8,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 16,
    fontSize: 15,
  },
  messageText: {
    fontSize: 14,
    fontWeight: "600",
    padding: 12,
    borderRadius: 8,
    textAlign: "center",
    marginBottom: 16,
    overflow: "hidden", // iOS par border radius ke liye zaroori hai
  },
  errorMessage: {
    backgroundColor: "#FEE2E2", // Light Red Background
    color: "#DC2626", // Dark Red Text
    borderColor: "#FCA5A5", // Soft Red Border
    borderWidth: 1,
  },
});
