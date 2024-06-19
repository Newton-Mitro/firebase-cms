import Img from "assets/brand/logo.png";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppLoader from "../../components/AppLoader";
import { firebase_auth } from "../../configs/firebase-config";

const validate = (values: any) => {
  let errors: any = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Minimum 6 character needed.";
  }

  return errors;
};

function Login() {
  const navigate = useNavigate();
  onAuthStateChanged(firebase_auth, (user) => {
    if (user) {
      navigate("/panel/home", { replace: true });
    }
  });

  const auth = getAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/panel/home";
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      setLoading(true);
      try {
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            // Signed in
            navigate(from, { replace: true });
            toast.success("Login success!");
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
          });
      } catch (error: any) {
        const errorMessage = error.message;
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <AppLoader isLoading={loading} />
      <div className="login-container flex items-center justify-center h-full w-full">
        <form
          onSubmit={formik.handleSubmit}
          className="login-form bg-secondary px-10 pb-10 pt-6 w-full mx-6  lg:w-1/2 flex items-center justify-center flex-col border border-borderColor"
        >
          <div className="flex items-center flex-col mb-6 gap-2 ">
            <Link to="/">
              <img className="h-32  rounded-full" alt="logo" src={Img} />
            </Link>
            <h3 className="text-2xl text-center font-bold">CCU CFS Login</h3>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-4/6">
            <div className="flex flex-col w-full">
              <label className="login-label" htmlFor="username">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formik.values.email}
                id="email"
                className="mt-1 block w-full rounded-sm py-1 border-borderColor bg-primary shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                onChange={formik.handleChange}
              />
              {formik.errors?.email && (
                <div className="text-xs text-red-400">
                  {formik.errors?.email.toString()}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label className="login-label" htmlFor="username">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                id="password"
                className="mt-1 block w-full rounded-sm py-1 border-borderColor bg-primary shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                onChange={formik.handleChange}
              />
              {formik.errors?.password && (
                <div className="text-xs text-red-400">
                  {formik.errors?.password.toString()}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="login-btn hover:font-bold hover:bg-accent bg-success border border-borderColor hover:shadow-md transition-all duration-300 shadow-sm rounded py-2 mt-4 hover:cursor-pointer"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
