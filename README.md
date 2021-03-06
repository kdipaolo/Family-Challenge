# Family Challenge

## Entities

### Parent
```javascript
  {
    name: "string",
    email: "string",
    family: Family
  }
```

### Child
```javascript
  {
    name: "string",
    username: "string"
    birdthday: "string",
    family: Family,
    assignedTasks: [ Task ]
  }
```

### Task
```javascript
  {
    description: "string",
    assignee: Child,
    needsReviewed: boolean
    group: Group
  }
```  
### Group
```javascript
  {
    tasks: [ Task ],
    dueDate: Timestamp,
    reward: Reward,
    family: Family,
    assignees: [ Child ]
  }
```
### Reward
```javascript
{
  title: "String",
  description: "String",
  family: Family,
  group: [ Group ]
}
```

### Family
```javascript
{
  name: "String",
  description: "String",
  parents: [ Parent ],
  children: [ Child ],
  groups: [ Group ],
  rewards: [ Reward ]
}
```

## Flows
### 1. Parent signs up and creates family
- Parent goes to Signup view of app
- Parent creates account by entering an email and password
- Parent is directed to their dashboard
- Parent is prompted to create a new family
- Parent enters title for family
- Family is created

### 2. Parent adds child to family
- After parents creates a family they are then prompted to add children or family members to their family.  They can choose to add family members later as well.
- Parent is prompted with a form to add a child.
- Parent fills out name, age and username of child.
- After parent fills out all fields, the can click whether to add another family member or to be done adding family members.

### 3. Parent creates group
- On their dashboard, parent created the "Add new group" button.
- The parent is take to a form to add a new group.
- The parent fills out the name of the group, the members to be added to the group, the completion goal of the group, and the final reward.
- The parents clicks "Create Group" and the group is created.

### 4. Parent adds task to group
- The parent is able to access their group from the dashboard.
- The parent clicks on the group and is directed to a view for the group
- The parent clicks a button to add tasks to the group.
- By default three inputs are shown to the user to add in tasks
- The parent adds the task name, assigns a user to the task, and marks whether or not the task needs to be reviewed before completion.
- If the parent wants to add more tasks they click add another task and another input is appended to the end of the task inputs
- Once the parent is done adding tasks they click done
