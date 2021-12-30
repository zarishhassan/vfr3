import React from "react";
// import PasswordResetArea from "../../components/Auth/PasswordResetArea";
import PageTitle from "../../components/Common/PageTitle";
import Footer from "../../components/Footer/Footer";
import UpdateProfileArea from "../../components/User/UpdateProfileArea";

const UpdateProfile = () => {
  return (
    <>
      <PageTitle title="Update Profile" />
      <UpdateProfileArea/>
      <Footer />
    </>
  );
};

export default UpdateProfile;
