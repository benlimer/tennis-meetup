import React, { useState } from "react";

const PostMatchForm = (props) => {
  const [match, setMatch] = useState({
    result: "",
    date: "",
    type: "",
  });

  const handleInputChange = (event) => {
    setMatch({
      ...match,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.postMatch(match);
    setMatch({
        result: "",
        date: "",
        type: "",
    });
  };

  return (
    <div className="post-match-form-container">
      <form className="post-match-form" onSubmit={handleSubmit}>

        <label className="match-type-label">
          Session Type
          <select name="type" value={match.type} onChange={handleInputChange}>
            <option value="" disabled>
              Pick a session type
            </option>
            <option value="Just rallied">Just rallied</option>
            <option value="Played a match">Played a match</option>
           </select>
        </label>
        <label>
          Add results
          <input type="text" name="result" onChange={handleInputChange} value={match.result} />
        </label>
        <label>
          Date
          <input type="text" name="date" onChange={handleInputChange} value={match.date} />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
          <div className="cancel button" onClick={props.showPostMatchFormHandler}>
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostMatchForm;
