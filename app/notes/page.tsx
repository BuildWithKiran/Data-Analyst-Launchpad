"use client";

import React, { useState } from"react";
import Link from"next/link";
import { Search, BookOpen, Tag, Star, Clock, ArrowRight } from"lucide-react";

const notes = [
  {
    id:"sql-basics",
    title:"SQL Basics — Complete Reference",
    category:"SQL",
    tags: ["SQL","Database","Beginner"],
    readTime:"8 min",
    description:"A comprehensive reference for SQL SELECT, WHERE, GROUP BY, and ORDER BY with examples.",
    color:"#3B82F6",
    favorite: true,
    content:`# SQL Basics

## Introduction
SQL (Structured Query Language) is the standard language for managing and manipulating relational databases.

## SELECT Statement
The SELECT statement retrieves data from one or more tables.

\`\`\`sql
-- Select specific columns
SELECT name, email, salary FROM employees;

-- Select all columns
SELECT * FROM employees;

-- With alias
SELECT name AS"Employee Name", salary AS"Monthly Salary" FROM employees;
\`\`\`

## WHERE Clause
Filter rows based on conditions.

\`\`\`sql
-- Simple condition
SELECT * FROM employees WHERE department ='Sales';

-- Multiple conditions
SELECT * FROM employees WHERE salary > 50000 AND city ='Mumbai';

-- IN operator
SELECT * FROM customers WHERE city IN ('Mumbai','Delhi','Bangalore');

-- LIKE for pattern matching
SELECT * FROM products WHERE name LIKE'Apple%';
\`\`\`

## GROUP BY
Aggregate data by groups.

\`\`\`sql
SELECT department, COUNT(*) as employee_count, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000
ORDER BY avg_salary DESC;
\`\`\``,
  },
  {
    id:"pandas-cheatsheet",
    title:"Pandas Complete Cheat Sheet",
    category:"Python",
    tags: ["Python","Pandas","Data Analysis"],
    readTime:"12 min",
    description:"Every Pandas operation you need for data analysis — from reading data to advanced groupby.",
    color:"#8B5CF6",
    favorite: true,
    content:`# Pandas Complete Guide

## Reading Data
\`\`\`python
import pandas as pd

df = pd.read_csv('file.csv')
df = pd.read_excel('file.xlsx', sheet_name='Sheet1')
df = pd.read_sql(query, connection)
\`\`\`

## Inspecting Data
\`\`\`python
df.head()        # First 5 rows
df.tail()        # Last 5 rows
df.shape         # (rows, cols)
df.info()        # Column types and non-null counts
df.describe()    # Summary statistics
df.dtypes        # Data types
df.isnull().sum() # Missing value counts
\`\`\`

## Selecting Data
\`\`\`python
df['column']           # Single column (Series)
df[['col1','col2']]  # Multiple columns (DataFrame)
df.loc[0:5,'col']    # Label-based selection
df.iloc[0:5, 0:3]     # Index-based selection
\`\`\``,
  },
  {
    id:"power-bi-dax",
    title:"Power BI DAX — Key Formulas",
    category:"Power BI",
    tags: ["Power BI","DAX","Intermediate"],
    readTime:"10 min",
    description:"Essential DAX formulas for Power BI — CALCULATE, time intelligence, RANKX, and iterators.",
    color:"#F59E0B",
    favorite: false,
    content:`# Power BI DAX Guide

## Measures vs Calculated Columns
- **Measure**: Calculated at query time, context-aware, dynamic
- **Calculated Column**: Calculated row by row at data load, static

## Key DAX Functions

### CALCULATE
The most powerful DAX function — it evaluates an expression in a modified filter context.
\`\`\`dax
Sales IT = CALCULATE([Total Sales], Products[Category] ="IT")
Sales Top5 = CALCULATE([Total Sales], TOPN(5, Products, [Total Sales]))
\`\`\`

### Time Intelligence
\`\`\`dax
Sales LY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Date[Date]))
YTD Sales = TOTALYTD([Total Sales], Date[Date])
QTD Sales = TOTALQTD([Total Sales], Date[Date])
\`\`\``,
  },
  {
    id:"eda-guide",
    title:"Exploratory Data Analysis (EDA) Guide",
    category:"Python",
    tags: ["Python","EDA","Statistics","Visualization"],
    readTime:"15 min",
    description:"Step-by-step EDA framework for data analysis projects — from data loading to insights.",
    color:"#10B981",
    favorite: false,
    content:`# EDA Step-by-Step Guide

## Step 1: Load and Inspect Data
\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('dataset.csv')
print(df.shape)
print(df.info())
print(df.describe())
\`\`\`

## Step 2: Handle Missing Values
\`\`\`python
# Check missing values
print(df.isnull().sum())
print(df.isnull().sum() / len(df) * 100)  # percentage

# Visualize
import missingno as msno
msno.matrix(df)
\`\`\`

## Step 3: Univariate Analysis
\`\`\`python
# Numerical
df['salary'].hist(bins=30)
df['salary'].describe()

# Categorical  
df['department'].value_counts().plot(kind='bar')
\`\`\``,
  },
  {
    id:"excel-pivot",
    title:"Excel Pivot Tables — Master Guide",
    category:"Excel",
    tags: ["Excel","Pivot Tables","Intermediate"],
    readTime:"8 min",
    description:"Learn to create, customize, and use Excel Pivot Tables for data analysis and reporting.",
    color:"#10B981",
    favorite: false,
    content:`# Excel Pivot Tables

## Creating a Pivot Table
1. Select your data range (Ctrl+T to make it a Table first)
2. Insert → PivotTable → New Worksheet
3. Drag fields to: Rows, Columns, Values, Filters

## Pivot Table Areas
- **Rows**: Categories to group by (e.g., Product, Region)
- **Columns**: Cross-tabulate categories (e.g., Month)
- **Values**: Numbers to aggregate (SUM, COUNT, AVERAGE)
- **Filters**: Overall filter for the entire pivot

## Value Field Settings
- Right-click on any value cell → Value Field Settings
- Choose: Sum, Count, Average, Max, Min, % of Total, Running Total`,
  },
  {
    id:"statistics-basics",
    title:"Statistics for Data Analysts",
    category:"Statistics",
    tags: ["Statistics","Probability","Beginner"],
    readTime:"12 min",
    description:"Essential statistical concepts every data analyst must know — descriptive stats, probability, distributions.",
    color:"#06B6D4",
    favorite: false,
    content:`# Statistics for Data Analysts

## Descriptive Statistics

### Measures of Central Tendency
- **Mean**: Average = Sum / Count
- **Median**: Middle value when sorted
- **Mode**: Most frequent value

### Measures of Spread
- **Range**: Max - Min
- **Variance**: Average squared deviation from mean
- **Standard Deviation**: √Variance (same units as data)
- **IQR**: Q3 - Q1 (middle 50% range)

## Outlier Detection
\`\`\`python
Q1 = df['col'].quantile(0.25)
Q3 = df['col'].quantile(0.75)
IQR = Q3 - Q1
outliers = df[(df['col'] < Q1 - 1.5*IQR) | (df['col'] > Q3 + 1.5*IQR)]
\`\`\``,
  },
];

const categoryColors: Record<string, string> = {
  SQL:"#3B82F6",
  Python:"#8B5CF6","Power BI":"#F59E0B",
  Excel:"#10B981",
  Statistics:"#06B6D4",
};

export default function NotesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedNote, setSelectedNote] = useState<typeof notes[0] | null>(null);

  const categories = ["All", ...Array.from(new Set(notes.map((n) => n.category)))];

  const filtered = notes.filter((note) => {
    if (activeCategory !=="All" && note.category !== activeCategory) return false;
    if (search && !note.title.toLowerCase().includes(search.toLowerCase()) && !note.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  return (
    <div style={{ background:"var(--bg-primary)", minHeight:"100vh" }}>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{ background:'var(--bg-muted)', border:"1px solid rgba(59,130,246,0.3)", color:"#3B82F6" }}
            >
              <BookOpen size={14} /> Notes Hub
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold mb-4" style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}>
              Your{""}
              <span className="gradient-text">Notes</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color:"var(--text-secondary)" }}>
              Searchable, markdown-formatted notes for SQL, Python, Excel, Power BI, and Statistics.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color:"var(--text-muted)" }} />
            <input
              id="notes-search"
              type="text"
              placeholder="Search notes by title or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
              style={{ background:"var(--bg-secondary)", border:"1px solid var(--border)", color:"var(--text-primary)" }}
              aria-label="Search notes"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`notes-filter-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: activeCategory === cat
                    ?"var(--primary)"
                    :"var(--bg-secondary)",
                  color: activeCategory === cat ?"white" :"var(--text-muted)",
                  border:`1px solid ${activeCategory === cat ?"transparent" :"var(--border)"}`,
                }}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Notes List */}
            <div className={`${selectedNote ?"hidden lg:block" :""} lg:col-span-1`}>
              <div className="space-y-3">
                {filtered.map((note) => (
                  <button
                    key={note.id}
                    id={`note-btn-${note.id}`}
                    onClick={() => setSelectedNote(selectedNote?.id === note.id ? null : note)}
                    className="w-full card p-4 text-left group transition-all"
                    style={{
                      border: selectedNote?.id === note.id ?`1px solid ${note.color}50` :"1px solid var(--border)",
                      background: selectedNote?.id === note.id ?`${note.color}08` : undefined,
                    }}
                    aria-pressed={selectedNote?.id === note.id}
                    aria-label={note.title}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-sm leading-snug" style={{ color:"var(--text-primary)" }}>
                        {note.title}
                      </h3>
                      {note.favorite && <Star size={14} className="fill-current flex-shrink-0" style={{ color:"#F59E0B" }} />}
                    </div>
                    <p className="text-xs mb-2 line-clamp-2" style={{ color:"var(--text-muted)" }}>{note.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: (categoryColors[note.category] ||"#3B82F6") +"20", color: categoryColors[note.category] ||"#3B82F6" }}
                      >
                        {note.category}
                      </span>
                      <span className="flex items-center gap-0.5 text-xs" style={{ color:"var(--text-muted)" }}>
                        <Clock size={10} /> {note.readTime}
                      </span>
                    </div>
                  </button>
                ))}
                {filtered.length === 0 && (
                  <div className="text-center py-12">
                    <BookOpen size={32} className="mx-auto mb-3 opacity-20" style={{ color:"var(--text-muted)" }} />
                    <p className="text-sm" style={{ color:"var(--text-muted)" }}>No notes found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Note Content */}
            <div className="lg:col-span-2">
              {selectedNote ? (
                <div className="card overflow-hidden">
                  {/* Header */}
                  <div
                    className="p-6"
                    style={{ borderBottom:"1px solid var(--border)", background:`${selectedNote.color}08` }}
                  >
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: (categoryColors[selectedNote.category] ||"#3B82F6") +"20", color: categoryColors[selectedNote.category] ||"#3B82F6" }}
                        >
                          {selectedNote.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs" style={{ color:"var(--text-muted)" }}>
                          <Clock size={11} /> {selectedNote.readTime} read
                        </span>
                      </div>
                      <button
                        className="lg:hidden text-xs px-3 py-1.5 rounded-lg"
                        style={{ background:"var(--bg-muted)", color:"var(--text-muted)" }}
                        onClick={() => setSelectedNote(null)}
                      >
                        ← Back
                      </button>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2" style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}>
                      {selectedNote.title}
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNote.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-0.5 text-xs px-2 py-0.5 rounded-full"
                          style={{ background:"var(--bg-muted)", color:"var(--text-muted)", border:"1px solid var(--border)" }}
                        >
                          <Tag size={10} /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <pre
                      className="code-block text-xs sm:text-sm leading-relaxed whitespace-pre-wrap overflow-x-auto"
                      style={{ color:"var(--text-secondary)", maxHeight:"70vh", overflowY:"auto" }}
                    >
                      {selectedNote.content}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="card p-12 text-center h-64 flex flex-col items-center justify-center">
                  <BookOpen size={40} className="mb-4 opacity-20" style={{ color:"var(--text-muted)" }} />
                  <h3 className="text-lg font-semibold mb-2" style={{ color:"var(--text-primary)" }}>Select a Note</h3>
                  <p style={{ color:"var(--text-muted)" }}>Choose a note from the left to read its full content.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
