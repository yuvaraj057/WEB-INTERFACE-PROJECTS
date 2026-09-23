import { useState } from "react";

function Project2() {
  // Initial list of students
  const initialStudents = [
    { id: 1, name: "Mari", status: "Present" },
    { id: 2, name: "Kamesh", status: "Absent" },
    { id: 3, name: "Yuvi", status: "Present" },
    { id: 4, name: "Jeevi", status: "Present" },
    { id: 5, name: "Rani", status: "Absent" },
    { id: 6, name: "Raji", status: "Present" },
    { id: 7, name: "Harini", status: "Absent" },
    { id: 8, name: "Jai", status: "Present" },
    { id: 9, name: "Jayasri", status: "Absent" },
    { id: 10, name: "Kanagi", status: "Present" },
    { id: 11, name: "Deepi", status: "Absent" },
    { id: 12, name: "Mari", status: "Present" },
    { id: 13, name: "Mani", status: "Absent" },
    { id: 14, name: "Nishi", status: "Present" },
    { id: 15, name: "Nandhini", status: "Absent" },
    { id: 16, name: "Sivi", status: "Absent" },
    { id: 17, name: "Ranji", status: "Present" },
    { id: 18, name: "Sri", status: "Present" },
    { id: 19, name: "Siva", status: "Absent" },
    { id: 20, name: "Hari", status: "Present" },
  ];

  const [students, setStudents] = useState(initialStudents);

  // Change individual student's status
  const handleStatusChange = (id, newStatus) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id
          ? { ...student, status: newStatus }
          : student
      )
    );
  };

  // Mark all students
  const handleMarkAll = (status) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({
        ...student,
        status,
      }))
    );
  };

  // Reset attendance
  const handleReset = () => {
    setStudents(initialStudents);
  };

  // Attendance calculations
  const totalStudents = students.length;

  const totalPresent = students.filter(
    (student) => student.status === "Present"
  ).length;

  const totalAbsent = students.filter(
    (student) => student.status === "Absent"
  ).length;

  const attendanceRate =
    totalStudents > 0
      ? Math.round((totalPresent / totalStudents) * 100)
      : 0;

  return (
    <>
      {/* CSS */}
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
          background: linear-gradient(135deg, #eef2ff, #dbeafe);
          min-height: 100vh;
        }

        .attendance-tracker-container {
          min-height: 100vh;
          padding: 40px 20px;
        }

        .attendance-card {
          max-width: 1200px;
          margin: auto;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }

        /* Header */

        .attendance-header {
          background: linear-gradient(135deg, #2563eb, #4f46e5);
          color: white;
          padding: 35px 30px;
          text-align: center;
        }

        .attendance-title {
          font-size: 30px;
          margin-bottom: 10px;
        }

        .attendance-subtitle {
          font-size: 15px;
          opacity: 0.9;
        }

        /* Summary */

        .summary-overview {
          padding: 25px 30px;
          background: #f8fafc;
        }

        .summary-text-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          font-size: 16px;
        }

        .summary-divider {
          color: #94a3b8;
        }

        .text-present {
          color: #16a34a;
        }

        .text-absent {
          color: #dc2626;
        }

        /* Statistics */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .stat-box {
          padding: 22px;
          border-radius: 15px;
          text-align: center;
          border: 1px solid #e2e8f0;
          transition: 0.3s;
        }

        .stat-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        .total-card {
          background: #eff6ff;
        }

        .present-card {
          background: #f0fdf4;
        }

        .absent-card {
          background: #fef2f2;
        }

        .rate-card {
          background: #faf5ff;
        }

        .stat-label {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 30px;
          font-weight: bold;
          color: #1e293b;
        }

        /* Batch Buttons */

        .batch-actions {
          display: flex;
          justify-content: center;
          gap: 15px;
          padding: 25px 30px;
          border-bottom: 1px solid #e2e8f0;
        }

        .btn-batch {
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn-batch:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
        }

        .btn-batch-present {
          background: #16a34a;
          color: white;
        }

        .btn-batch-absent {
          background: #dc2626;
          color: white;
        }

        .btn-batch-reset {
          background: #475569;
          color: white;
        }

        /* Table */

        .table-responsive {
          overflow-x: auto;
        }

        .attendance-table {
          width: 100%;
          border-collapse: collapse;
        }

        .attendance-table thead {
          background: #1e293b;
          color: white;
        }

        .attendance-table th {
          padding: 16px;
          text-align: left;
          font-size: 14px;
        }

        .attendance-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #e2e8f0;
        }

        .attendance-row {
          transition: 0.2s;
        }

        .attendance-row:hover {
          background: #f8fafc;
        }

        .present-row {
          border-left: 4px solid #22c55e;
        }

        .absent-row {
          border-left: 4px solid #ef4444;
        }

        .col-id {
          width: 60px;
          font-weight: bold;
          color: #64748b;
        }

        /* Student */

        .student-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .student-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white;
          font-weight: bold;
          text-transform: uppercase;
        }

        .student-name {
          font-weight: 600;
          color: #1e293b;
        }

        /* Status */

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: bold;
        }

        .status-present {
          background: #dcfce7;
          color: #15803d;
        }

        .status-absent {
          background: #fee2e2;
          color: #b91c1c;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: currentColor;
        }

        /* Action Buttons */

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .btn-action {
          padding: 8px 13px;
          border-radius: 6px;
          border: 1px solid;
          background: white;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.2s;
        }

        .btn-present {
          color: #16a34a;
          border-color: #86efac;
        }

        .btn-present:hover,
        .btn-present.active {
          background: #16a34a;
          color: white;
        }

        .btn-absent {
          color: #dc2626;
          border-color: #fca5a5;
        }

        .btn-absent:hover,
        .btn-absent.active {
          background: #dc2626;
          color: white;
        }

        /* Mobile */

        @media (max-width: 768px) {
          .attendance-tracker-container {
            padding: 20px 10px;
          }

          .attendance-title {
            font-size: 23px;
          }

          .attendance-subtitle {
            font-size: 13px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .summary-text-bar {
            flex-wrap: wrap;
            font-size: 14px;
          }

          .batch-actions {
            flex-direction: column;
          }

          .btn-batch {
            width: 100%;
          }

          .attendance-table th,
          .attendance-table td {
            padding: 12px 10px;
          }

          .action-buttons {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .attendance-header {
            padding: 25px 15px;
          }

          .summary-overview {
            padding: 20px 15px;
          }

          .student-avatar {
            width: 34px;
            height: 34px;
          }
        }
      `}</style>

      {/* Main Container */}
      <div className="attendance-tracker-container">
        <div className="attendance-card">

          {/* Header */}
          <div className="attendance-header">
            <h2 className="attendance-title">
              🎓 Student Attendance Tracker
            </h2>

            <p className="attendance-subtitle">
              Manage and track daily student classroom attendance in real-time
            </p>
          </div>

          {/* Summary */}
          <div className="summary-overview">

            <div className="summary-text-bar">
              <span>
                <strong>Total Students:</strong> {totalStudents}
              </span>

              <span className="summary-divider">|</span>

              <span className="text-present">
                <strong>Present:</strong> {totalPresent}
              </span>

              <span className="summary-divider">|</span>

              <span className="text-absent">
                <strong>Absent:</strong> {totalAbsent}
              </span>
            </div>

            {/* Statistics */}
            <div className="stats-grid">

              <div className="stat-box total-card">
                <div className="stat-label">
                  Total Students
                </div>

                <div className="stat-value">
                  {totalStudents}
                </div>
              </div>

              <div className="stat-box present-card">
                <div className="stat-label">
                  Total Present
                </div>

                <div className="stat-value">
                  {totalPresent}
                </div>
              </div>

              <div className="stat-box absent-card">
                <div className="stat-label">
                  Total Absent
                </div>

                <div className="stat-value">
                  {totalAbsent}
                </div>
              </div>

              <div className="stat-box rate-card">
                <div className="stat-label">
                  Attendance Rate
                </div>

                <div className="stat-value">
                  {attendanceRate}%
                </div>
              </div>

            </div>
          </div>

          {/* Batch Actions */}
          <div className="batch-actions">

            <button
              type="button"
              className="btn-batch btn-batch-present"
              onClick={() => handleMarkAll("Present")}
            >
              ✓ Mark All Present
            </button>

            <button
              type="button"
              className="btn-batch btn-batch-absent"
              onClick={() => handleMarkAll("Absent")}
            >
              ✗ Mark All Absent
            </button>

            <button
              type="button"
              className="btn-batch btn-batch-reset"
              onClick={handleReset}
            >
              ↺ Reset
            </button>

          </div>

          {/* Attendance Table */}
          <div className="table-responsive">

            <table className="attendance-table">

              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {students.map((student, index) => (

                  <tr
                    key={student.id}
                    className={`attendance-row ${
                      student.status.toLowerCase()
                    }-row`}
                  >

                    <td className="col-id">
                      {index + 1}
                    </td>

                    <td className="col-name">

                      <div className="student-info">

                        <span className="student-avatar">
                          {student.name.charAt(0)}
                        </span>

                        <span className="student-name">
                          {student.name}
                        </span>

                      </div>

                    </td>

                    <td className="col-status">

                      <span
                        className={`status-pill status-${student.status.toLowerCase()}`}
                      >
                        <span className="status-dot"></span>
                        {student.status}
                      </span>

                    </td>

                    <td className="col-action">

                      <div className="action-buttons">

                        <button
                          type="button"
                          className={`btn-action btn-present ${
                            student.status === "Present"
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleStatusChange(
                              student.id,
                              "Present"
                            )
                          }
                        >
                          Present
                        </button>

                        <button
                          type="button"
                          className={`btn-action btn-absent ${
                            student.status === "Absent"
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleStatusChange(
                              student.id,
                              "Absent"
                            )
                          }
                        >
                          Absent
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      </div>
    </>
  );
}

export default Project2;