import { useEffect, useRef } from "react";
import { Loader, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyEmailSchema } from "@repo/shared";
import { useUserStore } from "../store/useUserStore";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const { verifyEmail, resendVerificationCode, resending, user, loading } =
    useUserStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(VerifyEmailSchema),
   
  });

  const code = watch("code") || "";

  useEffect(() => {
    register("code");
  }, [register]);

  const onSubmit = async ({ code }) => {

    const success = await verifyEmail(code);
    console.log("success", success)
    console.log("user", user)
    if (success) {  
       navigate("/");
    }
  };

  const handleResend = async () => {
    if (!user?.email) return toast.error("You need to login");

    setValue("code", "");

    

    await resendVerificationCode(user.email);
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    setValue("code", pasted, {
      shouldValidate: true,
    });

    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  useEffect(() => {
    if (code.length === 6) {
      handleSubmit(onSubmit)();
    }
  }, [code, handleSubmit]);

  return (
    <div className="flex h-full items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md rounded-3xl bg-white border border-gray-200 shadow-xl p-8">
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">
            <Mail className="h-10 w-10 text-sky-600" />
          </div>

          <h1 className="mt-5 text-2xl font-semibold text-gray-800">
            Verify Your Email
          </h1>

          <p className="mt-3 text-center text-sm leading-6 text-gray-500">
            We've sent a{" "}
            <span className="font-semibold text-gray-700">
              6-digit verification code
            </span>{" "}
            to
            <br />
            <span className="font-medium text-sky-600">{user?.email}</span>
            <br />
            Enter the code below
          </p>

          <div className="mt-5  flex justify-center gap-2 sm:min-[370px]:gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={code[i] || ""}
                onPaste={handlePaste}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  const chars = code.split("");
                  chars[i] = value;

                  const newCode = chars.join("");

                  setValue("code", newCode, {
                    shouldValidate: true,
                  });

                  if (value && i < 5) {
                    inputRefs.current[i + 1]?.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    const chars = code.split("");

                    if (chars[i]) {
                      chars[i] = "";
                      setValue("code", chars.join(""), {
                        shouldValidate: true,
                      });
                    } else if (i > 0) {
                      inputRefs.current[i - 1]?.focus();
                    }
                  }
                }}
                className={`h-9 w-9  min-[370px]:h-12 min-[370px]:w-12 rounded-xl border text-center text-xl font-bold outline-none transition-all ${
                  errors.code
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                }`}
              />
            ))}
          </div>

          
            {errors.code && (
              <p className="text-sm my-2 text-red-500">{errors.code.message}</p>
            )}
         

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={loading || resending}
            className="flex w-full mt-5  text-sm items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Didn't receive the code?
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="ml-1 font-semibold text-sky-600 hover:text-sky-700 disabled:opacity-60"
            >
              {resending ? "Sending..." : "Resend Code"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
