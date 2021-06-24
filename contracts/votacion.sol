pragma solidity >=0.5.0;

contract votacion {
    uint256 public taskCount = 0;

    struct Task {
        uint256 id;
        string id_persona;
        string voto;
        string fecha_voto;
    }

    mapping(uint256 => Task) public tasks;

    event TaskCreated(uint256 id, string id_persona, string voto, string fecha);

    //event TaskCompleted(uint256 id, bool completed);

    constructor() public {}

    function createTask(
        string memory _id_persona,
        string memory _voto,
        string memory _fecha_voto
    ) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _id_persona, _voto, _fecha_voto);
        emit TaskCreated(taskCount, _id_persona, _voto, _fecha_voto);
    }

    /*     function toggleCompleted(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    } */
}
