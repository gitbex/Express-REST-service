const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'someTitleName',
    order = 0,
    description = 'someDescription',
    userId = 'someString',
    boardId = 'someString',
    columnId = 'someString'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(board) {
    const { id, title, order, description, userId, boardId, columnId } = board;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
