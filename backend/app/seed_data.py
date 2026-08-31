"""Canonical resume content. Single source of truth for the seeder."""

PROFILE = {
    "id": 1,
    "name": "Mohammad Abdul Moktadir",
    "title": "Senior Backend Engineer",
    "tagline": "Python (FastAPI) · ASP.NET Core · SQL Server Expert (MCSA) · AI Automation",
    "location": "Chattogram, Bangladesh",
    "phone": "+880-1726-576575",
    "email": "muktadir.iiuc@gmail.com",
    "linkedin": "https://www.linkedin.com/in/mohammad-abdul-moktadir-9483ab49",
    "github": "https://github.com/muktadir-iiuc",
    "hackerrank": "https://www.hackerrank.com/profile/muktadir_iiuc",
    "summary": (
        "Senior Software Engineer with 15+ years of experience designing and developing "
        "enterprise software, data-driven applications, and internal business tools using "
        "Python, C#, ASP.NET Core, ASP.NET MVC, SQL Server, and REST APIs. Currently supporting "
        "a US-based data team by developing internal automation tools, SQL-based analytics "
        "solutions, and software that improves operational efficiency. Strong background in "
        "software architecture, data engineering, backend development, and enterprise "
        "application modernization. Passionate about Artificial Intelligence, Large Language "
        "Models (LLMs), intelligent automation, and building AI-powered software that enables "
        "analysts and business users to interact with data using natural language. Recognized "
        "for quickly understanding complex business workflows and transforming them into "
        "scalable, maintainable software solutions."
    ),
    "years_experience": 15,
    "roles": [
        "Senior Backend Engineer",
        "Enterprise .NET Architect",
        "SQL Server Specialist (MCSA)",
        "AI Automation Engineer",
    ],
}

EXPERIENCE = [
    {
        "id": 1,
        "role": "Senior Data Analyst & Developer",
        "company": "Dominion DMS",
        "location": "Remote",
        "period": "Aug 2021 - Apr 2026",
        "start_year": 2021,
        "end_year": 2026,
        "is_current": False,
        "employment_type": "Full-time",
        "stack": ["Python", "Flask", "FastAPI", "C#", "SQL Server", "T-SQL"],
        "highlights": [
            "Built internal tooling for a US-based data team using Python (Flask), FastAPI and C#.",
            "Developed advanced SQL scripts for complex business analysis.",
            "Improved database performance through query optimization.",
            "Performed large-scale data migration and validation.",
            "Designed reusable utilities for data quality improvement.",
            "Worked closely with business stakeholders to deliver software-driven solutions.",
        ],
        "sort_order": 1,
    },
    {
        "id": 2,
        "role": "Software Development Expert",
        "company": "Taqniyah Interaction",
        "location": "Remote",
        "period": "Apr 2021 - Dec 2021",
        "start_year": 2021,
        "end_year": 2021,
        "is_current": False,
        "employment_type": "Part-time",
        "stack": ["Python", "Django", "MySQL", "REST APIs"],
        "highlights": [
            "Built backend systems and RESTful APIs using Python / Django and MySQL.",
            "Developed scalable application components and integrated third-party services.",
        ],
        "sort_order": 2,
    },
    {
        "id": 3,
        "role": "Senior Software Developer",
        "company": "KDS Accessories Ltd.",
        "location": "Chattogram",
        "period": "Feb 2011 - Apr 2021",
        "start_year": 2011,
        "end_year": 2021,
        "is_current": False,
        "employment_type": "Full-time",
        "stack": [
            "ASP.NET MVC",
            "C#",
            "SQL Server 2019",
            "Stimulsoft",
            "SSRS",
            "Crystal Reports",
        ],
        "highlights": [
            "Designed and developed enterprise applications used across multiple business "
            "departments using ASP.NET MVC and SQL Server 2019.",
            "Led development of the HR Management System.",
            "Developed the Claim Management System.",
            "Built the Fixed Asset Management System.",
            "Built Production Management systems for Button and SLP (desktop applications "
            "using .NET).",
            "Developed online Employee Payroll & Attendance, Tax Management and PF Management "
            "solutions.",
            "Automated enterprise email delivery processes.",
            "Designed reporting solutions using SSRS, Crystal Reports, RDLC and Stimulsoft.",
            "Developed scalable ASP.NET MVC applications on a SQL Server backend with "
            "Stimulsoft reporting.",
        ],
        "sort_order": 3,
    },
]

SKILLS = [
    ("Languages", "C#", 95),
    ("Languages", "Python", 92),
    ("Languages", "SQL", 96),
    ("Languages", "JavaScript", 82),
    ("Backend", "ASP.NET Core", 94),
    ("Backend", ".NET 9", 88),
    ("Backend", "ASP.NET MVC / .NET 4.8", 93),
    ("Backend", "FastAPI", 90),
    ("Backend", "Flask", 86),
    ("Backend", "Django", 78),
    ("Backend", "RESTful APIs", 94),
    ("Backend", "EF Core", 88),
    ("Architecture", "Clean Architecture", 88),
    ("Architecture", "CQRS", 82),
    ("Architecture", "Repository / Unit of Work", 90),
    ("Architecture", "JWT Auth & RBAC", 86),
    ("Frontend", "Bootstrap", 88),
    ("Frontend", "jQuery", 85),
    ("Frontend", "HTML5", 90),
    ("Frontend", "CSS3", 86),
    ("Frontend", "Razor", 88),
    ("Databases", "SQL Server", 96),
    ("Databases", "PostgreSQL", 84),
    ("Databases", "MySQL", 78),
    ("Data & AI", "Data Migration & Validation", 92),
    ("Data & AI", "Query Optimization", 93),
    ("Data & AI", "LLM / OpenAI API", 80),
    ("Data & AI", "Natural-language to SQL", 82),
    ("Data & AI", "SSRS / Stimulsoft / RDLC", 90),
    ("DevOps & Tools", "Git", 88),
    ("DevOps & Tools", "GitHub", 88),
    ("DevOps & Tools", "GitLab", 82),
    ("DevOps & Tools", "CI/CD (basic)", 70),
    ("Practices", "Agile / Scrum", 88),
    ("Practices", "API Integration", 92),
    ("Practices", "Performance Optimization", 92),
    ("Practices", "Technical Documentation", 86),
]

PROJECTS = [
    {
        "id": 1,
        "title": "HRIS & Payroll Management System",
        "kind": "Enterprise",
        "summary": (
            "A full HR information system covering the employee lifecycle - attendance, "
            "payroll, leave, tax and provident fund - used daily across multiple departments."
        ),
        "highlights": [
            "Automated attendance tracking and salary generation, eliminating manual "
            "calculation errors.",
            "Reduced monthly payroll processing time by 90% through workflow automation.",
            "Optimized complex SQL stored procedures for reporting and bulk data operations.",
            "Online leave & approval workflow, attendance management, Zakat calculator, tax "
            "calculation and return management.",
            "Salary advance application, disciplinary action, budget management, loan "
            "application and PF management.",
        ],
        "stack": ["ASP.NET MVC", "C#", "SQL Server", "Stimulsoft Report"],
        "link": None,
        "metrics": {
            "Payroll time saved": "90%",
            "Modules": "12+",
            "Users": "Multi-department",
        },
        "featured": True,
        "sort_order": 1,
    },
    {
        "id": 2,
        "title": "Data Health Report",
        "kind": "Data Engineering",
        "summary": (
            "A data-quality platform that verifies records from any source, then corrects, "
            "validates, de-duplicates, compares and migrates them into SQL Server."
        ),
        "highlights": [
            "Verifies data from arbitrary sources and applies the necessary corrections.",
            "Data validation, duplicate detection and cross-source comparison.",
            "Large-scale migration of cleaned data into a SQL Server database.",
            "Reusable utilities so analysts can run quality checks without engineering support.",
        ],
        "stack": ["Python", "Flask", "FastAPI", "SQL Server", "C#"],
        "link": None,
        "metrics": {"Sources": "Any", "Focus": "Data quality", "Scale": "Large-scale"},
        "featured": True,
        "sort_order": 2,
    },
    {
        "id": 3,
        "title": "Employee Data Chatbot",
        "kind": "Personal / AI",
        "summary": (
            "An intelligent chatbot that lets business users query employee data in plain "
            "English - no SQL required. Natural language in, answers out."
        ),
        "highlights": [
            "Answers business questions such as: show employees from HR.",
            "Answers business questions such as: highest paid employee.",
            "Answers business questions such as: sales by department.",
            "Translates business questions into queries so analysts never write SQL.",
            "Runs on a PostgreSQL employee database, resolving each question to a "
            "parameterised query against it.",
        ],
        "stack": ["Python", "FastAPI", "OpenAI API", "PostgreSQL"],
        "link": None,
        "metrics": {
            "Database": "PostgreSQL",
            "Interface": "Natural language",
            "SQL written by user": "None",
        },
        "featured": True,
        "sort_order": 3,
    },
]

EDUCATION = [
    {
        "id": 1,
        "degree": "B.Sc. in Computer Science & Engineering",
        "institution": "International Islamic University Chittagong",
        "period": "2003 - 2007",
        "sort_order": 1,
    },
]

CERTIFICATIONS = [
    {
        "id": 1,
        "name": "Microsoft Certified Professional (MCSA)",
        "detail": "SQL Server 2016 Database Administration",
        "issued": "June 2019",
        "credential_id": "17299450",
        "url": None,
        "sort_order": 1,
    },
    {
        "id": 2,
        "name": "Python (Basic)",
        "detail": "HackerRank verified certification",
        "issued": "June 2026",
        "credential_id": None,
        "url": "https://www.hackerrank.com/certificates/97540b2cf441",
        "sort_order": 2,
    },
]
