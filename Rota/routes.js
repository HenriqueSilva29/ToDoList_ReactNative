import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from '../Pages/Tarefas';
import AddTaskScreen from '../Pages/AdicionarTarefas';
import { createTable } from '../Data/db'; // ajuste o caminho conforme necessário

const Stack = createNativeStackNavigator();

const Rota = () => {

  React.useEffect(() => {
    createTable();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen name="TaskList" component={TaskListScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Rota;
