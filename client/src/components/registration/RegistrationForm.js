import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
    skillLevel: "",
    location: "",
    age: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation, name, skillLevel, location } = payload;
    const emailRegexp = config.validation.email.regexp.emailRegex;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    if (name.trim() == "") {
      newErrors = {
        ...newErrors,
        name: "is required",
      };
    }

    if (skillLevel.trim() == "") {
      newErrors = {
        ...newErrors,
        skillLevel: "is required",
      };
    }

    if (location.trim() == "") {
      newErrors = {
        ...newErrors,
        location: "is required",
      };
    }

    setErrors(newErrors);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    validateInput(userPayload);
    try {
      if (Object.keys(errors).length === 0) {
        const response = await fetch("/api/v1/users", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        const userData = await response.json();
        setShouldRedirect(true);
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="form-background">
      <div className="form grid-container">
        <h2>Create your account</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label>
              Email
              <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
              <FormError error={errors.email} />
            </label>
          </div>

          <div>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
              />
              <FormError error={errors.password} />
            </label>
          </div>
          <div>
            <label>
              Password Confirmation
              <input
                type="password"
                name="passwordConfirmation"
                value={userPayload.passwordConfirmation}
                onChange={onInputChange}
              />
              <FormError error={errors.passwordConfirmation} />
            </label>
          </div>
          <div>
            <label>
              Name
              <input type="text" name="name" value={userPayload.name} onChange={onInputChange} />
              <FormError error={errors.name} />
            </label>
          </div>
          <div>
            <label>
              Skill Level
              <input
                type="text"
                name="skillLevel"
                value={userPayload.skillLevel}
                onChange={onInputChange}
              />
              <FormError error={errors.skillLevel} />
            </label>
          </div>
          <div>
            <label>
              Location
              <input
                type="text"
                name="location"
                value={userPayload.location}
                onChange={onInputChange}
              />
              <FormError error={errors.location} />
            </label>
          </div>
          <div>
            <label>
              Age
              <input type="text" name="age" value={userPayload.age} onChange={onInputChange} />
              <FormError error={errors.age} />
            </label>
          </div>
          <div>
            <label>
              Gender
              <input
                type="text"
                name="gender"
                value={userPayload.gender}
                onChange={onInputChange}
              />
              <FormError error={errors.gender} />
            </label>
          </div>
          <div>
            <input type="submit" className="button" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
