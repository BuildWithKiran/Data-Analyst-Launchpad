"use client";

import React, { useState } from"react";
import { Download, Search, Database, BarChart3, Code2, TrendingUp, Calculator, Layers, Printer } from"lucide-react";

const cheatSheets = [
  {
    id:"sql",
    title:"SQL Cheat Sheet",
    icon: Database,
    color:"#3B82F6",
    bg:"rgba(59,130,246,0.1)",
    description:"Complete SQL reference: SELECT, JOINs, GROUP BY, Window Functions, CTEs, and more.",
    topics: ["SELECT & Filtering","JOINs","Aggregations","Subqueries","CTEs","Window Functions","Indexes"],
    content:`-- SQL QUICK REFERENCE

-- BASIC SELECT
SELECT col1, col2 FROM table WHERE condition ORDER BY col LIMIT 10;

-- JOINS
INNER JOIN t2 ON t1.id = t2.id    -- matching rows
LEFT JOIN t2 ON t1.id = t2.id     -- all left + matching right
FULL OUTER JOIN t2 ON t1.id = t2.id  -- all rows both tables

-- AGGREGATES
COUNT(*), SUM(col), AVG(col), MAX(col), MIN(col)
GROUP BY col HAVING COUNT(*) > 5

-- WINDOW FUNCTIONS
ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)
LAG(salary, 1) OVER (ORDER BY date)
SUM(amount) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)

-- CTEs
WITH cte AS (SELECT * FROM orders WHERE year = 2024)
SELECT * FROM cte;

-- NULL HANDLING
IS NULL, IS NOT NULL, COALESCE(col,'default'), NULLIF(col, 0)

-- STRING FUNCTIONS
UPPER(), LOWER(), TRIM(), LENGTH(), SUBSTRING(col, 1, 5)
CONCAT(), REPLACE(), LIKE'%pattern%'

-- DATE FUNCTIONS
NOW(), DATE_ADD(date, INTERVAL 7 DAY), DATEDIFF(date1, date2)
YEAR(), MONTH(), DAY(), DATE_FORMAT(date,'%Y-%m-%d')`,
  },
  {
    id:"excel",
    title:"Excel Cheat Sheet",
    icon: BarChart3,
    color:"#10B981",
    bg:"rgba(16,185,129,0.1)",
    description:"Essential Excel formulas, functions, shortcuts, and keyboard commands.",
    topics: ["Formulas","Lookups","Text Functions","Date Functions","Keyboard Shortcuts","Pivot Tables"],
    content:`-- EXCEL QUICK REFERENCE

-- LOOKUP FUNCTIONS
=VLOOKUP(lookup, table, col_index, FALSE)
=XLOOKUP(lookup, lookup_array, return_array,"Not Found")
=INDEX(return_range, MATCH(lookup, search_range, 0))

-- CONDITIONAL
=IF(B2>1000,"High","Low")
=IFS(B2>5000,"A", B2>1000,"B", TRUE,"C")
=IFERROR(VLOOKUP(A2,D:E,2,0),"Not Found")

-- AGGREGATE
=SUMIF(range, criteria, sum_range)
=SUMIFS(sum_range, r1, c1, r2, c2)
=COUNTIF(range,">0")
=AVERAGEIF(range,">50")

-- TEXT
=LEFT(A2,3)  =RIGHT(A2,4)  =MID(A2,2,5)
=TRIM(A2)  =UPPER(A2)  =LOWER(A2)  =PROPER(A2)
=LEN(A2)  =FIND("@",A2)  =SUBSTITUTE(A2,"old","new")

-- DATE
=TODAY()  =NOW()  =YEAR(A2)  =MONTH(A2)  =DAY(A2)
=DATEDIF(start,end,"Y")  -- years between dates
=EOMONTH(A2,0)  -- last day of month

-- KEYBOARD SHORTCUTS
Ctrl+T = Create Table  | Ctrl+Z = Undo
Ctrl+Shift+L = Filters | Alt+= = AutoSum
F4 = Absolute reference | Ctrl+; = Today's date`,
  },
  {
    id:"pandas",
    title:"Pandas Cheat Sheet",
    icon: Code2,
    color:"#8B5CF6",
    bg:"rgba(139,92,246,0.1)",
    description:"Pandas DataFrame and Series operations for data manipulation and analysis.",
    topics: ["Reading Data","Selection","Filtering","GroupBy","Merge/Join","Cleaning","Reshaping"],
    content:`# PANDAS QUICK REFERENCE

# READ DATA
df = pd.read_csv('file.csv')
df = pd.read_excel('file.xlsx')
df = pd.read_sql(query, conn)

# INSPECT
df.head()  df.tail()  df.shape  df.info()  df.describe()
df.dtypes  df.columns  df.isnull().sum()

# SELECT
df['col']              # Series
df[['c1','c2']]        # DataFrame
df.loc[0:5,'col']     # label-based
df.iloc[0:5, 0:3]      # position-based

# FILTER
df[df['sal'] > 50000]
df[(df['dept']=='IT') & (df['sal']>60000)]
df.query("sal > 50000 and dept =='IT'")

# GROUPBY
df.groupby('dept')['sal'].agg(['sum','mean','count'])
df.groupby(['dept','city']).agg({'sal':'sum','age':'mean'})

# MERGE
pd.merge(df1, df2, on='id', how='left')
pd.concat([df1, df2], axis=0)  # stack rows

# CLEAN
df.dropna()  df.fillna(0)
df.drop_duplicates()
df['col'] = pd.to_numeric(df['col'], errors='coerce')
df['date'] = pd.to_datetime(df['date'])

# APPLY
df['bonus'] = df['sal'].apply(lambda x: x*0.1 if x>50000 else x*0.05)

# PIVOT
df.pivot_table(values='sal', index='dept', columns='city', aggfunc='mean')`,
  },
  {
    id:"python",
    title:"Python Basics Cheat Sheet",
    icon: Code2,
    color:"#F97316",
    bg:"rgba(249,115,22,0.1)",
    description:"Python fundamentals: data types, loops, functions, list comprehensions, and OOP.",
    topics: ["Data Types","Control Flow","Functions","List Comprehension","File I/O","Error Handling"],
    content:`# PYTHON QUICK REFERENCE

# DATA TYPES
int, float, str, bool, None
list [], tuple (), dict {}, set {}

# LIST OPERATIONS
lst = [1,2,3,4,5]
lst.append(6)  lst.extend([7,8])
lst.sort()  sorted(lst)
len(lst)  sum(lst)  max(lst)  min(lst)

# DICT OPERATIONS
d = {'name':'Alice','age':25}
d.get('name','Unknown')
d.keys()  d.values()  d.items()
d.update({'city':'Mumbai'})

# CONTROL FLOW
if x > 0: ...
elif x == 0: ...
else: ...

for item in list: ...
for i, v in enumerate(lst): ...
for k, v in dict.items(): ...
while condition: ...

# FUNCTIONS
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# LIST COMPREHENSION
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]

# ERROR HANDLING
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
finally:
    print("Always runs")

# FILE I/O
with open('file.csv','r') as f:
    content = f.readlines()`,
  },
  {
    id:"numpy",
    title:"NumPy Cheat Sheet",
    icon: Calculator,
    color:"#06B6D4",
    bg:"rgba(6,182,212,0.1)",
    description:"NumPy array operations, math functions, indexing, and statistical computing.",
    topics: ["Array Creation","Operations","Indexing","Math Functions","Statistics","Linear Algebra"],
    content:`# NUMPY QUICK REFERENCE
import numpy as np

# CREATE ARRAYS
np.array([1,2,3])
np.zeros((3,4))  np.ones((3,4))  np.eye(3)
np.arange(0,10,2)  np.linspace(0,1,50)
rng = np.random.default_rng(42)
rng.normal(0, 1, 1000)  # mean=0, std=1, size=1000

# ARRAY INFO
arr.shape  arr.ndim  arr.size  arr.dtype

# INDEXING
arr[0]       # first element
arr[0:5]     # slice
arr[[1,3,5]] # fancy indexing
arr[arr > 0] # boolean indexing

# RESHAPE
arr.reshape(3,4)   arr.flatten()   arr.T (transpose)

# MATH OPERATIONS (vectorized)
arr + 10  arr * 2  arr ** 2
np.sqrt(arr)  np.log(arr)  np.exp(arr)

# STATISTICS
np.mean(arr)  np.std(arr)  np.var(arr)
np.median(arr)  np.percentile(arr, [25,50,75])
np.sum(arr, axis=0)  np.min(arr)  np.max(arr)

# LINEAR ALGEBRA
np.dot(a, b)  a @ b  np.linalg.inv(A)
np.linalg.eig(A)  np.linalg.norm(v)`,
  },
  {
    id:"powerbi",
    title:"Power BI Cheat Sheet",
    icon: TrendingUp,
    color:"#F59E0B",
    bg:"rgba(245,158,11,0.1)",
    description:"Power BI keyboard shortcuts, DAX basics, and report design tips.",
    topics: ["DAX Functions","Data Modeling","Shortcuts","Visualization Tips","Time Intelligence"],
    content:`-- POWER BI / DAX QUICK REFERENCE

-- BASIC MEASURES
Total Sales = SUM(Sales[Amount])
Sales Count = COUNT(Sales[OrderID])
Avg Price = AVERAGE(Products[Price])

-- CALCULATE
Sales IT = CALCULATE([Total Sales], Products[Category]="IT")
Sales Top5 = CALCULATE([Total Sales], TOPN(5, Products, [Total Sales]))

-- FILTER FUNCTIONS
ALL() -- remove all filters
ALLEXCEPT(table, col) -- remove all except specified
FILTER(table, condition) -- return filtered table

-- TIME INTELLIGENCE
Sales LY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Date[Date]))
YTD = TOTALYTD([Total Sales], Date[Date])
QTD = TOTALQTD([Total Sales], Date[Date])
MTD = TOTALMTD([Total Sales], Date[Date])

-- RANKING
Rank = RANKX(ALL(Products[Name]), [Total Sales])
Top N = CALCULATE([Total Sales], TOPN(10, Products, [Total Sales]))

-- TEXT & MATH
CONCATENATE(col1, col2)  FORMAT(value,"0.00%")
DIVIDE(numerator, denominator, 0)
IF([Sales]>0,"Positive","Zero/Negative")

-- KEYBOARD SHORTCUTS
Ctrl+Z = Undo | Ctrl+Y = Redo
Ctrl+G = Group visuals | Alt+Shift+F = Format pane
F5 = Refresh data | Ctrl+Shift+P = Performance Analyzer`,
  },
  {
    id:"dax",
    title:"DAX Functions Cheat Sheet",
    icon: TrendingUp,
    color:"#EC4899",
    bg:"rgba(236,72,153,0.1)",
    description:"Complete DAX function reference for Power BI and Analysis Services.",
    topics: ["Aggregation","CALCULATE","Time Intelligence","Text","Logical","Iterator Functions"],
    content:`-- DAX COMPLETE REFERENCE

-- AGGREGATION
SUM(col)   SUMX(table, expression)
COUNT(col)  COUNTA(col)  COUNTROWS(table)
AVERAGE(col)  AVERAGEX(table, expr)
MAX(col)  MIN(col)  MAXX(table, expr)

-- CALCULATE & FILTER
CALCULATE(expr, filter1, filter2)
FILTER(table, condition)
ALL(table/col) -- remove filters
ALLEXCEPT(table, keep_cols)
ALLSELECTED() -- respects slicer selections
VALUES(col) -- unique visible values
SELECTEDVALUE(col)

-- ITERATOR FUNCTIONS (X functions)
SUMX(Sales, Sales[Qty] * Sales[Price])
AVERAGEX(Products, Products[Price] * Products[Qty])
COUNTX(table, expression)
MAXX(table, expression)

-- RELATIONSHIP
RELATED(col) -- lookup in related table
RELATEDTABLE(table) -- get related rows
USERELATIONSHIP(col1, col2) -- use inactive relationship

-- TEXT
FORMAT(value,"format_string")
CONCATENATE(text1, text2)
LEFT(text, n)  RIGHT(text, n)  MID(text, start, n)
TRIM(text)  UPPER(text)  LOWER(text)
LEN(text)  SEARCH(find, within)

-- LOGICAL
IF(condition, true, false)
IFERROR(expr, error_value)
SWITCH(expr, val1, result1, val2, result2, else)
AND()  OR()  NOT()

-- DATE
TODAY()  NOW()  YEAR(date)  MONTH(date)
EOMONTH(date, 0)  DATEADD(col, -1, YEAR)
DATEDIFF(start, end, YEAR)`,
  },
  {
    id:"statistics",
    title:"Statistics Cheat Sheet",
    icon: Calculator,
    color:"#84CC16",
    bg:"rgba(132,204,22,0.1)",
    description:"Descriptive statistics, probability distributions, and hypothesis testing reference.",
    topics: ["Descriptive Stats","Probability","Distributions","Hypothesis Testing","Correlation"],
    content:`-- STATISTICS QUICK REFERENCE

-- DESCRIPTIVE STATISTICS
Mean = Sum of values / Count
Median = Middle value (sorted)
Mode = Most frequent value
Range = Max - Min
Variance = Average of squared deviations from mean
Std Dev = √Variance
IQR = Q3 - Q1 (middle 50% range)
Skewness: +ve = right-skewed, -ve = left-skewed
Kurtosis: >3 = heavy tails, <3 = light tails

-- PERCENTILES
Q1 = 25th percentile
Q2 = 50th percentile (Median)
Q3 = 75th percentile
IQR = Q3 - Q1
Outlier = < Q1 - 1.5*IQR  OR  > Q3 + 1.5*IQR

-- PROBABILITY
P(A and B) = P(A) × P(B)  [independent]
P(A or B) = P(A) + P(B) - P(A and B)
P(A|B) = P(A and B) / P(B)  [conditional]

-- DISTRIBUTIONS
Normal (Gaussian): Bell curve, mean=median=mode
Binomial: n trials, p probability of success
Poisson: Count of rare events in fixed interval

-- HYPOTHESIS TESTING
H0: Null hypothesis (no effect)
H1: Alternative hypothesis (effect exists)
p-value < 0.05: Reject H0 (statistically significant)
Type I Error: False Positive (reject true H0)
Type II Error: False Negative (fail to reject false H0)

-- CORRELATION
Pearson r: -1 to +1 (linear relationship)
|r| > 0.7: Strong | |r| 0.4-0.7: Moderate | |r| < 0.4: Weak
Correlation ≠ Causation!`,
  },
  {
    id:"data-cleaning",
    title:"Data Cleaning Cheat Sheet",
    icon: Layers,
    color:"#6366F1",
    bg:"rgba(99,102,241,0.1)",
    description:"Data cleaning checklist and common techniques in Python (Pandas) and Excel.",
    topics: ["Missing Values","Duplicates","Outliers","Data Types","Standardization","Validation"],
    content:`-- DATA CLEANING REFERENCE

-- MISSING VALUES
# Python (Pandas)
df.isnull().sum()           # count missing per column
df.dropna()                 # drop rows with any null
df.dropna(subset=['col'])   # drop where specific col is null
df.fillna(0)                # fill with 0
df.fillna(df.mean())        # fill with column mean
df['col'].fillna(method='ffill')  # forward fill

# Excel
Find & Select → Go To Special → Blanks → Fill

-- DUPLICATES
# Python
df.duplicated().sum()       # count duplicates
df.drop_duplicates()        # remove all duplicate rows
df.drop_duplicates(subset=['id'])  # by column

# Excel: Data → Remove Duplicates

-- OUTLIER DETECTION
# IQR Method
Q1, Q3 = df['col'].quantile(0.25), df['col'].quantile(0.75)
IQR = Q3 - Q1
lower, upper = Q1 - 1.5*IQR, Q3 + 1.5*IQR
df = df[(df['col'] >= lower) & (df['col'] <= upper)]

# Z-Score Method
from scipy import stats
z_scores = np.abs(stats.zscore(df['col']))
df = df[z_scores < 3]

-- DATA TYPE FIXES
df['date'] = pd.to_datetime(df['date'])
df['price'] = pd.to_numeric(df['price'], errors='coerce')
df['category'] = df['category'].astype('category')

-- STRING STANDARDIZATION
df['city'] = df['city'].str.strip().str.title()
df['email'] = df['email'].str.lower()
df['phone'] = df['phone'].str.replace(r'[^0-9]','', regex=True)`,
  },
  {
    id:"visualization",
    title:"Data Visualization Cheat Sheet",
    icon: BarChart3,
    color:"#EF4444",
    bg:"rgba(239,68,68,0.1)",
    description:"Chart selection guide, Matplotlib/Seaborn reference, and visualization best practices.",
    topics: ["Chart Selection","Matplotlib","Seaborn","Color Theory","Design Principles","Plotly"],
    content:`-- DATA VISUALIZATION REFERENCE

-- CHART SELECTION GUIDE
Comparison:    Bar Chart, Column Chart
Trend:         Line Chart, Area Chart
Distribution:  Histogram, Box Plot, Violin
Relationship:  Scatter Plot, Bubble Chart
Composition:   Pie Chart, Stacked Bar, Treemap
Geographic:    Map, Choropleth
Correlation:   Heatmap, Scatter Matrix

-- MATPLOTLIB ESSENTIALS
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(10,6))
ax.bar(x, y, color='steelblue', alpha=0.8)
ax.set_title('Title', fontsize=16, fontweight='bold')
ax.set_xlabel('X Label')  ax.set_ylabel('Y Label')
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('chart.png', dpi=150, bbox_inches='tight')

-- SEABORN ESSENTIALS
import seaborn as sns
sns.set_theme(style='darkgrid')

sns.barplot(data=df, x='dept', y='salary', palette='husl')
sns.boxplot(data=df, x='dept', y='salary')
sns.heatmap(df.corr(), annot=True, cmap='coolwarm', center=0)
sns.pairplot(df[['col1','col2','col3']])
sns.scatterplot(data=df, x='x', y='y', hue='category')

-- PLOTLY (Interactive)
import plotly.express as px

fig = px.bar(df, x='dept', y='revenue', color='region')
fig = px.line(df, x='date', y='sales', title='Sales Trend')
fig = px.scatter(df, x='x', y='y', size='size', hover_data=['name'])
fig.show()

-- DESIGN PRINCIPLES
- Data-ink ratio: maximize data, minimize clutter
- Use color meaningfully (not decoratively)
- Consistent scales across charts
- Clear titles and labeled axes
- Limit to 5-7 categories in pie charts`,
  },
  {
    id: "git",
    title: "Git & GitHub Cheat Sheet",
    icon: Code2,
    color: "#F43F5E",
    bg: "rgba(244,63,94,0.1)",
    description: "Version control essentials: committing, branching, merging, and collaborating.",
    topics: ["Setup", "Basic Workflow", "Branching", "Remote", "Undoing Changes", "Stashing"],
    content: `-- GIT QUICK REFERENCE

-- SETUP & CONFIG
git config --global user.name "John Doe"
git config --global user.email "john@example.com"
git init                      # Initialize new repo
git clone <url>               # Clone existing repo

-- BASIC WORKFLOW
git status                    # Check repo state
git add <file>                # Stage specific file
git add .                     # Stage all changes
git commit -m "Message"       # Commit staged changes
git commit -am "Message"      # Add all tracked & commit

-- BRANCHING & MERGING
git branch                    # List branches
git branch <name>             # Create new branch
git checkout <name>           # Switch to branch
git checkout -b <name>        # Create & switch
git merge <branch>            # Merge branch into current
git branch -d <name>          # Delete branch

-- REMOTE (GITHUB)
git remote add origin <url>   # Connect local to remote
git fetch                     # Download remote changes
git pull                      # Fetch and merge
git push origin main          # Upload local to remote
git push -u origin <branch>   # Push new branch

-- UNDOING CHANGES
git reset HEAD <file>         # Unstage file
git checkout -- <file>        # Discard local changes
git reset --hard HEAD~1       # Undo last commit entirely
git revert <commit-hash>      # Create new commit undoing old

-- STASHING (TEMPORARY SAVE)
git stash                     # Save uncommitted work
git stash pop                 # Apply stashed work
git stash list                # View all stashes`,
  },
  {
    id: "ml",
    title: "Machine Learning Basics",
    icon: TrendingUp,
    color: "#10B981",
    bg: "rgba(16,185,129,0.1)",
    description: "Supervised vs Unsupervised, Regression vs Classification, and evaluation metrics.",
    topics: ["Supervised Learning", "Unsupervised Learning", "Metrics", "Algorithms"],
    content: `-- MACHINE LEARNING QUICK REFERENCE

-- LEARNING TYPES
Supervised: Labeled data (e.g., predicting house prices)
Unsupervised: Unlabeled data (e.g., customer segmentation)
Reinforcement: Learning through rewards/punishments

-- SUPERVISED TASKS
Regression: Predicting continuous values (Linear Regression, Ridge/Lasso, XGBoost)
Classification: Predicting discrete classes (Logistic Regression, Random Forest, SVM)

-- EVALUATION METRICS
Regression:
MSE (Mean Squared Error), RMSE (Root MSE), MAE (Mean Absolute Error), R-squared

Classification:
Accuracy (Total correct / Total)
Precision (True Positives / All Predicted Positives) - "How many picked were right?"
Recall (True Positives / All Actual Positives) - "How many right ones were picked?"
F1-Score (Harmonic mean of Precision and Recall)

-- COMMON ALGORITHMS
Linear Regression: Best fit line
Logistic Regression: Probabilistic classification (S-curve)
Decision Trees: Split data on features
Random Forest: Ensemble of decision trees
K-Means: Unsupervised clustering based on distance`,
  },
];

export default function CheatSheetsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = cheatSheets.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  const selectedSheet = selected ? cheatSheets.find((c) => c.id === selected) : null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ background:"var(--bg-primary)", minHeight:"100vh" }}>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{ background:'var(--bg-muted)', border:"1px solid rgba(16,185,129,0.3)", color:"#10B981" }}
            >
              <Download size={14} />
              Quick Reference Guides
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold mb-4" style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}>
              Cheat{""}
              <span className="gradient-text">Sheets</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color:"var(--text-secondary)" }}>
              Quick-reference guides for SQL, Excel, Python, Pandas, Power BI, DAX, Statistics, and more.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color:"var(--text-muted)" }} />
              <input
                id="cheatsheet-search"
                type="text"
                placeholder="Search cheat sheets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                style={{ background:"var(--bg-secondary)", border:"1px solid var(--border)", color:"var(--text-primary)" }}
                aria-label="Search cheat sheets"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sheet List */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                {filtered.map((sheet) => (
                  <button
                    key={sheet.id}
                    id={`cheatsheet-btn-${sheet.id}`}
                    onClick={() => setSelected(selected === sheet.id ? null : sheet.id)}
                    className="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all"
                    style={{
                      background: selected === sheet.id ?`${sheet.color}15` :"var(--bg-secondary)",
                      border:`1px solid ${selected === sheet.id ?`${sheet.color}50` :"var(--border)"}`,
                    }}
                    aria-pressed={selected === sheet.id}
                    aria-label={sheet.title}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: sheet.bg }}
                    >
                      <sheet.icon size={18} style={{ color: sheet.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate" style={{ color:"var(--text-primary)" }}>{sheet.title}</div>
                      <div className="text-xs truncate" style={{ color:"var(--text-muted)" }}>{sheet.topics.length} sections</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sheet Content */}
            <div className="lg:col-span-2">
              {selectedSheet ? (
                <div className="card overflow-hidden">
                  {/* Header */}
                  <div
                    className="p-6 flex items-start justify-between gap-4"
                    style={{ borderBottom:"1px solid var(--border)", background:`${selectedSheet.color}08` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: selectedSheet.bg }}
                      >
                        <selectedSheet.icon size={22} style={{ color: selectedSheet.color }} />
                      </div>
                      <div>
                        <h2 className="font-semibold text-xl" style={{ color:"var(--text-primary)", fontFamily:"Outfit, sans-serif" }}>
                          {selectedSheet.title}
                        </h2>
                        <p className="text-sm" style={{ color:"var(--text-secondary)" }}>{selectedSheet.description}</p>
                      </div>
                    </div>
                    <button
                      id={`btn-print-${selectedSheet.id}`}
                      onClick={handlePrint}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium flex-shrink-0"
                      style={{
                        background:`${selectedSheet.color}20`,
                        color: selectedSheet.color,
                        border:`1px solid ${selectedSheet.color}40`,
                      }}
                      aria-label="Print or save as PDF"
                    >
                      <Printer size={14} />
                      Print / PDF
                    </button>
                  </div>

                  {/* Topics */}
                  <div className="px-6 pt-4 flex flex-wrap gap-2" style={{ borderBottom:"1px solid var(--border)", paddingBottom:"16px" }}>
                    {selectedSheet.topics.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{ background:`${selectedSheet.color}15`, color: selectedSheet.color, border:`1px solid ${selectedSheet.color}30` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <pre
                      className="code-block text-xs sm:text-sm leading-relaxed overflow-x-auto"
                      style={{ color:"var(--text-secondary)", maxHeight:"600px", overflowY:"auto" }}
                    >
                      {selectedSheet.content}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="card p-12 text-center h-64 flex flex-col items-center justify-center">
                  <Download size={40} className="mb-4 opacity-20" style={{ color:"var(--text-muted)" }} />
                  <h3 className="text-lg font-semibold mb-2" style={{ color:"var(--text-primary)" }}>Select a Cheat Sheet</h3>
                  <p style={{ color:"var(--text-muted)" }}>Choose a cheat sheet from the list to view its contents and print as PDF.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
