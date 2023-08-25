import { toast } from "react-toastify";
import { auth, db } from "../FirebaseConfig";
import Graph from "./Graph";
import { useEffect } from "react";

function Stats({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  graphData,
  resetTest,
}) {
  let timeSet = new Set();
  const newGraph = graphData.filter((item) => {
    if (!timeSet.has(item[0])) {
      timeSet.add(item[0]);
      return item;
    }
  });

  function pushDataToDB() {
    if (isNaN(accuracy) || !accuracy) {
      toast.error("Invalid Test", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // firebase returns a reference to the collection we're looking for and if it doesn't have it then it creates one
    const resultsRef = db.collection("Results");
    const { uid } = auth.currentUser;
    resultsRef
      .add({
        wpm,
        accuracy,
        timeStamp: new Date(),
        characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
        userId: uid,
      })
      .then((res) => {
        toast.success("Data Saved to DB", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        toast.error("Not Able to Save Result", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }

  useEffect(function () {
    if (auth.currentUser) {
      pushDataToDB();
    } else {
      toast.warning("Login to Save Results", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, []);

  return (
    <div className="stats-box">
      <div className="left-stats">
        {/* For Numerical Data */}
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}</div>
        <div className="title">Characters</div>
        <div className="subtitle">
          {correctChars}/{incorrectChars}/{missedChars}/{extraChars}
        </div>
        <div
          className="subtitle"
          onClick={resetTest}
          style={{ cursor: "pointer" }}
        >
          Restart
        </div>
      </div>
      <div className="right-stats">
        {/* For graph section  */}
        <Graph graphData={newGraph} />
      </div>
    </div>
  );
}

export default Stats;

//Database ----> Contains multiple Collections ----> Contains multiple Documents
