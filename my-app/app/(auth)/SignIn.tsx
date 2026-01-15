// SignIn.tsx
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

const SignInScreen: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill all the fields");
            return;
        }

        try {
            const response = await fetch(
                "https://unwrinkleable-austin-unreplaced.ngrok-free.dev/api/signin",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const raw = await response.text();
            console.log("RAW RESPONSE:", raw);

            if (!response.ok) {
                Alert.alert("Error", raw || "Invalid credentials");
                return;
            } else {
                Alert.alert("Success", "Logged in successfully");
                router.replace("/(tabs)");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to sign in");
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
                        <Text style={styles.tagline}>Welcome back!</Text>
                    </View>

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        <Text style={styles.headerText}>Sign In</Text>

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
                                    placeholder="Enter your password"
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

                        {/* Forgot Password */}
                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* Sign In Button */}
                        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                            <Text style={styles.signInButtonText}>Sign In</Text>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>or</Text>
                            <View style={styles.divider} />
                        </View>

                        {/* Sign Up Link */}
                        <TouchableOpacity
                            style={styles.signUpLink}
                            onPress={() => router.push("/(auth)/SignUp" as any)}
                        >
                            <Text style={styles.signUpLinkText}>
                                Don't have an account? <Text style={styles.signUpLinkHighlight}>Sign Up</Text>
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
        marginBottom: 40,
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
        marginBottom: 20,
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
    forgotPassword: {
        alignSelf: "flex-end",
        marginBottom: 24,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: "#ff4500",
        fontWeight: "600",
    },
    signInButton: {
        backgroundColor: "#ff4500",
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: "center",
        shadowColor: "#ff4500",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    signInButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
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
    signUpLink: {
        alignItems: "center",
    },
    signUpLinkText: {
        fontSize: 14,
        color: "#777",
    },
    signUpLinkHighlight: {
        color: "#ff4500",
        fontWeight: "700",
    },
});

export default SignInScreen;
