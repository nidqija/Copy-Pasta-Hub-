// SignUp.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const SignUpScreen: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignUp = async () => {
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill all the fields");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            const response = await fetch(
                "https://unwrinkleable-austin-unreplaced.ngrok-free.dev/api/signup",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    }),
                }
            );

            const raw = await response.text();
            console.log("RAW RESPONSE:", raw);

            if (!response.ok) {
                Alert.alert("Error", raw || "Something went wrong");
                return;
            } else {
                Alert.alert("Success", "User registered successfully", [
                    { text: "OK", onPress: () => router.push("/(auth)/SignIn" as any) }
                ]);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to register user");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Logo Section */}
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>CopyPastaHub</Text>
                        <Text style={styles.tagline}>Join the community!</Text>
                    </View>

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        <Text style={styles.headerText}>Create Account</Text>

                        {/* Username Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.labelText}>Username</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="person-outline" size={20} color="#777" style={styles.inputIcon} />
                                <TextInput
                                    value={username}
                                    onChangeText={setUsername}
                                    style={styles.textInput}
                                    placeholder="Choose a username"
                                    placeholderTextColor="#999"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.labelText}>Email</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="mail-outline" size={20} color="#777" style={styles.inputIcon} />
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    style={styles.textInput}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#999"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.labelText}>Password</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="lock-closed-outline" size={20} color="#777" style={styles.inputIcon} />
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    style={styles.textInput}
                                    placeholder="Create a password"
                                    placeholderTextColor="#999"
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Ionicons
                                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                                        size={20}
                                        color="#777"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Confirm Password Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.labelText}>Confirm Password</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="lock-closed-outline" size={20} color="#777" style={styles.inputIcon} />
                                <TextInput
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    style={styles.textInput}
                                    placeholder="Confirm your password"
                                    placeholderTextColor="#999"
                                    secureTextEntry={!showConfirmPassword}
                                />
                                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    <Ionicons
                                        name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                                        size={20}
                                        color="#777"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Sign Up Button */}
                        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                            <Text style={styles.signUpButtonText}>Create Account</Text>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>or</Text>
                            <View style={styles.divider} />
                        </View>

                        {/* Sign In Link */}
                        <TouchableOpacity
                            style={styles.signInLink}
                            onPress={() => router.push("/(auth)/SignIn" as any)}
                        >
                            <Text style={styles.signInLinkText}>
                                Already have an account? <Text style={styles.signInLinkHighlight}>Sign In</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f0f2f5",
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    logoText: {
        fontSize: 32,
        fontWeight: "700",
        color: "#ff4500",
        marginBottom: 8,
    },
    tagline: {
        fontSize: 16,
        color: "#777",
    },
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1a1a1b",
        marginBottom: 24,
        textAlign: "center",
    },
    inputContainer: {
        marginBottom: 16,
    },
    labelText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1a1a1b",
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f6f6f6",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: "#e2e2e2",
    },
    inputIcon: {
        marginRight: 12,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: "#1a1a1b",
    },
    signUpButton: {
        backgroundColor: "#ff4500",
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 8,
        shadowColor: "#ff4500",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    signUpButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#e2e2e2",
    },
    dividerText: {
        marginHorizontal: 16,
        color: "#777",
        fontSize: 14,
    },
    signInLink: {
        alignItems: "center",
    },
    signInLinkText: {
        fontSize: 14,
        color: "#777",
    },
    signInLinkHighlight: {
        color: "#ff4500",
        fontWeight: "700",
    },
});

export default SignUpScreen;
