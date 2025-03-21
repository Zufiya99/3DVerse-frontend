import { useState, useEffect } from "react";
import {
  FaBars,
  FaSearch,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";
import studentData from "./studentData.json"; // Import the JSON file

const AdminDashboard = () => {
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  const departments = [
    "Information Technology",
    "Computer Engineering",
    "AI/ML",
    "IoT",
    "EXTC",
    "Civil",
    "Mechanical",
    "Automobile",
  ];

  const semesters = [
    "Sem 1",
    "Sem 2",
    "Sem 3",
    "Sem 4",
    "Sem 5",
    "Sem 6",
    "Sem 7",
    "Sem 8",
  ];

  // Filter departments based on search query
  const filteredDepartments = departments.filter((dept) =>
    dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter students based on selected department and semester
  useEffect(() => {
    if (selectedDept && selectedSem) {
      const department = studentData.departments[selectedDept];
      if (department) {
        const semester = department[selectedSem];
        if (semester) {
          setFilteredStudents(semester);
        } else {
          setFilteredStudents([]);
        }
      } else {
        setFilteredStudents([]);
      }
    } else {
      setFilteredStudents([]);
    }
  }, [selectedDept, selectedSem]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-Primary to-green-900 text-white flex flex-col p-5">
        {/* Logo */}
        <div className="text-center text-2xl font-bold mb-8">
          <img
            src="./Images/mhssce_logo.png"
            alt="MHSSCE Logo"
            className="w-24 mx-auto mb-2"
          />
          MHSSCE Admin
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search Department"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 rounded-lg bg-green-700 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-200" />
        </div>

        {/* Department Navigation */}
        <div className="overflow-y-auto flex-1 scrollbar-hide">
          {filteredDepartments.map((dept, index) => (
            <div key={index} className="mb-2">
              <button
                className="w-full flex items-center justify-between p-3 hover:bg-green-700 rounded-lg transition-all"
                onClick={() =>
                  setSelectedDept(selectedDept === dept ? null : dept)
                }
              >
                <span>{dept}</span>
                {selectedDept === dept ? <FaChevronDown /> : <FaChevronRight />}
              </button>

              {/* Semester Options */}
              {selectedDept === dept && (
                <div className="pl-5 mt-2">
                  {semesters.map((sem, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSem(sem)}
                      className={`block w-full text-left p-2 hover:bg-green-700 rounded-md transition ${
                        selectedSem === sem ? "bg-green-700" : ""
                      }`}
                    >
                      {sem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white shadow-md overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-Primary">Admin Dashboard</h1>
          <FaBars className="text-2xl cursor-pointer text-gray-700 lg:hidden" />
        </div>

        {/* Content Display */}
        {selectedSem ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {selectedDept} - {selectedSem}
            </h2>

            {/* Cards for Department and Semester Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-lg shadow-md animate-fade-in">
                <h3 className="text-lg font-semibold text-Primary mb-2">
                  Department
                </h3>
                <p className="text-gray-700">{selectedDept}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg shadow-md animate-fade-in">
                <h3 className="text-lg font-semibold text-Primary mb-2">
                  Semester
                </h3>
                <p className="text-gray-700">{selectedSem}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg shadow-md animate-fade-in">
                <h3 className="text-lg font-semibold text-Primary mb-2">
                  Total Students
                </h3>
                <p className="text-gray-700">{filteredStudents.length}</p>
              </div>
            </div>

            {/* Student Data Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in">
              <table className="w-full">
                <thead className="bg-Primary text-white">
                  <tr>
                    <th className="p-3">Sr. No</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Roll No</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Year</th>
                    <th className="p-3">Academic Year</th>
                    <th className="p-3">Form</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr
                      key={student.id}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="p-3 text-center">{index + 1}</td>
                      <td className="p-3">{student.name}</td>
                      <td className="p-3">{student.rollNo}</td>
                      <td className="p-3">{selectedDept}</td>
                      <td className="p-3">{student.year}</td>
                      <td className="p-3">{student.acadYear}</td>
                      <td className="p-3">
                        <select className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-Primary">
                          <option>D Form</option>
                          <option>Exam Form</option>
                          <option>Hall Ticket</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-gray-600 text-center text-lg">
            Select a semester to view details.
          </p>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
