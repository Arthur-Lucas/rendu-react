import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../Context/userContext.js";
import {useNavigate} from "react-router-dom"
import '../index.css';

export default function SignUp() {
  
  const { modalState, toggleModals, signUp } = useContext(UserContext);

  const navigate = useNavigate();

  
  const [validation, setValidation] = useState("");

  const inputs = useRef([])
  const addInputs = el => {
    if(el && !inputs.current.includes(el)){
      inputs.current.push(el)
    }
  }  
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault()

    if((inputs.current[1].value.length || inputs.current[2].value.length) < 6) {
      setValidation("6 characters min")
      return;
    }
    else if(inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Passwords do not match")
      return;
    }

    try {

      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      )
      // formRef.current.reset();
      setValidation("")
      toggleModals("close")
      navigate("/private/private-home")

    } catch (err) {

      if(err.code === "auth/invalid-email") {
        setValidation("Email format invalid")
      }
      
      if(err.code === "auth/email-already-in-use") {
        setValidation("Email already used")
      }
 
    }

  }

  const closeModal = () => {
    setValidation("")
    toggleModals("close")
  }

  return (
    <>
      {modalState.signUpModal && (
        <div>
          <div
          onClick={closeModal}>
          </div>
            <div
              style={{ minWidth: "400px" }}
            >
              <div >
                <div >
                  <div >
                    <h5>Sign Up</h5>
                    <button 
                    onClick={closeModal}
                    >X</button>
                  </div>

                  <div >
                    <form 
                    ref={formRef}
                    onSubmit={handleForm}>
                      <div>
                        <label htmlFor="signUpEmail">
                          Email adress
                        </label>
                        <input
                          ref={addInputs}
                          name="email"
                          required
                          type="email"
                          id="signUpEmail"
                        />
                      </div>

                      <div>
                        <label htmlFor="signUpPwd" >
                          Password
                        </label>
                        <input
                          ref={addInputs}
                          name="pwd"
                          required
                          type="password"
                          id="signUpPwd"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="repeatPwd">
                          Repeat Password
                        </label>
                        <input
                          ref={addInputs}
                          name="pwd"
                          required
                          type="password"
                          id="repeatPwd"
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