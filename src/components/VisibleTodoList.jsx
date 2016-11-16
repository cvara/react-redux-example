import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';

class VisibleTodoList extends Component {
	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate(prevProps) {
		if (this.props.filter !== prevProps.filter) {
			this.fetchData();
		}
	}

	fetchData() {
		const { filter, fetchTodos } = this.props;
		// dispatch async action
		fetchTodos(filter);
	}

	render() {
		const { toggleTodo, ...rest } = this.props;
		return (
			<TodoList
				{...rest}
				onTodoClick={toggleTodo}
			/>
		);
	}
}

// route params is availabe in ownProps (2nd arg) because of withRouter()
// NOTE: we also use mapStateToProps() to pass ownProps.params.filter as
// `filter` prop to the child component we are wrapping with connect
const mapStateToProps = (state, { params }) => {
	const filter = params.filter || 'all';
	return {
		todos: getVisibleTodos(state, filter),
		filter
	};
};

// Generate container component VisibleTodoList that is the result of
// wrapping Todo list twice in this order (order matters):
// 1. connect() -> connects to redux store
// 2. withRouter() -> stores route `params` in (own) props
VisibleTodoList = withRouter(connect(
	mapStateToProps,
	// mapDispatchToProps() shorthand:
	// creates an action dispatcher for each action creator
	// found inside the `actions` namespace import
	actions
)(VisibleTodoList));

export default VisibleTodoList;
