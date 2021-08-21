import React from "react";
import Files from "./Files";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Dashboard({ user, token }) {
  const { REACT_APP_CDN_ID, REACT_APP_UPLOAD_PRESET } = process.env;
  if (!user) {
    return <Redirect to="/" />;
  }
  const handleFilePush = (e) => {
    console.log(e.target.files[0]);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", `${REACT_APP_UPLOAD_PRESET}`);
    if (e.target.files[0].type === "application/pdf") {
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${REACT_APP_CDN_ID}/image/upload`,
          formData
        )
        .then((res) => {
          console.log(res);

          //   axios.post("/newupload", {
          //     headers: {
          //       Authorization: "Bearer " + localStorage.getItem("token"),
          //     },
          //   });
        });
    }
  };

  return (
    <>
      <div className="dashboard">
        <h1> Upload Files here.</h1>
        <div className="upload-btn-wrapper">
          <button className="btn">Upload a file</button>
          <input
            type="file"
            name="myfile"
            accept="image/*,.pdf"
            onChange={handleFilePush}
          />
        </div>
      </div>
      <Files />
    </>
  );
}

export default Dashboard;
