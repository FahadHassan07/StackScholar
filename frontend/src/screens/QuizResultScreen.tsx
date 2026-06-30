import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { apiPost, apiGet } from '../api/client';
import { RootStackParamList } from '../types';
import { Colors } from '../theme';

interface QuizQuestion {
  id: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  options: string[];
  isCorrect: boolean;
  explanation?: string;
}

interface QuizResultData {
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: number;
  questions: QuizQuestion[];
  timestamp: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'QuizResult'>;

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);
const { width } = Dimensions.get('window');

export const QuizResultScreen: React.FC<Props> = ({ route, navigation }) => {
  const { quizId, timeTaken } = route.params;
  const { user } = useAuth();
  const [result, setResult] = useState<QuizResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  // Animated values
  const scoreScale = useSharedValue(0);
  const circleProgress = useSharedValue(0);

  // Fetch quiz results
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await apiGet(`/ai/quiz-results/${quizId}`);
        if (response) {
          setResult(response);
          // Trigger animations after data loads
          animateScore();
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load quiz results');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [quizId]);

  const animateScore = () => {
    scoreScale.value = withSequence(
      withTiming(0, { duration: 0 }),
      withSpring(1, { damping: 8, mass: 1.2 })
    );

    if (result) {
      circleProgress.value = withTiming(result.percentage / 100, {
        duration: 1800,
        easing: Easing.out(Easing.quad),
      });
    }
  };

  const scoreAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scoreScale.value }],
  }));

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (percentage: number): [string, string] => {
    if (percentage >= 80) return ['#10b981', '#059669'];
    if (percentage >= 60) return ['#f59e0b', '#d97706'];
    return ['#ef4444', '#dc2626'];
  };

  const handleRetakeQuiz = async () => {
    try {
      navigation.replace('QuizGenerator');
    } catch (error) {
      Alert.alert('Error', 'Failed to retake quiz');
    }
  };

  const handleSaveResults = async () => {
    try {
      await apiPost('/analytics/save-result', {
        quizId,
        score: result?.score,
        totalQuestions: result?.totalQuestions,
        percentage: result?.percentage,
        timeTaken,
      });
      Alert.alert('Success', 'Results saved to your analytics');
    } catch (error) {
      Alert.alert('Error', 'Failed to save results');
    }
  };

  if (loading || !result) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Loading your results...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const [startColor, endColor] = getScoreColor(result.percentage);

  return (
    <SafeAreaView style={styles.containerGray}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <AnimatedView entering={FadeInDown.delay(100).springify()} style={styles.header}>
          <Text style={styles.headerTitle}>
            {result.percentage >= 80 ? '🎉' : result.percentage >= 60 ? '👍' : '💪'} Quiz Complete!
          </Text>
          <Text style={styles.headerSubtitle}>{result.quizTitle}</Text>
        </AnimatedView>

        {/* Score Circle */}
        <AnimatedView
          entering={FadeInUp.delay(200).springify()}
          style={[styles.scoreContainer, scoreAnimatedStyle]}
        >
          <LinearGradient
            colors={[startColor, endColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.scoreCircle}
          >
            <View style={styles.scoreCircleBorder} />
            <View style={styles.scoreContent}>
              <AnimatedText style={styles.scorePercentage}>
                {Math.round(result.percentage)}%
              </AnimatedText>
              <Text style={styles.scoreRatio}>
                {result.score}/{result.totalQuestions}
              </Text>
            </View>
          </LinearGradient>
        </AnimatedView>

        {/* Stats Cards */}
        <AnimatedView entering={FadeInUp.delay(300).springify()} style={styles.statsContainer}>
          <View style={styles.statsRow}>
            {/* Time Card */}
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>TIME</Text>
              <Text style={styles.statValue}>{formatTime(timeTaken)}</Text>
            </View>

            {/* Accuracy Card */}
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>ACCURACY</Text>
              <Text style={styles.statValue}>
                {Math.round((result.score / result.totalQuestions) * 100)}%
              </Text>
            </View>
          </View>
        </AnimatedView>

        {/* Performance Indicator */}
        <AnimatedView entering={FadeInUp.delay(400).springify()} style={styles.performanceContainer}>
          <View style={styles.performanceCard}>
            <View style={styles.performanceHeader}>
              <Text style={styles.performanceTitle}>Performance</Text>
              <Text style={styles.performanceBadge}>
                {result.percentage >= 80
                  ? 'Excellent'
                  : result.percentage >= 60
                  ? 'Good'
                  : 'Needs Improvement'}
              </Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <LinearGradient
                colors={[startColor, endColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBar, { width: `${result.percentage}%` }]}
              />
            </View>

            <Text style={styles.progressText}>
              {result.score} correct out of {result.totalQuestions} questions
            </Text>
          </View>
        </AnimatedView>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Questions Review */}
        <AnimatedView entering={FadeInUp.delay(500).springify()} style={styles.reviewContainer}>
          <Text style={styles.reviewTitle}>Review Answers</Text>

          <View style={styles.questionsList}>
            {result.questions.map((question, index) => (
              <TouchableOpacity
                key={question.id}
                onPress={() =>
                  setExpandedQuestion(
                    expandedQuestion === question.id ? null : question.id
                  )
                }
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.questionCard,
                    question.isCorrect ? styles.questionCardCorrect : styles.questionCardIncorrect,
                  ]}
                >
                  <View style={styles.questionHeader}>
                    <View
                      style={[
                        styles.questionIcon,
                        question.isCorrect ? styles.questionIconCorrect : styles.questionIconIncorrect,
                      ]}
                    >
                      <Text style={styles.questionIconText}>
                        {question.isCorrect ? '✓' : '✕'}
                      </Text>
                    </View>
                    <View style={styles.questionTextContainer}>
                      <Text style={styles.questionText}>
                        Q{index + 1}: {question.question}
                      </Text>
                    </View>
                  </View>

                  {/* Expandable Details */}
                  {expandedQuestion === question.id && (
                    <AnimatedView entering={FadeInDown.springify()} style={styles.questionDetails}>
                      <View style={styles.answersList}>
                        {!question.isCorrect && (
                          <>
                            <View>
                              <Text style={styles.answerLabel}>Your Answer</Text>
                              <View style={styles.answerBoxWrong}>
                                <Text style={styles.answerTextWrong}>
                                  {question.userAnswer}
                                </Text>
                              </View>
                            </View>

                            <View>
                              <Text style={styles.answerLabel}>Correct Answer</Text>
                              <View style={styles.answerBoxCorrect}>
                                <Text style={styles.answerTextCorrect}>
                                  {question.correctAnswer}
                                </Text>
                              </View>
                            </View>
                          </>
                        )}

                        {question.explanation && (
                          <View>
                            <Text style={styles.answerLabel}>Explanation</Text>
                            <View style={styles.explanationBox}>
                              <Text style={styles.explanationText}>
                                {question.explanation}
                              </Text>
                            </View>
                          </View>
                        )}
                      </View>
                    </AnimatedView>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </AnimatedView>

        {/* Action Buttons */}
        <AnimatedView entering={FadeInUp.delay(600).springify()} style={styles.actionsContainer}>
          {/* Save Results Button */}
          <TouchableOpacity
            onPress={handleSaveResults}
            activeOpacity={0.7}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Save Results to Analytics</Text>
          </TouchableOpacity>

          {/* Retake Button */}
          <TouchableOpacity
            onPress={handleRetakeQuiz}
            activeOpacity={0.7}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Retake Quiz</Text>
          </TouchableOpacity>

          {/* Home Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.7}
            style={styles.tertiaryButton}
          >
            <Text style={styles.tertiaryButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </AnimatedView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerGray: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#6b7280',
    marginTop: 16,
    textAlign: 'center',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#6b7280',
    fontSize: 16,
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scoreCircleBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 80,
    opacity: 0.2,
  },
  scoreContent: {
    alignItems: 'center',
  },
  scorePercentage: {
    color: '#fff',
    fontSize: 56,
    fontWeight: '900',
  },
  scoreRatio: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    opacity: 0.9,
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  statLabel: {
    color: '#6b7280',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  performanceContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  performanceCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  performanceTitle: {
    fontWeight: '600',
    color: '#111827',
  },
  performanceBadge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  reviewContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  questionsList: {
    gap: 12,
  },
  questionCard: {
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
  },
  questionCardCorrect: {
    backgroundColor: '#f0fdf4',
    borderLeftColor: '#10b981',
  },
  questionCardIncorrect: {
    backgroundColor: '#fef2f2',
    borderLeftColor: '#ef4444',
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  questionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionIconCorrect: {
    backgroundColor: '#10b981',
  },
  questionIconIncorrect: {
    backgroundColor: '#ef4444',
  },
  questionIconText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  questionTextContainer: {
    flex: 1,
  },
  questionText: {
    color: '#111827',
    fontWeight: '600',
  },
  questionDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  answersList: {
    gap: 12,
  },
  answerLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 4,
  },
  answerBoxWrong: {
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    padding: 12,
  },
  answerTextWrong: {
    color: '#7f1d1d',
    fontSize: 14,
  },
  answerBoxCorrect: {
    backgroundColor: '#d1fae5',
    borderRadius: 8,
    padding: 12,
  },
  answerTextCorrect: {
    color: '#065f46',
    fontSize: 14,
  },
  explanationBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  explanationText: {
    color: '#1e3a8a',
    fontSize: 14,
    lineHeight: 20,
  },
  actionsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  secondaryButtonText: {
    color: '#111827',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tertiaryButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  tertiaryButtonText: {
    color: '#111827',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
