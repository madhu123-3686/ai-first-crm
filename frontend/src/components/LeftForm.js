import React, { useState } from "react";
import { useSelector } from "react-redux";

function LeftForm() {

  // 🔹 Redux Data
  const hcp_name = useSelector(state => state.hcp_name);
  const interaction_type = useSelector(state => state.interaction_type);
  const date = useSelector(state => state.date);
  const time = useSelector(state => state.time);
  const attendees = useSelector(state => state.attendees);
  const sentiment = useSelector(state => state.sentiment);
  const topics = useSelector(state => state.topics);
  const materials_shared = useSelector(state => state.materials_shared);
  const samples_distributed = useSelector(state => state.samples_distributed);
  const outcomes = useSelector(state => state.outcomes);
  const follow_up = useSelector(state => state.follow_up);

  // 🔹 Local State for Buttons
  const [materials, setMaterials] = useState(
    materials_shared ? [materials_shared] : []
  );
  const [samples, setSamples] = useState(
    samples_distributed ? [samples_distributed] : []
  );

  // 🔹 Styles
  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #dcdcdc",
    backgroundColor: "#f9f9f9"
  };

  const row = {
    display: "flex",
    gap: "20px",
    marginBottom: "20px"
  };

  const col = { flex: 1 };

  const sectionTitle = {
    marginTop: "30px",
    marginBottom: "10px",
    fontWeight: "600",
    color: "#555"
  };

  const buttonStyle = {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "#f3f4f6",
    cursor: "pointer"
  };

  return (
    <div style={{ padding: "30px", background: "#fff", height: "100%", overflowY: "auto" }}>

      <h2 style={{ marginBottom: "25px" }}>Log HCP Interaction</h2>

      {/* HCP + Interaction Type */}
      <div style={row}>
        <div style={col}>
          <label>HCP Name</label>
          <input value={hcp_name || ""} disabled style={inputStyle} />
        </div>

        <div style={col}>
          <label>Interaction Type</label>
          <select value={interaction_type || ""} disabled style={inputStyle}>
            <option value="">Select Type</option>
            <option value="Meeting">Meeting</option>
            <option value="Call">Call</option>
            <option value="Email">Email</option>
            <option value="Conference">Conference</option>
          </select>
        </div>
      </div>

      {/* Date + Time */}
      <div style={row}>
        <div style={col}>
          <label>Date</label>
          <input value={date || ""} disabled style={inputStyle} />
        </div>

        <div style={col}>
          <label>Time</label>
          <input value={time || ""} disabled style={inputStyle} />
        </div>
      </div>

      {/* Attendees */}
      <div style={{ marginBottom: "20px" }}>
        <label>Attendees</label>
        <input value={attendees || ""} disabled style={inputStyle} />
      </div>

      {/* Topics */}
      <div style={sectionTitle}>Topics Discussed</div>
      <textarea
        rows="4"
        value={topics || ""}
        disabled
        style={{ ...inputStyle, resize: "none" }}
      />

      {/* Voice Button */}
      <button
        style={{
          marginTop: "10px",
          padding: "8px 15px",
          borderRadius: "6px",
          border: "none",
          background: "#eaeaea",
          cursor: "pointer"
        }}
      >
        🎤 Summarize from Voice Note (Requires Consent)
      </button>

      {/* Materials + Samples */}
      <div style={sectionTitle}>Materials Shared / Samples Distributed</div>

      <div style={row}>
        <div style={col}>
          <label>Materials Shared</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              value={materials.join(", ")}
              readOnly
              style={inputStyle}
            />
            <button
              style={buttonStyle}
              onClick={() => {
                const item = prompt("Enter material name:");
                if (item) setMaterials([...materials, item]);
              }}
            >
              🔍 Search/Add
            </button>
          </div>
        </div>

        <div style={col}>
          <label>Samples Distributed</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              value={samples.join(", ")}
              readOnly
              style={inputStyle}
            />
            <button
              style={buttonStyle}
              onClick={() => {
                const name = prompt("Enter sample name:");
                const qty = prompt("Enter quantity:");
                if (name && qty)
                  setSamples([...samples, `${name} (${qty})`]);
              }}
            >
              ➕ Add Sample
            </button>
          </div>
        </div>
      </div>

      {/* Sentiment */}
      <div style={sectionTitle}>Observed / Inferred HCP Sentiment</div>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <label>
          <input type="radio" checked={sentiment === "positive"} readOnly />
          Positive
        </label>
        <label>
          <input type="radio" checked={sentiment === "neutral"} readOnly />
          Neutral
        </label>
        <label>
          <input type="radio" checked={sentiment === "negative"} readOnly />
          Negative
        </label>
      </div>

      {/* Outcomes */}
      <div style={sectionTitle}>Outcomes</div>
      <textarea
        rows="3"
        value={outcomes || ""}
        disabled
        style={{ ...inputStyle, resize: "none" }}
      />

      {/* Follow-up */}
      <div style={sectionTitle}>Follow-up Actions</div>
      <textarea
        rows="3"
        value={follow_up || ""}
        disabled
        style={{ ...inputStyle, resize: "none" }}
      />

      {/* AI Suggested */}
      <div style={{ marginTop: "20px", fontSize: "13px", color: "#0073e6" }}>
        <div>AI Suggested Follow-ups:</div>
        <div>+ Schedule follow-up meeting in 2 weeks</div>
        <div>+ Send product brochure PDF</div>
        <div>+ Add HCP to advisory board invite list</div>
      </div>

    </div>
  );
}

export default LeftForm;
