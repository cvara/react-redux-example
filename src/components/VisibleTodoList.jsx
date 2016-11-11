import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';


const getVisibleTodos = (
	todos,
	filter
) => {
	switch (filter) {
		case 'all':
			return todos;
		case 'completed':
			return todos.filter(t => t.completed);
		case 'active':
			return todos.filter(t => !t.completed);
	}
};

const mapStateToProps = (state, { params }) => ({
	todos: getVisibleTodos(
		state.todos,
		params.filter || 'all'
	)
});

// const mapDispatchToProps = (dispatch) => ({
// 	onTodoClick(id) {
// 		dispatch(toggleTodo(id));
// 	}
// });

// Generate container component VisibleTodoList
// that is the result of wrapping Todo list twice
// in this order (order matters):
// 1. connect() -> connects to redux store
// 2. withRouter() -> stores route `params` in (own) props
const VisibleTodoList = withRouter(connect(
	mapStateToProps,
	// mapDispatchToProps() shorthand:
	// onTodoClick() will be a function that will call
	// toggleTodo() to generate an action passing through
	// its args in the same order and then call dispatch()
	// to dispatch the action to the store
	{ onTodoClick: toggleTodo }
)(TodoList));

export default VisibleTodoList;
