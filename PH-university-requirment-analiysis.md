PH University

### Functional Requirements: 

  1. Authentication:
    a. Student -
      i. Student can login & logout securely.
      ii. Student can update their password.

    b. Faculty -
      i. Faculty can login & logout securely.
      ii. Faculty can update their password.

    c. Admin -
      i. Admin can login & logout securely.
      ii. Admin can update their password.

  2. Profile Management: 
    a. Student -
      i. Student can manage & update their profile.
      ii. Student can update certain fields.

    a. Faculty -
      i. Faculty can manage & update their profile.
      ii. Faculty can update certain fields.

    a. Admin -
      i. Admin can manage & update their profile.
      ii. Admin can update certain fields.

  3. Academic Process: 
    a. Student -
      i. Students can enroll in offered courses for a specific semester.
      ii. Students can view their class schedule.
      iii. Students can view their grades.
      iv. Students can view notice board and events

    b. Faculty -
      i. Faculty can manage students grades
      ii. Faculty can access student's personal and academic information.

    c. Admin -
      i. Admin can manage multiple processes:
            1. Semester
            2. Course
            3. Offered Course
            4. Section
            5. Room
            6. Building

    4. User Management: 
      a. Admin -
        i. Admin can manage multiple accounts
        ii. Admin can block/unblock user
        iii. Admin can change user password


### Data Model

User: 
  - _id
  - id (generated)
  - password
  - needsPasswordChange
  - role
  - status
  - isDeleted
  - createdAt
  - updateAt

Student: 
  - _id
  - id (generated)
  - name
  - gender
  - dateOfBirth
  - email
  - contactNo
  - emergencyContactNo
  - presentAddress
  - permanentAddress
  - guardian
  - localGuardian
  - profileImage
  - academicDepartment
  - isDeleted
  - createAt
  - updateAt

Faculty: 
  - _id
  - id (generated)
  - designation
  - name
  - gender
  - dateOfBirth
  - email
  - contactNo
  - emergencyContactNo
  - presentAddress
  - permanentAddress
  - profileImage
  - academicDepartment
  - academicFaculty
  - isDelete
  - createAt
  - updateAt

Admin: 
  - _id
  - id (generated)
  - designation
  - name
  - gender
  - dateOfBirth
  - email
  - contactNo
  - emergencyContactNo
  - presentAddress
  - permanentAddress
  - profileImage
  - managementDepartment
  - isDelete
  - createAt
  - updateAt

Academic Semester: 
  - name
  - year
  - code
  - startMonth
  - endMonth
  - createAt
  - updateAt

Academic Faculty: 
  - _id
  - name
  - createAt
  - updateAt

Academic Department: 
  - _id
  - name
  - academicFaculty
  - createAt
  - updateAt

### API Endpoints
User: 
  - users/create-student (POST)
  - users/create-faculty (POST)
  - users/create-admin (POST)
  
Student:
  - students (GET)
  - students/:id (GET)
  - students/:id (PATCH)
  - students/:id (DELETE)
  - students/my-profile

Faculty:
  - faculties (GET)
  - faculties/:id (GET)
  - faculties/:id (PATCH)
  - faculties/:id (DELETE)
  - faculties/my-profile

Admin:
  - admins (GET)
  - admins/:id (GET)
  - admins/:id (PATCH)
  - admins/:id (DELETE)
  - admins/my-profile

Auth: 
  - auth/login
  - auth/refresh-token
  - auth/change-password
  - auth/forget-password
  - auth/reset-password