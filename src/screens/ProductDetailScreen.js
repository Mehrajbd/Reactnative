import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  postReview,
  getProductReview,
  updateReview,
  deleteReview,
} from '../api/reviewApi';
import { useFocusEffect } from '@react-navigation/native';

import ProductInfoCard from '../components/ProductDetail/ProductInfoCard';
import ReviewInputSection from '../components/ProductDetail/ReviewInputSection';
import ReviewList from '../components/ProductDetail/ReviewList';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const { addToCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editComment, setEditComment] = useState('');
  const [isEligibleToReview, setIsEligibleToReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const loadUser = async () => {
    const user = await AsyncStorage.getItem('signedInUser');
    if (user) setCurrentUser(JSON.parse(user));
  };

  const checkReviewEligibility = async () => {
    const history = await AsyncStorage.getItem('orderHistory');
    if (!history) return;

    const parsedOrders = JSON.parse(history);
    const allProductIds = parsedOrders.flatMap(order =>
      order.items.map(item => item.productId)
    );
    const isEligible = allProductIds.includes(product._id);
    setIsEligibleToReview(isEligible);
  };

  const handleAddToCart = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await addToCart(product._id, 1);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Product added to cart',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Could not add to cart',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!rating || !reviewText) {
      Alert.alert('Missing Fields', 'Please add a rating and a comment.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        productId: product._id,
        comment: reviewText,
        rating,
      };
      await postReview(payload);
      Toast.show({
        type: 'success',
        text1: 'Review Submitted',
        text2: 'Your review has been posted successfully.',
      });

      setReviewText('');
      setRating(0);
      setHasReviewed(true);
      setIsEligibleToReview(false);

      await fetchReviews();
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Failed to submit review' });
    } finally {
      setSubmitting(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await getProductReview(product._id);
      setReviews(res.data.data);

      const user = await AsyncStorage.getItem('signedInUser');
      const parsedUser = user ? JSON.parse(user) : null;
      const alreadyReviewed = res.data.data.some(
        rev => rev.user?._id === parsedUser?._id
      );
      setHasReviewed(alreadyReviewed);
    } catch (err) {
      console.log('Fetch Review Error:', err);
    }
  };

  const handleEdit = (id, existingComment) => {
    setEditingReviewId(id);
    setEditComment(existingComment);
  };

  const handleUpdate = async () => {
    try {
      await updateReview(editingReviewId, { comment: editComment });
      Toast.show({ type: 'success', text1: 'Review updated!' });
      setEditingReviewId(null);
      setEditComment('');
      fetchReviews();
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Failed to update review' });
    }
  };

  const handleDelete = async (id) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this review?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteReview(id);
            Toast.show({ type: 'success', text1: 'Review deleted!' });
            setHasReviewed(false);
            checkReviewEligibility();
            fetchReviews();
          } catch (err) {
            Toast.show({ type: 'error', text1: 'Failed to delete review' });
          }
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      loadUser();
      fetchReviews();
      checkReviewEligibility();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProductInfoCard
        product={product}
        loading={loading}
        onAddToCart={handleAddToCart}
      />

      <ReviewInputSection
        rating={rating}
        setRating={setRating}
        reviewText={reviewText}
        setReviewText={setReviewText}
        onSubmit={handleSubmitReview}
        isEligibleToReview={isEligibleToReview}
        hasReviewed={hasReviewed}
        submitting={submitting}
      />

      <ReviewList
        reviews={reviews}
        currentUser={currentUser}
        editingReviewId={editingReviewId}
        editComment={editComment}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        setEditComment={setEditComment}
      />

      <Toast />
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F2F2F2',
  },
});
