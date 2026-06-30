import React from 'react';
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  StyleProp,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

// ============================================================================
// GRADIENT CARD COMPONENT
// ============================================================================

interface GradientCardProps {
  children: React.ReactNode;
  colors?: [string, string, ...string[]];
  startPoint?: { x: number; y: number };
  endPoint?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  shadow?: boolean;
}

export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  colors = ['#3b82f6', '#1e40af'],
  startPoint = { x: 0, y: 0 },
  endPoint = { x: 1, y: 1 },
  style,
  borderRadius = 16,
  shadow = true,
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={startPoint}
      end={endPoint}
      style={[
        {
          borderRadius,
          overflow: 'hidden',
        },
        shadow && {
          shadowColor: colors[0],
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 8,
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
};

// ============================================================================
// PREMIUM BUTTON COMPONENT
// ============================================================================

interface PremiumButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  loading = false,
  disabled = false,
  icon,
  style,
}) => {
  const scale = useSharedValue(1);

  const variantStyles: Record<string, { bg: string; text: string; borderColor: string }> = {
    primary: { bg: '#2563eb', text: '#ffffff', borderColor: '#2563eb' },
    secondary: { bg: '#e5e7eb', text: '#111827', borderColor: '#e5e7eb' },
    outline: { bg: 'transparent', text: '#2563eb', borderColor: '#2563eb' },
    danger: { bg: '#dc2626', text: '#ffffff', borderColor: '#dc2626' },
    success: { bg: '#16a34a', text: '#ffffff', borderColor: '#16a34a' },
  };

  const sizeStyles: Record<string, { paddingHorizontal: number; paddingVertical: number }> = {
    sm: { paddingHorizontal: 12, paddingVertical: 8 },
    md: { paddingHorizontal: 16, paddingVertical: 12 },
    lg: { paddingHorizontal: 24, paddingVertical: 16 },
  };

  const { bg, text, borderColor } = variantStyles[variant];
  const { paddingHorizontal, paddingVertical } = sizeStyles[size];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <View
        style={[
          {
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            borderWidth: variant === 'outline' ? 2 : 0,
            borderColor: borderColor,
            backgroundColor: bg,
            paddingHorizontal,
            paddingVertical,
          },
          fullWidth && { width: '100%' },
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={variant === 'outline' ? '#2563eb' : '#ffffff'} />
        ) : (
          <>
            {icon}
            <Text style={{ fontWeight: 'bold', textAlign: 'center', color: text }}>
              {label}
            </Text>
          </>
        )}
      </View>
    </Animated.View>
  );
};

// ============================================================================
// STAT CARD COMPONENT (for dashboards/analytics)
// ============================================================================

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  colors?: [string, string];
  trend?: { value: number; positive: boolean };
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon,
  colors = ['#10b981', '#059669'],
  trend,
}) => {
  return (
    <GradientCard colors={colors} borderRadius={16}>
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600', opacity: 0.9 }}>
            {label}
          </Text>
          {icon && <View>{icon}</View>}
        </View>

        <Text style={{ color: '#fff', fontSize: 30, fontWeight: '900', marginBottom: 8 }}>
          {value}
        </Text>

        {trend && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: trend.positive ? '#bbf7d0' : '#fecaca' }}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </Text>
          </View>
        )}

        {subtext && (
          <Text style={{ color: '#fff', fontSize: 12, opacity: 0.75, marginTop: 4 }}>
            {subtext}
          </Text>
        )}
      </View>
    </GradientCard>
  );
};

// ============================================================================
// EXPANDABLE CARD COMPONENT
// ============================================================================

interface ExpandableCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  icon?: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  description,
  children,
  expanded = false,
  onToggle,
  icon,
  variant = 'info',
}) => {
  const variantColors: Record<string, { borderColor: string; backgroundColor: string }> = {
    info: { borderColor: '#3b82f6', backgroundColor: '#eff6ff' },
    success: { borderColor: '#22c55e', backgroundColor: '#f0fdf4' },
    warning: { borderColor: '#eab308', backgroundColor: '#fefce8' },
    error: { borderColor: '#ef4444', backgroundColor: '#fef2f2' },
  };

  const iconBgColors: Record<string, { backgroundColor: string; color: string }> = {
    info: { backgroundColor: '#dbeafe', color: '#2563eb' },
    success: { backgroundColor: '#dcfce7', color: '#16a34a' },
    warning: { backgroundColor: '#fef9c3', color: '#ca8a04' },
    error: { backgroundColor: '#fee2e2', color: '#dc2626' },
  };

  const { borderColor, backgroundColor } = variantColors[variant];
  const iconColors = iconBgColors[variant];

  return (
    <View
      style={{
        borderLeftWidth: 4,
        borderLeftColor: borderColor,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor,
      }}
    >
      <View style={{ padding: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
            {icon && (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: iconColors.backgroundColor,
                }}
              >
                {icon}
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', color: '#111827', fontSize: 16 }}>
                {title}
              </Text>
              {description && (
                <Text style={{ color: '#4b5563', fontSize: 12, marginTop: 4 }}>
                  {description}
                </Text>
              )}
            </View>
          </View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4b5563' }}>
            {expanded ? '−' : '+'}
          </Text>
        </View>

        {expanded && (
          <View style={{ marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
            {children}
          </View>
        )}
      </View>
    </View>
  );
};

// ============================================================================
// PROGRESS RING COMPONENT (circular progress indicator)
// ============================================================================

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  colors?: [string, string];
  label?: string;
  subLabel?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  colors = ['#3b82f6', '#1e40af'],
  label,
  subLabel,
}) => {
  const circumference = 2 * Math.PI * ((size - strokeWidth) / 2);
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withSpring(percentage / 100);
  }, [percentage]);

  const animatedStyle = useAnimatedStyle(() => ({
    strokeDashoffset: interpolate(
      progress.value,
      [0, 1],
      [circumference, 0],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: size, height: size, position: 'relative' }}>
        {/* Background circle */}
        <svg width={size} height={size} style={{ position: 'absolute' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - strokeWidth) / 2}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <Animated.circle
            cx={size / 2}
            cy={size / 2}
            r={(size - strokeWidth) / 2}
            fill="none"
            stroke={colors[0]}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeLinecap="round"
            style={animatedStyle}
          />
        </svg>

        {/* Center content */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {label && (
            <Text style={{ fontSize: 24, fontWeight: '900', color: '#111827' }}>
              {Math.round(percentage)}%
            </Text>
          )}
          {subLabel && (
            <Text style={{ fontSize: 12, color: '#4b5563', marginTop: 4 }}>
              {subLabel}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

// ============================================================================
// BADGE COMPONENT
// ============================================================================

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
}) => {
  const variantStyles: Record<string, { backgroundColor: string; color: string }> = {
    primary: { backgroundColor: '#dbeafe', color: '#1d4ed8' },
    success: { backgroundColor: '#dcfce7', color: '#15803d' },
    warning: { backgroundColor: '#fef9c3', color: '#a16207' },
    error: { backgroundColor: '#fee2e2', color: '#b91c1c' },
    secondary: { backgroundColor: '#f3f4f6', color: '#374151' },
  };

  const sizeStyles: Record<string, { paddingHorizontal: number; paddingVertical: number; fontSize: number }> = {
    sm: { paddingHorizontal: 8, paddingVertical: 4, fontSize: 12 },
    md: { paddingHorizontal: 12, paddingVertical: 6, fontSize: 14 },
    lg: { paddingHorizontal: 16, paddingVertical: 8, fontSize: 16 },
  };

  const { backgroundColor, color } = variantStyles[variant];
  const { paddingHorizontal, paddingVertical, fontSize } = sizeStyles[size];

  return (
    <View
      style={{
        borderRadius: 9999,
        backgroundColor,
        paddingHorizontal,
        paddingVertical,
      }}
    >
      <Text style={{ fontWeight: 'bold', color, fontSize }}>
        {label}
      </Text>
    </View>
  );
};

// ============================================================================
// EMPTY STATE COMPONENT
// ============================================================================

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 48,
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          backgroundColor: '#f3f4f6',
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        {icon}
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#111827',
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: '#4b5563',
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        {description}
      </Text>
      {actionLabel && onAction && (
        <PremiumButton label={actionLabel} onPress={onAction} size="md" />
      )}
    </View>
  );
};
