import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Button} from 'react-native';
import Goalitem from "./components/Goalitem";
import Goalinput from "./components/Goalinput";

export default function App() {

    const [courseGoals, setCourseGoals] = useState([]);
    const [isAddGoalVisible, setIsAddGoalVisible] = useState(false);

    const addGoalHandler = (goalTitle) => {
        setCourseGoals(currentGoals => [
            ...currentGoals,
            {id: Math.random().toString(), value: goalTitle}
        ]);
        setIsAddGoalVisible(false);
    };

    const deleteGoalHandler = (goalId) => {
        setCourseGoals(currentGoals => {
            return currentGoals.filter((goal) => {
                return goal.id !== goalId
            });
        });
    };


    const cancelGoalAddHandler = () => {
        setIsAddGoalVisible(false);
    };

    return (
        <View style={styles.screen}>
            <Button title="Add new goal" onPress={()=>{setIsAddGoalVisible(true)}}/>
            <Goalinput onCancel={cancelGoalAddHandler} visible={isAddGoalVisible} onAddGoal={addGoalHandler}/>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={courseGoals}
                renderItem={itemData => (
                    <Goalitem
                        id={itemData.item.id}
                        onDelete={deleteGoalHandler}
                        title={itemData.item.value}
                        />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 50,
    },
});
