import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Switch,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { apiPost } from '../api/client';
import { RootStackParamList } from '../types';
import {
  GradientCard,
  PremiumButton,
  Badge,
  ExpandableCard,
} from '../components/PremiumUI';
import { Colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

interface SettingSection {
  title: string;
  items: SettingItem[];
}

interface SettingItem {
  label: string;
  type: 'toggle' | 'button' | 'text';
  value?: boolean;
  description?: string;
  onToggle?: (value: boolean) => void;
  onPress?: () => void;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { isDark, themeMode, setThemeMode, toggleTheme } = useTheme();
  
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            await logout();
            navigation.replace('Login');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await apiPost('/users/delete-account', {});
              Alert.alert('Success', 'Your account has been deleted.');
              await logout();
              navigation.replace('Login');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete account');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const settingsSections: SettingSection[] = [
    {
      title: 'Notifications',
      items: [
        {
          label: 'Push Notifications',
          type: 'toggle',
          value: notifications,
          description: 'Receive quiz and study reminders',
          onToggle: (value) => {
            setNotifications(value);
            // API call to update preferences
          },
        },
        {
          label: 'Email Updates',
          type: 'toggle',
          value: emailUpdates,
          description: 'Weekly study summary and tips',
          onToggle: (value) => setEmailUpdates(value),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          label: 'Dark Mode',
          type: 'toggle',
          value: isDark,
          description: themeMode === 'auto' ? 'Following system (Currently ' + (isDark ? 'Dark' : 'Light') + ')' : (isDark ? 'Dark theme enabled' : 'Light theme enabled'),
          onToggle: (value) => toggleTheme(),
        },
        {
          label: 'Analytics',
          type: 'toggle',
          value: analyticsEnabled,
          description: 'Help us improve the app',
          onToggle: (value) => setAnalyticsEnabled(value),
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          label: 'Change Password',
          type: 'button',
          onPress: () => Alert.alert('Coming Soon', 'Password change feature coming soon'),
        },
        {
          label: 'Privacy Policy',
          type: 'button',
          onPress: () => Alert.alert('Privacy Policy', 'View privacy policy in browser'),
        },
        {
          label: 'Terms & Conditions',
          type: 'button',
          onPress: () => Alert.alert('Terms', 'View terms in browser'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <AnimatedView entering={FadeInDown.delay(100).springify()} style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your study experience</Text>
        </AnimatedView>

        {/* User Profile Card */}
        <AnimatedView entering={FadeInUp.delay(150).springify()} style={styles.profileSection}>
          <GradientCard colors={['#3b82f6', '#1e40af']} borderRadius={20}>
            <View style={styles.profileCard}>
              <View style={styles.profileHeader}>
                <View style={styles.avatarPlaceholder} />
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>
                    {user?.name || 'User'}
                  </Text>
                  <Text style={styles.profileEmail}>
                    {user?.email}
                  </Text>
                </View>
              </View>

              <View style={styles.badges}>
                <Badge label={user?.role || 'Student'} variant="primary" />
                {user?.isEmailVerified && (
                  <Badge label="Verified" variant="success" />
                )}
              </View>

              <TouchableOpacity
                style={styles.viewProfileButton}
                onPress={() => navigation.navigate('Profile')}
              >
                <Text style={styles.viewProfileText}>
                  View Profile
                </Text>
              </TouchableOpacity>
            </View>
          </GradientCard>
        </AnimatedView>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <AnimatedView
            key={section.title}
            entering={FadeInUp.delay(200 + sectionIndex * 100).springify()}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>
              {section.title}
            </Text>

            <View style={styles.settingsList}>
              {section.items.map((item, itemIndex) => (
                <View
                  key={`${section.title}-${itemIndex}`}
                  style={styles.settingItem}
                >
                  <View style={styles.settingItemContent}>
                    <View style={styles.settingItemText}>
                      <Text style={styles.settingLabel}>
                        {item.label}
                      </Text>
                      {item.description && (
                        <Text style={styles.settingDescription}>
                          {item.description}
                        </Text>
                      )}
                    </View>

                    {item.type === 'toggle' && item.onToggle && (
                      <Switch
                        value={item.value || false}
                        onValueChange={item.onToggle}
                        trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                      />
                    )}

                    {item.type === 'button' && item.onPress && (
                      <TouchableOpacity onPress={item.onPress} style={styles.settingButton}>
                        <Text style={styles.settingArrow}>→</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </AnimatedView>
        ))}

        {/* About Section */}
        <AnimatedView entering={FadeInUp.delay(600).springify()} style={styles.section}>
          <ExpandableCard
            title="About"
            description="App information and version"
            variant="info"
          >
            <View style={styles.aboutContent}>
              <View style={styles.aboutRow}>
                <Text style={styles.aboutLabel}>App Version</Text>
                <Text style={styles.aboutValue}>1.0.0</Text>
              </View>
              <View style={styles.aboutRow}>
                <Text style={styles.aboutLabel}>Build</Text>
                <Text style={styles.aboutValue}>2026.05.26</Text>
              </View>
              <View style={styles.aboutRow}>
                <Text style={styles.aboutLabel}>Environment</Text>
                <Text style={styles.aboutValue}>Production</Text>
              </View>
            </View>
          </ExpandableCard>
        </AnimatedView>

        {/* Danger Zone */}
        <AnimatedView entering={FadeInUp.delay(700).springify()} style={styles.dangerSection}>
          <ExpandableCard
            title="Danger Zone"
            description="Irreversible actions"
            variant="error"
          >
            <View style={styles.dangerContent}>
              <PremiumButton
                label="Logout"
                onPress={handleLogout}
                variant="secondary"
                size="md"
              />
              <PremiumButton
                label="Delete Account"
                onPress={handleDeleteAccount}
                variant="danger"
                size="md"
              />
            </View>
          </ExpandableCard>
        </AnimatedView>

        {/* Footer */}
        <AnimatedView entering={FadeInUp.delay(800).springify()} style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ❤️ for better learning
          </Text>
          <Text style={styles.footerCopyright}>
            © 2026 AI Study Assistant. All rights reserved.
          </Text>
        </AnimatedView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    color: '#6b7280',
    marginTop: 8,
  },
  profileSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  profileCard: {
    padding: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 32,
    opacity: 0.2,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#bfdbfe',
    fontSize: 14,
    marginTop: 4,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  viewProfileButton: {
    backgroundColor: '#1e40af',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  viewProfileText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  settingsList: {
    gap: 12,
  },
  settingItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingItemText: {
    flex: 1,
  },
  settingLabel: {
    color: '#111827',
    fontWeight: '600',
  },
  settingDescription: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 4,
  },
  settingButton: {
    padding: 8,
  },
  settingArrow: {
    color: '#2563eb',
    fontWeight: '600',
  },
  aboutContent: {
    gap: 12,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aboutLabel: {
    color: '#6b7280',
    fontSize: 14,
  },
  aboutValue: {
    color: '#111827',
    fontWeight: '600',
    fontSize: 14,
  },
  dangerSection: {
    paddingHorizontal: 24,
    marginBottom: 48,
  },
  dangerContent: {
    gap: 12,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    alignItems: 'center',
  },
  footerText: {
    color: '#6b7280',
    fontSize: 12,
  },
  footerCopyright: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 8,
  },
});
