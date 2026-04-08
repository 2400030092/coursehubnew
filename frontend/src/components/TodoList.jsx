import { useState } from 'react';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';

const TodoList = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Complete React Course', completed: false },
        { id: 2, text: 'Update Profile', completed: true },
        { id: 3, text: 'Review Assignments', completed: false },
    ]);
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        setTodos([
            { id: Date.now(), text: newTodo, completed: false },
            ...todos
        ]);
        setNewTodo('');
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">My Goals</h3>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-white border border-white/10">
                    {todos.filter(t => t.completed).length}/{todos.length} Completed
                </span>
            </div>

            <form onSubmit={handleAddTodo} className="relative mb-6">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new goal..."
                    className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:bg-white/10 focus:border-primary-500 transition-all"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </form>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {todos.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 bg-white/5 rounded-xl border border-white/5 border-dashed">
                        <p>No goals yet.</p>
                        <p className="text-sm">Add one to get started!</p>
                    </div>
                ) : (
                    todos.map(todo => (
                        <div
                            key={todo.id}
                            className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${todo.completed
                                    ? 'bg-white/5 border-white/5 opacity-60'
                                    : 'bg-white/10 border-white/10 hover:bg-white/15'
                                }`}
                        >
                            <button
                                onClick={() => toggleTodo(todo.id)}
                                className="flex items-center flex-1 text-left gap-3"
                            >
                                {todo.completed ? (
                                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                                ) : (
                                    <Circle className="h-5 w-5 text-gray-400 group-hover:text-primary-400 flex-shrink-0 transition-colors" />
                                )}
                                <span className={`text-sm font-medium ${todo.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                                    {todo.text}
                                </span>
                            </button>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
        </div>
    );
};

export default TodoList;
