import * as React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { insertTask } from '../Data/db'; // ajuste o caminho conforme necessário

const AddTaskScreen = ({ navigation }) => {
  const [task, setTask] = React.useState('');

  const handleSaveTask = () => {
    if (task.trim()) {
      console.log('Mensagem de log');
      insertTask(task, () => {
        setTask('');
        console.log('TaskList');
        navigation.navigate('TaskList');
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />
      <Button
        title="Save Task"
        onPress={handleSaveTask}
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default AddTaskScreen;
