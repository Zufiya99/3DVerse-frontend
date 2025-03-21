// import { useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AdminAuth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!isLogin && formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match!");
//       setLoading(false);
//       return;
//     }

//     try {
//       const url = isLogin
//         ? "http://localhost:5000/api/auth/login"
//         : "http://localhost:5000/api/auth/register";

//       const requestData = isLogin
//         ? { email: formData.email, password: formData.password }
//         : formData;

//       const { data } = await axios.post(url, requestData, {
//         headers: { "Content-Type": "application/json" },
//       });

//       setLoading(false);

//       if (isLogin) {
//         localStorage.setItem("adminToken", data.token);
//         toast.success("Login successful! Redirecting...", { autoClose: 1500 });
//         setTimeout(() => {
//           window.location.href = "/dashboard";
//         }, 1500);
//       } else {
//         toast.success("Signup successful! Please login.");
//         setIsLogin(true);
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-primary">
//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-primary text-center mb-6">
//           {isLogin ? "Admin Login" : "Admin Sign Up"}
//         </h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {!isLogin && (
//             <>
//               <div>
//                 <label className="block text-gray-700 font-medium">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded focus:outline-primary"
//                   placeholder="Enter your name"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium">
//                   Phone Number
//                 </label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded focus:outline-primary"
//                   placeholder="Enter phone number"
//                   required
//                 />
//               </div>
//             </>
//           )}

//           <div>
//             <label className="block text-gray-700 font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded focus:outline-primary"
//               placeholder="Enter email"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded focus:outline-primary"
//               placeholder="Enter password"
//               required
//             />
//           </div>

//           {!isLogin && (
//             <div>
//               <label className="block text-gray-700 font-medium">
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded focus:outline-primary"
//                 placeholder="Confirm password"
//                 required
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-80 transition"
//             disabled={loading}
//           >
//             {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>

//         <p className="mt-4 text-center text-gray-600">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}
//           <span
//             className="text-primary cursor-pointer font-medium hover:underline ml-1"
//             onClick={() => setIsLogin(!isLogin)}
//           >
//             {isLogin ? "Sign up" : "Login"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AdminAuth;


import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", { icon: "❌" });
      setLoading(false);
      return;
    }

    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const requestData = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const { data } = await axios.post(url, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      setLoading(false);

      if (isLogin) {
        localStorage.setItem("adminToken", data.token);
        toast.success("Login successful!", {
          icon: "✅",
          autoClose: 2500,
          onClose: () => {
            window.location.href = "/dashboard";
          },
        });
      } else {
        toast.success("Signup successful! Please login.", { icon: "✅" });
        setIsLogin(true);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong", {
        icon: "❌",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-cyan-500">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          {isLogin ? "Admin Login" : "Admin Sign Up"}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Confirm password"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-blue-600 cursor-pointer font-medium hover:underline ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminAuth;