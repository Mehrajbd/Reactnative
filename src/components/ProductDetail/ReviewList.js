import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ReviewList = ({
  reviews,
  currentUser,
  editingReviewId,
  editComment,
  onEdit,
  onDelete,
  onUpdate,
  setEditComment,
}) => {
  if (!reviews || reviews.length === 0) {
    return <Text style={{ color: '#777' }}>No reviews yet.</Text>;
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item._id}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <View style={styles.reviewCard}>
          <Text style={{ fontWeight: 'bold' }}>
            {(item?.user && item.user.name) || 'User'} ⭐ {item.rating}
          </Text>
          {editingReviewId === item._id ? (
            <>
              <TextInput
                style={styles.input}
                value={editComment}
                onChangeText={setEditComment}
              />
              <TouchableOpacity style={styles.submitButton} onPress={onUpdate}>
                <Text style={styles.submitText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={{ marginTop: 4 }}>{item.comment || 'No comment provided.'}</Text>
              {currentUser?._id === item.user?._id && (
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <TouchableOpacity
                    style={[styles.smallBtn, { backgroundColor: '#1E90FF' }]}
                    onPress={() => onEdit(item._id, item.comment)}
                  >
                    <Text style={styles.btnText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.smallBtn, { backgroundColor: 'red', marginLeft: 10 }]}
                    onPress={() => onDelete(item._id)}
                  >
                    <Text style={styles.btnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
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
  smallBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
});

export default ReviewList;
