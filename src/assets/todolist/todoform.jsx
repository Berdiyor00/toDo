import { useRef, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import 'bootstrap/dist/css/bootstrap.css';

import TodoItem from "../todolist/todo.jsx";
const HomePage = () => {
  const todosJSON = localStorage.getItem("todos");

  const todoInputRef = useRef();
  const timeInputRef = useRef();
  const searchInputRef = useRef();

  const [todos, setTodos] = useState(JSON.parse(todosJSON) || []);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const submit = (e) => {
    e.preventDefault();

    const title = todoInputRef.current.value.trim();
    const time = timeInputRef.current.value;

    if (title && time) {
      const todo = {
        id: Date.now(),
        title,
        time,
        done: false,
      };
      let newTodos;
      if (selected === null) {
        newTodos = [todo, ...todos];
      } else {
        newTodos = todos.map((el) =>
          el.id === selected ? { ...el, title, time } : el
        );
        setSelected(null);
      }

      setTodos(newTodos);

      localStorage.setItem("todos", JSON.stringify(newTodos));

      todoInputRef.current.focus();

      e.target.reset();
    } else {
      window.alert("Iltimos Nimadur to`ldiring Qidirsh uchun Ok ni bosing!!!🧐");
    }
  };

  const doneTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: true } : todo
    );
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const editTodo = (id) => {
    const { title, time } = todos.find((todo) => todo.id === id);
    todoInputRef.current.value = title;
    timeInputRef.current.value = time;
    setSelected(id);
  };

  const filterTodos = (todos, searchTerm) => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSearch = () => {
    setSearchTerm(searchInputRef.current.value);
  };

  const filteredTodos = filterTodos(todos, searchTerm);

  return (
    <section>
      <div className="container">
        <h1 className="text-center my-3">TODO PROJECT</h1>
        <form onSubmit={submit} className="d-flex mb-3 gap-3">
          <input ref={todoInputRef} type="text" className="form-control" />
          <input ref={timeInputRef} type="time" className="form-control" />
          <input ref={searchInputRef} type="text" className="form-control" placeholder="Search..." />
          <button className="btn btn-success" onClick={handleSearch}>
            {selected === null ? "Add" : "Save"}
          </button>
        </form>
        <Tabs
          variant="pills"
          defaultActiveKey="all"
          transition={true}
          id="todo"
          className="mb-3"
          justify
        >
          <Tab eventKey="all" title={`All todos (${filteredTodos.length})`}>
            {filteredTodos.map((todo, i) => (
              <TodoItem
                order={i + 1}
                key={i}
                {...todo}
                doneTodo={doneTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            ))}
            {filteredTodos.length === 0 && <p>No matching todos found.</p>}
          </Tab>
     
        </Tabs>
      </div>
    </section>
  );
};

export default HomePage;
