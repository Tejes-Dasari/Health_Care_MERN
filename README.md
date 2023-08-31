**MERN Application - Health Care Management System**

Welcome to the Health Care Management System repository! This application is built using the MERN stack (MongoDB, Express.js, React, Node.js) and is designed to manage health care records, stock management, and ice pack records. The application provides functionalities to add, update, and delete records, manage stock entries, and send reminders for returning ice packs.

**Features**

Records Management: Add, update, and delete health care records.

Stock Management: Add, update, and delete stock entries for medicines. 

Ice Pack Records: Manage ice pack records, and send reminders for ice pack return.

Authentication: Secure authentication and authorization using Auth0.

Responsive Design: The application is designed to work well on various devices.


**Usage**

--> Sign up or log in using the provided authentication system.

--> Use the navigation bar to access different sections of the application: records, stock, ice pack records, profile, etc.

--> Add, update, or delete health care records, stock entries, and ice pack records as needed.

--> The application also includes a reminder feature that sends email reminders for returning ice packs.



**API Endpoints**

The server side of this application provides the following API endpoints:

GET /records/all_records: Get all health care records.

POST /records/add_record: Add a new health care record.

PUT /records/update_record/:id: Update a health care record.

DELETE /records/delete_record/:id: Delete a health care record.

POST /stock/add_stock: Add a new stock entry.

GET /stock/all_stocks: Get all stock entries.

PUT /stock/update_stock/:id: Update a stock entry.

DELETE /stock/delete_stock/:id: Delete a stock entry.

GET /icepack_record: Get all ice pack records.

POST /icepack_record: Add a new ice pack record.

DELETE /icepack_record/:id: Delete an ice pack record by ID.

**Disclaimer:** This project is developed for educational purposes and might require further optimizations for use in production environments.
