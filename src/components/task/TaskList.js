import React from 'react'
import TaskCard from '../task/TaskCard'
import Loading from '../shared/Loading'
import NoResults from '../shared/NoResults'
class TaskList extends React.Component {
  render() {
    console.log(this.props.tasks)
    return (
      <div>
        {!this.props.loading ? (
          this.props.tasks.length ? (
            <div>
              <a
                href="#"
                name="completed"
                onClick={this.props.handleToggleCompleted}
              >
                {this.props.completed ? 'Hide' : 'Show'} Completed
              </a>
              {this.props.tasks
                .filter(task => (this.props.completed ? task : !task.completed))
                .map(task => {
                  return (
                    <TaskCard
                      description={task.description}
                      assignedTo={task.assignee.name}
                      title={task.title}
                      key={task.id}
                      id={task.id}
                      completed={task.completed}
                    />
                  )
                })}
            </div>
          ) : (
            <NoResults>No Tasks Found</NoResults>
          )
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

export default TaskList
