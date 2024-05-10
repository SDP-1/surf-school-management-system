import React from 'react';
import CreateUserPage from '../components/CreateNewUser';
import AllUsers from '../components/ShowAllUsers';

const UserManage = () => {
  const css = `
   .container-fluid {
      padding: 20px;
    }

   .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

   .col-md-5,
   .col-md-7 {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

   .CreateUserPage,
   .AllUsers {
      width: 100%;
    }
  `;

  return (
    <div className="container-fluid" style={{ css }}>
      <div className="row">
        <div className="col-md-5">
          <CreateUserPage />
        </div>
        <div className="col-md-7">
          <AllUsers />
        </div>
      </div>
    </div>
  );
};

export default UserManage;