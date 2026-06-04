export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  notes: string;
  example: string;
  practiceQuestions: string[];
  interviewQuestions: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  resources: { title: string; url: string }[];
}

export interface Roadmap {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  level: string;
  duration: string;
  topics: RoadmapTopic[];
}

export const sqlRoadmap: Roadmap = {
  id: "sql",
  title: "SQL Roadmap",
  icon: "Database",
  color: "#3B82F6",
  description: "Master SQL from basic queries to advanced optimization. This roadmap covers everything you need to become a proficient SQL analyst.",
  level: "Beginner to Advanced",
  duration: "8–12 weeks",
  topics: [
    {
      id: "database-basics",
      title: "Database Basics",
      difficulty: "Beginner",
      estimatedTime: "2–3 hours",
      description: "Understand what databases are, types of databases (relational vs non-relational), and how SQL interacts with them. Learn about tables, rows, columns, primary keys, and foreign keys.",
      notes: `**Key Concepts:**
- A **database** is an organized collection of structured data
- **RDBMS** (Relational Database Management System) stores data in tables
- Popular databases: MySQL, PostgreSQL, SQL Server, SQLite, Oracle
- **Table** = collection of rows and columns
- **Primary Key** = unique identifier for each row
- **Foreign Key** = links data between tables
- **Schema** = blueprint/structure of the database`,
      example: `-- Understanding table structure
-- A 'customers' table might look like:
-- customer_id (PK) | name       | email              | city
-- 1                | Alice Roy  | alice@email.com    | Mumbai
-- 2                | Bob Singh  | bob@email.com      | Delhi

-- A 'orders' table with FK to customers:
-- order_id (PK) | customer_id (FK) | product  | amount
-- 101            | 1                | Laptop   | 45000
-- 102            | 2                | Mouse    | 800`,
      practiceQuestions: [
        "What is the difference between a database and a table?",
        "Name 3 popular relational database systems.",
        "What is a primary key? Can a table have multiple primary keys?",
        "What is the difference between a primary key and a foreign key?",
        "What is normalization and why is it important?",
      ],
      interviewQuestions: [
        "What is a relational database? How does it differ from NoSQL?",
        "Explain the concept of ACID properties.",
        "What is the difference between DDL and DML?",
        "What are constraints in SQL? Name the types.",
        "What is a schema?",
      ],
      resources: [
        { title: "W3Schools SQL Tutorial", url: "https://www.w3schools.com/sql/" },
        { title: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/" },
      ],
    },
    {
      id: "select",
      title: "SELECT Statement",
      difficulty: "Beginner",
      estimatedTime: "3–4 hours",
      description: "Learn the foundation of SQL — the SELECT statement. Master how to retrieve data from tables with columns, aliases, DISTINCT, and basic calculations.",
      notes: `**Syntax:**
\`\`\`sql
SELECT column1, column2 FROM table_name;
SELECT * FROM table_name;  -- all columns
SELECT DISTINCT column FROM table;  -- unique values
SELECT column AS alias FROM table;  -- rename column
\`\`\`

**Key Points:**
- \`*\` selects all columns (avoid in production)
- \`DISTINCT\` removes duplicate rows
- Aliases make output readable
- Can do arithmetic: \`SELECT salary * 1.1 AS new_salary\``,
      example: `-- Basic SELECT
SELECT name, email FROM customers;

-- Select all
SELECT * FROM products;

-- With alias
SELECT product_name AS Product, price AS "Unit Price" FROM products;

-- DISTINCT values
SELECT DISTINCT city FROM customers;

-- With calculation
SELECT name, salary, salary * 1.2 AS increased_salary FROM employees;`,
      practiceQuestions: [
        "Write a query to select all columns from the 'employees' table.",
        "Write a query to get unique departments from the employees table.",
        "Write a query to display the product name and price with a 10% discount.",
        "Write a query to select employee name and salary with alias 'Staff Name' and 'Monthly Pay'.",
        "Write a query to get the first name and last name of all customers.",
      ],
      interviewQuestions: [
        "What is the difference between SELECT * and SELECT column_name?",
        "When would you use DISTINCT? Give an example.",
        "How do you create column aliases in SQL?",
        "Can you perform arithmetic operations in SELECT? Show an example.",
        "What is the order of execution of SQL clauses?",
      ],
      resources: [
        { title: "SQL SELECT Tutorial", url: "https://www.w3schools.com/sql/sql_select.asp" },
      ],
    },
    {
      id: "where",
      title: "WHERE Clause",
      difficulty: "Beginner",
      estimatedTime: "3–4 hours",
      description: "Filter rows using conditions with the WHERE clause. Master comparison operators, logical operators (AND, OR, NOT), BETWEEN, IN, LIKE, and NULL checks.",
      notes: `**Operators:**
- \`=\`, \`!=\` or \`<>\`, \`>\`, \`<\`, \`>=\`, \`<=\`
- \`AND\`, \`OR\`, \`NOT\`
- \`BETWEEN value1 AND value2\`
- \`IN (val1, val2, val3)\`
- \`LIKE 'pattern%'\` — % = any chars, _ = one char
- \`IS NULL\`, \`IS NOT NULL\``,
      example: `-- Simple condition
SELECT * FROM employees WHERE department = 'Sales';

-- Multiple conditions
SELECT * FROM employees WHERE salary > 50000 AND city = 'Mumbai';

-- BETWEEN
SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';

-- IN
SELECT * FROM customers WHERE city IN ('Mumbai', 'Delhi', 'Bangalore');

-- LIKE
SELECT * FROM products WHERE product_name LIKE 'Apple%';
SELECT * FROM employees WHERE name LIKE '_ohn%';  -- John, Bohn, etc.

-- NULL check
SELECT * FROM employees WHERE manager_id IS NULL;`,
      practiceQuestions: [
        "Find all employees with a salary greater than 60,000.",
        "Get all orders placed between January and March 2024.",
        "Find customers from Mumbai, Delhi, or Chennai.",
        "Find all products whose name starts with 'Sam'.",
        "Get employees who don't have a manager assigned.",
      ],
      interviewQuestions: [
        "What is the difference between WHERE and HAVING?",
        "How does the LIKE operator work? What are wildcards?",
        "What is the difference between IN and BETWEEN?",
        "How do you handle NULL values in WHERE clause?",
        "Can you use WHERE with aggregate functions?",
      ],
      resources: [],
    },
    {
      id: "order-by",
      title: "ORDER BY",
      difficulty: "Beginner",
      estimatedTime: "1–2 hours",
      description: "Sort query results in ascending or descending order. Learn multi-column sorting and understand NULL ordering behavior.",
      notes: `**Syntax:**
\`\`\`sql
SELECT * FROM table ORDER BY column1 ASC, column2 DESC;
\`\`\`
- Default is ASC (ascending)
- Can sort by multiple columns
- Can sort by aliases or column numbers
- NULLs are sorted last in ASC`,
      example: `-- Sort by salary descending
SELECT name, salary FROM employees ORDER BY salary DESC;

-- Multi-column sort
SELECT name, department, salary FROM employees 
ORDER BY department ASC, salary DESC;

-- Sort by alias
SELECT name, salary * 12 AS annual_salary FROM employees 
ORDER BY annual_salary DESC;`,
      practiceQuestions: [
        "List all products sorted by price from highest to lowest.",
        "Get employees sorted by department (A-Z) and within each department by salary (highest first).",
        "List the top 5 highest paid employees.",
        "Get all orders sorted by order date (newest first).",
        "Sort customers by city name alphabetically.",
      ],
      interviewQuestions: [
        "What is the default sort order in ORDER BY?",
        "Can you order by a column that is not in SELECT?",
        "How does ORDER BY handle NULL values?",
        "What is the difference between ORDER BY 1 and ORDER BY column_name?",
      ],
      resources: [],
    },
    {
      id: "group-by",
      title: "GROUP BY",
      difficulty: "Intermediate",
      estimatedTime: "4–5 hours",
      description: "Aggregate data using GROUP BY with functions like COUNT, SUM, AVG, MAX, MIN. Essential for data analysis and reporting.",
      notes: `**Aggregate Functions:**
- \`COUNT(*)\` — count rows
- \`COUNT(column)\` — count non-null values
- \`SUM(column)\` — total sum
- \`AVG(column)\` — average
- \`MAX(column)\` — maximum value
- \`MIN(column)\` — minimum value

**Rules:**
- Every non-aggregated column in SELECT must appear in GROUP BY
- Use HAVING to filter groups (not WHERE)`,
      example: `-- Count orders per customer
SELECT customer_id, COUNT(*) AS total_orders 
FROM orders GROUP BY customer_id;

-- Revenue by department
SELECT department, SUM(salary) AS total_payroll, AVG(salary) AS avg_salary
FROM employees GROUP BY department;

-- Multiple group columns
SELECT department, city, COUNT(*) AS emp_count
FROM employees GROUP BY department, city;

-- WITH HAVING
SELECT department, AVG(salary) AS avg_sal
FROM employees GROUP BY department
HAVING AVG(salary) > 50000;`,
      practiceQuestions: [
        "Find the total sales amount for each product category.",
        "Count the number of employees in each department.",
        "Find the average order value per customer.",
        "Get the departments with more than 10 employees.",
        "Find the monthly revenue for the year 2024.",
      ],
      interviewQuestions: [
        "What is the difference between WHERE and HAVING?",
        "Can you use GROUP BY without aggregate functions?",
        "What happens if you include a non-grouped column in SELECT?",
        "What is the difference between COUNT(*) and COUNT(column)?",
        "Explain ROLLUP and CUBE in GROUP BY.",
      ],
      resources: [],
    },
    {
      id: "having",
      title: "HAVING Clause",
      difficulty: "Intermediate",
      estimatedTime: "2–3 hours",
      description: "Filter grouped results using HAVING. Understand the key difference between WHERE (filters rows) and HAVING (filters groups).",
      notes: `**Key Difference:**
- \`WHERE\` filters individual rows BEFORE grouping
- \`HAVING\` filters groups AFTER aggregation

**Syntax:**
\`\`\`sql
SELECT col, AGG(col2)
FROM table
WHERE condition
GROUP BY col
HAVING AGG(col2) condition;
\`\`\``,
      example: `-- Find departments with average salary > 60000
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 60000;

-- Customers with more than 5 orders
SELECT customer_id, COUNT(*) AS order_count
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 5;

-- Combined WHERE and HAVING
SELECT department, COUNT(*) AS emp_count
FROM employees
WHERE hire_date >= '2020-01-01'
GROUP BY department
HAVING COUNT(*) >= 3;`,
      practiceQuestions: [
        "Find product categories with total sales over ₹1,00,000.",
        "Find customers who have placed more than 10 orders.",
        "Get cities where the average employee salary exceeds ₹70,000.",
        "Find departments where at least 5 employees joined after 2022.",
        "Get suppliers with average product price between ₹500 and ₹5000.",
      ],
      interviewQuestions: [
        "Can you use HAVING without GROUP BY?",
        "What is the execution order of SQL clauses?",
        "Can you use column aliases in HAVING?",
        "Write a query to find products with average rating above 4.",
      ],
      resources: [],
    },
    {
      id: "joins",
      title: "JOINs",
      difficulty: "Intermediate",
      estimatedTime: "6–8 hours",
      description: "Combine data from multiple tables using various types of JOINs. Master INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, and SELF JOIN.",
      notes: `**Types of JOINs:**
- **INNER JOIN**: Returns matching rows from both tables
- **LEFT JOIN**: All rows from left + matching from right (NULL if no match)
- **RIGHT JOIN**: All rows from right + matching from left
- **FULL OUTER JOIN**: All rows from both tables
- **CROSS JOIN**: Every combination (Cartesian product)
- **SELF JOIN**: Table joined with itself

**Venn Diagram:**
- INNER = intersection only
- LEFT = left circle + intersection
- RIGHT = right circle + intersection
- FULL OUTER = entire diagram`,
      example: `-- INNER JOIN
SELECT c.name, o.product, o.amount
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id;

-- LEFT JOIN (all customers, even without orders)
SELECT c.name, o.product
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id;

-- FULL OUTER JOIN
SELECT c.name, o.product
FROM customers c
FULL OUTER JOIN orders o ON c.customer_id = o.customer_id;

-- SELF JOIN (find employee and their manager)
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id;`,
      practiceQuestions: [
        "Get a list of all orders with customer names and city.",
        "Find all customers who have never placed an order.",
        "Get employees and their department names from two tables.",
        "Find all products that have never been ordered.",
        "Write a self join to find employees and their managers.",
      ],
      interviewQuestions: [
        "What is the difference between INNER JOIN and LEFT JOIN?",
        "What is a CROSS JOIN? When would you use it?",
        "What is a SELF JOIN? Give a real-world example.",
        "How do you handle duplicate columns in JOIN results?",
        "What is the difference between JOIN and UNION?",
        "How do you JOIN more than 2 tables?",
      ],
      resources: [],
    },
    {
      id: "subqueries",
      title: "Subqueries",
      difficulty: "Intermediate",
      estimatedTime: "4–5 hours",
      description: "Use subqueries (nested queries) in SELECT, FROM, and WHERE clauses. Learn scalar, row, and table subqueries.",
      notes: `**Types:**
- **Scalar Subquery**: Returns a single value
- **Row Subquery**: Returns a single row
- **Table Subquery**: Returns multiple rows/columns (used in FROM)
- **Correlated Subquery**: References outer query (slower)

**Placement:**
- In WHERE: filter using subquery result
- In FROM: treat subquery as a table (derived table)
- In SELECT: return a calculated value`,
      example: `-- Scalar subquery in WHERE
SELECT name, salary FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Subquery with IN
SELECT name FROM customers
WHERE customer_id IN (SELECT customer_id FROM orders WHERE amount > 10000);

-- Subquery in FROM (derived table)
SELECT dept, avg_sal FROM (
  SELECT department AS dept, AVG(salary) AS avg_sal
  FROM employees GROUP BY department
) AS dept_averages
WHERE avg_sal > 50000;

-- Subquery in SELECT
SELECT name, salary,
  (SELECT AVG(salary) FROM employees) AS company_avg
FROM employees;`,
      practiceQuestions: [
        "Find employees earning above company average salary.",
        "Find the second highest salary using a subquery.",
        "Get customers who ordered all products in a given category.",
        "Find departments with above-average headcount.",
        "Get the top 3 selling products by revenue.",
      ],
      interviewQuestions: [
        "What is a correlated subquery? How does it differ from a regular subquery?",
        "What are the performance implications of subqueries?",
        "What is the difference between EXISTS and IN?",
        "When would you use a subquery vs a JOIN?",
        "Can a subquery return multiple columns?",
      ],
      resources: [],
    },
    {
      id: "ctes",
      title: "CTEs (Common Table Expressions)",
      difficulty: "Advanced",
      estimatedTime: "4–5 hours",
      description: "Use WITH clause to create reusable, readable temporary result sets. Learn recursive CTEs for hierarchical data.",
      notes: `**Syntax:**
\`\`\`sql
WITH cte_name AS (
  SELECT ...
)
SELECT * FROM cte_name;
\`\`\`

**Benefits:**
- Improves readability
- Can reference multiple times
- Supports recursion

**Recursive CTE:**
\`\`\`sql
WITH RECURSIVE cte AS (
  -- anchor member (base case)
  SELECT ...
  UNION ALL
  -- recursive member
  SELECT ... FROM cte WHERE condition
)
SELECT * FROM cte;
\`\`\``,
      example: `-- Simple CTE
WITH high_earners AS (
  SELECT name, salary, department
  FROM employees WHERE salary > 80000
)
SELECT department, COUNT(*) as count
FROM high_earners GROUP BY department;

-- Multiple CTEs
WITH dept_avg AS (
  SELECT department, AVG(salary) AS avg_sal FROM employees GROUP BY department
),
high_dept AS (
  SELECT * FROM dept_avg WHERE avg_sal > 60000
)
SELECT * FROM high_dept ORDER BY avg_sal DESC;

-- Recursive CTE (org hierarchy)
WITH RECURSIVE org AS (
  SELECT employee_id, name, manager_id, 1 AS level
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.employee_id, e.name, e.manager_id, o.level + 1
  FROM employees e
  JOIN org o ON e.manager_id = o.employee_id
)
SELECT * FROM org;`,
      practiceQuestions: [
        "Rewrite a complex subquery using a CTE.",
        "Find the top 3 sales reps per region using a CTE.",
        "Use a recursive CTE to show the employee hierarchy.",
        "Calculate rolling 7-day averages using a CTE.",
        "Rank departments by revenue using multiple CTEs.",
      ],
      interviewQuestions: [
        "What is a CTE? How is it different from a subquery?",
        "What are recursive CTEs? Give a use case.",
        "Can you reference a CTE multiple times?",
        "What are the performance differences between CTEs and temp tables?",
        "When would you use a CTE over a view?",
      ],
      resources: [],
    },
    {
      id: "window-functions",
      title: "Window Functions",
      difficulty: "Advanced",
      estimatedTime: "6–8 hours",
      description: "Perform calculations across rows related to the current row without collapsing results. Essential for advanced analytics.",
      notes: `**Syntax:**
\`\`\`sql
function() OVER (
  PARTITION BY col1
  ORDER BY col2
  ROWS BETWEEN ... AND ...
)
\`\`\`

**Ranking Functions:**
- \`ROW_NUMBER()\` — unique rank (no ties)
- \`RANK()\` — ties get same rank, next rank skips
- \`DENSE_RANK()\` — ties get same rank, no gaps
- \`NTILE(n)\` — divide into n buckets

**Aggregate Functions:**
- \`SUM()\`, \`AVG()\`, \`COUNT()\`, \`MAX()\`, \`MIN()\`

**Navigation Functions:**
- \`LAG(col, n)\` — value from n rows before
- \`LEAD(col, n)\` — value from n rows ahead
- \`FIRST_VALUE()\`, \`LAST_VALUE()\``,
      example: `-- Row number within each department
SELECT name, department, salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank
FROM employees;

-- Running total
SELECT order_date, amount,
  SUM(amount) OVER (ORDER BY order_date) AS running_total
FROM orders;

-- Month-over-month comparison
SELECT month, revenue,
  LAG(revenue, 1) OVER (ORDER BY month) AS prev_month,
  revenue - LAG(revenue, 1) OVER (ORDER BY month) AS growth
FROM monthly_sales;

-- Top 3 per category
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) AS rn
  FROM products
)
SELECT * FROM ranked WHERE rn <= 3;`,
      practiceQuestions: [
        "Rank employees by salary within each department.",
        "Calculate a running total of sales by date.",
        "Find the top 3 products per category by revenue.",
        "Calculate month-over-month revenue growth.",
        "Find the difference in salary between each employee and the department average.",
      ],
      interviewQuestions: [
        "What is the difference between ROW_NUMBER, RANK, and DENSE_RANK?",
        "What is PARTITION BY in window functions?",
        "What is the difference between window functions and GROUP BY?",
        "How does LAG/LEAD work? Give a use case.",
        "What is the ROWS BETWEEN syntax?",
        "Can you use window functions in WHERE clause?",
      ],
      resources: [],
    },
    {
      id: "views",
      title: "Views",
      difficulty: "Intermediate",
      estimatedTime: "2–3 hours",
      description: "Create virtual tables using views to simplify complex queries, improve security, and provide reusable query logic.",
      notes: `**Syntax:**
\`\`\`sql
CREATE VIEW view_name AS
SELECT ...;

-- Query a view
SELECT * FROM view_name;

-- Update view
CREATE OR REPLACE VIEW view_name AS SELECT ...;

-- Drop view
DROP VIEW view_name;
\`\`\`

**Types:**
- **Simple View**: Based on single table, updatable
- **Complex View**: Multiple tables, joins, aggregates — NOT updatable

**Benefits:**
- Simplify complex queries
- Data security (hide sensitive columns)
- Reusable logic`,
      example: `-- Create a view for active customers
CREATE VIEW active_customers AS
SELECT customer_id, name, email, city
FROM customers WHERE status = 'active';

-- Use the view
SELECT * FROM active_customers WHERE city = 'Mumbai';

-- Materialized View (PostgreSQL)
CREATE MATERIALIZED VIEW monthly_summary AS
SELECT DATE_TRUNC('month', order_date) AS month,
       SUM(amount) AS revenue
FROM orders GROUP BY 1;`,
      practiceQuestions: [
        "Create a view showing only active employees.",
        "Create a view for a monthly sales summary.",
        "Create a view to hide salary columns from employees table.",
      ],
      interviewQuestions: [
        "What is a view? What are its advantages?",
        "What is the difference between a view and a table?",
        "What is a materialized view?",
        "Can you update data through a view?",
        "What are the limitations of views?",
      ],
      resources: [],
    },
    {
      id: "stored-procedures",
      title: "Stored Procedures",
      difficulty: "Advanced",
      estimatedTime: "3–4 hours",
      description: "Create reusable, parameterized SQL programs stored in the database. Learn to use input/output parameters, error handling, and when to use procedures vs functions.",
      notes: `**Syntax (MySQL):**
\`\`\`sql
DELIMITER //
CREATE PROCEDURE proc_name(IN param1 INT, OUT param2 VARCHAR(50))
BEGIN
  -- SQL statements
  SELECT name INTO param2 FROM employees WHERE id = param1;
END //
DELIMITER ;

-- Call procedure
CALL proc_name(1, @result);
SELECT @result;
\`\`\`

**Benefits:**
- Reusable logic
- Improved performance (pre-compiled)
- Security
- Reduced network traffic`,
      example: `-- Get employee details procedure
DELIMITER //
CREATE PROCEDURE GetEmployee(IN emp_id INT)
BEGIN
  SELECT * FROM employees WHERE employee_id = emp_id;
END //
DELIMITER ;

CALL GetEmployee(101);`,
      practiceQuestions: [
        "Create a stored procedure to get employee details by ID.",
        "Create a procedure to insert a new customer.",
        "Create a procedure to calculate employee bonus by department.",
      ],
      interviewQuestions: [
        "What is a stored procedure? What are its advantages?",
        "Difference between stored procedure and function?",
        "What are IN, OUT, and INOUT parameters?",
        "Can stored procedures return values?",
      ],
      resources: [],
    },
    {
      id: "indexing",
      title: "Indexing",
      difficulty: "Advanced",
      estimatedTime: "3–4 hours",
      description: "Speed up query performance with indexes. Understand clustered vs non-clustered indexes, composite indexes, and the impact on INSERT/UPDATE/DELETE operations.",
      notes: `**Types:**
- **Clustered Index**: Sorts physical data (only 1 per table, usually PK)
- **Non-Clustered Index**: Separate structure pointing to data rows (many allowed)
- **Unique Index**: Ensures unique values
- **Composite Index**: Index on multiple columns
- **Full-Text Index**: For text search

**When to Index:**
- Columns frequently used in WHERE, JOIN, ORDER BY
- High cardinality columns (many unique values)

**Avoid Indexing:**
- Small tables
- Columns rarely used in queries
- Frequently updated columns`,
      example: `-- Create index
CREATE INDEX idx_employee_dept ON employees(department);
CREATE UNIQUE INDEX idx_email ON employees(email);
CREATE INDEX idx_dept_salary ON employees(department, salary);

-- Check index usage (MySQL)
EXPLAIN SELECT * FROM employees WHERE department = 'Sales';

-- Drop index
DROP INDEX idx_employee_dept ON employees;`,
      practiceQuestions: [
        "When would you create a composite index?",
        "How does an index slow down INSERT operations?",
        "Use EXPLAIN to analyze query performance.",
      ],
      interviewQuestions: [
        "What is an index? How does it improve query performance?",
        "What is the difference between clustered and non-clustered index?",
        "When should you NOT use an index?",
        "What is a covering index?",
        "How does an index impact DML operations?",
      ],
      resources: [],
    },
    {
      id: "query-optimization",
      title: "Query Optimization",
      difficulty: "Advanced",
      estimatedTime: "4–5 hours",
      description: "Write efficient SQL queries. Understand query execution plans, avoid common anti-patterns, and optimize slow queries.",
      notes: `**Common Optimizations:**
1. Use indexes on WHERE, JOIN, ORDER BY columns
2. Avoid SELECT * — select only needed columns
3. Avoid functions on indexed columns in WHERE
4. Use EXISTS instead of IN for large datasets
5. Use LIMIT for development/testing
6. Avoid correlated subqueries — use JOINs
7. Use CTEs instead of nested subqueries
8. Partition large tables

**EXPLAIN Plan:**
\`\`\`sql
EXPLAIN SELECT * FROM employees WHERE salary > 50000;
\`\`\`
Look for: table scans, index usage, join types`,
      example: `-- Bad: Function on column (no index use)
SELECT * FROM orders WHERE YEAR(order_date) = 2024;

-- Good: Range condition (uses index)
SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';

-- Bad: SELECT *
SELECT * FROM employees WHERE department = 'IT';

-- Good: Select only needed columns
SELECT name, email, salary FROM employees WHERE department = 'IT';

-- Analyze with EXPLAIN
EXPLAIN SELECT e.name, d.dept_name
FROM employees e JOIN departments d ON e.dept_id = d.dept_id
WHERE e.salary > 60000;`,
      practiceQuestions: [
        "Identify performance issues in a given slow query.",
        "Rewrite a correlated subquery as a JOIN.",
        "Use EXPLAIN to find missing indexes.",
      ],
      interviewQuestions: [
        "How do you optimize a slow SQL query?",
        "What is a query execution plan?",
        "What is the N+1 query problem?",
        "What is query caching?",
        "How does the optimizer decide to use an index?",
      ],
      resources: [],
    },
  ],
};

export const excelRoadmap: Roadmap = {
  id: "excel",
  title: "Excel Roadmap",
  icon: "BarChart3",
  color: "#10B981",
  description: "Master Microsoft Excel for data analysis — from basic formulas to advanced Power Query and dashboard design.",
  level: "Beginner to Expert",
  duration: "6–8 weeks",
  topics: [
    {
      id: "excel-formulas",
      title: "Formulas & Functions",
      difficulty: "Beginner",
      estimatedTime: "3–4 hours",
      description: "Master Excel formulas — SUM, AVERAGE, COUNT, MAX, MIN, IF, AND, OR, and text functions.",
      notes: `**Essential Functions:**
- \`SUM(range)\`, \`AVERAGE(range)\`
- \`COUNT(range)\`, \`COUNTA(range)\`
- \`MAX(range)\`, \`MIN(range)\`
- \`IF(condition, true_val, false_val)\`
- \`AND()\`, \`OR()\`, \`NOT()\`
- \`CONCATENATE()\` or \`&\` operator
- \`LEFT(text, n)\`, \`RIGHT(text, n)\`, \`MID(text, start, n)\`
- \`TRIM(text)\`, \`UPPER()\`, \`LOWER()\``,
      example: `=SUM(B2:B100)
=AVERAGE(C2:C50)
=IF(B2>50000,"High","Low")
=CONCATENATE(A2," ",B2)
=LEFT(A2,3)  -- first 3 characters
=TRIM(A2)    -- remove extra spaces`,
      practiceQuestions: [
        "Calculate total sales using SUM.",
        "Flag employees with salary above average using IF.",
        "Extract first name from full name column.",
        "Count non-empty cells in a range.",
        "Combine first and last name with space.",
      ],
      interviewQuestions: [
        "What is the difference between COUNT and COUNTA?",
        "How do you use nested IF statements?",
        "What is the difference between SUMIF and SUMIFS?",
      ],
      resources: [],
    },
    {
      id: "lookup-functions",
      title: "Lookup Functions",
      difficulty: "Intermediate",
      estimatedTime: "4–5 hours",
      description: "Master VLOOKUP, HLOOKUP, INDEX-MATCH, and the modern XLOOKUP for data retrieval across tables.",
      notes: `**VLOOKUP:**
\`=VLOOKUP(lookup_value, table_array, col_index, [range_lookup])\`
- range_lookup: FALSE = exact match (preferred)

**INDEX-MATCH (recommended over VLOOKUP):**
\`=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))\`
- Can look left, right, up, down
- More flexible than VLOOKUP

**XLOOKUP (Excel 365):**
\`=XLOOKUP(lookup, lookup_array, return_array)\`
- Replaces VLOOKUP completely`,
      example: `-- VLOOKUP: Get salary by employee ID
=VLOOKUP(A2, EmployeeTable, 3, FALSE)

-- INDEX-MATCH (looks left too)
=INDEX(B:B, MATCH(A2, D:D, 0))

-- XLOOKUP
=XLOOKUP(A2, D:D, B:B, "Not Found")`,
      practiceQuestions: [
        "Use VLOOKUP to get product price by product ID.",
        "Use INDEX-MATCH to find employee name by ID.",
        "Handle #N/A errors with IFERROR.",
        "Use XLOOKUP with a default value.",
        "Compare performance of VLOOKUP vs INDEX-MATCH.",
      ],
      interviewQuestions: [
        "Why is INDEX-MATCH better than VLOOKUP?",
        "What are the limitations of VLOOKUP?",
        "How do you handle errors in VLOOKUP?",
        "What is the difference between approximate and exact match?",
      ],
      resources: [],
    },
    {
      id: "pivot-tables",
      title: "Pivot Tables",
      difficulty: "Intermediate",
      estimatedTime: "4–5 hours",
      description: "Summarize and analyze large datasets with Pivot Tables. Create interactive reports with slicers and pivot charts.",
      notes: `**Creating Pivot Tables:**
1. Select data range → Insert → PivotTable
2. Drag fields to: Rows, Columns, Values, Filters
3. Change Value Field Settings (Sum, Count, Average, etc.)
4. Add Slicers for interactive filtering
5. Create Pivot Charts for visualization

**Power Pivot:**
- Handles millions of rows
- Creates relationships between tables
- Uses DAX formulas`,
      example: `-- Pivot Table layout:
Rows: Product Category
Columns: Month
Values: SUM of Sales
Filter: Region

-- Calculated Field:
= Sales / Orders  (Revenue per Order)`,
      practiceQuestions: [
        "Create a pivot showing monthly sales by region.",
        "Add a slicer for product category filtering.",
        "Create a calculated field for profit margin.",
        "Create a pivot chart from your pivot table.",
        "Show YoY comparison in a pivot table.",
      ],
      interviewQuestions: [
        "What are the 4 areas of a Pivot Table?",
        "What is the difference between a Pivot Table and a regular table?",
        "How do you refresh a Pivot Table?",
        "What is a Calculated Field in Pivot Tables?",
      ],
      resources: [],
    },
    {
      id: "power-query",
      title: "Power Query",
      difficulty: "Intermediate",
      estimatedTime: "5–6 hours",
      description: "Transform and clean data using Power Query (Get & Transform). Connect to multiple data sources and automate data preparation.",
      notes: `**Key Operations:**
- Import data from CSV, Excel, SQL, Web
- Remove duplicates and errors
- Merge and Append queries
- Unpivot and Pivot columns
- Create custom columns with M language
- Group By for aggregations
- Automatic refresh

**ETL in Excel:**
- Extract: Connect to data source
- Transform: Clean, reshape data
- Load: Send to worksheet or data model`,
      example: `-- M Language example
let
  Source = Csv.Document(File.Contents("sales.csv")),
  Header = Table.PromoteHeaders(Source),
  Typed = Table.TransformColumnTypes(Header, {{"Date", type date}, {"Amount", type number}}),
  Filtered = Table.SelectRows(Typed, each [Amount] > 0)
in
  Filtered`,
      practiceQuestions: [
        "Connect to a CSV file and clean the data in Power Query.",
        "Merge two tables using a common key column.",
        "Unpivot monthly columns into rows.",
        "Group by product and sum the sales.",
        "Remove duplicates and handle null values.",
      ],
      interviewQuestions: [
        "What is Power Query used for?",
        "What is the difference between Merge and Append in Power Query?",
        "What is the M language?",
        "How do you schedule automatic data refresh?",
      ],
      resources: [],
    },
    {
      id: "data-cleaning-excel",
      title: "Data Cleaning in Excel",
      difficulty: "Intermediate",
      estimatedTime: "3–4 hours",
      description: "Clean messy data using Excel tools — handle duplicates, fill blanks, fix formats, standardize text, and validate data.",
      notes: `**Data Cleaning Checklist:**
1. Remove duplicates (Data → Remove Duplicates)
2. Handle blanks (Find & Select → Go To Special → Blanks)
3. Trim whitespace (TRIM function)
4. Fix date formats
5. Standardize text (UPPER/LOWER/PROPER)
6. Find & Replace
7. Text to Columns (split combined data)
8. Flash Fill for pattern-based filling
9. Data Validation to prevent bad entry`,
      example: `=TRIM(A2)         -- Remove extra spaces
=PROPER(A2)       -- Title Case
=TEXT(A2,"DD-MM-YYYY")  -- Format dates
=SUBSTITUTE(A2,"  "," ")  -- Replace double spaces`,
      practiceQuestions: [
        "Remove all duplicate rows from a dataset.",
        "Fill blank cells with the value above them.",
        "Split 'Full Name' column into First and Last Name.",
        "Standardize phone numbers to a consistent format.",
        "Identify and flag outliers in a salary column.",
      ],
      interviewQuestions: [
        "What are common data quality issues in Excel?",
        "How do you remove duplicates in Excel?",
        "What is Flash Fill?",
        "How do you validate data entry in Excel?",
      ],
      resources: [],
    },
    {
      id: "dashboard-design-excel",
      title: "Dashboard Design",
      difficulty: "Advanced",
      estimatedTime: "6–8 hours",
      description: "Build professional, interactive dashboards in Excel using charts, slicers, dynamic ranges, and design principles.",
      notes: `**Dashboard Design Principles:**
1. Clear, focused KPIs at the top
2. Consistent color scheme
3. Interactive slicers and dropdowns
4. Charts: Bar, Line, Donut, KPI cards
5. Named Ranges for dynamic references
6. Camera Tool for snapping live chart images
7. Hide gridlines and headers for clean look
8. Use blank spacer rows/columns

**Chart Types for Dashboards:**
- KPI Cards (large numbers in boxes)
- Bar/Column for comparisons
- Line for trends over time
- Donut/Pie for composition
- Heatmaps for matrix data`,
      example: `-- Dynamic chart title using formula:
="Sales Dashboard - " & TEXT(TODAY(),"MMM YYYY")

-- OFFSET for dynamic range
=OFFSET(Sheet1!$A$1, 0, 0, COUNTA(Sheet1!$A:$A), 1)`,
      practiceQuestions: [
        "Build a sales KPI dashboard with monthly trends.",
        "Add slicers to filter by region and product.",
        "Create a dynamic chart title that updates automatically.",
        "Design a HR analytics dashboard.",
        "Create a financial summary dashboard.",
      ],
      interviewQuestions: [
        "What makes a good data dashboard?",
        "How do you make an Excel dashboard interactive?",
        "What chart type would you use for trend analysis?",
        "How do you create dynamic ranges in Excel?",
      ],
      resources: [],
    },
  ],
};

export const pythonRoadmap: Roadmap = {
  id: "python",
  title: "Python for Data Analysis",
  icon: "Code2",
  color: "#8B5CF6",
  description: "Learn Python for data analysis from scratch — NumPy, Pandas, EDA, visualization, and statistics.",
  level: "Beginner to Pro",
  duration: "10–14 weeks",
  topics: [
    {
      id: "python-basics",
      title: "Python Basics",
      difficulty: "Beginner",
      estimatedTime: "8–10 hours",
      description: "Learn Python fundamentals: variables, data types, loops, functions, file I/O, and error handling.",
      notes: `**Data Types:**
- int, float, str, bool
- list [], tuple (), dict {}, set {}

**Key Concepts:**
- Variables and type conversion
- if/elif/else statements
- for and while loops
- Functions with def keyword
- List comprehensions
- f-strings for formatting
- try/except for error handling
- Reading/writing files`,
      example: `# Variables and types
name = "Alice"
age = 25
salary = 75000.50
is_active = True

# List comprehension
squares = [x**2 for x in range(10)]

# f-string
print(f"Hello, {name}! You are {age} years old.")

# Function
def calculate_bonus(salary, rate=0.1):
    return salary * rate

# Dictionary
employee = {"name": "Alice", "dept": "Analytics", "salary": 75000}
print(employee.get("dept", "Unknown"))

# File reading
with open("data.csv", "r") as f:
    content = f.read()`,
      practiceQuestions: [
        "Write a function to check if a number is prime.",
        "Flatten a nested list using list comprehension.",
        "Count word frequency in a sentence.",
        "Reverse a string without using slicing.",
        "Write a function to calculate compound interest.",
      ],
      interviewQuestions: [
        "What is the difference between list and tuple?",
        "What are Python decorators?",
        "Explain mutable vs immutable types in Python.",
        "What is the difference between deep copy and shallow copy?",
        "How does Python handle memory management?",
      ],
      resources: [],
    },
    {
      id: "numpy",
      title: "NumPy",
      difficulty: "Intermediate",
      estimatedTime: "5–6 hours",
      description: "Use NumPy for numerical computing — arrays, broadcasting, mathematical operations, and random number generation.",
      notes: `**Key Features:**
- ndarray: N-dimensional array
- Vectorized operations (much faster than loops)
- Broadcasting for operations on different shapes
- Mathematical functions: np.mean, np.std, np.sum
- Linear algebra, random number generation
- Array indexing and slicing`,
      example: `import numpy as np

# Create arrays
arr = np.array([1, 2, 3, 4, 5])
matrix = np.zeros((3, 4))
rng = np.random.default_rng(42)
rand_arr = rng.normal(0, 1, 1000)  # 1000 normal values

# Operations
print(arr.mean(), arr.std(), arr.sum())
print(arr * 2)  # vectorized — no loop needed

# Boolean indexing
high = arr[arr > 3]  # [4, 5]

# Statistics
print(np.percentile(rand_arr, [25, 50, 75]))`,
      practiceQuestions: [
        "Create a 5x5 identity matrix using NumPy.",
        "Generate 1000 random numbers and compute statistics.",
        "Normalize an array to 0-1 range.",
        "Find indices of values greater than mean.",
        "Compute dot product of two matrices.",
      ],
      interviewQuestions: [
        "What is broadcasting in NumPy?",
        "What is the difference between np.array and Python list?",
        "How does vectorization improve performance?",
        "What is the difference between reshape and resize?",
      ],
      resources: [],
    },
    {
      id: "pandas",
      title: "Pandas",
      difficulty: "Intermediate",
      estimatedTime: "10–12 hours",
      description: "Master Pandas DataFrames and Series for data manipulation, cleaning, merging, grouping, and analysis.",
      notes: `**Core Objects:**
- Series: 1D labeled array
- DataFrame: 2D labeled table

**Key Operations:**
- Read: pd.read_csv(), read_excel(), read_sql()
- Inspect: df.head(), df.info(), df.describe()
- Select: df['col'], df[['c1','c2']], df.loc[], df.iloc[]
- Filter: df[df['col'] > value]
- GroupBy: df.groupby('col').agg({'col2': 'sum'})
- Merge: pd.merge(df1, df2, on='key')
- Pivot: df.pivot_table()
- Apply: df['col'].apply(func)`,
      example: `import pandas as pd

df = pd.read_csv("sales.csv")
print(df.head(), df.info(), df.describe())

# Select and filter
high_sales = df[df['revenue'] > 100000]
it_dept = df.loc[df['department'] == 'IT', ['name', 'salary']]

# GroupBy
monthly = df.groupby('month')['revenue'].agg(['sum', 'mean', 'count'])

# Merge
merged = pd.merge(df_sales, df_products, on='product_id', how='left')

# Apply function
df['bonus'] = df['salary'].apply(lambda x: x * 0.15 if x > 50000 else x * 0.10)`,
      practiceQuestions: [
        "Load a CSV and display basic statistics.",
        "Filter rows where sales > 10000 and category = 'Electronics'.",
        "Group by city and calculate average salary.",
        "Merge two DataFrames on employee ID.",
        "Create a pivot table for monthly product revenue.",
      ],
      interviewQuestions: [
        "What is the difference between loc and iloc?",
        "How do you handle missing values in Pandas?",
        "What is the difference between merge and join?",
        "How does groupby work in Pandas?",
        "What is method chaining in Pandas?",
      ],
      resources: [],
    },
    {
      id: "data-cleaning-python",
      title: "Data Cleaning with Python",
      difficulty: "Intermediate",
      estimatedTime: "6–8 hours",
      description: "Handle missing values, outliers, duplicates, data type issues, and encoding using Pandas.",
      notes: `**Data Cleaning Pipeline:**
1. Check shape and data types: df.info()
2. Missing values: df.isnull().sum()
3. Duplicates: df.duplicated().sum()
4. Outliers: IQR method, z-scores
5. Inconsistent values: value_counts()
6. Data type conversion
7. String cleaning: str.strip(), str.lower()
8. Date parsing: pd.to_datetime()`,
      example: `# Missing values
df.isnull().sum()
df['salary'].fillna(df['salary'].median(), inplace=True)
df.dropna(subset=['email'], inplace=True)

# Duplicates
df.drop_duplicates(inplace=True)

# Outliers with IQR
Q1, Q3 = df['salary'].quantile(0.25), df['salary'].quantile(0.75)
IQR = Q3 - Q1
df = df[(df['salary'] >= Q1 - 1.5*IQR) & (df['salary'] <= Q3 + 1.5*IQR)]

# Type conversion
df['date'] = pd.to_datetime(df['date'])
df['salary'] = pd.to_numeric(df['salary'], errors='coerce')`,
      practiceQuestions: [
        "Find and fill missing values in a dataset.",
        "Remove duplicate rows from a customer dataset.",
        "Detect and remove outliers using IQR method.",
        "Standardize inconsistent city names.",
        "Convert string dates to datetime format.",
      ],
      interviewQuestions: [
        "What are common data quality issues?",
        "How do you handle missing values?",
        "What is the IQR method for outlier detection?",
        "How do you deal with categorical variables?",
      ],
      resources: [],
    },
    {
      id: "eda",
      title: "Exploratory Data Analysis (EDA)",
      difficulty: "Intermediate",
      estimatedTime: "6–8 hours",
      description: "Perform systematic EDA: understand distributions, correlations, outliers, and key patterns in data before modeling.",
      notes: `**EDA Framework:**
1. **Univariate Analysis**: Distribution of each variable
   - Histograms, box plots, value counts
2. **Bivariate Analysis**: Relationship between 2 variables
   - Scatter plots, correlation matrix, bar charts
3. **Multivariate Analysis**: Multiple variables
   - Pair plots, heatmaps
4. **Summary Statistics**: mean, median, std, quartiles
5. **Outlier Detection**: Box plots, IQR`,
      example: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Summary stats
print(df.describe())
print(df['salary'].skew(), df['salary'].kurtosis())

# Distribution
plt.figure(figsize=(10,6))
df['salary'].hist(bins=30)
plt.title('Salary Distribution')

# Correlation heatmap
plt.figure(figsize=(12,8))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')

# Box plot for outliers
df.boxplot(column='salary', by='department')`,
      practiceQuestions: [
        "Perform complete EDA on a sales dataset.",
        "Find correlations between variables in a dataset.",
        "Identify the top 5 factors affecting customer churn.",
        "Create a pair plot for a dataset with 5 numerical features.",
        "Summarize key insights from Netflix dataset.",
      ],
      interviewQuestions: [
        "What is EDA and why is it important?",
        "What is correlation? How do you interpret a correlation matrix?",
        "What is skewness and kurtosis?",
        "How do you handle skewed distributions?",
        "What visualizations do you use for EDA?",
      ],
      resources: [],
    },
    {
      id: "visualization",
      title: "Data Visualization",
      difficulty: "Intermediate",
      estimatedTime: "6–8 hours",
      description: "Create compelling charts and visualizations using Matplotlib and Seaborn for data storytelling.",
      notes: `**Libraries:**
- **Matplotlib**: Low-level, highly customizable
- **Seaborn**: High-level, beautiful statistical plots
- **Plotly**: Interactive visualizations

**Chart Selection Guide:**
- Bar: Compare categories
- Line: Trends over time
- Scatter: Relationships
- Histogram: Distribution
- Box: Outliers and quartiles
- Heatmap: Correlations / matrix data
- Pie/Donut: Composition (use sparingly)`,
      example: `import matplotlib.pyplot as plt
import seaborn as sns

# Bar chart
plt.figure(figsize=(10,6))
df.groupby('department')['salary'].mean().plot(kind='bar', color='steelblue')
plt.title('Average Salary by Department')
plt.tight_layout()

# Seaborn scatter with regression
sns.regplot(data=df, x='experience', y='salary')

# Seaborn violin plot
sns.violinplot(data=df, x='department', y='salary', palette='husl')

# Interactive with Plotly
import plotly.express as px
fig = px.scatter(df, x='sales', y='profit', color='category', hover_data=['product'])
fig.show()`,
      practiceQuestions: [
        "Create a bar chart of top 10 products by revenue.",
        "Plot monthly sales trend as a line chart.",
        "Create a scatter plot with regression line.",
        "Build an interactive plotly dashboard for a sales dataset.",
        "Create a correlation heatmap for numerical features.",
      ],
      interviewQuestions: [
        "What is the difference between Matplotlib and Seaborn?",
        "When would you use a box plot vs histogram?",
        "What is data storytelling?",
        "How do you choose the right chart type?",
        "What is Plotly? How does it differ from Matplotlib?",
      ],
      resources: [],
    },
  ],
};

export const powerBIRoadmap: Roadmap = {
  id: "powerbi",
  title: "Power BI Roadmap",
  icon: "TrendingUp",
  color: "#F59E0B",
  description: "Build professional BI dashboards and reports using Power BI Desktop, DAX, and Power Query.",
  level: "Beginner to Expert",
  duration: "6–8 weeks",
  topics: [
    {
      id: "powerbi-basics",
      title: "Power BI Basics",
      difficulty: "Beginner",
      estimatedTime: "4–5 hours",
      description: "Get started with Power BI Desktop — import data, navigate the interface, and create your first report.",
      notes: `**Power BI Ecosystem:**
- Power BI Desktop (free): Create reports
- Power BI Service (cloud): Publish & share
- Power BI Mobile: View on phone

**Three Views:**
1. Report View: Design visualizations
2. Data View: See your data tables
3. Model View: Manage relationships

**Import Data From:**
- Excel, CSV, SQL databases
- SharePoint, Azure, APIs
- PDF, Web pages`,
      example: `// Basic Power BI workflow:
1. Get Data → Connect to data source
2. Transform in Power Query → Clean data
3. Close & Apply → Load to model
4. Create relationships in Model View
5. Add visualizations in Report View
6. Publish to Power BI Service`,
      practiceQuestions: [
        "Connect Power BI to an Excel file.",
        "Create your first bar chart visualization.",
        "Add a slicer for date filtering.",
        "Create a KPI card showing total revenue.",
        "Add a table visual with conditional formatting.",
      ],
      interviewQuestions: [
        "What is the difference between Power BI Desktop and Service?",
        "What are the three views in Power BI Desktop?",
        "What data sources can Power BI connect to?",
        "What is DirectQuery vs Import mode?",
      ],
      resources: [],
    },
    {
      id: "data-modeling",
      title: "Data Modeling",
      difficulty: "Intermediate",
      estimatedTime: "5–6 hours",
      description: "Design star schema data models, manage relationships, and understand cardinality in Power BI.",
      notes: `**Star Schema:**
- Fact Table: Contains metrics/measures (sales, orders)
- Dimension Tables: Contain descriptive attributes (product, date, customer)

**Relationship Types:**
- One-to-Many (most common) — 1:M
- Many-to-Many (use bridge tables)
- One-to-One (rare)

**Cross Filter Direction:**
- Single (default): Filter flows one way
- Both: Can slow performance

**Best Practices:**
- Always use star schema over flat tables
- Create a Date dimension table
- Avoid circular relationships`,
      example: `// Star Schema Example:
Fact_Sales (fact table):
- date_id → Date table
- product_id → Product table
- customer_id → Customer table
- sales_amount, quantity, discount

Date table (dimension):
- date_id (PK), date, day, month, quarter, year, weekday`,
      practiceQuestions: [
        "Build a star schema from a flat dataset.",
        "Create a Date dimension table.",
        "Set up one-to-many relationships.",
        "Identify active vs inactive relationships.",
        "Explain when to use many-to-many relationships.",
      ],
      interviewQuestions: [
        "What is a star schema vs snowflake schema?",
        "What is cardinality in Power BI?",
        "What is cross-filter direction?",
        "Why is a separate Date table important?",
        "What are active and inactive relationships?",
      ],
      resources: [],
    },
    {
      id: "dax",
      title: "DAX (Data Analysis Expressions)",
      difficulty: "Advanced",
      estimatedTime: "8–10 hours",
      description: "Write DAX formulas for calculated columns, measures, and tables. Master CALCULATE, FILTER, time intelligence, and iterators.",
      notes: `**Measures vs Calculated Columns:**
- **Measure**: Calculated at query time (dynamic)
- **Calculated Column**: Calculated row by row on load (static)

**Key Functions:**
- \`CALCULATE(expression, filter1, filter2)\` — modify filter context
- \`FILTER(table, condition)\` — return filtered table
- \`ALL(table/column)\` — remove all filters
- \`RELATED(column)\` — lookup from related table
- \`SUMX(table, expression)\` — iterator
- \`DIVIDE(numerator, denominator, alternate)\`

**Time Intelligence:**
- TOTALYTD(), TOTALQTD(), TOTALMTD()
- DATEADD(), SAMEPERIODLASTYEAR()`,
      example: `// Basic Measure
Total Sales = SUM(Fact_Sales[sales_amount])

// CALCULATE with filter
Sales IT = CALCULATE([Total Sales], Product[category] = "IT")

// YoY Growth
Sales LY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Date[Date]))
YoY Growth % = DIVIDE([Total Sales] - [Sales LY], [Sales LY], 0)

// Running Total
Running Total = CALCULATE([Total Sales], FILTER(ALL(Date[Date]), Date[Date] <= MAX(Date[Date])))

// Dynamic ABC Ranking
Product Rank = RANKX(ALL(Product[product_name]), [Total Sales])`,
      practiceQuestions: [
        "Create a measure for total revenue.",
        "Calculate YoY growth using SAMEPERIODLASTYEAR.",
        "Create a running total measure.",
        "Build a market share % measure.",
        "Create a dynamic top N filter using RANKX.",
      ],
      interviewQuestions: [
        "What is the difference between measure and calculated column?",
        "What is CALCULATE? Why is it important?",
        "What is filter context vs row context?",
        "What is ALL() used for?",
        "What are iterator functions? Give examples.",
        "What is the difference between SUMX and SUM?",
      ],
      resources: [],
    },
    {
      id: "powerbi-visualization",
      title: "Visualizations & Reports",
      difficulty: "Intermediate",
      estimatedTime: "5–6 hours",
      description: "Create professional, interactive reports with various chart types, conditional formatting, bookmarks, and drill-throughs.",
      notes: `**Chart Types:**
- Bar/Column: Category comparisons
- Line: Trends over time
- Card/KPI: Key metrics
- Matrix: Cross-tabulation (like Pivot)
- Scatter: Correlation
- Map: Geographic data
- Decomposition Tree: Root cause analysis
- Q&A Visual: Natural language queries

**Advanced Features:**
- Conditional formatting
- Drill-through pages
- Bookmarks for navigation
- Page tooltips
- Custom themes`,
      example: `// Conditional Formatting:
- Color by measure: Red/Yellow/Green
- Data bars in table columns
- Icon sets

// Bookmarks:
- Create states with filtered views
- Button → Bookmark Action → Navigate`,
      practiceQuestions: [
        "Create a sales report with KPI cards, bar chart, and line chart.",
        "Add drill-through from summary to detail page.",
        "Apply conditional formatting to a matrix.",
        "Create navigation buttons using bookmarks.",
        "Build a map visualization with sales by city.",
      ],
      interviewQuestions: [
        "What is the difference between a matrix and a table?",
        "What are bookmarks used for?",
        "How do you implement drill-through in Power BI?",
        "What is a tooltip page?",
        "How do you apply custom themes?",
      ],
      resources: [],
    },
    {
      id: "powerbi-deployment",
      title: "Dashboard Deployment",
      difficulty: "Intermediate",
      estimatedTime: "3–4 hours",
      description: "Publish reports to Power BI Service, manage workspaces, set up data refresh, and share dashboards.",
      notes: `**Publishing Workflow:**
1. File → Publish → Select Workspace
2. Set up Data Gateway (for on-premise data)
3. Configure Scheduled Refresh
4. Pin visuals to Dashboard
5. Share report/dashboard with users

**Security:**
- Row-Level Security (RLS)
- Workspace roles: Admin, Member, Contributor, Viewer

**Sharing Options:**
- Direct share (Power BI Pro needed)
- Publish to Web (public)
- Embed in Teams/SharePoint`,
      example: `// RLS Setup:
Table Filter (DimEmployee):
= [Region] = USERNAME()

// OR using USERPRINCIPALNAME()
= [Email] = USERPRINCIPALNAME()`,
      practiceQuestions: [
        "Publish a report to Power BI Service.",
        "Set up Row-Level Security for region-based access.",
        "Configure scheduled refresh for a dataset.",
        "Embed a report in a SharePoint page.",
        "Create a dashboard by pinning visuals.",
      ],
      interviewQuestions: [
        "What is the difference between a report and a dashboard in Power BI?",
        "What is Row-Level Security?",
        "What is a Data Gateway?",
        "What are the workspace roles in Power BI?",
        "How do you schedule data refresh?",
      ],
      resources: [],
    },
  ],
};

export const statisticsRoadmap: Roadmap = {
  id: "statistics",
  title: "Statistics Roadmap",
  icon: "BarChart3",
  color: "#2563EB",
  description: "Master the fundamental concepts of statistics and probability essential for every data analyst.",
  level: "Beginner to Advanced",
  duration: "4–6 weeks",
  topics: [
    {
      id: "descriptive-statistics",
      title: "Descriptive Statistics",
      difficulty: "Beginner",
      estimatedTime: "4–5 hours",
      description: "Learn how to summarize and describe the main features of a dataset using measures of central tendency and dispersion.",
      notes: `**Measures of Central Tendency:**\n- Mean: Average value\n- Median: Middle value\n- Mode: Most frequent value\n\n**Measures of Dispersion:**\n- Variance: Spread of data\n- Standard Deviation: Square root of variance\n- Range & IQR (Interquartile Range)`,
      example: `Example: Analyzing salary data to find the median salary (to avoid skewness from high earners) and IQR (to find the middle 50% spread).`,
      practiceQuestions: ["Calculate the mean, median, and mode for [1, 2, 2, 3, 4, 100].", "Why is the median often preferred over the mean for income data?"],
      interviewQuestions: ["What is standard deviation?", "Explain the difference between variance and standard deviation.", "How do outliers affect the mean and median?"],
      resources: [],
    },
    {
      id: "probability",
      title: "Probability Basics",
      difficulty: "Beginner",
      estimatedTime: "4–5 hours",
      description: "Understand basic probability theory, independent and dependent events, and Bayes' Theorem.",
      notes: `**Key Concepts:**\n- Probability of an event P(A)\n- Conditional Probability P(A|B)\n- Bayes' Theorem: P(A|B) = [P(B|A) * P(A)] / P(B)\n- Independent vs Mutually Exclusive events`,
      example: `Using Bayes' Theorem to find the probability of a user churning given that they haven't logged in for 30 days.`,
      practiceQuestions: ["What is the probability of rolling an even number on a 6-sided die?", "Explain conditional probability."],
      interviewQuestions: ["Explain Bayes' Theorem simply.", "What are mutually exclusive events?"],
      resources: [],
    },
    {
      id: "distributions",
      title: "Probability Distributions",
      difficulty: "Intermediate",
      estimatedTime: "5–6 hours",
      description: "Learn about normal distribution, binomial distribution, Poisson distribution, and the Central Limit Theorem.",
      notes: `**Distributions:**\n- Normal (Gaussian) Distribution: Bell curve\n- Binomial Distribution: Success/Failure outcomes\n- Poisson Distribution: Count of events over time\n\n**Central Limit Theorem (CLT):**\nThe sampling distribution of the mean approaches a normal distribution as the sample size gets larger, regardless of the population distribution.`,
      example: `Applying the Poisson distribution to model the number of customer support tickets received per hour.`,
      practiceQuestions: ["What are the properties of a normal distribution?", "When would you use a binomial distribution?"],
      interviewQuestions: ["Explain the Central Limit Theorem to a non-technical person.", "What is the 68-95-99.7 rule?", "What is skewness?"],
      resources: [],
    },
    {
      id: "hypothesis-testing",
      title: "Hypothesis Testing",
      difficulty: "Advanced",
      estimatedTime: "6–8 hours",
      description: "Learn how to make inferences about a population from a sample using A/B testing, p-values, and confidence intervals.",
      notes: `**Concepts:**\n- Null Hypothesis (H0) vs Alternative Hypothesis (H1)\n- Type I Error (False Positive) & Type II Error (False Negative)\n- P-value: Probability of observing the data given H0 is true.\n- Confidence Intervals\n- T-Tests, Z-Tests, Chi-Square, ANOVA`,
      example: `Running an A/B test on a website to see if a blue button (Variant B) converts better than a red button (Variant A), and calculating the p-value.`,
      practiceQuestions: ["Formulate a null and alternative hypothesis for a new drug test.", "Interpret a p-value of 0.03."],
      interviewQuestions: ["What is a p-value?", "Explain Type I vs Type II errors.", "How do you design an A/B test?", "What is statistical significance?"],
      resources: [],
    }
  ],
};

export const roadmaps: Record<string, Roadmap> = {
  sql: sqlRoadmap,
  excel: excelRoadmap,
  python: pythonRoadmap,
  powerbi: powerBIRoadmap,
  statistics: statisticsRoadmap,
};
