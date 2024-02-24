import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [currentStage, setCurrentStage] = useState(0);
  const [formattedValues, setFormattedValues] = useState({});

  const [userResponses, setUserResponses] = useState({
    email: "",
    firstname: "",
    password: "",
    confirmpassword: "",
    monthlyIncome: "",
    debtAmount: "",
    nonSecuredDebtPayments: "",
    creditScore: "",
    housingSituation: "",
    monthlyHousingPayment: "",
    carOwnership: "",
    carYear: "",
    carMake: "",
    carModel: "",
    monthlyCarPayment: "",
  });
  const [errors, setErrors] = useState({});

  if (sessionUser) {
    return <Navigate to="/homepage" replace={true} />;
  }

  const formatCurrency = (value) => {
    const stringValue = String(value).replace(/[^0-9.-]+/g, "");
    const numberValue = Number(stringValue);
    return numberValue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (
      value.trim() !== "" &&
      [
        "monthlyIncome",
        "debtAmount",
        "nonSecuredDebtPayments",
        "monthlyHousingPayment",
        "monthlyCarPayment",
      ].includes(name)
    ) {
      const formattedValue = formatCurrency(value);
      setFormattedValues((prev) => ({ ...prev, [name]: formattedValue }));
    }
  };
  const parseCurrency = (formattedValue) => {
    return formattedValue.replace(/[^0-9.-]+/g, "");
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/
      );
  };

  const goBackStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const renderButtons = () => {
    return (
      <div>
        {currentStage > 0 && (
          <button type="button" onClick={goBackStage}>
            Previous
          </button>
        )}
        {currentStage < formStages.length - 1 ? (
          <button type="button" onClick={advanceStage}>
            Next
          </button>
        ) : (
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    );
  };

  const formStages = [
    {
      questions: [
        { label: "Email", name: "email" },
        { label: "First Name", name: "firstname" },
        { label: "Password", name: "password" },
        { label: "Confirm Password", name: "confirmpassword" },
      ],
    },
    {
      questions: [
        { label: "Monthly Gross Pay(Before taxes)?", name: "monthlyIncome" },
      ],
    },
    {
      questions: [
        {
          label: "Total debt balance?",
          name: "debtAmount",
        },
      ],
    },
    {
      questions: [
        {
          label: "Total monthly debt payments?",
          name: "nonSecuredDebtPayments",
        },
      ],
    },
    {
      questions: [
        {
          label: "Credit Score?",
          name: "creditScore",
        },
      ],
    },
    {
      questions: [
        {
          label: "Rent or Own your home?",
          name: "housingSituation",
        },
      ],
    },
    {
      questions: [
        {
          label: "Monthly housing payment?",
          name: "monthlyHousingPayment",
        },
      ],
      condition: () => ["Rent", "Own"].includes(userResponses.housingSituation),
    },
    {
      questions: [{ label: "Have a car?", name: "carOwnership" }],
    },
    {
      questions: [
        { label: "Car Year", name: "carYear" },
        { label: "Car Make", name: "carMake" },
        { label: "Car Model", name: "carModel" },
        {
          label: "Monthly car payment?",
          name: "monthlyCarPayment",
        },
      ],
      condition: () => userResponses.carOwnership === "Yes",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      [
        "monthlyIncome",
        "debtAmount",
        "nonSecuredDebtPayments",
        "monthlyHousingPayment",
        "monthlyCarPayment",
      ].includes(name)
    ) {
      const unformattedValue = parseCurrency(value);
      setUserResponses((prev) => ({ ...prev, [name]: unformattedValue }));
    } else {
      setUserResponses((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateCurrentStage = () => {
    let isValid = true;
    const newErrors = {};
    if (currentStage === 0) {
      if (!userResponses.email || !validateEmail(userResponses.email)) {
        newErrors.email = "Invalid email format.";
        isValid = false;
      }
      if (!userResponses.firstname.trim()) {
        newErrors.firstname = "First Name is required.";
        isValid = false;
      }
      if (userResponses.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long.";
        isValid = false;
      }
      if (userResponses.password !== userResponses.confirmpassword) {
        newErrors.confirmpassword = "Passwords do not match.";
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const advanceStage = () => {
    if (validateCurrentStage()) {
      if (currentStage < formStages.length - 1) {
        setCurrentStage(currentStage + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    if (validateCurrentStage()) {
      const formData = { ...userResponses };
      dispatch(thunkSignup(formData))
        .then(() => navigate("/homepage"))
        .catch((error) => {
          const serverResponse = error.response?.data;
          if (serverResponse && serverResponse.errors) {
            setErrors(serverResponse.errors);
          }
        });
    }
  };

  const renderCurrentStageQuestions = () => {
    const currentQuestions = formStages[currentStage].questions;
    return currentQuestions.map((questionObj, index) => {
      const { label, name } = questionObj;
      let inputType = label.toLowerCase().includes("password")
        ? "password"
        : "text";
      let inputValue = formattedValues[name] || userResponses[name];
      return (
        <div key={index} className="question-container">
          <label className="question-label">{label}</label>
          <input
            type={inputType}
            name={name}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            className="question-input"
          />
        </div>
      );
    });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <h1 className="step-indicator">
        {currentStage + 1} / {formStages.length}
      </h1>
      {Object.entries(errors).map(([key, value]) => (
        <p key={key} className="error-message">
          {value}
        </p>
      ))}
      <form onSubmit={(e) => e.preventDefault()}>
        {renderCurrentStageQuestions()}
        {renderButtons()}
      </form>
    </>
  );
}

export default SignupFormPage;
