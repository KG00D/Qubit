import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [currentStage, setCurrentStage] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [errors, setErrors] = useState({});

  const formStages = [
    { id: 1, questions: ["Email", "First Name"] },
    { id: 2, questions: ["Password", "Confirm Password"] },
    { id: 3, questions: ["How much do you make a month?"] },
    {
      id: 4,
      questions: ["Debt Amount"],
      condition: () =>
        userResponses["How much do you make a month?"] !== undefined,
    },
    {
      id: 5,
      questions: [
        "What is your total monthly amount in non-secured debt payments? This includes anything not tied to an asset (Real estate/Cars)",
      ],
    },
    { id: 6, questions: ["How about your credit score? Ballpark is A-OK."] },
    {
      id: 7,
      questions: ["Do you rent, own a home, or live with friends/relatives?"],
    },
    {
      id: 8,
      questions: ["What is your monthly housing payment?"],
      condition: () =>
        ["Rent", "Own"].includes(
          userResponses[
            "Do you rent, own a home, or live with friends/relatives?"
          ]
        ),
    },
    {
      id: 9,
      questions: ["Do you have a car?"],
    },
    {
      id: 10,
      questions: ["Car Year", "Car Make", "Car Model"],
      condition: () => userResponses["Do you have a car?"] === "Yes",
    },
    {
      id: 11,
      questions: ["What is your monthly car payment?"],
      condition: () => userResponses["Do you have a car?"] === "Yes",
    },
  ];

  const updateResponses = (question, value) => {
    setUserResponses((prev) => ({ ...prev, [question]: value }));
  };

  const validateCurrentStage = () => {
    const currentQuestions = formStages[currentStage].questions;
    return currentQuestions.every(
      (q) => userResponses[q] && userResponses[q].trim() !== ""
    );
  };

  const advanceStage = () => {
    if (!validateCurrentStage()) {
      setErrors({
        ...errors,
        form: "Please complete all fields before proceeding.",
      });
      return;
    }

    if (currentStage < formStages.length - 1) {
      setCurrentStage(currentStage + 1);
      setErrors({});
    } else {
      submitForm();
    }
  };

  const submitForm = async () => {
    if (validateCurrentStage()) {
      try {
        const data = { ...userResponses };
        const response = await dispatch(thunkSignup(data));
        if (response.ok) {
          closeModal();
        } else {
          const errMsg = response.data?.message || "Failed to sign up.";
          setErrors({ ...errors, form: errMsg });
        }
      } catch (err) {
        console.error(err);
        setErrors({ ...errors, form: "An unexpected error occurred." });
      }
    }
  };

  const handleInputChange = (e, question) => {
    updateResponses(question, e.target.value);
  };

  const renderFormFields = () => {
    const stage = formStages[currentStage];
    if (!stage) return null;

    return stage.questions.map((question, idx) => (
      <div key={idx}>
        <label>
          {question}
          <input
            type="text"
            value={userResponses[question] || ""}
            onChange={(e) => handleInputChange(e, question)}
            required
          />
        </label>
      </div>
    ));
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {errors.form && <p className="error">{errors.form}</p>}
        {renderFormFields()}
        <div>
          <button type="button" onClick={advanceStage}>
            {currentStage < formStages.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}

export default SignupFormModal;
