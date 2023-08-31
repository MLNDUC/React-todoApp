import "./ActionButton.css"

export const ActionButton = ({ handleCompletedTasks, handleDeleteAll, searchKeyword, setSearchKeyword }) => {
  return (
    <div className="action-group">
      <input
        type="text"
        id="search"
        className="search-input"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="Search tasks..."
      />
      <div className="btn-group">
        <button onClick={handleCompletedTasks}>Delete completed</button>
        <button onClick={handleDeleteAll}>Delete all</button>
      </div>
    </div>
  )
}
