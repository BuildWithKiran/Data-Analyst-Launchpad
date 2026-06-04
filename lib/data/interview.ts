export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags: string[];
}

export const sqlQuestions: InterviewQuestion[] = [
  {
    id: 'sql-1',
    question: 'What is the difference between WHERE and HAVING clauses in SQL?',
    answer:
      'The WHERE clause filters rows before any grouping or aggregation occurs, meaning it operates on individual rows. The HAVING clause filters groups after the GROUP BY clause has been applied, so it can use aggregate functions like COUNT(), SUM(), and AVG(). For example, WHERE salary > 50000 filters individual employee rows, while HAVING AVG(salary) > 50000 filters department groups. You cannot use aggregate functions in a WHERE clause — that will cause a SQL error. A practical rule: use WHERE for row-level conditions and HAVING for group-level conditions.',
    difficulty: 'Easy',
    category: 'sql',
    tags: ['WHERE', 'HAVING', 'GROUP BY', 'aggregation'],
  },
  {
    id: 'sql-2',
    question: 'Explain the different types of JOINs in SQL with examples.',
    answer:
      'INNER JOIN returns only the rows that have matching values in both tables. LEFT JOIN (or LEFT OUTER JOIN) returns all rows from the left table plus matched rows from the right table — unmatched right-side columns appear as NULL. RIGHT JOIN is the mirror of LEFT JOIN. FULL OUTER JOIN returns all rows from both tables, filling NULLs where there is no match. CROSS JOIN returns the Cartesian product of both tables (every combination). SELF JOIN joins a table to itself, useful for hierarchical data like employees and managers. Choosing the correct JOIN type is critical for data accuracy in analytics.',
    difficulty: 'Easy',
    category: 'sql',
    tags: ['JOIN', 'INNER JOIN', 'LEFT JOIN', 'OUTER JOIN'],
  },
  {
    id: 'sql-3',
    question: 'What are Window Functions in SQL and when would you use them?',
    answer:
      'Window functions perform calculations across a set of rows related to the current row without collapsing them into a single output row like GROUP BY does. Common window functions include ROW_NUMBER(), RANK(), DENSE_RANK(), LEAD(), LAG(), SUM() OVER(), and AVG() OVER(). They use the OVER() clause to define the window of rows — you can partition by a column and order within the partition. For example, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) assigns a rank within each department. They are extremely useful for running totals, moving averages, percentile ranks, and year-over-year comparisons.',
    difficulty: 'Medium',
    category: 'sql',
    tags: ['window functions', 'OVER', 'RANK', 'ROW_NUMBER', 'LAG', 'LEAD'],
  },
  {
    id: 'sql-4',
    question: 'What is a CTE (Common Table Expression) and how does it differ from a subquery?',
    answer:
      'A CTE is a named temporary result set defined using the WITH clause that exists only for the duration of the query. It improves readability by breaking complex queries into logical, named parts. Unlike a subquery embedded inline, a CTE can be referenced multiple times in the same query, which avoids redundant computation. CTEs also support recursion (recursive CTEs) for hierarchical data traversal, such as org charts or bill-of-materials. Subqueries are often harder to read and debug when deeply nested, whereas CTEs make the logic modular and easier to maintain. In most databases, both are logically equivalent for non-recursive cases.',
    difficulty: 'Medium',
    category: 'sql',
    tags: ['CTE', 'WITH', 'subquery', 'recursion'],
  },
  {
    id: 'sql-5',
    question: 'How do you handle NULL values in SQL? What functions are available?',
    answer:
      'NULL represents the absence of a value and behaves differently from zero or an empty string — any arithmetic with NULL returns NULL. To handle NULLs, SQL provides several functions: COALESCE(a, b, c) returns the first non-NULL value from its arguments; NULLIF(a, b) returns NULL if a equals b, useful to avoid division-by-zero; ISNULL() (SQL Server) or IFNULL() (MySQL) replace NULL with a specified value. The IS NULL and IS NOT NULL operators are used in WHERE clauses because NULL = NULL evaluates to unknown (not true). When aggregating, most functions like SUM() and AVG() automatically ignore NULL values, which is an important behavior to be aware of when interpreting results.',
    difficulty: 'Easy',
    category: 'sql',
    tags: ['NULL', 'COALESCE', 'NULLIF', 'IS NULL'],
  },
  {
    id: 'sql-6',
    question: 'What is the difference between RANK(), DENSE_RANK(), and ROW_NUMBER()?',
    answer:
      'All three are window functions that assign numbers to rows, but they differ in how they handle ties. ROW_NUMBER() assigns a unique sequential integer to every row regardless of ties — even identical values get different numbers. RANK() gives the same number to tied rows but then skips subsequent numbers (e.g., 1, 2, 2, 4 — skipping 3). DENSE_RANK() also gives the same number to ties but does NOT skip numbers (e.g., 1, 2, 2, 3). Choose ROW_NUMBER() when you need a strict unique ordering, RANK() when you want gaps reflecting the number of higher-ranked rows, and DENSE_RANK() when you want consecutive ranking without gaps.',
    difficulty: 'Medium',
    category: 'sql',
    tags: ['RANK', 'DENSE_RANK', 'ROW_NUMBER', 'window functions', 'ties'],
  },
  {
    id: 'sql-7',
    question: 'What are database indexes and how do they improve query performance?',
    answer:
      'An index is a data structure (typically a B-tree) that allows the database engine to find rows quickly without scanning the entire table. Without an index, a query performs a full table scan, which is O(n) — slow for large tables. With an index on the searched column, the engine can jump directly to the relevant rows in O(log n) time. However, indexes come with trade-offs: they consume disk space and slow down INSERT, UPDATE, and DELETE operations because the index must be updated. Composite indexes (on multiple columns) can cover more query patterns. Covering indexes store all the columns needed by a query, avoiding table lookups entirely.',
    difficulty: 'Medium',
    category: 'sql',
    tags: ['index', 'B-tree', 'performance', 'optimization'],
  },
  {
    id: 'sql-8',
    question: 'Write a SQL query to find the second-highest salary from an Employees table.',
    answer:
      'There are multiple approaches. Using a subquery: SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees). Using DENSE_RANK(): WITH ranked AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk FROM employees) SELECT salary FROM ranked WHERE rnk = 2. Using LIMIT/OFFSET (MySQL): SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1. The DENSE_RANK approach is most robust because it correctly handles ties and works across most SQL dialects. Always use DISTINCT to avoid duplicate salary values corrupting the ranking.',
    difficulty: 'Medium',
    category: 'sql',
    tags: ['salary', 'subquery', 'DENSE_RANK', 'practice'],
  },
  {
    id: 'sql-9',
    question: 'What is the difference between UNION and UNION ALL?',
    answer:
      'UNION combines the result sets of two SELECT statements and removes duplicate rows using an implicit DISTINCT operation. UNION ALL combines result sets and keeps ALL rows including duplicates. Because UNION performs deduplication, it is slower — it requires an additional sort or hash operation to identify duplicates. UNION ALL is faster and preferred when you know the data sets do not overlap or when duplicates are acceptable. Both require the SELECT statements to have the same number of columns with compatible data types. Use UNION when data integrity matters (e.g., merging two tables that may share rows) and UNION ALL when performance is priority.',
    difficulty: 'Easy',
    category: 'sql',
    tags: ['UNION', 'UNION ALL', 'duplicates', 'set operations'],
  },
  {
    id: 'sql-10',
    question: 'Explain GROUP BY and write a query to find total sales per region per month.',
    answer:
      'GROUP BY collapses multiple rows sharing the same values in the specified columns into a single summary row, allowing aggregate functions to compute metrics per group. Every column in SELECT that is not an aggregate must appear in GROUP BY. Example query: SELECT region, DATE_TRUNC(\'month\', order_date) AS sale_month, SUM(amount) AS total_sales, COUNT(*) AS order_count FROM sales GROUP BY region, DATE_TRUNC(\'month\', order_date) ORDER BY region, sale_month. This query partitions data first by region, then by month, and computes the sum of amount for each combination. Adding ORDER BY makes the result readable; HAVING can be added to filter only groups with total_sales above a threshold.',
    difficulty: 'Easy',
    category: 'sql',
    tags: ['GROUP BY', 'aggregation', 'SUM', 'sales analysis'],
  },
  {
    id: 'sql-11',
    question: 'What is a correlated subquery and how does it differ from a regular subquery?',
    answer:
      'A regular (non-correlated) subquery is executed once independently and its result is passed to the outer query — it does not reference the outer query. A correlated subquery references columns from the outer query, causing it to execute once for every row processed by the outer query. For example: SELECT e.name, e.salary FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id). This correlated subquery computes the average salary for the same department as the current outer row. Correlated subqueries are often less performant than JOINs or CTEs because they execute repeatedly, so they should be rewritten using JOINs when performance is critical.',
    difficulty: 'Hard',
    category: 'sql',
    tags: ['correlated subquery', 'subquery', 'performance'],
  },
  {
    id: 'sql-12',
    question: 'What is normalization and what are the first three normal forms?',
    answer:
      '1NF (First Normal Form): Each column must hold atomic (indivisible) values, no repeating groups, and each row must be uniquely identifiable. 2NF (Second Normal Form): Must be in 1NF and every non-key attribute must be fully functionally dependent on the entire primary key — no partial dependencies (relevant for composite keys). 3NF (Third Normal Form): Must be in 2NF and no transitive dependencies — non-key attributes must depend only on the primary key, not on other non-key attributes. Normalization reduces data redundancy and prevents update anomalies. However, for analytical/OLAP workloads, denormalization is often preferred because fewer JOINs improve read performance.',
    difficulty: 'Medium',
    category: 'sql',
    tags: ['normalization', '1NF', '2NF', '3NF', 'database design'],
  },
  {
    id: 'sql-13',
    question: 'How do you write a recursive CTE? Give an example for an org chart.',
    answer:
      'A recursive CTE has two parts joined by UNION ALL: an anchor member (base case) and a recursive member that references the CTE itself. Example for an org hierarchy: WITH RECURSIVE org_chart AS (SELECT employee_id, name, manager_id, 1 AS level FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.employee_id, e.name, e.manager_id, oc.level + 1 FROM employees e JOIN org_chart oc ON e.manager_id = oc.employee_id) SELECT * FROM org_chart ORDER BY level, name. The anchor starts with the CEO (no manager), and the recursive part joins each employee to their manager row, incrementing the level. Always include a termination condition to prevent infinite loops.',
    difficulty: 'Hard',
    category: 'sql',
    tags: ['recursive CTE', 'hierarchy', 'org chart', 'WITH RECURSIVE'],
  },
  {
    id: 'sql-14',
    question: 'What is the difference between DELETE, TRUNCATE, and DROP?',
    answer:
      'DELETE removes specific rows based on a WHERE condition and is a DML (Data Manipulation Language) statement — it can be rolled back within a transaction and fires triggers. Without a WHERE clause, DELETE removes all rows but is slow because it logs each row deletion. TRUNCATE removes all rows from a table instantly by deallocating data pages — it is a DDL statement (in most databases), cannot be used with WHERE, and typically cannot be rolled back. It resets identity/auto-increment counters. DROP completely removes the table definition, data, indexes, and constraints from the database. In short: DELETE for selective removal, TRUNCATE for fast full-table clear, DROP when you want to eliminate the table entirely.',
    difficulty: 'Easy',
    category: 'sql',
    tags: ['DELETE', 'TRUNCATE', 'DROP', 'DDL', 'DML'],
  },
  {
    id: 'sql-15',
    question: 'Explain the LAG and LEAD window functions with a business use case.',
    answer:
      'LAG(column, n) accesses a value from n rows before the current row in the window, while LEAD(column, n) accesses a value from n rows ahead. Both are ideal for period-over-period comparisons without self-joins. Business use case — month-over-month sales growth: SELECT month, total_sales, LAG(total_sales, 1) OVER (ORDER BY month) AS prev_month_sales, ROUND((total_sales - LAG(total_sales, 1) OVER (ORDER BY month)) / LAG(total_sales, 1) OVER (ORDER BY month) * 100, 2) AS growth_pct FROM monthly_sales. This computes the percentage change in sales compared to the prior month elegantly. LAG and LEAD accept an optional third argument for the default value when the offset goes out of bounds.',
    difficulty: 'Medium',
    category: 'sql',
    tags: ['LAG', 'LEAD', 'window functions', 'period-over-period'],
  },
  {
    id: 'sql-16',
    question: 'What is a stored procedure and how does it differ from a function in SQL?',
    answer:
      'A stored procedure is a precompiled collection of SQL statements stored in the database that can be executed with EXEC or CALL. Stored procedures can perform DML/DDL operations, accept input/output parameters, and do not have to return a value. A function (UDF — User Defined Function) must return a value (scalar or table) and can be used inline in SELECT, WHERE, or JOIN clauses. Functions are typically restricted from performing side effects like modifying data (though table-valued functions in some DBs can). Stored procedures are better for complex business logic with multiple operations, while functions are better for reusable computations within queries. Functions support recursion more cleanly in many databases.',
    difficulty: 'Medium',
    category: 'sql',
    tags: ['stored procedure', 'function', 'UDF', 'database objects'],
  },
  {
    id: 'sql-17',
    question: 'How do you find and remove duplicate rows from a table?',
    answer:
      'To identify duplicates: SELECT name, email, COUNT(*) FROM customers GROUP BY name, email HAVING COUNT(*) > 1. To delete duplicates while keeping one row (using ROW_NUMBER): WITH cte AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY name, email ORDER BY id) AS rn FROM customers) DELETE FROM cte WHERE rn > 1. This keeps the row with the lowest id (first inserted) and deletes subsequent duplicates. Always back up data before deletion. Alternatively, create a new table with SELECT DISTINCT, verify it, then swap. Adding a UNIQUE constraint after cleanup prevents future duplicates from being inserted.',
    difficulty: 'Medium',
    category: 'sql',
    tags: ['duplicates', 'ROW_NUMBER', 'deduplication', 'data cleaning'],
  },
  {
    id: 'sql-18',
    question: 'What is a self-join and when would you use it?',
    answer:
      'A self-join joins a table to itself by using two different aliases for the same table. It is used when rows in a table have a relationship to other rows in the same table. The most common example is an employees table where each employee row has a manager_id that references another employee\'s id: SELECT e.name AS employee, m.name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id. This retrieves each employee alongside their manager\'s name. Other use cases include finding duplicate pairs, comparing a row to adjacent rows (e.g., detect consecutive dates), and building genealogy trees. Self-joins can be less readable than recursive CTEs for deep hierarchies.',
    difficulty: 'Medium',
    category: 'sql',
    tags: ['self-join', 'hierarchy', 'employees', 'manager'],
  },
  {
    id: 'sql-19',
    question: 'What is the execution order of SQL clauses?',
    answer:
      'SQL clauses are executed in a specific logical order, which differs from how you write them. The order is: FROM (identify and join tables) → WHERE (filter rows) → GROUP BY (group rows) → HAVING (filter groups) → SELECT (compute expressions and select columns) → DISTINCT (remove duplicates) → ORDER BY (sort results) → LIMIT/TOP (restrict rows). This order explains why you cannot use a SELECT alias in a WHERE clause (WHERE executes before SELECT). You CAN use a SELECT alias in ORDER BY because it executes after SELECT. Understanding this order is essential for debugging unexpected query behavior and knowing where each type of filtering belongs.',
    difficulty: 'Easy',
    category: 'sql',
    tags: ['execution order', 'clauses', 'SQL basics'],
  },
  {
    id: 'sql-20',
    question: 'Explain ACID properties in databases.',
    answer:
      'ACID stands for Atomicity, Consistency, Isolation, and Durability — the four properties that guarantee reliable database transactions. Atomicity means a transaction is all-or-nothing: either all operations succeed or none are committed (rolled back on failure). Consistency ensures that a transaction brings the database from one valid state to another, respecting all rules, constraints, and cascades. Isolation means concurrent transactions execute as if they were serial — one transaction cannot see intermediate dirty states of another (controlled by isolation levels: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE). Durability guarantees that once a transaction is committed, it persists even in the event of a system crash, typically enforced via write-ahead logs.',
    difficulty: 'Medium',
    category: 'sql',
    tags: ['ACID', 'transactions', 'atomicity', 'consistency', 'isolation'],
  },
  {
    id: 'sql-21',
    question: 'How would you calculate a 7-day rolling average of daily sales in SQL?',
    answer:
      'A rolling average is computed using a window function with a ROWS BETWEEN frame specification. Query: SELECT sale_date, daily_sales, AVG(daily_sales) OVER (ORDER BY sale_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS rolling_7day_avg FROM daily_sales. The frame ROWS BETWEEN 6 PRECEDING AND CURRENT ROW tells the engine to include the current row plus 6 prior rows (7 total) in the average. For the first 6 rows, the window will be smaller (it averages whatever is available). To get a strict 7-day average only when 7 rows exist, add a WHERE or use CASE logic checking ROW_NUMBER() >= 7. Rolling averages are widely used in financial and operational dashboards.',
    difficulty: 'Hard',
    category: 'sql',
    tags: ['rolling average', 'window functions', 'ROWS BETWEEN', 'time series'],
  },
  {
    id: 'sql-22',
    question: 'What is the difference between a primary key and a unique key?',
    answer:
      'A primary key uniquely identifies each row in a table and has two strict rules: it cannot be NULL and must be unique. Each table can have only one primary key (though it can be composite). A unique key also enforces uniqueness across columns but allows NULL values (in most databases, each NULL is considered distinct so multiple NULLs are permitted). A table can have multiple unique keys. Primary keys are automatically indexed and are used as the target for foreign key references. Unique keys are great for enforcing business-level uniqueness (e.g., email address) without making a column the primary identifier. Both constraints prevent duplicate data entry.',
    difficulty: 'Easy',
    category: 'sql',
    tags: ['primary key', 'unique key', 'constraints', 'NULL'],
  },
  {
    id: 'sql-23',
    question: 'Write a SQL query to find customers who placed orders in every month of 2024.',
    answer:
      'This requires finding customers whose distinct order months count equals 12. Query: SELECT customer_id FROM orders WHERE YEAR(order_date) = 2024 GROUP BY customer_id HAVING COUNT(DISTINCT MONTH(order_date)) = 12. This groups orders by customer and keeps only those who have orders in all 12 distinct months. To make it more robust and verify no months were missed: WITH months AS (SELECT DISTINCT MONTH(order_date) AS m FROM orders WHERE YEAR(order_date) = 2024), customer_months AS (SELECT customer_id, MONTH(order_date) AS m FROM orders WHERE YEAR(order_date) = 2024) SELECT customer_id FROM customer_months GROUP BY customer_id HAVING COUNT(DISTINCT m) = (SELECT COUNT(*) FROM months). This is a classic relational division pattern.',
    difficulty: 'Hard',
    category: 'sql',
    tags: ['relational division', 'HAVING', 'COUNT DISTINCT', 'monthly orders'],
  },
  {
    id: 'sql-24',
    question: 'What is a foreign key and how does it enforce referential integrity?',
    answer:
      'A foreign key is a column (or set of columns) in one table that references the primary key of another table, establishing a parent-child relationship. Referential integrity means the database enforces that a foreign key value must either exist in the parent table or be NULL — you cannot insert an orphan child row. When configured, cascading actions control what happens when a parent row is updated or deleted: CASCADE propagates the change to child rows, SET NULL sets the foreign key to NULL, RESTRICT/NO ACTION prevents the operation if children exist. Foreign keys are fundamental to normalized relational schemas and prevent data inconsistencies, though some high-performance systems disable them for bulk load speed.',
    difficulty: 'Easy',
    category: 'sql',
    tags: ['foreign key', 'referential integrity', 'CASCADE', 'constraints'],
  },
  {
    id: 'sql-25',
    question: 'How do you optimize a slow SQL query? Walk through your approach.',
    answer:
      'Start by running EXPLAIN (or EXPLAIN ANALYZE in PostgreSQL) to see the query execution plan — look for full table scans, missing indexes, and high-cost operations. Check if appropriate indexes exist on JOIN columns, WHERE filter columns, and ORDER BY columns; add composite indexes when multiple columns are used together. Rewrite correlated subqueries as JOINs or CTEs to allow the optimizer to process them more efficiently. Avoid SELECT * — retrieve only needed columns to reduce I/O. Replace functions on indexed columns in WHERE (e.g., WHERE YEAR(date) = 2024) with range conditions (WHERE date BETWEEN \'2024-01-01\' AND \'2024-12-31\') so indexes can be used. Consider partitioning large tables by date or region, use query result caching, and evaluate whether a materialized view would help for frequently run aggregations.',
    difficulty: 'Hard',
    category: 'sql',
    tags: ['optimization', 'EXPLAIN', 'indexes', 'performance tuning'],
  },
  {
    id: 'sql-26',
    question: 'What is a clustered vs non-clustered index?',
    answer: 'A clustered index determines the physical order of data in a table. Because data can only be sorted in one way, there can be only one clustered index per table (usually the primary key). A non-clustered index is a separate structure from the data rows, containing the indexed columns and a pointer (row locator) to the actual data row. A table can have multiple non-clustered indexes. Think of a clustered index as the phone book itself (sorted by name), and a non-clustered index as the index at the back of a textbook.',
    difficulty: 'Medium',
    category: 'sql',
    tags: ['index', 'clustered', 'performance'],
  },
  {
    id: 'sql-27',
    question: 'How do you prevent SQL Injection?',
    answer: 'SQL injection is prevented by using parameterized queries (prepared statements) instead of directly concatenating user input into SQL strings. Parameterization ensures that the database driver treats input strictly as data, never as executable code. ORMs automatically use parameterization. Stored procedures can also prevent injection, provided they don\'t use dynamic SQL internally without parameterization.',
    difficulty: 'Medium',
    category: 'sql',
    tags: ['security', 'SQL injection', 'parameterized queries'],
  },
  {
    id: 'sql-28',
    question: 'Explain the concept of a materialized view.',
    answer: 'A standard view is a saved SQL query that runs dynamically every time you query it. A materialized view physically stores the result of the query on disk. This significantly speeds up read performance for complex aggregations or joins, but the data can become stale. Materialized views must be refreshed (recomputed) either periodically, manually, or on data changes, making them ideal for dashboards where near-real-time data is acceptable.',
    difficulty: 'Medium',
    category: 'sql',
    tags: ['materialized view', 'performance', 'caching'],
  },
];

export const excelQuestions: InterviewQuestion[] = [
  {
    id: 'excel-1',
    question: 'What is the difference between VLOOKUP and INDEX-MATCH? Which is better?',
    answer:
      'VLOOKUP searches for a value in the leftmost column of a table and returns a value from a specified column to the right — it can only look right and the lookup column must be first. INDEX-MATCH combines two functions: MATCH finds the row position of a lookup value, and INDEX retrieves a value from any column using that position. INDEX-MATCH can look left, handle column insertions without breaking (VLOOKUP breaks if columns shift), and is faster on large datasets. For example: =INDEX(B:B, MATCH("John", A:A, 0)). In Excel 365/2019, XLOOKUP supersedes both — it can look in any direction, return multiple columns, and has a built-in if-not-found argument. For interviews, know all three.',
    difficulty: 'Easy',
    category: 'excel',
    tags: ['VLOOKUP', 'INDEX-MATCH', 'XLOOKUP', 'lookup functions'],
  },
  {
    id: 'excel-2',
    question: 'How do Pivot Tables work and what can they be used for in data analysis?',
    answer:
      'A Pivot Table is an interactive summarization tool that lets you aggregate, group, filter, and reorganize data from a flat table without writing formulas. You drag fields into four areas: Rows (categories to group by), Columns (cross-tabulation), Values (metrics to aggregate — SUM, COUNT, AVERAGE, etc.), and Filters (global slicer). For data analysis, Pivot Tables are used for sales summaries by region/product, customer cohort analysis, frequency distributions, and cross-tabulations. Right-clicking a value and selecting "Show Values As" enables percentage of total, running total, rank, etc. Pivot Charts provide instant visual summaries. They update when you click "Refresh" after source data changes.',
    difficulty: 'Easy',
    category: 'excel',
    tags: ['Pivot Table', 'aggregation', 'summarization', 'data analysis'],
  },
  {
    id: 'excel-3',
    question: 'What is Power Query and how does it differ from regular Excel formulas?',
    answer:
      'Power Query (Get & Transform) is an ETL (Extract, Transform, Load) tool built into Excel that connects to diverse data sources (CSV, databases, APIs, SharePoint, etc.) and applies a repeatable sequence of transformation steps recorded in M language. Unlike formulas that operate on cells and are recalculated live, Power Query processes entire tables and only refreshes when triggered. Steps are recorded and can be edited or reordered in the Applied Steps pane. Key operations include filtering rows, splitting columns, merging queries (equivalent to JOINs), unpivoting columns, changing data types, and appending tables. Power Query is superior for repetitive monthly data updates because the entire transformation pipeline replays automatically on new data.',
    difficulty: 'Medium',
    category: 'excel',
    tags: ['Power Query', 'ETL', 'M language', 'data transformation'],
  },
  {
    id: 'excel-4',
    question: 'Explain the difference between absolute, relative, and mixed cell references.',
    answer:
      'Relative references (e.g., A1) automatically adjust when a formula is copied — copying down adjusts the row, copying right adjusts the column. Absolute references (e.g., $A$1) lock both the column and row — the reference does not change when copied anywhere. Mixed references lock either the column ($A1 — column locked, row adjusts) or the row (A$1 — row locked, column adjusts). For example, in a multiplication table, you\'d use =A$1*$A2 to lock the row of the top row and the column of the left column. Understanding these is essential for building scalable models — for instance, always locking a tax rate cell ($B$2) that should not shift when copying a formula across many rows.',
    difficulty: 'Easy',
    category: 'excel',
    tags: ['cell references', 'absolute', 'relative', 'mixed', 'dollar sign'],
  },
  {
    id: 'excel-5',
    question: 'How would you use SUMIFS and COUNTIFS for multi-criteria aggregation?',
    answer:
      'SUMIFS sums values where multiple criteria are met: =SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...). Example: =SUMIFS(C:C, A:A, "East", B:B, "Q1") sums sales in column C where region is "East" AND quarter is "Q1". COUNTIFS counts rows meeting multiple criteria: =COUNTIFS(A:A, "East", B:B, "Q1"). Both support wildcards (* for any characters, ? for single character) and comparison operators (">100", "<="&D1). They are non-array formulas and highly performant. For averaging with multiple criteria, use AVERAGEIFS with the same syntax. These functions are workhorses for building dashboard summaries and KPI tiles without Pivot Tables.',
    difficulty: 'Easy',
    category: 'excel',
    tags: ['SUMIFS', 'COUNTIFS', 'AVERAGEIFS', 'multi-criteria'],
  },
  {
    id: 'excel-6',
    question: 'What are array formulas in Excel and how do dynamic arrays change things?',
    answer:
      'Traditional array formulas (Ctrl+Shift+Enter, shown with curly braces {}) apply an operation across an array of cells and return a single result or require selecting multiple output cells first. They are powerful but fragile and hard to use. Dynamic arrays (Excel 365+) revolutionized this: functions like FILTER, SORT, UNIQUE, SEQUENCE, and XLOOKUP automatically "spill" results into adjacent cells without Ctrl+Shift+Enter. FILTER(A:B, C:C="East") returns all rows where region is East — the output range adjusts automatically. UNIQUE(A:A) returns a de-duplicated list. SEQUENCE(10,1,1) generates numbers 1–10. The # operator references the entire spill range. Dynamic arrays eliminate many complex helper-column workarounds.',
    difficulty: 'Medium',
    category: 'excel',
    tags: ['array formulas', 'dynamic arrays', 'FILTER', 'UNIQUE', 'SPILL'],
  },
  {
    id: 'excel-7',
    question: 'How do you create a dynamic dashboard in Excel?',
    answer:
      'A dynamic Excel dashboard uses linked components that update together. Steps: (1) Clean and structure source data as an Excel Table (Ctrl+T) so it expands automatically. (2) Build summary metrics using SUMIFS/COUNTIFS referencing the Table. (3) Create Pivot Tables/Charts from the Table source. (4) Add Slicers (Insert > Slicer) and connect them to all Pivot Tables via Slicer connections. (5) Use named ranges or dynamic array formulas for KPI tiles that reflect filtered state. (6) Design a separate Dashboard sheet with charts, KPI boxes, and slicers. (7) Protect formula cells and hide source data sheets. The result is a point-and-click interactive report. For more advanced interactivity, add dropdown validation lists with IF or CHOOSE formulas driving chart data ranges.',
    difficulty: 'Medium',
    category: 'excel',
    tags: ['dashboard', 'Pivot Table', 'slicers', 'Excel Table', 'dynamic'],
  },
  {
    id: 'excel-8',
    question: 'What is conditional formatting and how would you use it to highlight insights?',
    answer:
      'Conditional formatting automatically applies cell styles (color, font, icons) based on rules evaluated against cell values. Common uses: highlight cells above/below a threshold (red for losses, green for profit), color-scale heat maps showing high-to-low values across a range, data bars for in-cell bar charts, icon sets (traffic lights, arrows) for KPI status. Rules can use formulas — for example, =MOD(ROW(),2)=0 applies alternating row shading. To highlight entire rows based on a condition, select the full range and use a formula rule like =$C2="Pending". Rules have priority order (managed in Manage Rules dialog). Conditional formatting is powerful for making raw tables immediately actionable without separate chart creation.',
    difficulty: 'Easy',
    category: 'excel',
    tags: ['conditional formatting', 'heat map', 'data bars', 'icon sets'],
  },
  {
    id: 'excel-9',
    question: 'How would you use OFFSET and INDIRECT for dynamic range references?',
    answer:
      'OFFSET(reference, rows, cols, [height], [width]) returns a range that is offset from a starting reference by a specified number of rows and columns, with optional height and width. It creates dynamic named ranges — e.g., =OFFSET(A1, 0, 0, COUNTA(A:A), 1) grows with data. INDIRECT(text) converts a text string into a live reference — =INDIRECT("Sheet"&B1&"!A1") can reference different sheets based on a dropdown value. Both are volatile functions (recalculate on every change), which can slow large workbooks. They are commonly used in dynamic chart source ranges that automatically expand. Modern alternatives using Excel Tables and dynamic array functions (FILTER, SEQUENCE) are generally preferred due to better performance.',
    difficulty: 'Hard',
    category: 'excel',
    tags: ['OFFSET', 'INDIRECT', 'dynamic ranges', 'volatile functions'],
  },
  {
    id: 'excel-10',
    question: 'Explain how to use Power Pivot and what DAX is in the context of Excel.',
    answer:
      'Power Pivot is a free Excel add-in that brings a columnar in-memory database engine (VertiPaq, shared with Power BI) into Excel. It allows you to load millions of rows, define relationships between tables (creating a data model), and write DAX (Data Analysis Expressions) measures. Unlike regular formulas, DAX measures are calculated dynamically based on filter context — the same measure automatically adjusts to whatever slicers/filters are applied. Examples: Total Sales = SUM(Sales[Amount]), YoY Growth % = DIVIDE([Current Year Sales] - [Prior Year Sales], [Prior Year Sales]). Power Pivot Pivot Tables can draw from multiple related tables simultaneously without VLOOKUP. This is the bridge between Excel and Power BI skills.',
    difficulty: 'Hard',
    category: 'excel',
    tags: ['Power Pivot', 'DAX', 'data model', 'VertiPaq', 'Excel'],
  },
  {
    id: 'excel-11',
    question: 'What are some common Excel keyboard shortcuts that boost productivity for analysts?',
    answer:
      'Essential shortcuts: Ctrl+T (create Table), Ctrl+Shift+L (toggle filters), Alt+= (AutoSum), Ctrl+1 (format cells dialog), F4 (toggle absolute/relative reference, repeat last action), Ctrl+D/R (fill down/right), Ctrl+; (insert today\'s date), Alt+F1 (insert chart), Ctrl+Page Up/Down (navigate sheets). Navigation: Ctrl+End (last used cell), Ctrl+Arrow (jump to edge of data), Ctrl+Shift+Arrow (select to edge). Pivot Table: Alt+D+P (old Pivot Table wizard), right-click > Refresh. F2 (edit cell and see precedents), Ctrl+` (toggle formula view). F5 > Special allows selecting blank cells, formulas, or constants. Knowing these shortcuts signals to interviewers that you are genuinely proficient rather than a casual user.',
    difficulty: 'Easy',
    category: 'excel',
    tags: ['keyboard shortcuts', 'productivity', 'tips', 'efficiency'],
  },
  {
    id: 'excel-12',
    question: 'How do you clean messy data in Excel? Walk through common techniques.',
    answer:
      'Common data cleaning steps in Excel: (1) Remove duplicates with Data > Remove Duplicates. (2) Trim whitespace with =TRIM(A1) — removes leading, trailing, and double spaces. (3) Standardize case with =UPPER(), =LOWER(), =PROPER(). (4) Fix inconsistent formats using Text to Columns (Data > Text to Columns) to split delimited data or fix date parsing. (5) Handle errors with IFERROR(formula, "N/A"). (6) Find and replace special characters with Ctrl+H. (7) Use Flash Fill (Ctrl+E) to extract or reformat patterns intelligently. (8) Convert text-stored numbers using Paste Special > Multiply by 1 or VALUE(). Power Query is the best tool for repeatable cleaning pipelines — all these steps can be automated and refreshed on new data.',
    difficulty: 'Medium',
    category: 'excel',
    tags: ['data cleaning', 'TRIM', 'text functions', 'Flash Fill', 'Power Query'],
  },
  {
    id: 'excel-13',
    question: 'What is the GETPIVOTDATA function and when is it useful?',
    answer:
      'GETPIVOTDATA extracts specific data from a Pivot Table by referencing field names and items, making the reference stable even if the Pivot Table layout changes. Syntax: =GETPIVOTDATA("Sales", $A$3, "Region", "East", "Quarter", "Q1") where $A$3 is a cell within the Pivot Table. Unlike a plain cell reference (which breaks if the Pivot Table is sorted or filtered differently), GETPIVOTDATA always retrieves the correct value by name. It is useful for building financial dashboards that pull specific cells from a Pivot Table into a formatted report layout. Excel auto-generates GETPIVOTDATA when you click a Pivot Table cell from outside — you can disable this in PivotTable options if you prefer direct references.',
    difficulty: 'Medium',
    category: 'excel',
    tags: ['GETPIVOTDATA', 'Pivot Table', 'dynamic reference'],
  },
  {
    id: 'excel-14',
    question: 'How would you build a cohort retention analysis in Excel?',
    answer:
      'Cohort retention tracks groups of users acquired in the same period and measures how many remain active in subsequent periods. Steps: (1) Prepare data with columns: user_id, acquisition_month, activity_month. (2) Calculate period_number = activity_month - acquisition_month. (3) Use a Pivot Table with acquisition_month as Rows and period_number as Columns, counting distinct users in Values. (4) Divide each column by the Period 0 count (users in cohort) to get retention percentages — use GETPIVOTDATA or reference the base count row. (5) Apply a green-to-white conditional formatting color scale to create a heat map. The result is a triangle-shaped matrix showing retention decay. This is a key analytical deliverable for subscription businesses, SaaS, and e-commerce.',
    difficulty: 'Hard',
    category: 'excel',
    tags: ['cohort analysis', 'retention', 'Pivot Table', 'heat map'],
  },
  {
    id: 'excel-15',
    question: 'What are named ranges and how do they improve formula readability?',
    answer:
      'A named range assigns a meaningful name to a cell or range — instead of $B$2 you can write TaxRate, making formulas like =Price * TaxRate instead of =D5*$B$2. Define them via Formulas > Name Manager or by selecting a range and typing in the Name Box. Named ranges can be local (sheet-level) or global (workbook-level). Dynamic named ranges using OFFSET or structured table references (TableName[ColumnName]) grow with data. Benefits: formulas read like business logic (revenue * margin_rate), reduced errors when referencing changes, easier auditing, and they travel with the file when shared. For large financial models with many cross-sheet references, named ranges significantly reduce the cognitive load of reading and maintaining formulas.',
    difficulty: 'Easy',
    category: 'excel',
    tags: ['named ranges', 'Name Manager', 'readability', 'formula design'],
  },
  {
    id: 'excel-16',
    question: 'What is the purpose of the IFERROR function?',
    answer: 'IFERROR is used to trap and handle errors in formulas. Instead of displaying ugly errors like #N/A, #VALUE!, or #DIV/0!, you can wrap your formula in IFERROR to display a custom message, a zero, or a blank cell. Syntax: =IFERROR(VLOOKUP(A2, C:D, 2, FALSE), "Not Found"). It makes dashboards and reports look professional and prevents errors from propagating to dependent calculations.',
    difficulty: 'Easy',
    category: 'excel',
    tags: ['IFERROR', 'error handling', 'functions'],
  },
  {
    id: 'excel-17',
    question: 'What is the difference between COUNT, COUNTA, and COUNTBLANK?',
    answer: 'COUNT only counts cells that contain numeric values (including dates). COUNTA counts all non-empty cells, including text, numbers, errors, and formulas that return empty strings. COUNTBLANK counts explicitly blank or empty cells within a range. Knowing the distinction is critical when summarizing mixed-type columns in datasets.',
    difficulty: 'Easy',
    category: 'excel',
    tags: ['COUNT', 'COUNTA', 'COUNTBLANK'],
  },
];

export const pythonQuestions: InterviewQuestion[] = [
  {
    id: 'python-1',
    question: 'What is Pandas and what are its core data structures?',
    answer:
      'Pandas is the foundational Python library for data manipulation and analysis, built on top of NumPy. Its two core data structures are Series and DataFrame. A Series is a one-dimensional labeled array that can hold any data type — think of it as a single column with an index. A DataFrame is a two-dimensional labeled table (like an Excel spreadsheet or SQL table) where each column is a Series sharing the same index. DataFrames support reading from CSV, Excel, SQL, JSON, Parquet, and many other formats. Key capabilities include vectorized operations, flexible indexing (loc, iloc), powerful groupby operations, and seamless integration with visualization libraries. Pandas is the backbone of almost every data analysis workflow in Python.',
    difficulty: 'Easy',
    category: 'python',
    tags: ['Pandas', 'DataFrame', 'Series', 'data structures'],
  },
  {
    id: 'python-2',
    question: 'Explain the difference between loc and iloc in Pandas.',
    answer:
      'loc is label-based indexing — you select rows and columns using their index labels and column names: df.loc[2, "name"] selects the row with index label 2 and the "name" column. iloc is integer position-based indexing — you use integer positions (0-based): df.iloc[0, 1] selects the first row and second column by position. When the index is the default RangeIndex (0, 1, 2...), loc and iloc appear identical, but they diverge when the index is non-sequential or string-based. df.loc[2:5] includes both endpoints (unlike Python slicing), whereas df.iloc[2:5] excludes the end (5). For boolean indexing, both behave similarly. Misusing loc vs iloc is a very common source of bugs in Pandas code.',
    difficulty: 'Easy',
    category: 'python',
    tags: ['loc', 'iloc', 'indexing', 'Pandas'],
  },
  {
    id: 'python-3',
    question: 'How do you handle missing data in Pandas?',
    answer:
      'Pandas represents missing values as NaN (Not a Number) for numeric types and None/NaN for objects. Key methods: df.isnull() or df.isna() returns a boolean DataFrame of missing locations; df.isnull().sum() gives the count per column. To remove: df.dropna() drops rows with any NaN (axis=0) or columns (axis=1); use subset parameter to check specific columns. To fill: df.fillna(value) replaces NaN with a constant; df.fillna(method=\'ffill\') forward-fills from the previous value; df.fillna(df.mean()) fills with column means. For more sophisticated imputation, scikit-learn\'s SimpleImputer or IterativeImputer can be used. Decisions about how to handle missingness (drop, fill, flag) must be guided by the reason data is missing — Missing Completely At Random vs Missing Not At Random have different implications.',
    difficulty: 'Easy',
    category: 'python',
    tags: ['missing data', 'NaN', 'fillna', 'dropna', 'imputation'],
  },
  {
    id: 'python-4',
    question: 'What is groupby in Pandas and how does it work?',
    answer:
      'Pandas groupby implements the split-apply-combine pattern: it splits a DataFrame into groups based on one or more columns, applies an aggregation or transformation function to each group, and combines the results into a new DataFrame. Example: df.groupby("region")["sales"].sum() groups all rows by region and sums sales within each group. Multiple aggregations: df.groupby("region").agg({"sales": "sum", "orders": "count", "margin": "mean"}). The transform() method returns a same-sized object where each value is replaced by the group statistic — useful for computing group percentages: df["sales_pct"] = df["sales"] / df.groupby("region")["sales"].transform("sum"). The apply() method passes each group as a DataFrame to a custom function for maximum flexibility.',
    difficulty: 'Medium',
    category: 'python',
    tags: ['groupby', 'agg', 'split-apply-combine', 'Pandas'],
  },
  {
    id: 'python-5',
    question: 'How do you merge and join DataFrames in Pandas?',
    answer:
      'Pandas provides pd.merge() for SQL-style joins and df.join() for index-based joining. pd.merge(left, right, on="key", how="inner") is the most common — how can be inner, left, right, or outer. When join keys have different names: pd.merge(left, right, left_on="cust_id", right_on="customer_id"). pd.concat([df1, df2], axis=0) stacks DataFrames vertically (like SQL UNION ALL); axis=1 stacks horizontally. For joining on the index: df1.join(df2, how="left"). Always check the shape of result vs inputs to detect unexpected row multiplication from many-to-many joins. Use the indicator=True parameter to add a _merge column showing where each row came from (left_only, right_only, both) — great for debugging.',
    difficulty: 'Medium',
    category: 'python',
    tags: ['merge', 'join', 'concat', 'Pandas', 'SQL-style'],
  },
  {
    id: 'python-6',
    question: 'What is NumPy and why is it used alongside Pandas?',
    answer:
      'NumPy (Numerical Python) is the foundational library for numerical computing in Python — it provides the ndarray (n-dimensional array) object and a rich library of mathematical functions optimized in C under the hood. Pandas DataFrames are built on NumPy arrays internally. NumPy excels at vectorized mathematical operations on large arrays — operations like np.sqrt(), np.log(), np.percentile(), np.dot() — which are orders of magnitude faster than Python loops. Where Pandas adds labeled axes, heterogeneous column types, and tabular operations, NumPy provides the raw computation engine. For machine learning, most scikit-learn functions accept NumPy arrays. For data analysis, NumPy is used for generating arrays (np.linspace, np.arange), random data (np.random), linear algebra, and FFT.',
    difficulty: 'Easy',
    category: 'python',
    tags: ['NumPy', 'ndarray', 'vectorization', 'performance'],
  },
  {
    id: 'python-7',
    question: 'How would you perform exploratory data analysis (EDA) in Python?',
    answer:
      'A systematic EDA workflow: (1) Load and inspect — df.head(), df.tail(), df.shape, df.dtypes, df.info(). (2) Summary statistics — df.describe() for numerics, df["col"].value_counts() for categoricals. (3) Missing data — df.isnull().sum(), visualize with seaborn heatmap. (4) Distributions — histograms (plt.hist or sns.histplot), boxplots for outliers, KDE plots. (5) Correlations — df.corr(), sns.heatmap(df.corr(), annot=True). (6) Bivariate analysis — scatter plots, pair plots (sns.pairplot), bar charts for categorical vs numeric. (7) Outlier detection — IQR method, Z-score. (8) Feature engineering exploration — checking skewness, log transforms. Document every finding. The goal is to understand the data deeply before modeling or reporting.',
    difficulty: 'Medium',
    category: 'python',
    tags: ['EDA', 'exploratory analysis', 'Pandas', 'visualization', 'describe'],
  },
  {
    id: 'python-8',
    question: 'Explain how to use matplotlib and seaborn for data visualization.',
    answer:
      'Matplotlib is the foundational Python plotting library providing fine-grained control. Seaborn is built on matplotlib and provides beautiful statistical visualizations with less code. Core matplotlib workflow: fig, ax = plt.subplots(figsize=(10,6)); ax.plot(x, y); ax.set_title("Title"); ax.set_xlabel("X"); plt.tight_layout(); plt.show(). Seaborn simplifies common plots: sns.barplot(data=df, x="category", y="value", hue="group") for grouped bars; sns.scatterplot() with hue/size encoding; sns.heatmap() for correlation matrices; sns.boxplot() for distributions by group; sns.lineplot() for time series. For dashboards, plotly or altair provide interactive hover tooltips. Best practice: always label axes, use consistent color palettes, and match chart type to the analytical question (comparison → bar, trend → line, distribution → histogram, relationship → scatter).',
    difficulty: 'Medium',
    category: 'python',
    tags: ['matplotlib', 'seaborn', 'visualization', 'charts'],
  },
  {
    id: 'python-9',
    question: 'What are lambda functions and how are they used with Pandas apply()?',
    answer:
      'A lambda function is an anonymous single-expression function defined inline: lambda x: x * 2. In Pandas, apply() passes each row or element through a function. df["column"].apply(lambda x: x.strip().lower()) applies string cleaning to each cell. df.apply(lambda row: row["price"] * row["qty"], axis=1) applies a function across columns for each row (axis=1). For simple element-wise operations, prefer vectorized Pandas methods (str.lower(), etc.) which are faster than apply/lambda. Lambda + apply is best for complex logic that cannot be vectorized: df["bucket"] = df["score"].apply(lambda x: "High" if x > 80 else "Medium" if x > 50 else "Low"). Use map() for Series element-wise mapping from a dictionary, and applymap() (now renamed to map() in Pandas 2.x) for element-wise on DataFrames.',
    difficulty: 'Medium',
    category: 'python',
    tags: ['lambda', 'apply', 'map', 'functional programming', 'Pandas'],
  },
  {
    id: 'python-10',
    question: 'How do you work with datetime data in Pandas?',
    answer:
      'Convert strings to datetime: pd.to_datetime(df["date_col"]) or pass parse_dates=["date_col"] in pd.read_csv(). Once parsed, access components via .dt accessor: df["date"].dt.year, .dt.month, .dt.dayofweek, .dt.hour. Compute date differences: (df["end_date"] - df["start_date"]).dt.days. Resample time series to monthly frequency: df.set_index("date").resample("M").sum(). Use pd.date_range() to generate date sequences. Handle time zones: df["date"].dt.tz_localize("UTC").dt.tz_convert("US/Eastern"). Filter date ranges: df[df["date"].between("2024-01-01", "2024-12-31")]. Datetime indexing enables powerful rolling window operations: df.set_index("date")["sales"].rolling("7D").mean() computes a 7-day rolling mean. Proper datetime handling is essential for any time-series analysis.',
    difficulty: 'Medium',
    category: 'python',
    tags: ['datetime', 'dt accessor', 'resample', 'time series', 'Pandas'],
  },
  {
    id: 'python-11',
    question: 'What are list comprehensions and generator expressions in Python?',
    answer:
      'List comprehension is a concise syntax to create lists: [expression for item in iterable if condition]. Example: [x**2 for x in range(10) if x % 2 == 0] generates squares of even numbers. They are faster than equivalent for-loops because they are optimized at the C level. Generator expressions use the same syntax with parentheses instead of brackets: (x**2 for x in range(10)). Unlike list comprehensions that compute and store all values in memory, generators are lazy — they yield values one at a time, using constant memory regardless of input size. Generators are essential when processing large files line by line: (line.strip() for line in open("huge_file.csv")). For data analysis, list comprehensions are used to build column lists, filter DataFrames, and transform data before loading into Pandas.',
    difficulty: 'Easy',
    category: 'python',
    tags: ['list comprehension', 'generator', 'performance', 'Python basics'],
  },
  {
    id: 'python-12',
    question: 'How would you optimize slow Python data processing code?',
    answer:
      'Key optimization strategies: (1) Vectorize with Pandas/NumPy — replace Python loops with built-in vectorized operations which run in C. (2) Use appropriate dtypes — downcast int64 to int32/int8, use pd.Categorical for low-cardinality string columns to reduce memory 10–100x. (3) Profile first — use cProfile, line_profiler, or %timeit in Jupyter to identify actual bottlenecks. (4) Use chunking for large files: pd.read_csv("file.csv", chunksize=10000). (5) Consider Dask for distributed Pandas-like operations on datasets larger than RAM. (6) Use Polars — a Rust-based DataFrame library that is 10–50x faster than Pandas for many operations. (7) Parquet format reads much faster than CSV. (8) For numerical code, Numba JIT compilation can match C speed with minimal code changes.',
    difficulty: 'Hard',
    category: 'python',
    tags: ['optimization', 'performance', 'vectorization', 'Dask', 'Polars'],
  },
  {
    id: 'python-13',
    question: 'Explain pivot_table in Pandas and how it differs from groupby.',
    answer:
      'pd.pivot_table() creates a spreadsheet-style pivot table from a DataFrame, similar to Excel Pivot Tables. Example: pd.pivot_table(df, values="sales", index="region", columns="quarter", aggfunc="sum", fill_value=0). This produces a 2D summary with region as rows and quarter as columns. groupby().agg() produces a flat (long-format) aggregated DataFrame — you must then reshape with .unstack() to get the same wide-format result. pivot_table natively handles the multi-dimensional reshaping and supports margins=True to add row/column totals. It also handles multiple value columns and multiple aggfunc options simultaneously. Use pivot_table when you want a cross-tabulation (2D view), and groupby when you want a flat aggregated summary for further processing.',
    difficulty: 'Medium',
    category: 'python',
    tags: ['pivot_table', 'groupby', 'cross-tabulation', 'reshape', 'Pandas'],
  },
  {
    id: 'python-14',
    question: 'How do you read and write different file formats in Pandas?',
    answer:
      'Pandas supports many formats out of the box. Reading: pd.read_csv("file.csv", sep=",", encoding="utf-8", parse_dates=["date_col"], dtype={"id": int}). pd.read_excel("file.xlsx", sheet_name="Sheet1"). pd.read_sql("SELECT * FROM table", con=connection). pd.read_json("file.json"). pd.read_parquet("file.parquet") — requires pyarrow or fastparquet. Writing: df.to_csv("output.csv", index=False). df.to_excel("output.xlsx", index=False, sheet_name="Report"). df.to_parquet("output.parquet", compression="snappy"). df.to_sql("table_name", con=engine, if_exists="replace", index=False). For large datasets, Parquet is strongly preferred — it is columnar, compressed (10x smaller than CSV), and reads 10–50x faster. Always use index=False unless the index is meaningful.',
    difficulty: 'Easy',
    category: 'python',
    tags: ['read_csv', 'read_excel', 'Parquet', 'file formats', 'Pandas'],
  },
  {
    id: 'python-15',
    question: 'What is the difference between melt and pivot in Pandas? When would you use each?',
    answer:
      'melt() converts a wide-format DataFrame to long format — it unpivots columns into rows. pd.melt(df, id_vars=["country"], value_vars=["2022", "2023", "2024"], var_name="year", value_name="sales") takes year columns and stacks them as rows with a "year" label. Long format is required for most Pandas groupby operations, seaborn plots, and database storage. pivot() converts long format to wide format — essentially the inverse of melt. df.pivot(index="country", columns="year", values="sales") spreads the year values into separate columns. pivot_table() is the more robust version that handles duplicates via aggregation. The general rule in data analysis: store data in long (tidy) format, reshape to wide only for display/reporting purposes.',
    difficulty: 'Medium',
    category: 'python',
    tags: ['melt', 'pivot', 'wide format', 'long format', 'tidy data'],
  },
  {
    id: 'python-16',
    question: 'What are list comprehensions in Python?',
    answer: 'List comprehensions provide a concise way to create lists. They consist of brackets containing an expression followed by a for clause, then zero or more for or if clauses. For example, [x**2 for x in range(10) if x % 2 == 0] creates a list of squares of even numbers. They are generally faster and more readable than equivalent traditional for loops.',
    difficulty: 'Easy',
    category: 'python',
    tags: ['list comprehension', 'syntax', 'performance'],
  },
  {
    id: 'python-17',
    question: 'How do you handle exceptions in Python?',
    answer: 'Exceptions are handled using the try-except block. You place the code that might raise an exception inside the try block, and the error-handling logic inside the except block. You can catch specific exceptions (e.g., ValueError, KeyError) to handle different errors appropriately. An optional finally block executes code regardless of whether an exception occurred, which is useful for resource cleanup like closing files or connections.',
    difficulty: 'Easy',
    category: 'python',
    tags: ['exceptions', 'try', 'except', 'error handling'],
  },
];

export const powerbiQuestions: InterviewQuestion[] = [
  {
    id: 'pbi-1',
    question: 'What is DAX and how is it different from Excel formulas?',
    answer:
      'DAX (Data Analysis Expressions) is the formula language used in Power BI, Power Pivot, and Analysis Services. Unlike Excel formulas that operate on cell ranges and recalculate based on cell references, DAX measures are evaluated within a filter context — the same measure returns different results depending on which slicers, filters, and visual cross-filters are applied. DAX has concepts of row context (for calculated columns, iterating row by row) and filter context (for measures, operating on filtered subsets). Common DAX functions include SUM, CALCULATE, FILTER, ALL, RELATED, DIVIDE, SUMX, RANKX. CALCULATE is the most powerful DAX function — it evaluates an expression in a modified filter context. Learning the difference between row context and filter context is the fundamental challenge in mastering DAX.',
    difficulty: 'Medium',
    category: 'powerbi',
    tags: ['DAX', 'filter context', 'row context', 'CALCULATE', 'measures'],
  },
  {
    id: 'pbi-2',
    question: 'What is the difference between a Measure and a Calculated Column in Power BI?',
    answer:
      'A Calculated Column is computed row-by-row at data refresh time, stored in the model, and evaluated in row context — it behaves like a new column added to the table. It consumes memory because values are stored for every row. A Measure is computed dynamically at query time in filter context — it is not stored as data but recalculates based on the current visual\'s filter context. Measures are preferred for aggregations (SUM, AVERAGE, COUNT) shown in visuals because they respond to slicers and filters automatically. Calculated columns are used for values needed for filtering, slicing, or as static attributes (e.g., categorizing rows, extracting year from date). Best practice: use measures for KPIs and metrics, calculated columns sparingly only when needed for filtering.',
    difficulty: 'Medium',
    category: 'powerbi',
    tags: ['measure', 'calculated column', 'row context', 'filter context', 'DAX'],
  },
  {
    id: 'pbi-3',
    question: 'Explain the star schema and why it is important for Power BI data modeling.',
    answer:
      'A star schema organizes data into a central fact table surrounded by dimension tables, connected via foreign-key relationships. The fact table contains quantitative measures (sales amount, quantity, revenue) and foreign keys to dimensions. Dimension tables contain descriptive attributes (customer name, product category, date attributes). Power BI\'s VertiPaq engine is highly optimized for this structure — it compresses dimension tables extremely efficiently and performs filter propagation from dimensions to facts very quickly. A proper star schema: minimizes the number of table relationships (single hop from dimension to fact), enables fast DAX calculations, and makes report building intuitive. Avoid many-to-many relationships and complex bridge tables when possible. The Date table is a particularly critical dimension that must be marked as a Date Table.',
    difficulty: 'Medium',
    category: 'powerbi',
    tags: ['star schema', 'fact table', 'dimension table', 'data modeling'],
  },
  {
    id: 'pbi-4',
    question: 'What is Row Level Security (RLS) in Power BI and how do you implement it?',
    answer:
      'Row Level Security restricts data access at the row level based on the identity of the user viewing the report — different users see different subsets of the same report. Implementation: In Power BI Desktop, go to Modeling > Manage Roles. Create a role (e.g., "East Region Manager") and define a DAX filter expression on the relevant table (e.g., [Region] = "East"). After publishing, in the Power BI Service, assign users or security groups to roles via the dataset settings. Dynamic RLS uses USERPRINCIPALNAME() or USERNAME() DAX functions to match the logged-in user against a security table: [Email] = USERPRINCIPALNAME(). This allows a single role to dynamically filter based on who is viewing. RLS is essential for enterprise deployments where sales managers should only see their territory\'s data.',
    difficulty: 'Hard',
    category: 'powerbi',
    tags: ['RLS', 'Row Level Security', 'security', 'USERPRINCIPALNAME', 'roles'],
  },
  {
    id: 'pbi-5',
    question: 'What is the CALCULATE function in DAX and how does it work?',
    answer:
      'CALCULATE is the most fundamental DAX function — it evaluates an expression in a modified filter context. Syntax: CALCULATE(expression, filter1, filter2, ...). The filters override or add to the current filter context. Example: CALCULATE(SUM(Sales[Amount]), Sales[Region] = "East") returns the sum of sales for East region regardless of what region filter is currently applied in the visual. CALCULATE(SUM(Sales[Amount]), ALL(Sales[Region])) removes the region filter (using ALL) to compute a grand total for percentage calculations. CALCULATE is used to implement time intelligence (comparing periods), computing market share, ignoring certain slicers, and virtually every advanced DAX calculation. Understanding that CALCULATE modifies filter context is the key to mastering DAX.',
    difficulty: 'Hard',
    category: 'powerbi',
    tags: ['CALCULATE', 'DAX', 'filter context', 'ALL', 'advanced'],
  },
  {
    id: 'pbi-6',
    question: 'What are the different types of relationships in Power BI data models?',
    answer:
      'Power BI supports three relationship cardinalities: One-to-Many (1:*) — the most common, where one row in the dimension matches many rows in the fact table (e.g., one customer, many orders). Many-to-One (*:1) — the inverse perspective of 1:*. One-to-One (1:1) — rarely used, usually indicates tables that could be merged. Many-to-Many (*:*) — requires a bridge table or special handling; Power BI supports it natively but with performance caveats. Cross-filter direction can be Single (filter flows from "one" side to "many") or Both (bidirectional, can cause ambiguity and circular dependency issues). Active vs Inactive relationships: only one relationship between two tables can be active; use USERELATIONSHIP() in DAX to activate an inactive relationship in a specific measure.',
    difficulty: 'Medium',
    category: 'powerbi',
    tags: ['relationships', 'cardinality', 'many-to-many', 'cross-filter', 'data model'],
  },
  {
    id: 'pbi-7',
    question: 'How do you implement time intelligence in DAX? Give examples.',
    answer:
      'Time intelligence in DAX requires a proper Date table with continuous dates, marked as a Date Table, and related to the fact table via a date key. Key time intelligence functions: TOTALYTD(SUM(Sales[Amount]), Dates[Date]) — year-to-date total. SAMEPERIODLASTYEAR(Dates[Date]) — returns dates from the same period one year ago, used with CALCULATE for YoY comparisons: CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Dates[Date])). DATEADD(Dates[Date], -1, MONTH) shifts the date context by one month. DATESYTD, DATESMTD, DATESQTD return year/month/quarter-to-date date ranges. Example YoY growth: ([Total Sales] - [Sales LY]) / [Sales LY]. These functions only work when the filter context contains dates from a proper Date table.',
    difficulty: 'Hard',
    category: 'powerbi',
    tags: ['time intelligence', 'TOTALYTD', 'SAMEPERIODLASTYEAR', 'DAX', 'YoY'],
  },
  {
    id: 'pbi-8',
    question: 'What is DirectQuery vs Import mode in Power BI?',
    answer:
      'Import mode loads data into Power BI\'s in-memory VertiPaq engine — queries are extremely fast because data is compressed and stored locally, but data is only as fresh as the last refresh (scheduled up to 8x/day in Pro, 48x in Premium). DirectQuery sends every visual interaction as a live query to the source database — data is always real-time but performance depends on the source database\'s speed, and DAX function support is limited. Composite mode (introduced in Power BI Premium) allows some tables in Import and some in DirectQuery, optimizing the trade-off. Choose Import for: best performance, complex DAX, data that refreshes infrequently. Choose DirectQuery for: real-time data requirements, data too large to import, security/compliance that requires data to stay in source.',
    difficulty: 'Medium',
    category: 'powerbi',
    tags: ['DirectQuery', 'Import mode', 'Composite mode', 'refresh', 'real-time'],
  },
  {
    id: 'pbi-9',
    question: 'How do you use bookmarks and buttons to create navigation in Power BI?',
    answer:
      'Bookmarks capture the state of a report page — which visuals are visible, current filters, slicer selections, and scroll position. Create a bookmark via the View > Bookmarks pane, arrange visuals (some hidden, some visible) for each "state," and save a bookmark for each state. Buttons (Insert > Button) can be linked to bookmarks: select a button, go to Format > Action > Bookmark and choose the target bookmark. This enables: tab-style navigation between pages (hide/show different visual groups), drill-through storytelling, tooltip page toggling, and "show/hide filter pane" patterns. Selection Pane (View > Selection) controls visibility of each visual layer. Combined with transparent button shapes overlaid on visuals, this creates polished, app-like navigation in Power BI reports without Premium features.',
    difficulty: 'Medium',
    category: 'powerbi',
    tags: ['bookmarks', 'buttons', 'navigation', 'interactivity', 'UX'],
  },
  {
    id: 'pbi-10',
    question: 'What is the difference between a dashboard and a report in Power BI Service?',
    answer:
      'In Power BI Service, a Report is a multi-page interactive document created from a single dataset — it has full filtering, drill-through, cross-filtering between visuals, and all interactive features. Users can explore data in depth. A Dashboard is a single canvas of pinned "tiles" pulled from one or more reports or datasets — it is a high-level executive summary view. Dashboards support real-time tile streaming, natural language Q&A, and can aggregate tiles from multiple datasets/reports. However, dashboards have limited interactivity — clicking a tile navigates to the underlying report. Reports are created in Power BI Desktop; dashboards are created only in the Power BI Service by pinning visuals. For sharing: reports are shared individually or via apps, dashboards can be shared directly within an organization.',
    difficulty: 'Easy',
    category: 'powerbi',
    tags: ['dashboard', 'report', 'Power BI Service', 'tiles', 'sharing'],
  },
];

export const hrQuestions: InterviewQuestion[] = [
  {
    id: 'hr-1',
    question: 'Tell me about yourself and why you want to be a data analyst.',
    answer:
      'Structure your answer with the Present-Past-Future framework: start with your current role/skills, briefly mention relevant past experience or education, then connect to why you specifically want this data analyst role. Emphasize your genuine interest in turning data into decisions — give a specific example of a time data changed your perspective or helped solve a problem. Quantify achievements where possible ("I built a dashboard that reduced reporting time from 3 hours to 15 minutes"). Keep it to 90 seconds. Tailor the ending to the company: research their data challenges beforehand and mention how your skills align. Avoid simply reading your resume — this is your chance to tell a compelling professional story that connects your past to their future needs.',
    difficulty: 'Easy',
    category: 'hr',
    tags: ['introduction', 'motivation', 'storytelling', 'career narrative'],
  },
  {
    id: 'hr-2',
    question: 'What are your greatest strengths as a data analyst?',
    answer:
      'Choose 2–3 strengths that are directly relevant to data analysis and back each with a specific example. Strong choices: attention to detail ("I once caught a $50K discrepancy in a financial report by noticing a date filter was misconfigured"), ability to communicate complex data to non-technical stakeholders ("I simplified a 40-metric dashboard to 5 KPIs for the executive team"), intellectual curiosity ("I proactively investigated a 15% revenue dip that the team had attributed to seasonality and found it was actually a data pipeline bug"). Avoid vague strengths like "I\'m a hard worker." Structure each strength as: claim → evidence → result. The strongest answers demonstrate both technical skill AND the soft skills (communication, business acumen) that make a data analyst genuinely valuable to an organization.',
    difficulty: 'Easy',
    category: 'hr',
    tags: ['strengths', 'self-assessment', 'behavioral', 'examples'],
  },
  {
    id: 'hr-3',
    question: 'What is your greatest weakness? How are you working on it?',
    answer:
      'The key is to choose a real but non-critical weakness and demonstrate genuine self-awareness plus active improvement. Good approaches for data analyst roles: "I sometimes over-analyze before presenting — I\'ve addressed this by setting time-boxed analysis phases and using the \'good enough\' principle for exploratory work." Or: "I was initially uncomfortable presenting to senior leadership — I joined Toastmasters and now volunteer to present quarterly business reviews." Avoid clichés like "I\'m a perfectionist" or weaknesses that are actually job requirements. Interviewers respect vulnerability + growth mindset. The formula: state the weakness honestly → show you recognize its impact → describe concrete steps you\'ve taken → mention recent evidence of improvement.',
    difficulty: 'Easy',
    category: 'hr',
    tags: ['weakness', 'self-awareness', 'growth mindset', 'improvement'],
  },
  {
    id: 'hr-4',
    question: 'Describe a time you had to explain complex data findings to a non-technical audience.',
    answer:
      'Use the STAR method: Situation (set the context), Task (what was needed), Action (what you did), Result (the outcome). Example structure: "Our marketing team needed to understand customer churn analysis results, but had no statistical background. I replaced technical terms like \'logistic regression coefficient\' with business language — instead I said \'customers who haven\'t opened an email in 90 days are 4x more likely to cancel\'. I built a single-page visual story with three charts instead of a 30-page report. The team immediately understood the at-risk segment, launched a targeted re-engagement campaign, and reduced churn by 12% that quarter." Key lessons to convey: know your audience, lead with the business implication (not the methodology), use visuals over tables, and allow time for questions.',
    difficulty: 'Medium',
    category: 'hr',
    tags: ['communication', 'STAR method', 'non-technical audience', 'storytelling'],
  },
  {
    id: 'hr-5',
    question: 'How do you handle tight deadlines and multiple competing priorities?',
    answer:
      'Demonstrate a structured prioritization process. A strong answer: "I use a combination of urgency-impact scoring and stakeholder communication. When multiple requests arrive simultaneously, I quickly assess: which has a hard deadline (board meeting tomorrow vs a weekly report)? Which has the highest business impact? I communicate immediately — I\'ll proactively inform stakeholders of the timeline and manage expectations. I break complex analyses into deliverable phases — providing a preliminary finding quickly and following up with depth. I also keep a personal backlog with effort estimates. Specific example: when simultaneously asked for an urgent sales analysis for the CEO and a routine monthly report, I delivered the CEO analysis in 2 hours using a focused subset, then completed the monthly report overnight." Show agency and calm under pressure.',
    difficulty: 'Medium',
    category: 'hr',
    tags: ['time management', 'prioritization', 'pressure', 'stakeholders'],
  },
  {
    id: 'hr-6',
    question: 'Where do you see yourself in 5 years?',
    answer:
      'Frame your answer to show ambition while demonstrating commitment to depth in data analytics. Good answers align your growth with the company\'s needs: "In 5 years, I aim to be a senior data analyst or analytics team lead — capable of independently driving end-to-end analytical projects and mentoring junior analysts. I want to deepen expertise in [specific area relevant to the company — e.g., marketing analytics, supply chain optimization, financial modeling]. I\'m particularly excited about the growth of data science and ML integration into business decisions — I plan to build skills in predictive modeling alongside my core analytics work." Avoid answers that suggest the role is a stepping stone to an unrelated field. Show that you see a career path, not just a job, and that the company fits into your long-term growth narrative.',
    difficulty: 'Easy',
    category: 'hr',
    tags: ['career goals', '5 years', 'ambition', 'growth'],
  },
  {
    id: 'hr-7',
    question: 'Tell me about a time your analysis was wrong. How did you handle it?',
    answer:
      'This question tests intellectual honesty and resilience. A strong answer shows you can own mistakes professionally. Example: "Early in my career, I presented a sales forecast that was 30% off because I hadn\'t accounted for a product recall that happened mid-quarter. When I realized the error — before the quarter closed — I immediately informed my manager, provided a corrected forecast with a clear explanation of what was missed, and proposed adding a \'known disruptions\' checklist to our forecasting template. The corrected forecast was within 5% of actual. The experience taught me to always validate against recent business events, not just historical data." Key elements: take ownership without excuses, focus on the fix and what you learned, show that the error led to a process improvement.',
    difficulty: 'Medium',
    category: 'hr',
    tags: ['failure', 'accountability', 'learning', 'resilience'],
  },
  {
    id: 'hr-8',
    question: 'How do you stay current with data analytics trends and tools?',
    answer:
      'Interviewers want to see genuine intellectual curiosity and continuous learning habits. Strong answer: "I follow a consistent learning routine. I read Towards Data Science and The Analytics Engineering Roundup newsletters weekly. I\'m part of a local data community group where practitioners share real-world case studies. When I\'m learning a new tool like dbt or Spark, I work through official documentation and build a small project on a public dataset — recently I replicated a marketing attribution analysis using Python and published it on GitHub. I also take structured courses on Coursera and LinkedIn Learning when there are specific skill gaps. I follow data leaders on LinkedIn — people like Chip Huyen for ML and Randy Au for analytics engineering." Mention 2–3 specific resources and a recent thing you learned to make the answer concrete.',
    difficulty: 'Easy',
    category: 'hr',
    tags: ['continuous learning', 'professional development', 'trends', 'resources'],
  },
  {
    id: 'hr-9',
    question: 'What are your salary expectations?',
    answer:
      'Research the market thoroughly before the interview using Glassdoor, Levels.fyi, LinkedIn Salary, Bureau of Labor Statistics, and offer letters shared in data communities. Have a range ready based on your experience, location, and the company size. Strategy: let the employer state their range first if possible — "I\'m flexible and open to discussing compensation once I have a fuller understanding of the total package and role responsibilities." If pressed: "Based on my research and X years of experience with [key skills], I\'m targeting $XX,000–$XX,000 for base salary, but I\'m open to the full conversation about total compensation including benefits, equity, and growth opportunities." Never anchor too low out of fear — underselling signals lack of confidence. Know your walk-away number (BATNA) before negotiating.',
    difficulty: 'Medium',
    category: 'hr',
    tags: ['salary', 'negotiation', 'compensation', 'market research'],
  },
  {
    id: 'hr-10',
    question: 'Why do you want to work at this company specifically?',
    answer:
      'Generic answers like "I love your culture" are not compelling — research depth is what impresses. A strong answer has three layers: (1) Company-specific knowledge — mention a recent product launch, earnings result, data initiative, or public engineering blog post. "I read your engineering blog post on how you rebuilt your data pipeline to reduce latency to under 5 minutes — that kind of infrastructure investment signals serious commitment to analytics." (2) Role-specific alignment — how the specific responsibilities match your strengths and interests. (3) Growth opportunity — what you expect to learn or contribute uniquely at this company vs others. Show that you\'ve done homework: mention the company\'s data stack if public, their industry challenges, and a genuine connection to their mission. Interviewers can immediately tell the difference between a tailored answer and a recycled one.',
    difficulty: 'Easy',
    category: 'hr',
    tags: ['company research', 'motivation', 'culture fit', 'preparation'],
  },
];

export const caseStudies: InterviewQuestion[] = [
  {
    id: 'case-1',
    question: 'Our e-commerce revenue dropped 20% last month. How would you investigate this?',
    answer:
      'Use a structured decomposition approach. Step 1 — Clarify scope: Is it revenue (price × quantity), orders, average order value, or all three? Which time period exactly, and compared to what baseline? Step 2 — Segment and isolate: Break the drop by geography, product category, customer segment (new vs returning), channel (organic, paid, email). A 20% overall drop might be 60% in one category while others are flat — find the concentration. Step 3 — Check the data pipeline first: verify the tracking isn\'t broken (missing pixels, failed integrations). Step 4 — Correlate with events: marketing spend changes, competitor promotions, website outages, shipping delays, price changes, seasonality. Step 5 — Funnel analysis: traffic → product page views → add to cart → checkout → purchase — where does the drop occur? Step 6 — Present findings with evidence and recommend a specific action: if it\'s a conversion rate drop at checkout, investigate payment processing or UX changes.',
    difficulty: 'Hard',
    category: 'case-studies',
    tags: ['revenue drop', 'root cause analysis', 'decomposition', 'e-commerce'],
  },
  {
    id: 'case-2',
    question: 'How would you design a dashboard for a sales team of 50 reps with different territories?',
    answer:
      'Start by understanding the audience and use cases: what decisions will reps vs managers make from this dashboard? Reps need individual performance vs quota; managers need team-level rollups and comparisons. Design principles: (1) Single-screen KPI tiles at top — closed deals, pipeline value, quota attainment %, activities completed. (2) Trend chart showing monthly performance vs target over rolling 12 months. (3) Deal pipeline funnel by stage. (4) Data table of deals with filters by status, close date, product. (5) Implement Row Level Security so each rep sees only their territory. Manager views show all reps with a drill-through to individual rep. Technical: use a star schema with a Fact_Deals table and Dim_Sales_Rep, Dim_Territory, Dim_Date dimensions. Automate daily refresh from CRM (Salesforce/HubSpot). Validate with a pilot user from sales before full rollout.',
    difficulty: 'Hard',
    category: 'case-studies',
    tags: ['dashboard design', 'sales', 'RLS', 'requirements gathering'],
  },
  {
    id: 'case-3',
    question: 'You are given a dataset of 1 million customer transactions. How do you find your most valuable customers?',
    answer:
      'Apply RFM (Recency, Frequency, Monetary) analysis — a proven framework for customer value segmentation. Steps: (1) Compute Recency = days since last purchase, Frequency = total transactions in the period, Monetary = total spend. (2) Score each dimension 1–5 (5 = best): low recency days = high score, high frequency = high score, high spend = high score. (3) Combine scores into a single RFM segment or use them as features for clustering. (4) K-means clustering (k=4–6) on the RFM features (standardized) groups customers into natural segments without arbitrary thresholds. (5) Label segments: Champions (high R, F, M), Loyal Customers, At Risk (high F/M but high recency days), Lost. (6) Validate cluster quality with silhouette score. Present findings as: segment size, average revenue per segment, and recommended actions (loyalty rewards for champions, win-back campaign for at-risk).',
    difficulty: 'Hard',
    category: 'case-studies',
    tags: ['RFM', 'customer segmentation', 'clustering', 'k-means', 'lifetime value'],
  },
  {
    id: 'case-4',
    question: 'How would you measure the success of a new feature launch in a mobile app?',
    answer:
      'Define success before launch. Framework: (1) Primary metrics — the "north star" directly tied to feature goal: if the feature is a new onboarding flow, the primary metric is 7-day retention. If it\'s a social sharing button, it\'s share rate. (2) Secondary metrics — leading indicators: session length, feature engagement rate (% of users who clicked the feature). (3) Guardrail metrics — metrics that should NOT decrease: app crash rate, existing feature usage, subscription churn. (4) Set up an A/B test: randomly assign users to control (old experience) and treatment (new feature). Run for at least 2 business cycles (typically 2 weeks) to account for novelty effects. (5) Analyze with statistical significance (p < 0.05) and practical significance (minimum detectable effect). (6) Segment results: the feature may help new users but hurt power users. Report the trade-offs, not just the average effect.',
    difficulty: 'Hard',
    category: 'case-studies',
    tags: ['A/B testing', 'metrics', 'feature launch', 'success measurement'],
  },
  {
    id: 'case-5',
    question: 'Your company wants to reduce customer churn. How do you approach this analytically?',
    answer:
      'Churn analysis has three phases: understand, predict, and act. Phase 1 — Understand: define churn (subscription canceled? no purchase in 90 days?). Calculate current churn rate by segment. Conduct cohort analysis to see which acquisition cohorts have highest churn. Survey churned customers for qualitative reasons. Phase 2 — Predict: build a churn prediction model using features like days since last login, support tickets filed, plan type, payment failures, feature adoption breadth. Logistic regression as a baseline, gradient boosting (XGBoost) for accuracy. Evaluate with AUC-ROC (aim > 0.80), precision-recall tradeoff — prioritize recall (catch more churners even with false positives). Phase 3 — Act: score all active customers with churn probability. Trigger intervention workflows at probability thresholds (>60% at risk → customer success outreach; >80% → discount offer). Measure intervention effectiveness with holdout groups. Report ROI: saved revenue vs intervention cost.',
    difficulty: 'Hard',
    category: 'case-studies',
    tags: ['churn', 'predictive modeling', 'cohort analysis', 'retention', 'machine learning'],
  },
  {
    id: 'case-6',
    question: 'How would you analyze the impact of a price increase on sales volume?',
    answer:
      'This is a price elasticity analysis. Framework: (1) Establish a clean comparison: ideally a controlled experiment — increase price for a random subset of customers/regions while keeping others at old price. If not possible, use a natural experiment (price changed on a specific date) with difference-in-differences analysis. (2) Compute price elasticity: % change in quantity / % change in price. Elasticity < -1 means elastic (demand is sensitive to price). (3) Break down by product, region, customer tier — elasticity differs by segment. (4) Account for confounders: seasonality (use same period prior year as comparison), competitor pricing, promotions. (5) Calculate revenue impact: even if volume drops 15%, a 20% price increase yields net positive revenue if elasticity is favorable. (6) Forecast long-term customer lifetime value impact — a price increase might reduce new customer acquisition even if existing customer impact is small.',
    difficulty: 'Hard',
    category: 'case-studies',
    tags: ['price elasticity', 'pricing analysis', 'A/B test', 'difference-in-differences'],
  },
  {
    id: 'case-7',
    question: 'You discover that two analysts on your team are reporting different numbers for the same KPI. How do you resolve this?',
    answer:
      'This is a data governance and trust problem — it must be resolved definitively or it erodes confidence in analytics. Step 1 — Do not escalate publicly: investigate quietly before involving stakeholders. Step 2 — Audit both calculations: document each analyst\'s exact query, filters, date ranges, and data sources. Differences usually trace to: different time-zone handling, different definitions of the metric (e.g., "active user" = login in 7 days vs 30 days), different table sources (live vs snapshot), or different filter logic (include refunds or not). Step 3 — Find the ground truth: identify the authoritative data source and agreed definition. Step 4 — Document the correct methodology in a metrics wiki or README. Step 5 — Propose a solution: create a single certified dbt model or view that both analysts use, so there is one source of truth. Step 6 — Establish a metrics review process to prevent future divergence. This showcases data governance maturity.',
    difficulty: 'Medium',
    category: 'case-studies',
    tags: ['data governance', 'metrics discrepancy', 'single source of truth', 'dbt'],
  },
  {
    id: 'case-8',
    question: 'How would you build a reporting framework for a new product from scratch?',
    answer:
      'Building analytics from scratch requires a structured approach. Phase 1 — Requirements: interview stakeholders (product, marketing, finance, operations) to understand what decisions they need to make. Map decisions to metrics. Prioritize using impact vs effort. Phase 2 — Metrics Framework: define a metrics hierarchy — north star metric (e.g., Daily Active Users), L1 metrics (retention, activation, revenue), L2 diagnostic metrics that explain changes in L1. Document every metric definition in a centralized glossary: formula, data source, refresh cadence, owner. Phase 3 — Data Infrastructure: identify source systems, design data model (fact + dimension tables), build ETL pipelines (dbt for transformation), implement data quality tests. Phase 4 — Reporting: build foundational dashboards (executive summary, product health, funnel analysis). Phase 5 — Governance: establish SLA for data freshness, alert on anomalies, create documentation, run quarterly metric reviews to deprecate unused reports. Involve stakeholders at every phase to ensure adoption.',
    difficulty: 'Hard',
    category: 'case-studies',
    tags: ['reporting framework', 'metrics hierarchy', 'data governance', 'dbt', 'stakeholder management'],
  },
];

export const allCategories = [
  {
    id: 'sql',
    label: 'SQL',
    count: 25,
    color: '#3B82F6',
    questions: sqlQuestions,
  },
  {
    id: 'excel',
    label: 'Excel',
    count: 15,
    color: '#10B981',
    questions: excelQuestions,
  },
  {
    id: 'python',
    label: 'Python',
    count: 15,
    color: '#8B5CF6',
    questions: pythonQuestions,
  },
  {
    id: 'powerbi',
    label: 'Power BI',
    count: 10,
    color: '#F59E0B',
    questions: powerbiQuestions,
  },
  {
    id: 'hr',
    label: 'HR Interview',
    count: 10,
    color: '#06B6D4',
    questions: hrQuestions,
  },
  {
    id: 'case-studies',
    label: 'Case Studies',
    count: 8,
    color: '#EC4899',
    questions: caseStudies,
  },
];
