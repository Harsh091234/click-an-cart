import React, { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { allLanguages } from "../../constants";
import { useAnimatedFormErrors } from "../../hooks/UseAnimatedFormErrors";
import Input from "../Input";
import FormError from "../FormError";
import { useForm } from "react-hook-form";
import { EditProfileSchema } from "@repo/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "../../store/useUserStore";

const EditProfileModal = ({ isOpen, onClose, existingData }) => {
  const inputRef = useRef(null);
  const inputRefs = useRef({});
  const errorRefs = useRef({});
  const {editProfile, loading} = useUserStore()
  const [avatar, setAvatar] = useState(null);

  const [preview, setPreview] = useState(existingData.avatar);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    trigger,
    clearErrors,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: existingData.name,
      email: existingData.email,
      phone: existingData.phone || "",
      location: existingData.location || "",
      languages: existingData.languages ?? [],
    },
  });

  const { ref: nameRef, ...nameField } = register("name");
  const { ref: emailRef, ...emailField } = register("email");
  const { ref: phoneRef, ...phoneField } = register("phone");
  const { ref: locationRef, ...locationField } = register("location");

  const [query, setQuery] = useState("");
  const selectedLanguages = watch("languages");

  const onSubmit = async (data) => {
      const formData = new FormData();
      console.log("formdata from onsubmit", formData)
      if(avatar) formData.append('avatar', avatar);

    formData.append("name", data.name);
    formData.append("email", data.email);
    if(data.phone) formData.append("phone", data.phone);
    
   if(data.location) formData.append("location", data.location);

 formData.append("languages", JSON.stringify(data.languages));
    
   const success = await editProfile(formData)
if(success) onClose();


  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setAvatar(file)
  };

  const suggestions = allLanguages.filter(
    (language) =>
      language.toLowerCase().startsWith(query.toLowerCase()) &&
      !selectedLanguages.includes(language),
  );
  const addLanguage = async (language) => {
    const updated = [...selectedLanguages, language];

    setValue("languages", updated, {
      shouldDirty: true,
    });

    setQuery("");

    if (isSubmitted) {
      await trigger("languages");
    }
  };

  const removeLanguage = async (language) => {
    const updated = selectedLanguages.filter((item) => item !== language);

    setValue("languages", updated, {
      shouldDirty: true,
    });

    if (isSubmitted) {
      await trigger("languages");
    }
  };

  useAnimatedFormErrors({
    errors,
    inputRefs,
    errorRefs,
    fields: ["name", "email", "phone", "location", "languages"],
  });

 useEffect(() => {
   register("languages");
 }, [register]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl max-h-[90vh]  rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between  px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Profile</h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
          {/* profile pic */}
          <div className="flex justify-center">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="flex h-32 w-32 relative items-center justify-center  rounded-full border-4 border-gray-200 bg-gray-100">
              <img
                src={
                  preview
                    ? preview
                    : "data:image/jpeg;base64,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"
                }
                alt="Profile"
                className="h-full w-full object-cover rounded-full"
              />

              {/* Upload Button */}
              <button
                type="button"
                onClick={() => inputRef.current.click()}
                className="absolute -bottom-1 -right-1 bg-sky-500 hover:bg-sky-600 flex p-2 items-center justify-center rounded-full  text-white shadow-lg transition"
              >
                {" "}
                <Plus size={17} />
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>

            <Input
              {...nameField}
              ref={(el) => {
                nameRef(el);
                inputRefs.current.name = el;
              }}
            />
            <FormError
              error={errors.name}
              errorRef={(el) => {
                errorRefs.current.name = el;
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <Input
              {...emailField}
              ref={(el) => {
                emailRef(el);
                inputRefs.current.email = el;
              }}
            />

            <FormError
              error={errors.email}
              errorRef={(el) => {
                errorRefs.current.email = el;
              }}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone Number
            </label>

            <Input
              type="tel"
              placeholder="+91 9876543210"
              {...phoneField}
              ref={(el) => {
                phoneRef(el);
                inputRefs.current.phone = el;
              }}
            />

            <FormError
              name="phone"
              error={errors.phone}
              errorRef={(el) => {
                errorRefs.current.phone = el;
              }}
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Location
            </label>

            <Input
              type="text"
              placeholder="City, Country"
              {...locationField}
              ref={(el) => {
                locationRef(el);
                inputRefs.current.location = el;
              }}
            />

            <FormError
              name="location"
              error={errors.location}
              errorRef={(el) => {
                errorRefs.current.location = el;
              }}
            />
          </div>

          {/* Language */}
          <div className="relative">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Language
            </label>
            {selectedLanguages.length > 0 && (
              <div className="flex gap-1 mb-2 ">
                {selectedLanguages.map((language) => (
                  <span
                    key={language}
                    className="flex items-center max-w-30 w-fit gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                  >
                    {language}

                    <button
                      type="button"
                      onClick={() => removeLanguage(language)}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <input
              ref={(el) => {
                inputRefs.current.languages = el;
              }}
              type="text"
              placeholder="Type a language..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-300 text-sm text-gray-700 px-4 py-2 outline-none transition-all"
            />
            <FormError
              error={errors.languages}
              errorRef={(el) => {
                errorRefs.current.languages = el;
              }}
            />

            {query && (
              <div className="absolute z-30 mt-2 w-xs overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                {suggestions.length > 0 ? (
                  <div className="max-h-60 overflow-y-auto py-2">
                    {suggestions.map((language) => (
                      <button
                        key={language}
                        type="button"
                        onClick={() => addLanguage(language)}
                        className="group flex w-full items-center justify-between px-4 py-3 text-left text-sm text-gray-700 transition-all hover:bg-sky-50 hover:text-sky-600"
                      >
                        <span>{language}</span>

                        <Plus
                          size={16}
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-gray-500">
                    No language found
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-200 text-sm text-gray-700 px-5 py-2 font-medium transition hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
            disabled={loading}
              type="submit"
              className="rounded-lg disabled:bg-sky-700 bg-sky-500 px-5 text-sm  py-2.5 font-medium text-white transition hover:bg-sky-600"
            >
              {loading? "Saving...": "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
