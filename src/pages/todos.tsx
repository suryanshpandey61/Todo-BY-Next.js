import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import '../app/globals.css';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  created_at: string;
}

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState('');

  const fetchTodos = async () => {
    const { data, error } = await supabase.from('todos').select('*');
    if (error) console.error('Error fetching todos:', error);
    else setTodos(data);
  };

  const addTodo = async () => {
    if (task.trim() === '') return;

    const { data, error } = await supabase
      .from('todos')
      .insert([{ task }])
      .select();

    if (error) {
      console.error('Error adding todo:', error);
    } else if (data) {
      setTodos([...todos, ...data]);
    }

    setTask('');
  };

  const toggleCompletion = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const { data, error } = await supabase
      .from('todos')
      .update({ completed: !todo.completed })
      .eq('id', id)
      .select();

    if (error) console.error('Error updating todo:', error);
    else setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = async (id: number) => {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) console.error('Error deleting todo:', error);
    else setTodos(todos.filter(t => t.id !== id));
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingTask(todo.task);
  };

  const saveEdit = async () => {
    if (editingTask.trim() === '') return;

    const { data, error } = await supabase
      .from('todos')
      .update({ task: editingTask })
      .eq('id', editingId)
      .select();

    if (error) console.error('Error updating todo:', error);
    else {
      setTodos(todos.map(t => (t.id === editingId ? { ...t, task: editingTask } : t)));
      setEditingId(null);
      setEditingTask('');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className='text-center main-div h-[100vh]'>
      <div className='pt-9'>
        <h1 className='text-4xl font-bold'>To-Do List</h1>
      </div>
      <div className='mt-5 flex relative mx-auto justify-center'> 
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className='absolute border h-[31px] w-[300px] border-black rounded-md'
        />
        <button onClick={addTodo} className='absolute ml-[224px] hover:bg-green-500 transition-all duration-500 mt-[-1px] bg-blue-600 px-6 py-1 rounded-md text-white'>Add</button>
      </div>
      <div className='flex relative mt-[50px] justify-center'> 
        <ul>
          {todos.map(todo => (
            <li key={todo.id} className='mt-4'>
              <div>
                <p className='text-xl' style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editingTask}
                      onChange={(e) => setEditingTask(e.target.value)}
                      className='border border-gray-400 rounded-md'
                    />
                  ) : (
                    todo.task
                  )}
                </p>
                {editingId === todo.id ? (
                  <button 
                    className='text-white px-4 font-bold rounded-md ml-4 bg-blue-600 hover:bg-blue-800'
                    onClick={saveEdit}>
                    Save
                  </button>
                ) : (
                  <>
                    <button 
                      className='text-white px-4 font-bold rounded-md ml-4 bg-green-500 hover:bg-green-800'
                      onClick={() => toggleCompletion(todo.id)}>
                      {todo.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button 
                      className='text-white px-4 font-bold rounded-md ml-4 bg-red-600 hover:bg-red-800'
                      onClick={() => deleteTodo(todo.id)}>
                      Delete
                    </button>
                    <button 
                      className='text-white px-4 font-bold rounded-md ml-4 bg-yellow-500 hover:bg-yellow-700'
                      onClick={() => startEditing(todo)}>
                      Edit
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todos;
