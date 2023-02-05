import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../Context/userContext.js";
import { useNavigate } from "react-router-dom";
import '../index.css'

export default function SignIn() {
  const { modalState, toggleModals, signIn } = useContext(UserContext);

  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const cred = await signIn(
        inputs.current[0].value,
        inputs.current[1].value
      );
      
      setValidation("");
      toggleModals("close");
      navigate("/private/private-home");
    } catch {
      setValidation("Email and/or password are incorrect")
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signInModal && (
        <div>
          <div
            onClick={closeModal}
          ></div>
          <div
            style={{ minWidth: "400px" }}
          >
            <div>
              <div>
                <div >
                  <h5>Sign In</h5>
                  <button onClick={closeModal}>X</button>
                </div>

                <div>
                  <form
                    ref={formRef}
                    onSubmit={handleForm}
                  >
                    <div>
                      <label htmlFor="signInEmail">
                        Email adress
                      </label>
                      <input
                        ref={addInputs}
                        name="email"
                        required
                        type="email"
                        id="signInEmail"
                      />
                    </div>

                    <div>
                      <label htmlFor="signInPwd">
                        Password
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        id="signInPwd"
                      />
                      <p>{validation}</p>
                    </div>

                    <button>Submit</button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}