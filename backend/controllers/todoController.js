let todos = [];

exports.getTodos = async (req, res) => {
  try {
    // Sort descending by createdAt
    const sortedTodos = [...todos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(sortedTodos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTodo = async (req, res) => {
  const newTodo = {
    _id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
    text: req.body.text,
    completed: false,
    createdAt: new Date().toISOString()
  };

  try {
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todoIndex = todos.findIndex(t => t._id === id);
    if (todoIndex === -1) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }

    if (req.body.text != null) {
      todos[todoIndex].text = req.body.text;
    }
    if (req.body.completed != null) {
      todos[todoIndex].completed = req.body.completed;
    }

    res.json(todos[todoIndex]);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todoIndex = todos.findIndex(t => t._id === id);
    if (todoIndex === -1) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }

    todos.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
