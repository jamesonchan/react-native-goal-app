import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalInput from "./components/goalInput";
import GoalItem from "./components/goalItem";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);
  const [show, setShow] = useState(false);

  const handleAddGoal = () => {
    setCourseGoals((prev) => [
      ...prev,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    setEnteredGoalText("");
    setShow(false);
  };

  const handleGoalInputChange = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const handleDeleteGoal = (goalId) => {
    setCourseGoals((prev) => prev.filter((goal) => goal.id !== goalId));
  };

  const handleOpenModal = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={handleOpenModal}
        />
        <GoalInput
          goalText={enteredGoalText}
          onAddGoal={handleAddGoal}
          onCloseModal={handleCloseModal}
          onGoalInputChange={handleGoalInputChange}
          value={enteredGoalText}
          show={show}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => (
              <GoalItem
                goalText={itemData.item.text}
                onDeleteGoal={() => handleDeleteGoal(itemData.item.id)}
              />
            )}
            keyExtractor={(item, index) => item.id}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 60,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
