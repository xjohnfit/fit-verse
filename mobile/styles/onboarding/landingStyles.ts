import { StyleSheet } from 'react-native';

const LandingStyles = () =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#000000',
            overflow: 'hidden',
        },
        waveContainer: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 130,
        },
        centerSection: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 24,
        },
        logoContainer: {
            marginBottom: 20,
        },
        logo: {
            width: 160,
            height: 160,
        },
        title: {
            fontSize: 26,
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: 16,
            letterSpacing: 6,
        },
        subtitle: {
            fontSize: 12,
            color: '#9ca3af',
            textAlign: 'center',
            fontWeight: '500',
            letterSpacing: 2,
            lineHeight: 20,
        },
        ctaSection: {
            paddingHorizontal: 24,
            paddingTop: 12,
        },
        primaryButton: {
            borderRadius: 14,
            paddingVertical: 18,
            marginBottom: 14,
            alignItems: 'center',
        },
        primaryButtonText: {
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '600',
            letterSpacing: 0.5,
        },
        secondaryButton: {
            backgroundColor: 'transparent',
            borderRadius: 14,
            paddingVertical: 18,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
        },
        secondaryButtonText: {
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '500',
            letterSpacing: 0.5,
        },
    });

export default LandingStyles;
