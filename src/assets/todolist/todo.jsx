import PropTypes from "prop-types";

const TodoItem = (props) => {
  const { title, time, done, order, id, doneTodo, deleteTodo, editTodo } =
    props;
  return (
    <div className="d-flex justify-content-between align-items-center alert alert-primary">
      <div>
        <h3>
          {order}. {title}
        </h3>
        <p>{time}</p>
      </div>
      <div>
        <button className="btn btn-primary me-3" onClick={() => editTodo(id)}>
          Edit
        </button>
        {done ? (
          <button className="btn btn-danger" onClick={() => deleteTodo(id)}>
            Delete
          </button>
        ) : (
          <button className="btn btn-success" onClick={() => doneTodo(id)}>
            Done
          </button>
        )}
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  time: PropTypes.string,
  done: PropTypes.bool,
  order: PropTypes.number,
  doneTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  editTodo: PropTypes.func,
};

export default TodoItem;
