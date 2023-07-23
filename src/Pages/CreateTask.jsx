import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Editable,
  EditablePreview,
  EditableInput,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useRadioGroup,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../Redux/AppReduce/Action';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskTag, setTaskTag] = useState([]);
  const [taskPriority, setTaskPriority] = useState('');
  const [taskPreRequisites, setTaskPreRequisites] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');

  const [currentSubTask, setcurrentSubTask] = useState('');
  const [subTask, setSubTask] = useState([]);
  const [checkBox, setCheckBox] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addSubTask = (e) => {
    e.preventDefault();
    if (currentSubTask) {
      const newSubTasks = [
        ...subTask,
        { subTaskTitle: currentSubTask, status: false },
      ];
      setSubTask(newSubTasks);
    }
  };

  const handleAdd = () => {
    const newTask = {
      name: taskName,
      description: taskDescription,
      status: taskStatus,
      tag: taskTag,
      priority: taskPriority,
      pre_requisties: taskPreRequisites,
      due_date: taskDueDate,
    };

    dispatch(addTask(newTask));
    navigate('/');
  };

  return (
    <Box width="100%" bg="gray.50" py="10" px="8">
      <Heading mb="8" size="lg" textAlign="center">
        Create New Task
      </Heading>
      <Flex justifyContent="space-between">
        <Box flex="1" p="4" bg="white" borderRadius="lg" boxShadow="lg">
          <Stack spacing="4">
            <FormControl>
              <FormLabel>Task Name</FormLabel>
              <Input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Task Description</FormLabel>
              <Textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter task description"
                resize="vertical"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Task Status</FormLabel>
              <RadioGroup onChange={setTaskStatus} value={taskStatus}>
                <Stack direction="row">
                  <Radio value="done">Done</Radio>
                  <Radio value="cancelled">Cancelled</Radio>
                  <Radio value="postponed">Postponed</Radio>
                  <Radio value="completed">Completed</Radio>
                  <Radio value="incompleted">Incomplete</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Tag</FormLabel>
              <CheckboxGroup value={taskTag} onChange={setTaskTag}>
                <Stack direction="row">
                  <Checkbox value="official">Official</Checkbox>
                  <Checkbox value="personal">Personal</Checkbox>
                  <Checkbox value="others">Others</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Task Priority</FormLabel>
              <RadioGroup onChange={setTaskPriority} value={taskPriority}>
                <Stack direction="row">
                  <Radio value="high">High</Radio>
                  <Radio value="medium">Medium</Radio>
                  <Radio value="low">Low</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Prerequisites</FormLabel>
              <Input
                value={taskPreRequisites}
                onChange={(e) => setTaskPreRequisites(e.target.value)}
                placeholder="Enter task prerequisites"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Due Date</FormLabel>
              <Input
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="blue" onClick={handleAdd}>
              Create Task
            </Button>
          </Stack>
        </Box>

        <Box flex="1" p="4" bg="white" borderRadius="lg" boxShadow="lg" ml="4">
          <form>
            <FormControl>
              <FormLabel>Add New Subtask</FormLabel>
              <Flex>
                <Input
                  value={currentSubTask}
                  onChange={(e) => setcurrentSubTask(e.target.value)}
                  placeholder="Enter subtask"
                />
              </Flex>
            </FormControl>
          </form>

          <Stack spacing="2">
            <CheckboxGroup value={checkBox} onChange={setCheckBox}>
              {subTask.map((item, index) => (
                <Flex
                  key={index}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Checkbox size="md" value={item.subTaskTitle}>
                    {item.subTaskTitle}
                  </Checkbox>
                  <DeleteIcon cursor="pointer" />
                </Flex>
              ))}
            </CheckboxGroup>
          </Stack>

          <Button mt="4" colorScheme="blue" onClick={addSubTask}>
            Add Subtask
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateTask;
