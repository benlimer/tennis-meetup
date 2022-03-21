import React, { useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import { Redirect } from "react-router";
import skillLevelData from "../../../skillLevelData";
const AdditionalRegForm = (props) => {
  const [formInput, setFormInput] = useState({
    name: "",
    age: "",
    gender: "",
    location: "",
    skillLevel: "",
    image: {},
  });
  const [profileDetails, setProfileDetails] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);

  
  const handleImageUpload = (acceptedFiles) => {
    setFormInput({
      ...formInput,
      image: Object.assign(acceptedFiles[0], { preview: URL.createObjectURL(acceptedFiles[0]) }),
    });
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setFormInput({
      ...formInput,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const newBody = new FormData();
    newBody.append("name", formInput.name);
    newBody.append("age", formInput.age);
    newBody.append("location", formInput.location);
    newBody.append("gender", formInput.gender);
    newBody.append("skillLevel", formInput.skillLevel);
    newBody.append("image", formInput.image);
    try {
      const response = await fetch("/api/v1/users/additional", {
        method: "POST",
        headers: new Headers({
          Accept: "image/jpeg/png",
        }),
        body: newBody,
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
        }
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const body = await response.json();
      props.setCurrentUser(body.userInfo);
      setShouldRedirect(true);
    } catch (error) {
      console.log(`Error in fetch: ${error}`);
    }
  };

  const skillLevelOptions = skillLevelData.skillLevel.map((skillLevel) => {
    return <option value={skillLevel} key={skillLevel}>{`${skillLevel}`}</option>;
  });

  if (shouldRedirect) {
    return (
      <Redirect
        to={{
          pathname: "/my-user-profile",
        }}
      />
    );
  }

  return (
    <div className="form-background">
      <div className="form grid-container">
        <h1>Create Your Profile</h1>
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div className="drop-zone" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag and drop your pic, or click to upload</p>
              </div>
            </section>
          )}
        </Dropzone>
        <form onSubmit={submitForm}>
          <label htmlFor="name">Name: </label>
          <input
            className="profile-form-input"
            type="text"
            name="name"
            value={formInput.name}
            onChange={handleInputChange}
          ></input>

          <label htmlFor="age">Age: </label>
          <input
            className="profile-form-input"
            type="text"
            name="age"
            value={formInput.age}
            onChange={handleInputChange}
          ></input>

          <label htmlFor="location">Location(Zip): </label>
          <input
            className="profile-form-input"
            type="text"
            name="location"
            value={formInput.location}
            onChange={handleInputChange}
          ></input>

          <label htmlFor="gender">Gender: </label>
          <input
            className="profile-form-input"
            type="text"
            name="gender"
            value={formInput.gender}
            onChange={handleInputChange}
          ></input>

          <label htmlFor="skillLevel">
            What is your skill level?
            <select
              className="options"
              name="skillLevel"
              onChange={handleInputChange}
              value={formInput.skillLevel}
            >
              <option value="">Please choose your skill level</option>
              {skillLevelOptions}
            </select>
          </label>

          <input type="submit" className="button"></input>
        </form>
      </div>
    </div>
  );
};

export default AdditionalRegForm;
