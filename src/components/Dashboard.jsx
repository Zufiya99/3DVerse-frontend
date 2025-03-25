import { useState, useEffect } from "react";
import {
  FaBars,
  FaSearch,
  FaChevronRight,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";
import studentData from "./studentData.json"; // Import the JSON file
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  useEffect(() => {
    if (selectedDept && selectedSem) {
      const department = studentData.departments[selectedDept];
      if (department) {
        const semester = department[selectedSem];
        setFilteredStudents(semester || []);
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
      <aside
        className={`fixed lg:relative top-0 left-0 h-full w-64 bg-gradient-to-b from-Primary to-green-900 text-white flex flex-col p-5 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-center text-2xl font-bold">
            <img
              src="./Images/mhssce_logo.png"
              alt="MHSSCE Logo"
              className="w-24 mx-auto mb-2"
            />
            MHSSCE Admin
          </div>
          <button
            className="lg:hidden text-white text-2xl"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes />
          </button>
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
        </div>

        {/* Department Navigation */}
        <div className="overflow-y-auto flex-1 scrollbar-hide">
          {departments
            .filter((dept) =>
              dept.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((dept, index) => (
              <div key={index} className="mb-2">
                <button
                  className="w-full flex items-center justify-between p-3 hover:bg-green-700 rounded-lg transition-all"
                  onClick={() =>
                    setSelectedDept(selectedDept === dept ? null : dept)
                  }
                >
                  <span>{dept}</span>
                  {selectedDept === dept ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
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
          <button
            className="lg:hidden text-2xl cursor-pointer text-gray-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars />
          </button>
        </div>

        {/* Content Display */}
        {selectedSem ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {selectedDept} - {selectedSem}
            </h2>

            {/* Cards for Department and Semester Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-Primary mb-2">
                  Department
                </h3>
                <p className="text-gray-700">{selectedDept}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-Primary mb-2">
                  Semester
                </h3>
                <p className="text-gray-700">{selectedSem}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-Primary mb-2">
                  Total Students
                </h3>
                <p className="text-gray-700">{filteredStudents.length}</p>
              </div>
            </div>

            {/* Responsive Student Data Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-Primary text-white">
                  <tr>
                    <th className="p-3 text-left">Sr. No</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Roll No</th>
                    <th className="p-3 text-left">Department</th>
                    <th className="p-3 text-left">Year</th>
                    <th className="p-3 text-left">Academic Year</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{index + 1}</td>
                      {/* <td className="p-3">{student.name}</td> */}
                      <td className="p-3">
                        <Link
                          to={`/student/${student.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {student.name}
                        </Link>
                      </td>

                      <td className="p-3">{student.rollNo}</td>
                      <td className="p-3">{selectedDept}</td>
                      <td className="p-3">{student.year}</td>
                      <td className="p-3">{student.acadYear}</td>
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
