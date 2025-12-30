import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function Board({ user }) {
  const [issues, setIssues] = useState([]);
  const [draggedIssue, setDraggedIssue] = useState(null);

  // Modal
  const [showModal, setShowModal] = useState(false);

  // Create issue
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Low");

  // Search & filters
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Fetch issues
  const fetchIssues = async () => {
    const q = query(collection(db, "issues"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setIssues(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // Create issue
  const createIssue = async () => {
    if (!title || !desc) {
      alert("Fill all fields");
      return;
    }

    const similar = issues.find(
      (i) =>
        i.title.toLowerCase().includes(title.toLowerCase()) ||
        title.toLowerCase().includes(i.title.toLowerCase())
    );

    if (similar && !window.confirm("Similar issue exists. Continue?")) return;

    await addDoc(collection(db, "issues"), {
      title,
      description: desc,
      priority,
      status: "Open",
      createdBy: user.email,
      assignedTo: user.email,
      createdAt: serverTimestamp(),
    });

    setTitle("");
    setDesc("");
    setPriority("Low");
    setShowModal(false);
    fetchIssues();
  };

  // Move issue
  const moveIssue = async (issue, status) => {
    if (!issue) return;

    if (issue.status === "Open" && status === "Done") {
      alert("Move issue to In Progress first");
      return;
    }

    await updateDoc(doc(db, "issues", issue.id), { status });
    setDraggedIssue(null);
    fetchIssues();
  };

  // Delete issue (ONLY DONE)
  const deleteIssue = async (issue) => {
    const confirm = window.confirm(
      "Are you sure you want to permanently delete this issue?"
    );
    if (!confirm) return;

    await deleteDoc(doc(db, "issues", issue.id));
    fetchIssues();
  };

  // Filters
  const filteredIssues = issues.filter((i) => {
    const matchSearch =
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase());

    const matchPriority =
      filterPriority === "All" || i.priority === filterPriority;

    const matchStatus =
      filterStatus === "All" || i.status === filterStatus;

    return matchSearch && matchPriority && matchStatus;
  });

  // Column
  const Column = ({ title, status }) => {
    const columnIssues = filteredIssues.filter((i) => i.status === status);

    return (
      <div
        className="kanban-column"
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => moveIssue(draggedIssue, status)}
      >
        <div className="column-header">
          <span>{title}</span>
          <span className="count">{columnIssues.length}</span>
        </div>

        <div className="column-body">
          {columnIssues.map((issue) => (
            <div
              key={issue.id}
              className={`issue-card ${issue.priority}`}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", issue.id);
                setDraggedIssue(issue);
              }}
            >
              <div className="issue-title">{issue.title}</div>
              <div className="issue-desc">{issue.description}</div>

              <div className="issue-footer">
                <span className={`badge ${issue.priority}`}>
                  {issue.priority}
                </span>

                {status === "Done" && (
                  <button
                    className="delete-btn"
                    onClick={() => deleteIssue(issue)}
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="board">
      {/* TASK BAR */}
      <div className="task-bar sticky">
        <input
          placeholder="Search issues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="All">All Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button className="primary-btn" onClick={() => setShowModal(true)}>
          + Create Issue
        </button>
      </div>

      {/* KANBAN */}
      <div className="kanban">
        <Column title="Open" status="Open" />
        <Column title="In Progress" status="In Progress" />
        <Column title="Done" status="Done" />
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Issue</h3>
              <span onClick={() => setShowModal(false)}>✖</span>
            </div>

            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <select onChange={(e) => setPriority(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <button className="primary-btn" onClick={createIssue}>
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Board;
