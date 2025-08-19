import { useState } from "react";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import ReusableForm from "../Components/ReusableForm.jsx";
import Styles from "./AuthPage.module.css";
import { registerUser, loginUser } from "../Services/api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const registerSchema = Yup.object().shape({
  username: Yup.string().required("نام کاربری الزامی است").min(3),
  password: Yup.string().required("رمز عبور الزامی است").min(6),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "رمز عبور و تکرار آن یکسان نیست")
    .required("تکرار رمز عبور الزامی است"),
});

const loginSchema = Yup.object().shape({
  username: Yup.string().required("نام کاربری الزامی است"),
  password: Yup.string().required("رمز عبور الزامی است"),
});

export default function AuthPage() {
  const [errors, setErrors] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); 

  const registerMutation = useMutation({
    mutationFn: ({ username, password }) => registerUser({ username, password }),
    onSuccess: () => {
      setErrors({});
      toast.success("ثبت‌نام با موفقیت انجام شد!");
      setIsLogin(true);
    },
    onError: (err) => {
      const message = err.response?.data?.message || "خطا در ثبت‌نام";
      setErrors({ form: message });
      toast.error(message);
    },
  });

  const loginMutation = useMutation({
    mutationFn: ({ username, password }) => loginUser({ username, password }),
    onSuccess: (res) => {
      setErrors({});
      toast.success("ورود با موفقیت انجام شد!");
      localStorage.setItem("token", res.data.token); 
      navigate("/ProductManagment"); 
    },
    onError: (err) => {
      const message = err.response?.data?.message || "خطا در ورود";
      setErrors({ form: message });
      toast.error(message);
    },
  });

  const handleSubmit = async (data) => {
    setErrors({});
    try {
      if (isLogin) {
        await loginSchema.validate(data, { abortEarly: false });
        loginMutation.mutate(data);
      } else {
        await registerSchema.validate(data, { abortEarly: false });
        const { username, password } = data;
        registerMutation.mutate({ username, password });
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const formErrors = {};
        err.inner.forEach((e) => (formErrors[e.path] = e.message));
        setErrors(formErrors);
        if (err.inner.length > 0) toast.error(err.inner[0].message);
      }
    }
  };

  const fields = isLogin
    ? [
        { name: "username", type: "text", placeholder: "نام کاربری" },
        { name: "password", type: "password", placeholder: "رمز عبور" },
      ]
    : [
        { name: "username", type: "text", placeholder: "نام کاربری" },
        { name: "password", type: "password", placeholder: "رمز عبور" },
        { name: "confirmPassword", type: "password", placeholder: "تکرار رمز عبور" },
      ];

  return (
    <div className={Styles.authPage}>
      <h2 className={Styles.pageTitle}>بوت کمپ بوتواستارت</h2>
      <div className={Styles.card}>
        <img src="/Photos/Union.png" alt="logo" className={Styles.formLogo} />
        <h3>{isLogin ? "فرم ورود" : "فرم ثبت‌نام"}</h3>
        {errors.form && <p className={Styles.error}>{errors.form}</p>}
        <ReusableForm
          fields={fields}
          buttonText={isLogin ? "ورود" : "ثبت‌نام"}
          onSubmit={handleSubmit}
          errors={errors}
        />
        <p className={Styles.toggleText}>
          <span className={Styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "ایجاد حساب کاربری!؟" : "آیا حساب کاربری داری؟"}
          </span>
        </p>
      </div>
    </div>
  );
}
