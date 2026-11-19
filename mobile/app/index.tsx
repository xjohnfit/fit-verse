import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useAppSelector } from "../hooks/useRedux";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WaveBackground from "@/components/onboarding/WaveBackground";
import LandingStyles from "@/styles/onboarding/landingStyles";

export default function LandingPage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const styles = LandingStyles();

  // Redirect authenticated users to home
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={{ height: insets.top }} />

      {/* Flowing wave background */}
      <View style={[styles.waveContainer, { height: height * 0.42 }]}>
        <WaveBackground width={width} height={height * 0.42} />
      </View>

      {/* Center content */}
      <View style={styles.centerSection}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/fit-verse-logo-no-bg.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>FITVERSE</Text>
        <Text style={styles.subtitle}>
          YOUR FITNESS.{"\n"}YOUR UNIVERSE.
        </Text>
      </View>

      {/* CTA Buttons */}
      <View style={[styles.ctaSection, { paddingBottom: 20 + insets.bottom }]}>
        <TouchableOpacity
          onPress={() => router.push("/register")}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={["#22c1ff", "#e83fe8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/login")}
          style={styles.secondaryButton}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
