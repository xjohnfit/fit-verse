import { View, Text, Image, ActivityIndicator, useWindowDimensions } from "react-native";
import WaveBackground from "@/components/onboarding/WaveBackground";
import LandingStyles from "@/styles/onboarding/landingStyles";

export default function AppSplashScreen() {
  const { width, height } = useWindowDimensions();
  const styles = LandingStyles();

  return (
    <View style={styles.container}>
      <View style={[styles.waveContainer, { height: height * 0.42 }]}>
        <WaveBackground width={width} height={height * 0.42} />
      </View>

      <View style={styles.centerSection}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/fit-verse-logo-no-bg.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>FITVERSE</Text>
        <Text style={styles.subtitle}>
          YOUR FITNESS.{"\n"}YOUR UNIVERSE.
        </Text>
      </View>

      <View style={{ paddingBottom: 60, alignItems: "center" }}>
        <ActivityIndicator size="small" color="#ffffff" />
      </View>
    </View>
  );
}
