import { useState } from "react";
import axios from "axios";

function CreateJobListing() {
  const [title, setTitle] = useState("Test");
  const [description, setDescription] = useState("Test");

  async function createJobListing() {
    try {
      await axios.post("http://localhost:5000/api/joblisting/new", {
        title,
        description,
      });

      alert("Registration successful.");
      console.log("test");
    } catch (e) {
      alert("Registration failed, try again");
    }
  }

  return (
    <div>
      <button onClick={createJobListing}>Create Job Listing</button>
    </div>
  );
}

export default CreateJobListing;
