import React, { useState } from "react";
import Helmet from "../Components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// Firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase.config";

// Css
import "../Styles/Login.css";

// signup component
const Signup = () => {
  // Hooks
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Authentication
  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      
      // Check if file is selected
      if (file) {
        const storageRef = ref(storage, `images/${Date.now() + userName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        // Handle upload completion
        uploadTask.on("state_changed", 
          () => {}, 
          (error) => {
            setLoading(false);
            toast.error(error.message);
          }, 
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(user, {
              displayName: userName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: userName,
              email,
              photoURL: downloadURL,
            });
            setLoading(false);
            toast.success("Account Created ");
            navigate("/login");
          }
        );
      } else {
        // If no file is selected, proceed without uploading photo
        await updateProfile(user, {
          displayName: userName,
        });
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: userName,
          email,
        });
        setLoading(false);
        toast.success("Account Created ");
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Something went wrong");
    }
  };
  

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h6 className="fw-bold">Loading...</h6>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">SignUp</h3>
                <Form className="auth__form" onSubmit={signup}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Username "
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder=" Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      maxLength={8}
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      className="p-2"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </FormGroup>

                  <button type="submit" className="buy__btn auth__btn mt-4">
                    Create an Account
                  </button>
                  <p>
                    Already have an account?<Link to="/login">Login Here</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
