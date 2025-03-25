import { useParams, Link } from "react-router-dom";
import studentData from "./studentData.json"; // Import student data

const StudentDetails = () => {
  const { id } = useParams(); // Get the student ID from the URL
  let student = null;

  // Search for the student in all departments and semesters
  Object.values(studentData.departments).forEach((department) => {
    Object.values(department).forEach((students) => {
      const foundStudent = students.find((s) => s.id === parseInt(id));
      if (foundStudent) student = foundStudent;
    });
  });

  if (!student) {
    return <h2 className="text-center text-red-500 text-2xl mt-10">Student Not Found</h2>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-Primary mb-4 text-center">
          {student.name}'s Details
        </h1>

        <div className="flex items-center justify-center mb-4">
          <img
            src={student.photo} // Make sure studentData.json contains a photo URL
            alt={student.name}
            className="w-32 h-32 rounded-full shadow-md border"
          />
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr className="border-b">
              <td className="p-3 font-semibold">Name:</td>
              <td className="p-3">{student.name}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">Branch:</td>
              <td className="p-3">{student.branch}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">Year:</td>
              <td className="p-3">{student.year}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">Academic Year:</td>
              <td className="p-3">{student.acadYear}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">Email:</td>
              <td className="p-3">{student.email}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">Mobile No:</td>
              <td className="p-3">{student.mobile}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">Address:</td>
              <td className="p-3">{student.address}, {student.pincode}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">Gender:</td>
              <td className="p-3">{student.gender}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">CPRN:</td>
              <td className="p-3">{student.CPRN}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">UPRN:</td>
              <td className="p-3">{student.UPRN}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">Course Full Name:</td>
              <td className="p-3">{student.course}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">Subjects:</td>
              <td className="p-3">{student.subjects.join(", ")}</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-xl font-semibold mt-6 mb-3">Previous Years Data:</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">SGPI</th>
                <th className="p-2 border">Month of Passing</th>
                <th className="p-2 border">Year of Passing</th>
                <th className="p-2 border">CR</th>
                <th className="p-2 border">CG</th>
                <th className="p-2 border">Total Marks Obtained</th>
                <th className="p-2 border">Seat No</th>
                <th className="p-2 border">Total C</th>
                <th className="p-2 border">Total CG</th>
              </tr>
            </thead>
            <tbody>
              {student.previousYears.map((yearData, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 border">{yearData.SGPI}</td>
                  <td className="p-2 border">{yearData.monthOfPassing}</td>
                  <td className="p-2 border">{yearData.yearOfPassing}</td>
                  <td className="p-2 border">{yearData.CR}</td>
                  <td className="p-2 border">{yearData.CG}</td>
                  <td className="p-2 border">{yearData.totalMarks}</td>
                  <td className="p-2 border">{yearData.seatNo}</td>
                  <td className="p-2 border">{yearData.totalC}</td>
                  <td className="p-2 border">{yearData.totalCG}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
