import * as React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';
import { getTasks, updateTaskCompletion } from '../Data/db'; // ajuste o caminho conforme necessário

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadTasks();
    });
    console.log("Carregando")
    loadTasks(); // Load tasks on initial render
    console.log("Tarefas: ", tasks)
    return unsubscribe;
  }, [navigation]);

  const loadTasks = () => {
    getTasks((loadedTasks) => {
      setTasks(loadedTasks);
    });
  };

  const handleTaskCompletion = (id, completed) => {
    console.log("handleTaskCompletion")
    console.log(id,completed)
    updateTaskCompletion(id, completed);
    console.log("updateTaskCompletion")
    loadTasks(); // Reload tasks after updating
  };

  return (
    <View style={styles.container}>
     <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <CheckBox
               value={!!item.completed}
               onValueChange={(newValue) => handleTaskCompletion(item.id, newValue ? 1 : 0)} // Converte true para 1 e false para 0
            />
            <Text style={item.completed ? styles.taskCompleted : styles.task}>
              {item.text}
            </Text>
          </View>
        )}
      />
      <Button
        title="Add Task"
        onPress={() => navigation.navigate('AddTask')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  task: {
    marginLeft: 8,
  },
  taskCompleted: {
    marginLeft: 8,
    textDecorationLine: 'line-through',
  },
});

export default TaskListScreen;
