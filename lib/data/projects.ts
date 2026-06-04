export interface Project {
  id: string;
  title: string;
  slug: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  tools: string[];
  duration: string;
  description: string;
  problemStatement: string;
  datasetInfo: string;
  solutionApproach: string[];
  skills: string[];
  githubUrl: string;
  color: string;
  icon: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Sales Dashboard',
    slug: 'sales-dashboard',
    level: 'Beginner',
    category: 'Business Intelligence',
    tools: ['Excel', 'Power BI'],
    duration: '2–3 weeks',
    description:
      'Build an interactive sales dashboard that tracks KPIs, revenue trends, and regional performance using Excel and Power BI.',
    problemStatement:
      'A retail company struggles to monitor its monthly sales performance across multiple regions and product categories. Managers spend hours manually compiling reports from spreadsheets, leading to delayed decisions. The goal is to create an automated, interactive dashboard that provides real-time visibility into sales KPIs.',
    datasetInfo:
      'Sample retail sales dataset with 50,000+ rows covering 2 years of transactions. Includes columns: OrderID, Date, Region, Product, Category, Sales, Quantity, Profit, Discount.',
    solutionApproach: [
      'Clean and structure raw sales data in Excel using Power Query — remove duplicates, handle nulls, and normalize date formats.',
      'Create pivot tables and calculated fields for KPIs such as Total Revenue, Profit Margin, and Month-over-Month Growth.',
      'Import the cleaned dataset into Power BI and build a relational data model linking Sales, Products, and Regions tables.',
      'Design interactive visuals: bar chart for regional sales, line chart for revenue trend, donut chart for category breakdown, and KPI cards.',
      'Publish the dashboard and add slicers for date range, region, and product category to enable self-service filtering.',
    ],
    skills: [
      'Data Cleaning with Power Query',
      'Pivot Tables & Excel Formulas',
      'Power BI Data Modeling',
      'DAX Measures & Calculated Columns',
      'Dashboard Design & UX',
      'KPI Definition & Visualization',
    ],
    githubUrl: 'https://github.com/mr-vikas7/Sales-Dashboard-Using-Power-BI',
    color: '#10B981',
    icon: 'BarChart2',
  },
  {
    id: '2',
    title: 'HR Analytics',
    slug: 'hr-analytics',
    level: 'Beginner',
    category: 'Human Resources',
    tools: ['Excel', 'SQL'],
    duration: '2–3 weeks',
    description:
      'Analyze employee attrition, headcount trends, and performance metrics using SQL queries and Excel visualizations.',
    problemStatement:
      'An HR department needs to understand why employee attrition rates have been increasing over the past year. They lack a structured way to correlate attrition with factors such as department, tenure, salary band, and job satisfaction scores. The goal is to identify key drivers of attrition and present actionable insights.',
    datasetInfo:
      'IBM HR Analytics Employee Attrition dataset with 1,470 employee records. Features include Age, Department, JobRole, MonthlyIncome, JobSatisfaction, YearsAtCompany, Attrition (Yes/No), PerformanceRating.',
    solutionApproach: [
      'Import the HR dataset into a SQL database and perform exploratory queries to understand data distribution and check for nulls.',
      'Write SQL queries to calculate attrition rate by department, age group, salary band, and years of experience.',
      'Identify correlations between job satisfaction scores, work-life balance ratings, and attrition using GROUP BY and CASE statements.',
      'Export query results to Excel and build charts: attrition by department (bar), tenure distribution (histogram), salary vs. attrition (box plot).',
      'Summarize findings in an Excel report with a recommendations section outlining retention strategies.',
    ],
    skills: [
      'SQL Aggregations & Joins',
      'Excel Charting & Formatting',
      'Attrition & Cohort Analysis',
      'Data Storytelling',
      'Business Problem Framing',
      'HR Domain Knowledge',
    ],
    githubUrl: 'https://github.com/YousufAIML/hr_analytics_postgresql',
    color: '#3B82F6',
    icon: 'Users',
  },
  {
    id: '3',
    title: 'Netflix Content Analysis',
    slug: 'netflix-analysis',
    level: 'Beginner',
    category: 'Entertainment Analytics',
    tools: ['Python', 'Pandas'],
    duration: '2–3 weeks',
    description:
      'Explore Netflix\'s content library using Python and Pandas to uncover trends in genres, ratings, release years, and global content distribution.',
    problemStatement:
      'Netflix adds thousands of titles annually, yet it is unclear how the content mix — movies vs. TV shows, genres, and regional focus — has evolved over time. Stakeholders want to understand content strategy trends to guide future acquisitions. This project analyzes the Netflix catalog dataset to surface actionable content insights.',
    datasetInfo:
      'Netflix Movies and TV Shows dataset from Kaggle with ~8,800 titles. Columns include: show_id, type, title, director, cast, country, date_added, release_year, rating, duration, listed_in, description.',
    solutionApproach: [
      'Load the dataset with Pandas and perform data cleaning: parse dates, split multi-value columns (country, genre), and handle missing directors/cast.',
      'Conduct EDA using value_counts(), groupby(), and describe() to understand content type distribution, rating breakdown, and yearly additions.',
      'Analyze genre trends over years and identify top-producing countries using bar charts and heatmaps with Matplotlib and Seaborn.',
      'Build a word cloud from title descriptions to identify common themes and keywords in Netflix originals.',
      'Summarize insights in a Jupyter Notebook with clear markdown commentary and export key charts as PNGs.',
    ],
    skills: [
      'Pandas Data Manipulation',
      'Exploratory Data Analysis (EDA)',
      'Matplotlib & Seaborn Visualization',
      'Data Cleaning & Wrangling',
      'Jupyter Notebook Workflow',
      'Content Strategy Analysis',
    ],
    githubUrl: 'https://github.com/KasiMuthuveerappan/Netflix-EDA',
    color: '#EF4444',
    icon: 'Play',
  },
  {
    id: '4',
    title: 'Customer Churn Analysis',
    slug: 'customer-churn-analysis',
    level: 'Beginner',
    category: 'Customer Analytics',
    tools: ['Python', 'SQL'],
    duration: '3–4 weeks',
    description:
      'Identify customers at risk of churning for a telecom company by combining SQL data extraction with Python-based analysis and visualizations.',
    problemStatement:
      'A telecom provider is experiencing a 25% annual customer churn rate, costing millions in lost recurring revenue. The business lacks clarity on which customer segments churn most and what behavioral signals precede cancellation. This project builds a churn analysis pipeline to identify high-risk customers and the features most predictive of churn.',
    datasetInfo:
      'Telco Customer Churn dataset with 7,043 records. Features: CustomerID, tenure, MonthlyCharges, TotalCharges, Contract type, PaymentMethod, InternetService, TechSupport, Churn (Yes/No).',
    solutionApproach: [
      'Query the raw customer data from a SQL database, joining customer demographics with subscription and billing tables.',
      'Export to Python and clean the dataset — convert TotalCharges to numeric, encode categorical variables, and handle missing values.',
      'Perform EDA to compare churn vs. non-churn groups across tenure, charges, contract type, and services using grouped bar charts.',
      'Calculate churn rate by segment (contract type, internet service) and visualize with heatmaps and side-by-side bar charts.',
      'Generate a final report with risk segments, key churn indicators, and business recommendations for retention campaigns.',
    ],
    skills: [
      'SQL Joins & Subqueries',
      'Python Data Analysis (Pandas)',
      'Feature Analysis & Segmentation',
      'Churn Metrics & KPIs',
      'Business Insight Communication',
      'Data Pipeline Design',
    ],
    githubUrl: 'https://github.com/simraankar/Customer-Churn-Analysis-SQL-Power-BI-Python',
    color: '#8B5CF6',
    icon: 'UserX',
  },
  {
    id: '5',
    title: 'E-commerce Analytics Platform',
    slug: 'ecommerce-analytics',
    level: 'Intermediate',
    category: 'E-commerce',
    tools: ['Python', 'Power BI', 'SQL'],
    duration: '4–5 weeks',
    description:
      'Build a full e-commerce analytics solution from data extraction and transformation in SQL/Python to an executive Power BI dashboard with funnel analysis.',
    problemStatement:
      'An online retailer is unable to track its end-to-end customer journey from product discovery to repeat purchase. Marketing, sales, and logistics teams each use siloed reports that contradict each other. This project integrates data across these domains to create a single source of truth with funnel metrics, cohort analysis, and product performance views.',
    datasetInfo:
      'Brazilian E-commerce (Olist) dataset from Kaggle: 100K orders across 9 relational tables including orders, order_items, products, customers, sellers, payments, reviews, geolocation.',
    solutionApproach: [
      'Set up a local SQL database, import all 9 CSV tables, and build a star schema with a central fact_orders table and dimension tables.',
      'Write SQL queries for order funnel metrics (delivered vs. canceled), average delivery time by state, and revenue by product category.',
      'Use Python and Pandas to perform RFM (Recency, Frequency, Monetary) segmentation, cohort retention analysis, and seller performance scoring.',
      'Connect Power BI to the SQL database and build a data model with relationships, calculated DAX measures for CLV and repeat purchase rate.',
      'Design a 4-page Power BI report: Executive Summary, Customer Segmentation, Product Performance, and Delivery Logistics.',
    ],
    skills: [
      'Relational Database Design (Star Schema)',
      'Advanced SQL (CTEs, Window Functions)',
      'RFM & Cohort Analysis in Python',
      'Power BI Data Modeling & DAX',
      'Funnel & Conversion Analysis',
      'Cross-functional Data Integration',
    ],
    githubUrl: 'https://github.com/SarangGami/E-Commerce-Sales-Analysis-Excel-PowerBI',
    color: '#F59E0B',
    icon: 'ShoppingCart',
  },
  {
    id: '6',
    title: 'Retail Store Analytics',
    slug: 'retail-store-analytics',
    level: 'Intermediate',
    category: 'Retail',
    tools: ['SQL', 'Excel'],
    duration: '3–4 weeks',
    description:
      'Analyze a multi-store retail chain\'s inventory, sales velocity, and store performance using advanced SQL and Excel reporting techniques.',
    problemStatement:
      'A retail chain with 50 stores across 5 regions is experiencing stock-out issues in high-demand stores while other locations carry excess inventory. Management lacks a store-by-store performance view that correlates sales velocity with inventory levels. This project identifies top and bottom performers and quantifies the cost of poor inventory management.',
    datasetInfo:
      'Superstore dataset with 10,000 transactions. Tables: stores (50 stores, regions), products (3 categories, 17 sub-categories), sales (transactions with quantity, price, discount, profit), inventory (stock levels per SKU per store).',
    solutionApproach: [
      'Design a SQL schema and import data; write queries to calculate sell-through rate, stock turnover ratio, and days of inventory by product.',
      'Use window functions (RANK, LAG, LEAD) to compare store performance month-over-month and identify underperforming stores.',
      'Write a CTE-based query to flag SKUs with zero sales for 30+ days alongside high inventory, identifying dead stock.',
      'Export aggregated SQL results into Excel and build pivot-table-driven reports with conditional formatting to highlight risk zones.',
      'Create an Excel summary dashboard with sparklines, KPI metrics per region, and a store performance ranking table.',
    ],
    skills: [
      'Advanced SQL (CTEs, Window Functions)',
      'Inventory Metrics (Sell-Through, Turnover)',
      'Excel Pivot Tables & Advanced Formulas',
      'Conditional Formatting & Sparklines',
      'Retail Domain Analytics',
      'Data-Driven Inventory Decision Making',
    ],
    githubUrl: 'https://github.com/KartikeyBhamare/Sales-Dashboard',
    color: '#06B6D4',
    icon: 'Store',
  },
  {
    id: '7',
    title: 'IPL Data Analysis',
    slug: 'ipl-data-analysis',
    level: 'Intermediate',
    category: 'Sports Analytics',
    tools: ['Python', 'Pandas'],
    duration: '3–4 weeks',
    description:
      'Perform deep sports analytics on 16 seasons of IPL cricket data to uncover player performance trends, team strategies, and match-winning factors.',
    problemStatement:
      'IPL team analysts need to make data-driven decisions for player auctions and match strategy but currently rely on subjective assessments. There is no consolidated analysis of player consistency, venue-specific performance, and death-over bowling effectiveness. This project creates a comprehensive analytical framework for IPL performance evaluation.',
    datasetInfo:
      'Kaggle IPL Dataset covering 2008–2023: matches.csv (950+ matches with date, venue, teams, result, toss) and deliveries.csv (200K+ ball-by-ball records with batsman, bowler, runs, wickets).',
    solutionApproach: [
      'Merge matches and deliveries DataFrames on match_id; clean data by handling retirements, super-overs, and Duckworth-Lewis adjustments.',
      'Calculate batting metrics: strike rate, average, boundary percentage, and performance in powerplay vs. death overs per batsman.',
      'Compute bowling metrics: economy rate, dot ball percentage, wickets in pressure situations (last 5 overs), and venue-specific performance.',
      'Analyze toss impact on match outcomes, home vs. away win rates, and run chasing vs. defending success rates using Seaborn heatmaps.',
      'Build a player comparison tool in a Jupyter Notebook that ranks batsmen and bowlers using a composite performance score.',
    ],
    skills: [
      'Pandas Multi-DataFrame Merging',
      'Sports KPI Design & Calculation',
      'Time-Series Performance Analysis',
      'Seaborn Statistical Visualization',
      'Composite Scoring & Ranking Models',
      'Domain-Specific Data Storytelling',
    ],
    githubUrl: 'https://github.com/KasiMuthuveerappan/Netflix-EDA',
    color: '#EC4899',
    icon: 'Trophy',
  },
  {
    id: '8',
    title: 'Supply Chain Analytics',
    slug: 'supply-chain-analytics',
    level: 'Intermediate',
    category: 'Operations',
    tools: ['SQL', 'Power BI'],
    duration: '4–5 weeks',
    description:
      'Analyze supply chain efficiency, supplier performance, and logistics costs using SQL data modeling and a Power BI operational dashboard.',
    problemStatement:
      'A manufacturing company faces increasing logistics costs and supplier delays that are impacting production schedules and customer delivery SLAs. Operations managers lack visibility into which suppliers are most reliable, where bottlenecks occur in the supply chain, and what the cost impact of delays is. This project builds an end-to-end supply chain analytics solution.',
    datasetInfo:
      'DataCo Supply Chain dataset with 180,000 records. Includes: order details, shipping mode, delivery status (on-time/late), supplier ID, warehouse region, product category, order and shipping dates, freight costs.',
    solutionApproach: [
      'Import supply chain data into SQL; create normalized tables for suppliers, orders, shipments, and warehouses with proper FK relationships.',
      'Write SQL queries calculating On-Time Delivery Rate, Average Lead Time, Late Shipment Cost, and Supplier Reliability Score per vendor.',
      'Use window functions to detect bottleneck warehouses based on average processing time and flag routes with consistently high delay rates.',
      'Connect Power BI to SQL; build measures for Freight Cost per Order, OTIF (On Time In Full) %, and Inventory Days Outstanding.',
      'Design a 3-page Power BI dashboard: Supply Chain Overview, Supplier Scorecard, and Logistics Route Performance map.',
    ],
    skills: [
      'SQL Data Modeling & Joins',
      'Supply Chain KPIs (OTIF, Lead Time)',
      'Power BI Map & Matrix Visuals',
      'Advanced DAX Time Intelligence',
      'Operational Analytics & Bottleneck Detection',
      'Supplier Scorecard Design',
    ],
    githubUrl: 'https://github.com/mr-vikas7/Sales-Dashboard-Using-Power-BI',
    color: '#F97316',
    icon: 'Truck',
  },
  {
    id: '9',
    title: 'End-to-End BI Project',
    slug: 'end-to-end-bi-project',
    level: 'Advanced',
    category: 'Business Intelligence',
    tools: ['Power BI', 'SQL', 'Python'],
    duration: '6–8 weeks',
    description:
      'Design and build a full-stack BI solution — from raw data ingestion and SQL data warehousing to Python ETL automation and a production-grade Power BI report.',
    problemStatement:
      'A mid-size enterprise has data scattered across an ERP system, a CRM platform, and flat-file exports from third-party tools. Finance, sales, and operations teams each maintain their own disconnected spreadsheets, creating data inconsistency and governance risks. This project builds a centralized data warehouse and automated reporting pipeline to serve the entire organization.',
    datasetInfo:
      'Synthetic enterprise dataset generated with Faker library: 5 source tables (Customers, Sales, Products, HR, Finance) with 500K+ total rows simulating 3 years of business activity across ERP and CRM exports.',
    solutionApproach: [
      'Design a Kimball-style star schema data warehouse in SQL Server with fact tables (FactSales, FactHR) and dimension tables (DimDate, DimProduct, DimCustomer, DimEmployee).',
      "Build Python ETL scripts using Pandas and SQLAlchemy to extract from source CSVs, apply business transformation rules, and load into the warehouse with incremental load logic.",
      "Schedule ETL automation using Python's schedule library or Windows Task Scheduler; implement logging and error alerting.",
      'Connect Power BI to the warehouse via DirectQuery; build a semantic layer with 30+ DAX measures for Finance (P&L, EBITDA), Sales (Pipeline, Conversion), and HR (Headcount, Attrition).',
      'Design a 6-page executive Power BI report with row-level security (RLS) by department, bookmarks for narrative-driven storytelling, and a mobile-optimized layout.',
    ],
    skills: [
      'Data Warehouse Design (Kimball Methodology)',
      'Python ETL with SQLAlchemy & Pandas',
      'Advanced DAX (Time Intelligence, RLS)',
      'Power BI Service & Gateway Deployment',
      'Incremental Data Load Patterns',
      'Enterprise BI Governance & Documentation',
    ],
    githubUrl: 'https://github.com/SarangGami/E-Commerce-Sales-Analysis-Excel-PowerBI',
    color: '#8B5CF6',
    icon: 'Database',
  },
  {
    id: '10',
    title: 'Financial Analytics Dashboard',
    slug: 'financial-analytics-dashboard',
    level: 'Advanced',
    category: 'Finance',
    tools: ['Python', 'Power BI', 'Excel'],
    duration: '5–7 weeks',
    description:
      'Build a comprehensive financial analytics solution covering P&L analysis, cash flow forecasting, and variance reporting using Python, Excel models, and Power BI.',
    problemStatement:
      "A growing SaaS company's finance team spends 3 days each month manually consolidating P&L data from multiple subsidiaries and producing variance reports in Excel. Forecasting is done in isolated spreadsheets with no historical trend integration. This project automates financial consolidation, builds a dynamic forecasting model, and delivers real-time dashboards for CFO-level reporting.",
    datasetInfo:
      'Simulated financial dataset: Monthly P&L data for 5 subsidiaries over 3 years (revenue, COGS, OpEx by department), cash flow statements, budget vs. actual data, and macroeconomic indicators (CPI, interest rates) from public sources.',
    solutionApproach: [
      'Use Python (Pandas, OpenPyXL) to automate the consolidation of 5 subsidiary P&L CSVs into a single standardized format with currency normalization and intercompany elimination.',
      'Build an Excel-based financial model with dynamic scenario analysis (base, bull, bear) using named ranges, structured tables, and INDEX/MATCH formulas for budget vs. actual variance.',
      'Develop a Python time-series forecasting model using Facebook Prophet to predict revenue and expenses for the next 6 quarters with confidence intervals.',
      'Import consolidated data and forecast outputs into Power BI; build DAX measures for Gross Margin %, EBITDA Margin, Operating Leverage, and Cash Conversion Cycle.',
      'Design a CFO dashboard in Power BI with P&L waterfall charts, variance heatmaps, rolling 12-month trend lines, and a forecast vs. actual comparison view with drill-through to subsidiary level.',
    ],
    skills: [
      'Financial Statement Analysis (P&L, Cash Flow)',
      'Python Automation (Pandas, OpenPyXL)',
      'Time-Series Forecasting (Facebook Prophet)',
      'Advanced Excel Financial Modeling',
      'Power BI Waterfall & Advanced Visuals',
      'CFO-Level Reporting & Storytelling',
    ],
    githubUrl: 'https://github.com/simraankar/Customer-Churn-Analysis-SQL-Power-BI-Python',
    color: '#EF4444',
    icon: 'TrendingUp',
  },
];
