DROP DATABASE IF EXISTS budget_db;

CREATE DATABASE budget_db;
USE budget_db;
-- help with expenses and  bi-weekly / monthly / yearly debt and payments = helps keeps track
--  need models for user accounts
-- model for user 1st
--  model for expenses
-- model for payments
-- model for debt

CREATE TABLE user
(
  id INT NOT NULL
  AUTO_INCREMENT PRIMARY KEY,
 email VARCHAR
  (255) NOT NULL,
password VARCHAR
  (255) NOT NULL
);

  CREATE TABLE expenses
  (
    id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  category TEXT NOT NULL,
  amount DECIMAL
    (10,2) NOT NULL,
  initial_expense_date DATE NOT NULL,
  payment_frequency ENUM
    ('monthly', 'weekly') NOT NULL,
  FOREIGN KEY
    (user_id) REFERENCES user
    (id)
);

    CREATE TABLE debt
    (
      id INT NOT NULL
      AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  description TEXT NOT NULL,
  debt_amount DECIMAL
      (10,2) NOT NULL, 
  payoff_period DATE NOT NULL,
  payment_frequency ENUM
      ('monthly', 'weekly') NOT NULL,
  FOREIGN KEY
      (user_id) REFERENCES user
      (id)
);



      CREATE TABLE payments
      (
        id INT NOT NULL
        AUTO_INCREMENT PRIMARY KEY,
 debt_id INT NOT NULL,
amount DECIMAL
        (10,2) NOT NULL,
payment_date DATE,
FOREIGN KEY
        (debt_id) REFERENCES debt
        (id)
);

        CREATE TABLE income
        (
          id INT NOT NULL
          AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  gross_income DECIMAL
          (10,2) NOT NULL,
  payment_frequency ENUM
          ('monthly', 'weekly', 'bi-weekly') NOT NULL,
  province TEXT NOT NULL,
  FOREIGN KEY
          (user_id) REFERENCES user
          (id)
);