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
  user_id INT NOT NULL,
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
  user_id INT NOT NULL,
  description TEXT NOT NULL,
  debt_amount DECIMAL
      (10,2) NOT NULL, 
  payoff_period INT NOT NULL,
  payment_debt_frequency ENUM
      ('monthly', 'weekly') NOT NULL,
  FOREIGN KEY
      (user_id) REFERENCES user
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
        ('monthly', 'weekly', 'biweekly') NOT NULL,
  province TEXT NOT NULL,
  FOREIGN KEY
        (user_id) REFERENCES user
        (id)
);





-- -- Insert data into the `user` table
-- INSERT INTO `user` (`email`, `password`)
-- VALUES
--   ('starlord@example.com', 'password123'),
--   ('gamora@example.com', 'password456'),
--   ('rocket@example.com', 'password789'),
--   ('groot@example.com', 'passwordabc'),
--   ('drax@example.com', 'passworddef');

-- -- Insert data into the `expenses` table
-- INSERT INTO `expenses` (`user_id`, `category`, `amount`, `initial_expense_date`, `payment_frequency`)
-- VALUES
--   (1, 'Food', 200, '2023-06-01', 'Weekly'),
--   (2, 'Entertainment', 100, '2023-06-02', 'Monthly'),
--   (3, 'Housing', 800, '2023-06-03', 'Monthly'),
--   (4, 'Transportation', 300, '2023-06-04', 'Weekly'),
--   (5, 'Utilities', 150, '2023-06-05', 'Monthly');

-- -- Insert data into the `debt` table
-- INSERT INTO `debt` (`user_id`, `description`, `debt_amount`, `payoff_period`, `payment_debt_frequency`)
-- VALUES
--   (1, 'Credit Card Debt', 5000, 12, 'Monthly'),
--   (2, 'Student Loan', 10000, 24, 'Monthly'),
--   (3, 'Car Loan', 20000, 36, 'Monthly'),
--   (4, 'Mortgage', 250000, 360, 'Monthly'),
--   (5, 'Personal Loan', 5000, 12, 'Monthly');


-- -- Insert data into the `income` table
-- INSERT INTO `income` (`user_id`,  `payment_frequency`, `gross_income`, `province`)
-- VALUES
--   (1,  'Monthly', 5000,'Ontario'),
--   (2, 'Weekly',  2000,'Quebec'),
--   (3, 'Monthly',  3000,'Alberta'),
--   (4, 'Monthly',  4000,'British Columbia'),
--   (5, 'BiWeekly',  2500,'Manitoba');
