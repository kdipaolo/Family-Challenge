import React from "react";
import Task from "../cards/Task";
import Button from "./Button";
import Loading from "./Loading";
import NoResults from "./NoResults";
class TaskList extends React.Component {
  render() {
    return (
      <div>
        {!this.props.loading ? (
          this.props.tasks.length ? (
            <div>
              <a
                href="#"
                name="completed"
                onClick={e => this.props.handleStateUpdate(e, "completed")}
              >
                {this.props.completed ? "Hide" : "Show"} Completed
              </a>
              {this.props.tasks
                .filter(task => (this.props.completed ? task : !task.completed))
                .map(task => {
                  return (
                    <Task
                      description={task.description}
                      title={task.title}
                      key={task.id}
                      id={task.id}
                      completed={task.completed}
                    />
                  );
                })}
            </div>
          ) : (
            <NoResults>No Tasks Found</NoResults>
          )
        ) : (
          <Loading />
        )}

        {!this.props.openMenu && (
          <Button
            sticky
            name="openMenu"
            onClick={e => this.props.handleStateUpdate(e)}
          >
            + Add A Task
          </Button>
        )}
      </div>
    );
  }
}

export default TaskList;
