import React from "react";
import Files from "./Files";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Dashboard({ user, token }) {
  if (!user) {
    return <Redirect to="/" />;
  }
  const handleFilePush = (e) => {
    console.log(e.target.files[0]);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "pf3mksrp");
    if (e.target.files[0].type === "application/pdf") {
      axios
        .post(
          "https://api.cloudinary.com/v1_1/ddplgo0ru/image/upload",
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
