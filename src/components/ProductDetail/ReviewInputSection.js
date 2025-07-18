import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const ReviewInputSection = ({
  rating,
  setRating,
  reviewText,
  setReviewText,
  onSubmit,
  isEligibleToReview,
  hasReviewed,
  submitting,
}) => {
  const renderStars = () => (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map(i => (
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Text style={{ fontSize: 24, color: i <= rating ? '#FFD700' : '#ccc' }}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.sectionTitle}>Write a Review</Text>
      {renderStars()}
      <TextInput
        style={styles.input}
        placeholder="Write your review..."
        value={reviewText}
        onChangeText={setReviewText}
        multiline
      />
      <TouchableOpacity
        style={[
          styles.submitButton,
          (!isEligibleToReview || hasReviewed) && { backgroundColor: '#ccc' },
        ]}
        onPress={onSubmit}
        disabled={!isEligibleToReview || submitting || hasReviewed}
      >
        <Text style={styles.submitText}>
          {submitting ? 'Submitting...' : hasReviewed ? 'Review Submitted' : 'Submit Review'}
        </Text>
      </TouchableOpacity>
      {!isEligibleToReview && !hasReviewed && (
        <Text style={{ color: 'red', marginTop: 6 }}>
          You must order this product to review it.
        </Text>
      )}
      {hasReviewed && (
        <Text style={{ color: 'green', marginTop: 6 }}>
          You've already submitted a review for this product.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 6, color: '#333' },
  starRow: { flexDirection: 'row', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    minHeight: 60,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: 'bold' },
});

export default ReviewInputSection;
