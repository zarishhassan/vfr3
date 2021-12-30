import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../redux/ResetPassword/PasswordAction";

const UpdateProfileArea = ({ match }) => {
  const userId = match.params.id;

  const { loading, success, userInfo, error } = useSelector((state) => state.userUpdateProfileReducer);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile(userId, {
        name,
        phone,
      })
    );
  };
  return (
    <>
      <section className="login-area ptb-50">
        <div className="container">
          <div className="login-form">
            {success ? (
              <div className={`alert alert-success`} role="alert">
                Profile Updated
              </div>
            ) : null}

            <h2>Update Profile</h2>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="name"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  //   value={formData.email}
                  //   onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  //   value={formData.password}
                  //   onChange={(e) => onChange(e)}
                />
              </div>

              <button type="submit">Update </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default withRouter(UpdateProfileArea);
