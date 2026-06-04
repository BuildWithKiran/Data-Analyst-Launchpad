'use client';

import { useState } from'react';
import {
  Database,
  Code2,
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  X,
  Zap,
  BookOpen,
} from'lucide-react';

type Difficulty ='Easy' |'Medium' |'Hard';

interface Challenge {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  problem: string;
  sampleInput: string;
  sampleOutput: string;
  solution: string;
  hint?: string;
}

interface CategoryTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  challenges: Challenge[];
}

const sqlChallenges: Challenge[] = [
  {
    id:'sql-c1',
    title:'Top 3 Products by Revenue',
    difficulty:'Easy',
    description:'Find the top 3 products by total revenue from the orders table.',
    problem:`You have an orders table with columns: order_id, product_name, quantity, unit_price, order_date.

Write a SQL query to find the top 3 products by total revenue (quantity × unit_price), showing the product name and total revenue, ordered highest first.`,
    sampleInput:`orders table:
order_id | product_name  | quantity | unit_price | order_date
1        | Laptop        | 2        | 1200.00    | 2024-01-05
2        | Mouse         | 10       | 25.00      | 2024-01-06
3        | Laptop        | 1        | 1200.00    | 2024-01-07
4        | Monitor       | 5        | 350.00     | 2024-01-08
5        | Keyboard      | 8        | 75.00      | 2024-01-09
6        | Mouse         | 20       | 25.00      | 2024-01-10`,
    sampleOutput:`product_name | total_revenue
Laptop       | 3600.00
Monitor      | 1750.00
Mouse        | 750.00`,
    solution:`SELECT
  product_name,
  SUM(quantity * unit_price) AS total_revenue
FROM orders
GROUP BY product_name
ORDER BY total_revenue DESC
LIMIT 3;`,
    hint:'Use GROUP BY with SUM() and ORDER BY + LIMIT.',
  },
  {
    id:'sql-c2',
    title:'Monthly Active Users',
    difficulty:'Medium',
    description:'Calculate the number of unique active users per month.',
    problem:`You have a user_events table: event_id, user_id, event_type, event_date.

Write a SQL query to count the number of distinct active users for each month of 2024, ordered chronologically. A user is"active" if they had at least one event that month.`,
    sampleInput:`user_events table:
event_id | user_id | event_type | event_date
1        | 101     | login      | 2024-01-05
2        | 102     | purchase   | 2024-01-06
3        | 101     | view       | 2024-01-15
4        | 103     | login      | 2024-02-01
5        | 101     | purchase   | 2024-02-14
6        | 102     | login      | 2024-02-20`,
    sampleOutput:`month | monthly_active_users
1     | 2
2     | 3`,
    solution:`SELECT
  MONTH(event_date)  AS month,
  COUNT(DISTINCT user_id) AS monthly_active_users
FROM user_events
WHERE YEAR(event_date) = 2024
GROUP BY MONTH(event_date)
ORDER BY month;

-- PostgreSQL syntax:
SELECT
  DATE_TRUNC('month', event_date) AS month,
  COUNT(DISTINCT user_id)         AS monthly_active_users
FROM user_events
WHERE event_date >='2024-01-01'
  AND event_date <'2025-01-01'
GROUP BY 1
ORDER BY 1;`,
    hint:'COUNT(DISTINCT user_id) with GROUP BY the month component of the date.',
  },
  {
    id:'sql-c3',
    title:'Running Total Sales',
    difficulty:'Medium',
    description:'Compute a running (cumulative) total of daily sales using a window function.',
    problem:`You have a daily_sales table: sale_date, daily_amount.

Write a SQL query that returns each date with its daily sales and a running cumulative total of all sales up to and including that date.`,
    sampleInput:`daily_sales:
sale_date   | daily_amount
2024-01-01  | 500
2024-01-02  | 750
2024-01-03  | 300
2024-01-04  | 900
2024-01-05  | 450`,
    sampleOutput:`sale_date   | daily_amount | running_total
2024-01-01  | 500          | 500
2024-01-02  | 750          | 1250
2024-01-03  | 300          | 1550
2024-01-04  | 900          | 2450
2024-01-05  | 450          | 2900`,
    solution:`SELECT
  sale_date,
  daily_amount,
  SUM(daily_amount) OVER (
    ORDER BY sale_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM daily_sales
ORDER BY sale_date;`,
    hint:'Use SUM() OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW).',
  },
  {
    id:'sql-c4',
    title:'Customers with No Orders',
    difficulty:'Easy',
    description:'Find all customers who have never placed an order.',
    problem:`You have two tables:
- customers(customer_id, name, email, signup_date)
- orders(order_id, customer_id, order_date, amount)

Write a SQL query to return the name and email of all customers who have never placed an order.`,
    sampleInput:`customers: (101, Alice), (102, Bob), (103, Carol)
orders: order for customer 101 and 102 exist; 103 has no orders.`,
    sampleOutput:`name  | email
Carol | carol@example.com`,
    solution:`-- Method 1: LEFT JOIN + NULL check
SELECT c.name, c.email
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

-- Method 2: NOT EXISTS (often more readable)
SELECT name, email
FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.customer_id
);

-- Method 3: NOT IN (caution with NULLs in subquery)
SELECT name, email
FROM customers
WHERE customer_id NOT IN (
  SELECT DISTINCT customer_id FROM orders
  WHERE customer_id IS NOT NULL
);`,
    hint:'Use LEFT JOIN with a NULL check on the orders side, or NOT EXISTS.',
  },
  {
    id:'sql-c5',
    title:'Department Salary Ranking',
    difficulty:'Hard',
    description:'Rank employees within each department by salary and find the top earner per department.',
    problem:`You have an employees table: emp_id, name, department, salary.

Write a SQL query to return the name, department, salary, and rank within department for every employee. Then, write a second query to return only the highest-paid employee in each department. Break ties by choosing the one with the lowest emp_id.`,
    sampleInput:`employees:
1 | Alice | Engineering | 95000
2 | Bob   | Engineering | 88000
3 | Carol | Marketing   | 72000
4 | Dave  | Marketing   | 72000
5 | Eve   | Engineering | 95000`,
    sampleOutput:`-- Ranked:
name  | department  | salary | dept_rank
Alice | Engineering | 95000  | 1
Eve   | Engineering | 95000  | 1
Bob   | Engineering | 88000  | 3
Carol | Marketing   | 72000  | 1
Dave  | Marketing   | 72000  | 1

-- Top per department:
name  | department  | salary
Alice | Engineering | 95000
Carol | Marketing   | 72000`,
    solution:`-- Part 1: Rank employees within each department
SELECT
  name,
  department,
  salary,
  DENSE_RANK() OVER (
    PARTITION BY department
    ORDER BY salary DESC
  ) AS dept_rank
FROM employees;

-- Part 2: Top earner per department
WITH ranked AS (
  SELECT
    emp_id,
    name,
    department,
    salary,
    ROW_NUMBER() OVER (
      PARTITION BY department
      ORDER BY salary DESC, emp_id ASC
    ) AS rn
  FROM employees
)
SELECT name, department, salary
FROM ranked
WHERE rn = 1
ORDER BY department;`,
    hint:'Use DENSE_RANK() for Part 1. For Part 2, use ROW_NUMBER() with ORDER BY salary DESC, emp_id ASC to break ties.',
  },
  {
    id:'sql-c6',
    title:'Cohort Retention Query',
    difficulty:'Hard',
    description:'Build a basic cohort retention table showing how many users return each month after signup.',
    problem:`You have a user_activity table: user_id, activity_month (in YYYY-MM-01 format).
You have a users table: user_id, signup_month.

Write a SQL query that returns, for each signup cohort, the count of users who were active in month 0 (signup month), month 1, month 2, and month 3 after signup.`,
    sampleInput:`users: 
user_id | signup_month
1       | 2024-01-01
2       | 2024-01-01
3       | 2024-02-01

user_activity:
user_id | activity_month
1       | 2024-01-01
1       | 2024-02-01
1       | 2024-03-01
2       | 2024-01-01
3       | 2024-02-01
3       | 2024-04-01`,
    sampleOutput:`signup_month | period | active_users
2024-01-01   | 0      | 2
2024-01-01   | 1      | 1
2024-01-01   | 2      | 1
2024-02-01   | 0      | 1
2024-02-01   | 2      | 1`,
    solution:`SELECT
  u.signup_month,
  DATEDIFF(MONTH, u.signup_month, ua.activity_month) AS period,
  COUNT(DISTINCT ua.user_id) AS active_users
FROM users u
JOIN user_activity ua
  ON u.user_id = ua.user_id
WHERE DATEDIFF(MONTH, u.signup_month, ua.activity_month) BETWEEN 0 AND 3
GROUP BY
  u.signup_month,
  DATEDIFF(MONTH, u.signup_month, ua.activity_month)
ORDER BY
  u.signup_month,
  period;

-- PostgreSQL: replace DATEDIFF(MONTH,...) with
-- DATE_PART('month', AGE(ua.activity_month, u.signup_month))`,
    hint:'JOIN users to user_activity, compute the month difference as the"period" number, then GROUP BY cohort + period.',
  },
  {
    id: 'sql-c6',
    title: 'Duplicate Email Addresses',
    difficulty: 'Easy',
    description: 'Find all duplicate email addresses in a customer table.',
    problem: `You have a customers table: customer_id, first_name, last_name, email.

Write a SQL query to find all email addresses that appear more than once in the table. Return only the email column.`,
    sampleInput: `customers table:
customer_id | first_name | last_name | email
1           | John       | Doe       | john@example.com
2           | Jane       | Smith     | jane@example.com
3           | Bob        | Jones     | john@example.com
4           | Alice      | Brown     | alice@example.com
5           | Charlie    | Davis     | jane@example.com`,
    sampleOutput: `email
john@example.com
jane@example.com`,
    solution: `SELECT email
FROM customers
GROUP BY email
HAVING COUNT(email) > 1;`,
    hint: 'Group by the email and use HAVING to filter for counts greater than 1.',
  },
  {
    id: 'sql-c7',
    title: 'Employees Earning More Than Their Managers',
    difficulty: 'Medium',
    description: 'Find employees who earn more than their direct manager.',
    problem: `You have an employees table: employee_id, name, salary, manager_id. The manager_id references the employee_id of the manager.

Write a SQL query to find the names of employees who earn strictly more than their manager.`,
    sampleInput: `employees table:
employee_id | name  | salary | manager_id
1           | Joe   | 70000  | 3
2           | Henry | 80000  | 4
3           | Sam   | 60000  | NULL
4           | Max   | 90000  | NULL`,
    sampleOutput: `name
Joe`,
    solution: `SELECT e.name
FROM employees e
JOIN employees m ON e.manager_id = m.employee_id
WHERE e.salary > m.salary;`,
    hint: 'Use a SELF JOIN to link the employee to their manager by matching manager_id to employee_id.',
  },
];

const pythonChallenges: Challenge[] = [
  {
    id:'py-c1',
    title:'Clean and Aggregate Sales Data',
    difficulty:'Easy',
    description:'Load a messy CSV, clean missing values, and compute total sales by region.',
    problem:`You receive a CSV with columns: order_id, region, sales_amount, order_date.
Some rows have missing region values (NaN) and some sales_amount values are 0 or negative (data errors).

Write Python (Pandas) code to:
1. Load the CSV
2. Drop rows where region is missing
3. Remove rows where sales_amount <= 0
4. Compute total sales and order count by region
5. Sort by total_sales descending`,
    sampleInput:`order_id,region,sales_amount,order_date
1,East,500,2024-01-01
2,,200,2024-01-02
3,West,750,2024-01-03
4,East,-100,2024-01-04
5,West,300,2024-01-05
6,East,0,2024-01-06`,
    sampleOutput:`region  total_sales  order_count
West    1050         2
East    500          1`,
    solution:`import pandas as pd

# 1. Load
df = pd.read_csv('sales.csv')

# 2. Drop missing region
df = df.dropna(subset=['region'])

# 3. Remove invalid sales_amount
df = df[df['sales_amount'] > 0]

# 4. Aggregate by region
result = (
    df.groupby('region')
    .agg(
        total_sales=('sales_amount','sum'),
        order_count=('order_id','count')
    )
    .reset_index()
)

# 5. Sort descending
result = result.sort_values('total_sales', ascending=False)
print(result)`,
    hint:'Use dropna(subset=[...]), boolean filtering, and groupby().agg().',
  },
  {
    id:'py-c2',
    title:'Identify Top N Customers per Month',
    difficulty:'Medium',
    description:'Find the top 3 customers by spend for each calendar month.',
    problem:`You have a DataFrame with columns: customer_id, order_date (datetime), amount.

Write Python code to:
1. Extract the year-month from order_date
2. Compute total spend per customer per month
3. Rank customers within each month by spend (highest = rank 1)
4. Return only the top 3 customers per month`,
    sampleInput:`customer_id | order_date  | amount
C1          | 2024-01-05  | 500
C2          | 2024-01-10  | 800
C3          | 2024-01-12  | 300
C1          | 2024-01-20  | 400
C4          | 2024-02-01  | 1200
C1          | 2024-02-15  | 600`,
    sampleOutput:`month    customer_id  total_spend  rank
2024-01  C2           800          1
2024-01  C1           900          1   (note: ties handled by dense_rank)
2024-01  C3           300          3
2024-02  C4           1200         1
2024-02  C1           600          2`,
    solution:`import pandas as pd

df['order_date'] = pd.to_datetime(df['order_date'])
df['month'] = df['order_date'].dt.to_period('M').astype(str)

# Aggregate by month + customer
monthly = (
    df.groupby(['month','customer_id'])['amount']
    .sum()
    .reset_index(name='total_spend')
)

# Rank within each month
monthly['rank'] = (
    monthly.groupby('month')['total_spend']
    .rank(method='dense', ascending=False)
    .astype(int)
)

# Keep top 3
top3 = monthly[monthly['rank'] <= 3].sort_values(['month','rank'])
print(top3)`,
    hint:'Use dt.to_period("M") for month extraction, groupby + rank(method="dense", ascending=False).',
  },
  {
    id:'py-c3',
    title:'Detect Outliers with IQR',
    difficulty:'Medium',
    description:'Identify and flag outliers in a numerical column using the IQR method.',
    problem:`Given a DataFrame with a salary column, write Python code to:
1. Compute Q1, Q3, and IQR
2. Define lower and upper bounds (Q1 - 1.5×IQR, Q3 + 1.5×IQR)
3. Add a boolean column'is_outlier' flagging rows outside the bounds
4. Print summary: total rows, number of outliers, outlier percentage`,
    sampleInput:`salaries = [45000, 50000, 48000, 52000, 47000, 
            150000, 49000, 51000, 46000, 2000, 
            53000, 48500, 200000, 50500]`,
    sampleOutput:`Total rows: 14
Outliers: 3
Outlier %: 21.43%

Outlier rows:
   salary  is_outlier
5  150000        True
9    2000        True
12 200000        True`,
    solution:`import pandas as pd

df = pd.DataFrame({'salary': [
    45000, 50000, 48000, 52000, 47000,
    150000, 49000, 51000, 46000, 2000,
    53000, 48500, 200000, 50500
]})

Q1 = df['salary'].quantile(0.25)
Q3 = df['salary'].quantile(0.75)
IQR = Q3 - Q1

lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

df['is_outlier'] = ~df['salary'].between(lower, upper)

n_outliers = df['is_outlier'].sum()
print(f"Total rows: {len(df)}")
print(f"Outliers: {n_outliers}")
print(f"Outlier %: {n_outliers / len(df) * 100:.2f}%")
print()
print(df[df['is_outlier']])`,
    hint:'Use .quantile(0.25) and .quantile(0.75), then between() for the mask.',
  },
  {
    id:'py-c4',
    title:'Time Series Resampling & Moving Average',
    difficulty:'Hard',
    description:'Resample daily data to weekly and compute a 4-week rolling average.',
    problem:`You have a DataFrame with columns: date (daily, datetime index), page_views.

Write Python code to:
1. Set the date as the index
2. Resample to weekly frequency (Monday start), summing page_views
3. Compute a 4-week rolling average of the weekly sums
4. Plot both the weekly series and rolling average on the same chart (using matplotlib)`,
    sampleInput:`date        | page_views
2024-01-01  | 1200
2024-01-02  | 1350
... (90 days of daily data)`,
    sampleOutput:`Weekly resampled DataFrame with rolling_avg column plotted.`,
    solution:`import pandas as pd
import matplotlib.pyplot as plt

# Assume df has'date' and'page_views' columns
df['date'] = pd.to_datetime(df['date'])
df = df.set_index('date')

# Resample to weekly (Monday start)
weekly = df['page_views'].resample('W-MON').sum().rename('weekly_views')
weekly = weekly.to_frame()

# 4-week rolling average
weekly['rolling_4w'] = weekly['weekly_views'].rolling(window=4, min_periods=1).mean()

# Plot
fig, ax = plt.subplots(figsize=(12, 5))
ax.plot(weekly.index, weekly['weekly_views'], label='Weekly Views', color='#3B82F6', alpha=0.6)
ax.plot(weekly.index, weekly['rolling_4w'], label='4-Week Rolling Avg',
        color='#EF4444', linewidth=2.5)
ax.set_title('Weekly Page Views with 4-Week Rolling Average')
ax.set_xlabel('Week')
ax.set_ylabel('Page Views')
ax.legend()
plt.tight_layout()
plt.show()`,
    hint:'Use .resample("W-MON").sum() then .rolling(4).mean(). Set min_periods=1 to avoid NaN for the first 3 weeks.',
  },
];

const excelChallenges: Challenge[] = [
  {
    id:'xl-c1',
    title:'Dynamic SUMIFS Dashboard',
    difficulty:'Easy',
    description:'Build a summary table using SUMIFS to calculate sales by region and product category.',
    problem:`Your data is in a table named SalesData with columns: Date, Region, Category, Sales, Units.

In a separate summary area, build formulas to calculate:
1. Total Sales for each Region (East, West, North, South)
2. Total Units for each Category (Electronics, Clothing, Food)
3. Sales for each Region + Category combination (cross-tab)

The summary should update automatically when new rows are added to SalesData.`,
    sampleInput:`SalesData table (Excel Table format):
Date       | Region | Category    | Sales  | Units
2024-01-05 | East   | Electronics | 1200   | 3
2024-01-06 | West   | Clothing    | 450    | 5
2024-01-07 | East   | Food        | 200    | 8
2024-01-08 | North  | Electronics | 850    | 2`,
    sampleOutput:`Region Sales:  East=1400, West=450, North=850, South=0
Category Units: Electronics=5, Clothing=5, Food=8

Cross-tab:
             Electronics  Clothing  Food
East         1200         0         200
West         0            450       0
North        850          0         0`,
    solution:`-- Region Sales (in B2, where A2 ="East"):
=SUMIFS(SalesData[Sales], SalesData[Region], A2)

-- Category Units (in F2, where E2 ="Electronics"):
=SUMIFS(SalesData[Units], SalesData[Category], E2)

-- Cross-tab (in cross-tab cell where $A2 = Region, B$1 = Category):
=SUMIFS(
    SalesData[Sales],
    SalesData[Region],    $A2,
    SalesData[Category],  B$1
)

Key points:
- Lock the Region column reference ($A2) and Category row reference (B$1)
  using mixed references so you can drag the formula across the whole table.
- Excel Tables (Ctrl+T) make the ranges auto-expand as data grows.
- Use IFERROR(..., 0) to show 0 instead of blank for missing combinations.`,
    hint:'Use mixed references ($A2 locks column, B$1 locks row) so the cross-tab formula can be dragged in both directions.',
  },
  {
    id:'xl-c2',
    title:'Cohort Retention with Pivot Tables',
    difficulty:'Medium',
    description:'Build a retention heat map using Pivot Tables and conditional formatting.',
    problem:`You have a flat table with columns: user_id, signup_month, activity_month, period_number (0, 1, 2...).

Create a retention analysis showing:
1. A Pivot Table with signup_month as rows and period_number as columns, showing COUNT of distinct users
2. Add a calculated field or helper column for retention % (divide each cell by the Period 0 count)
3. Apply a Green-to-White color scale for the percentage values to create a heat map
4. Add a total row showing average retention across all cohorts`,
    sampleInput:`user_id | signup_month | activity_month | period_number
1       | Jan-2024     | Jan-2024       | 0
1       | Jan-2024     | Feb-2024       | 1
2       | Jan-2024     | Jan-2024       | 0
3       | Feb-2024     | Feb-2024       | 0`,
    sampleOutput:`Pivot Table (count of user_id):
signup_month | Period 0 | Period 1 | Period 2
Jan-2024     | 2        | 1        | ...
Feb-2024     | 1        | ...

Retention %:
Jan-2024     | 100%     | 50%      | ...`,
    solution:`Step-by-step:

1. SELECT data → Insert → PivotTable → New Sheet

2. Configure Pivot:
   - ROWS: signup_month
   - COLUMNS: period_number
   - VALUES: Count of user_id (change to COUNT in field settings)

3. Retention % helper table (next to pivot):
   - Reference Period 0 column as base:
     =GETPIVOTDATA("user_id", $A$3,"signup_month", $A6,"period_number", 0)
   - Retention formula:
     =IFERROR(GETPIVOTDATA("user_id", $A$3,"signup_month", $A6,"period_number", B$5) 
              / [Period 0 value],"")

4. Select the retention % range → Home → Conditional Formatting
   → Color Scales → Green-White (reverse: green = high %)

5. Add average row: =AVERAGEIF(range,">0") for each period column`,
    hint:'Use GETPIVOTDATA to pull specific Pivot Table cells into a retention % calculation table, then apply a color scale.',
  },
  {
    id:'xl-c3',
    title:'Power Query Data Cleaning Pipeline',
    difficulty:'Medium',
    description:'Build a repeatable ETL pipeline using Power Query to clean a messy CSV.',
    problem:`You receive a monthly CSV export with these problems:
- Column headers have trailing spaces
-"Date" column is text formatted as"DD/MM/YYYY"
-"Revenue" column has"$" symbols and commas (e.g.,"$1,234.56")
-"Region" column has inconsistent casing ("east","EAST","East")
- Some rows have completely blank Revenue values

Build a Power Query pipeline that fixes all issues and outputs a clean table.`,
    sampleInput:`Date      | Region  | Revenue   | Product
05/01/2024| east    | $1,200.00 | Laptop
06/01/2024| WEST    | $450.00   | Mouse
07/01/2024| East    |           | Keyboard
08/01/2024| NORTH   | $2,100.50 | Monitor`,
    sampleOutput:`Date       | Region | Revenue | Product
2024-01-05 | East   | 1200.00 | Laptop
2024-01-06 | West   | 450.00  | Mouse
2024-01-08 | North  | 2100.50 | Monitor  (blank row removed)`,
    solution:`Power Query M code (each step in Applied Steps):

1. Source = Csv.Document(...)
2. PromotedHeaders = Table.PromoteHeaders(Source)

3. // Trim column headers
   RenamedCols = Table.TransformColumnNames(
       PromotedHeaders, Text.Trim)

4. // Fix Date: parse DD/MM/YYYY string to date
   ParsedDate = Table.TransformColumns(RenamedCols, {
       {"Date", each Date.FromText(_, [Format="dd/MM/yyyy"]), type date}
   })

5. // Clean Revenue: remove $ and , then convert to number
   CleanRevenue = Table.TransformColumns(ParsedDate, {
       {"Revenue", each 
           if _ = null or _ ="" then null
           else Number.FromText(Text.Remove(_, {"$",","})),
       type number}
   })

6. // Standardize Region to Proper case
   StandardRegion = Table.TransformColumns(CleanRevenue, {
       {"Region", Text.Proper, type text}
   })

7. // Remove blank Revenue rows
   FilteredRows = Table.SelectRows(StandardRegion,
       each [Revenue] <> null)

// Load to worksheet: Close & Load To → Table`,
    hint:'In Power Query, use Text.Remove() for currency symbols and Date.FromText() with a Format argument for date parsing.',
  },
  {
    id:'xl-c4',
    title:'INDEX-MATCH with Multiple Criteria',
    difficulty:'Hard',
    description:'Use an array-based INDEX-MATCH to look up values matching two conditions simultaneously.',
    problem:`You have a pricing table with columns: Product (A), Region (B), Price (C).

You need a lookup formula that returns the price for a given Product AND Region combination — standard VLOOKUP cannot handle two lookup columns.

Write a formula using INDEX-MATCH (or XLOOKUP) that:
1. Takes Product from cell F2 and Region from G2
2. Looks up the correct Price from column C
3. Shows"Not Found" if no match exists`,
    sampleInput:`Pricing table (A:C):
Product  | Region | Price
Laptop   | East   | 1200
Laptop   | West   | 1100
Mouse    | East   | 25
Mouse    | West   | 22
Monitor  | East   | 350

Lookup: F2 ="Laptop", G2 ="West"`,
    sampleOutput:`Result: 1100`,
    solution:`-- Classic INDEX-MATCH array formula (Ctrl+Shift+Enter in older Excel):
=IFERROR(
    INDEX(C:C,
        MATCH(1, (A:A=F2)*(B:B=G2), 0)
    ),"Not Found"
)

-- In Excel 365 (dynamic array, just Enter):
=IFERROR(
    INDEX(C2:C100,
        MATCH(1, (A2:A100=F2)*(B2:B100=G2), 0)
    ),"Not Found"
)

-- Cleanest option - XLOOKUP with & concatenation:
=IFERROR(
    XLOOKUP(F2&G2, A2:A100&B2:B100, C2:C100),"Not Found"
)

Explanation:
- (A:A=F2)*(B:B=G2) creates an array of 1s where both conditions are TRUE
- MATCH(1, ..., 0) finds the row position of the first 1
- INDEX retrieves the Price from that row
- XLOOKUP with & concatenation is the simplest modern approach`,
    hint:'Multiply two boolean arrays to simulate AND logic: (A:A=F2)*(B:B=G2). Or use XLOOKUP with concatenated lookup keys.',
  },
];

const tabs: CategoryTab[] = [
  { id:'sql', label:'SQL', icon: <Database size={18} />, color:'#3B82F6', challenges: sqlChallenges },
  { id:'python', label:'Python', icon: <Code2 size={18} />, color:'#8B5CF6', challenges: pythonChallenges },
  { id:'excel', label:'Excel', icon: <FileSpreadsheet size={18} />, color:'#10B981', challenges: excelChallenges },
];

const difficultyColors: Record<Difficulty, { bg: string; text: string; border: string }> = {
  Easy: { bg:'#10B98118', text:'#10B981', border:'#10B98133' },
  Medium: { bg:'#F59E0B18', text:'#F59E0B', border:'#F59E0B33' },
  Hard: { bg:'#EF444418', text:'#EF4444', border:'#EF444433' },
};

interface ModalState {
  challenge: Challenge;
  showSolution: boolean;
}

export default function PracticePage() {
  const [activeTab, setActiveTab] = useState('sql');
  const [modal, setModal] = useState<ModalState | null>(null);

  const currentTab = tabs.find((t) => t.id === activeTab)!;

  const openModal = (challenge: Challenge) => {
    setModal({ challenge, showSolution: false });
  };

  const closeModal = () => {
    setModal(null);
  };

  const toggleSolution = () => {
    setModal((prev) => prev ? { ...prev, showSolution: !prev.showSolution } : prev);
  };

  return (
    <main
      style={{
        minHeight:'100vh',
        background:'var(--bg-base)',
      }}
    >
      {/* Header */}
      <section
        style={{
          background:'var(--bg-surface)',
          borderBottom:'1px solid var(--border)',
          padding:'48px 24px 0',
        }}
      >
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
            <div
              style={{
                width:'40px',
                height:'40px',
                borderRadius:'10px',
                background:'var(--bg-raised)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                color:'var(--accent)',
              }}
            >
              <Zap size={20} />
            </div>
            <div>
              <h1 className="h1" style={{ margin: 0, padding: 0 }}>
                Practice Platform
              </h1>
              <p style={{ fontSize:'0.875rem', color:'var(--text-secondary)', margin: 0, marginTop: '4px' }}>
                Hands-on challenges with real problems, sample data, and reference solutions.
              </p>
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ display:'flex', gap:'4px', marginTop:'28px' }}>
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display:'flex',
                    alignItems:'center',
                    gap:'8px',
                    padding:'10px 20px',
                    borderRadius:'10px 10px 0 0',
                    border:'1px solid',
                    borderBottom: isActive ?'1px solid var(--bg-base)' :'1px solid var(--border)',
                    borderColor: isActive ?`${tab.color}44` :'var(--border)',
                    background: isActive ?'var(--bg-base)' :'transparent',
                    color: isActive ? tab.color :'var(--text-secondary)',
                    cursor:'pointer',
                    fontSize:'0.9rem',
                    fontWeight: isActive ? 700 : 500,
                    transition:'all 0.15s ease',
                    marginBottom:'-1px',
                    position:'relative',
                    zIndex: isActive ? 1 : 0,
                  }}
                >
                  {tab.icon}
                  {tab.label}
                  <span
                    style={{
                      background: isActive ?`${tab.color}22` :'var(--bg-raised)',
                      color: isActive ? tab.color :'var(--text-tertiary)',
                      borderRadius:'999px',
                      padding:'1px 8px',
                      fontSize:'12px',
                      fontWeight: 600,
                    }}
                  >
                    {tab.challenges.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Challenges Grid */}
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'40px 24px 80px' }}>
        <div
          style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',
            gap:'20px',
          }}
        >
          {currentTab.challenges.map((challenge) => {
            const dc = difficultyColors[challenge.difficulty];
            return (
              <div
                key={challenge.id}
                className="card"
                style={{
                  padding:'24px',
                  display:'flex',
                  flexDirection:'column',
                  gap:'12px',
                  transition:'transform 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform ='translateY(-3px)';
                  el.style.borderColor =`${currentTab.color}44`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform ='translateY(0)';
                  el.style.borderColor ='var(--border)';
                }}
              >
                {/* Top bar */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span
                    style={{
                      fontSize:'11px',
                      fontWeight: 600,
                      color: dc.text,
                      background: dc.bg,
                      border:`1px solid ${dc.border}`,
                      borderRadius:'999px',
                      padding:'3px 10px',
                    }}
                  >
                    {challenge.difficulty}
                  </span>
                  <div
                    style={{
                      width:'28px',
                      height:'28px',
                      borderRadius:'7px',
                      background:'var(--bg-raised)',
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      color: currentTab.color,
                    }}
                  >
                    {currentTab.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="h3" style={{ margin: 0 }}>
                  {challenge.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize:'0.85rem',
                    color:'var(--text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {challenge.description}
                </p>

                {/* Start button */}
                <button
                  onClick={() => openModal(challenge)}
                  style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    gap:'6px',
                    padding:'10px 16px',
                    borderRadius:'10px',
                    background:`color-mix(in srgb, ${currentTab.color} 10%, transparent)`,
                    border:`1px solid ${currentTab.color}44`,
                    color: currentTab.color,
                    fontWeight: 600,
                    fontSize:'0.875rem',
                    cursor:'pointer',
                    transition:'background 0.15s ease',
                    marginTop:'4px',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = `color-mix(in srgb, ${currentTab.color} 20%, transparent)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = `color-mix(in srgb, ${currentTab.color} 10%, transparent)`;
                  }}
                >
                  <BookOpen size={15} />
                  Start Challenge
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal Overlay */}
      {modal && (
        <div
          onClick={closeModal}
          style={{
            position:'fixed',
            inset: 0,
            background:'rgba(0,0,0,0.5)',
            backdropFilter:'blur(4px)',
            zIndex: 50,
            display:'flex',
            alignItems:'flex-start',
            justifyContent:'center',
            padding:'24px 16px',
            overflowY:'auto',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="card"
            style={{
              width:'100%',
              maxWidth:'780px',
              overflow:'hidden',
              boxShadow:'0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              marginTop:'16px',
              marginBottom:'40px',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between',
                padding:'20px 24px',
                borderBottom:'1px solid var(--border)',
                background:'var(--bg-raised)',
              }}
            >
              <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <span
                  style={{
                    fontSize:'11px',
                    fontWeight: 600,
                    color: difficultyColors[modal.challenge.difficulty].text,
                    background: difficultyColors[modal.challenge.difficulty].bg,
                    border:`1px solid ${difficultyColors[modal.challenge.difficulty].border}`,
                    borderRadius:'999px',
                    padding:'3px 10px',
                  }}
                >
                  {modal.challenge.difficulty}
                </span>
                <h2 className="h3" style={{ margin: 0 }}>
                  {modal.challenge.title}
                </h2>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background:'transparent',
                  border:'1px solid var(--border)',
                  borderRadius:'8px',
                  width:'32px',
                  height:'32px',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  color:'var(--text-secondary)',
                  cursor:'pointer',
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding:'24px', display:'flex', flexDirection:'column', gap:'20px' }}>
              {/* Problem Statement */}
              <div>
                <h3
                  style={{
                    fontSize:'0.8rem',
                    fontWeight: 600,
                    color:'var(--text-secondary)',
                    textTransform:'uppercase',
                    letterSpacing:'0.1em',
                    marginBottom:'10px',
                  }}
                >
                  📋 Problem Statement
                </h3>
                <div
                  style={{
                    background:'var(--bg-base)',
                    border:'1px solid var(--border)',
                    borderRadius:'10px',
                    padding:'16px',
                    fontSize:'0.875rem',
                    color:'var(--text-primary)',
                    lineHeight: 1.7,
                    whiteSpace:'pre-wrap',
                    fontFamily:'inherit',
                  }}
                >
                  {modal.challenge.problem}
                </div>
              </div>

              {/* Sample Input */}
              <div>
                <h3
                  style={{
                    fontSize:'0.8rem',
                    fontWeight: 600,
                    color:'var(--text-secondary)',
                    textTransform:'uppercase',
                    letterSpacing:'0.1em',
                    marginBottom:'10px',
                  }}
                >
                  📥 Sample Input
                </h3>
                <pre
                  style={{
                    background:'var(--bg-base)',
                    border:'1px solid var(--border)',
                    borderRadius:'10px',
                    padding:'16px',
                    fontSize:'0.8rem',
                    color:'var(--text-secondary)',
                    lineHeight: 1.6,
                    overflowX:'auto',
                    margin: 0,
                    fontFamily:'"Fira Code","Cascadia Code","Consolas", monospace',
                  }}
                >
                  {modal.challenge.sampleInput}
                </pre>
              </div>

              {/* Expected Output */}
              <div>
                <h3
                  style={{
                    fontSize:'0.8rem',
                    fontWeight: 600,
                    color:'var(--text-secondary)',
                    textTransform:'uppercase',
                    letterSpacing:'0.1em',
                    marginBottom:'10px',
                  }}
                >
                  📤 Expected Output
                </h3>
                <pre
                  style={{
                    background:'var(--bg-base)',
                    border:'1px solid var(--success)',
                    borderRadius:'10px',
                    padding:'16px',
                    fontSize:'0.8rem',
                    color:'var(--text-primary)',
                    lineHeight: 1.6,
                    overflowX:'auto',
                    margin: 0,
                    fontFamily:'"Fira Code","Cascadia Code","Consolas", monospace',
                  }}
                >
                  {modal.challenge.sampleOutput}
                </pre>
              </div>

              {/* Hint */}
              {modal.challenge.hint && (
                <div
                  style={{
                    background:'color-mix(in srgb, var(--warning) 10%, transparent)',
                    border:'1px solid color-mix(in srgb, var(--warning) 25%, transparent)',
                    borderRadius:'10px',
                    padding:'12px 16px',
                    display:'flex',
                    gap:'10px',
                    alignItems:'flex-start',
                  }}
                >
                  <span style={{ fontSize:'16px', flexShrink: 0 }}>💡</span>
                  <p
                    style={{
                      fontSize:'0.85rem',
                      color:'var(--warning)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    <strong>Hint:</strong> {modal.challenge.hint}
                  </p>
                </div>
              )}

              {/* Show Solution Toggle */}
              <div>
                <button
                  onClick={toggleSolution}
                  style={{
                    display:'flex',
                    alignItems:'center',
                    gap:'8px',
                    padding:'10px 18px',
                    borderRadius:'10px',
                    background: modal.showSolution ?'color-mix(in srgb, var(--accent) 15%, transparent)' :'transparent',
                    border: modal.showSolution
                      ?'1px solid color-mix(in srgb, var(--accent) 40%, transparent)'
                      :'1px solid var(--border)',
                    color: modal.showSolution ?'var(--accent)' :'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize:'0.875rem',
                    cursor:'pointer',
                    transition:'all 0.15s ease',
                    marginBottom: modal.showSolution ?'12px' : 0,
                  }}
                >
                  {modal.showSolution ? <EyeOff size={16} /> : <Eye size={16} />}
                  {modal.showSolution ?'Hide Solution' :'Show Solution'}
                </button>

                {modal.showSolution && (
                  <div>
                    <pre
                      style={{
                        background:'var(--bg-base)',
                        border:'1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                        borderRadius:'10px',
                        padding:'20px',
                        fontSize:'0.8rem',
                        color:'var(--text-primary)',
                        lineHeight: 1.7,
                        overflowX:'auto',
                        margin: 0,
                        fontFamily:'"Fira Code","Cascadia Code","Consolas", monospace',
                        whiteSpace:'pre-wrap',
                      }}
                    >
                      {modal.challenge.solution}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

