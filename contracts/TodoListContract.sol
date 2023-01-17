// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract TodoList {
    uint256 public taskCount = 0;

    struct Task {
        uint256 id;
        string content;
        uint256 created_at;
        bool completed;
    }

    mapping(uint256 => Task) public tasks;

    event TaskCreated(
        uint256 id,
        string content,
        uint256 created_at,
        bool completed
    );

    event TaskCompleted(uint256 id, bool completed);

    constructor() {
        createTask("Follow @rafaellaurindo on Github!");
    }

    function createTask(string memory _content) public {
        taskCount++;

        Task memory newTask = Task(taskCount, _content, block.timestamp, false);

        tasks[taskCount] = newTask;

        emit TaskCreated(
            newTask.id,
            newTask.content,
            newTask.created_at,
            newTask.completed
        );
    }

    function getTask(uint256 _id) external view returns (Task memory) {
        return tasks[_id];
    }

    function toggleCompleted(uint256 _id) public {
        Task memory _task = tasks[_id];

        _task.completed = !_task.completed;

        tasks[_id] = _task;

        emit TaskCompleted(_id, _task.completed);
    }
}

