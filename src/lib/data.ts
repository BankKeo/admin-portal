export const submissions = [
    {
        id: "JESAM-2025-128",
        title: "AI-Powered Learning Analytics in Higher Education",
        author: "John Doe",
        status: "Under Review",
        similarity: 12,
        date: "May 24, 2025",
    },
    {
        id: "JESAM-2025-127",
        title: "Green Supply Chain Management Practices",
        author: "Maria Santos",
        status: "Revision Required",
        similarity: 18,
        date: "May 23, 2025",
    },
    {
        id: "JESAM-2025-126",
        title: "Blockchain Technology in Financial Services",
        author: "Michael Lee",
        status: "Accepted",
        similarity: 9,
        date: "May 21, 2025",
    },
    {
        id: "JESAM-2025-125",
        title: "The Impact of Social Media on Student Performance",
        author: "Sarah Johnson",
        status: "Rejected",
        similarity: 32,
        date: "May 20, 2025",
    },
    {
        id: "JESAM-2025-124",
        title: "Sustainable Urban Development Strategies",
        author: "David Brown",
        status: "Under Review",
        similarity: 14,
        date: "May 19, 2025",
    },
];

export const reviewers = [
    {
        id: "rev-1",
        name: "Dr. Elena Hovart",
        email: "e.hovart@stanford.edu",
        initials: "EH",
        affiliation: "Stanford University",
        location: "Palo Alto, CA",
        expertise: ["AI Ethics", "NLP"],
        active: 3,
        rating: 5,
        status: "Active",
    },
    {
        id: "rev-2",
        name: "Prof. Marcus Chen",
        email: "m.chen@mit.edu",
        initials: "MC",
        affiliation: "MIT Research Lab",
        location: "Cambridge, MA",
        expertise: ["Quantum Computing"],
        active: 0,
        rating: 4,
        status: "On Leave",
    },
    {
        id: "rev-3",
        name: "Dr. Sarah Lundt",
        email: "sarah.l@ox.ac.uk",
        initials: "SL",
        affiliation: "University of Oxford",
        location: "Oxford, UK",
        expertise: ["Bioinformatics", "Genomics"],
        active: 5,
        rating: 5,
        status: "Active",
    },
    {
        id: "rev-4",
        name: "Dr. Julian Smith",
        email: "jsmith@ethz.ch",
        initials: "JS",
        affiliation: "ETH Zurich",
        location: "Zurich, Switzerland",
        expertise: ["Renewable Energy", "Grid Systems"],
        active: 2,
        rating: 4,
        status: "Active",
    },
];

export const users = [
    {
        id: "user-1",
        name: "Sarah Jenkins",
        subtitle: "Department of Physics",
        email: "sarah.jenkins@university.edu",
        role: "Administrator",
        canSubmit: true,
        lastActive: "2 hours ago",
        avatar: "",
        initials: "SJ",
    },
    {
        id: "user-2",
        name: "Dr. Marcus Thorne",
        subtitle: "Biological Sciences",
        email: "m.thorne@research.org",
        role: "Reviewer",
        canSubmit: false,
        lastActive: "Yesterday, 14:30",
        initials: "MT",
    },
    {
        id: "user-3",
        name: "Elena Rostova",
        subtitle: "History Faculty",
        email: "elena.r@university.edu",
        role: "Author",
        canSubmit: true,
        lastActive: "Oct 12, 2026",
        initials: "EL",
    },
];

export const feedbacks = [
    {
        reviewer: "Dr. Editor Admin",
        date: "Nov 01, 2023",
        recommendation: "Major Revisions",
        content: [
            "The manuscript provides a solid theoretical foundation and the comparative analysis is sound. However, the experimental section lacks rigor in its validation methodologies. Specifically:",
            [
                "Section 4.2: The choice of the specific unitary ansatz is not sufficiently justified. Please provide an ablation study or theoretical argument.",
                "Figure 3 requires larger axis labels and a clearer legend for print readability.",
            ],
        ],
    },
    {
        reviewer: "Dr. Editor Staff",
        date: "Oct 28, 2023",
        recommendation: "Minor Revisions",
        content: [
            "This is a timely and well-written paper that addresses a crucial bottleneck in NISQ-era quantum computing.",
        ],
    },
];

export const assignedReviewers = [
    {
        name: "Dr. Editor Admin",
        specialization: "Specialization",
        stage: "Invited",
        recommendation: "Awaiting Decision",
    },
];

export const blog = {
    title: "AI-Powered Learning Analytics in Higher Education: A Comprehensive Review",

    content_html: `
        <h1>AI-Powered Learning Analytics in Higher Education: A Comprehensive Review</h1>

        <p>
            Artificial Intelligence (AI) is transforming the landscape of higher education
            through intelligent learning analytics systems. Universities and institutions
            increasingly rely on AI-driven platforms to analyze student performance,
            personalize learning experiences, and improve institutional decision-making.
        </p>

        <p>
            Learning analytics refers to the collection, measurement, analysis,
            and reporting of educational data to optimize learning outcomes.
            When combined with AI technologies such as machine learning,
            natural language processing, and predictive analytics,
            institutions can identify patterns that were previously impossible
            to detect using traditional educational methods.
        </p>

        <h2>Introduction</h2>

        <p>
            Higher education institutions generate enormous amounts of data daily.
            This includes student attendance records, examination results,
            online learning activities, assignment submissions,
            engagement metrics, and communication histories.
            AI-powered analytics systems process this data in real time
            to generate actionable insights for educators and administrators.
        </p>

        <p>
            The rapid growth of online and hybrid learning environments
            has accelerated the adoption of AI technologies.
            Universities now require scalable systems capable of monitoring
            thousands of learners simultaneously while maintaining
            personalized educational support.
        </p>

        <blockquote>
            AI-driven learning analytics enables institutions to move
            from reactive educational strategies toward proactive
            and predictive academic support systems.
        </blockquote>

        <h2>Core Technologies in AI Learning Analytics</h2>

        <h3>1. Machine Learning</h3>

        <p>
            Machine learning algorithms analyze historical academic data
            to predict future student performance.
            These systems can identify at-risk students early in the semester,
            allowing institutions to intervene before academic failure occurs.
        </p>

        <ul>
            <li>Predicting student dropout probability</li>
            <li>Identifying learning behavior patterns</li>
            <li>Recommending personalized study materials</li>
            <li>Forecasting course completion rates</li>
        </ul>

        <h3>2. Natural Language Processing (NLP)</h3>

        <p>
            NLP technologies analyze discussion forums, essays,
            and student feedback to evaluate engagement and sentiment.
            AI systems can automatically detect confusion,
            frustration, or lack of participation among learners.
        </p>

        <h3>3. Predictive Analytics</h3>

        <p>
            Predictive analytics combines statistical models and AI algorithms
            to estimate future academic outcomes.
            Universities use predictive systems to improve retention rates
            and allocate educational resources more effectively.
        </p>

        <h2>Benefits of AI-Powered Learning Analytics</h2>

        <h3>Personalized Learning</h3>

        <p>
            AI systems adapt educational content according to individual learning styles,
            pace, and preferences. Students receive customized recommendations,
            targeted assessments, and adaptive learning pathways.
        </p>

        <h3>Early Intervention</h3>

        <p>
            One of the most significant advantages of learning analytics
            is the ability to identify struggling students early.
            Educators can provide timely support through mentoring,
            tutoring, or academic counseling.
        </p>

        <h3>Improved Decision-Making</h3>

        <p>
            Administrators use AI-generated insights to optimize curriculum design,
            faculty allocation, and institutional policies.
            Data-driven decision-making improves operational efficiency
            and educational quality.
        </p>

        <h3>Enhanced Student Engagement</h3>

        <p>
            AI systems monitor participation levels and interaction patterns
            across digital learning platforms.
            This helps educators create more engaging and interactive learning environments.
        </p>

        <h2>Challenges and Ethical Concerns</h2>

        <h3>Data Privacy</h3>

        <p>
            Educational institutions collect highly sensitive student information.
            Improper handling of educational data may lead to privacy violations
            and security risks.
        </p>

        <h3>Algorithmic Bias</h3>

        <p>
            AI systems may unintentionally reinforce existing inequalities
            if training data contains biases.
            Institutions must ensure fairness and transparency
            in predictive decision-making systems.
        </p>

        <h3>Technical Infrastructure</h3>

        <p>
            Implementing AI-powered analytics requires substantial technological investment,
            including cloud infrastructure, data pipelines,
            and skilled personnel.
        </p>

        <h2>Applications in Modern Universities</h2>

        <p>
            Many universities worldwide already use AI-powered learning platforms
            to improve educational outcomes.
            Common applications include:
        </p>

        <ol>
            <li>Smart tutoring systems</li>
            <li>Automated grading and assessment</li>
            <li>Student retention monitoring</li>
            <li>Curriculum optimization</li>
            <li>Academic performance forecasting</li>
            <li>Virtual teaching assistants</li>
        </ol>

        <h2>Future Trends</h2>

        <p>
            The future of AI in higher education will likely involve
            deeper personalization, intelligent virtual classrooms,
            and fully adaptive learning ecosystems.
            Emerging technologies such as generative AI and real-time analytics
            will further enhance educational experiences.
        </p>

        <p>
            Institutions are expected to adopt integrated AI ecosystems
            capable of supporting both administrative and academic functions
            through unified data intelligence platforms.
        </p>

        <h2>Conclusion</h2>

        <p>
            AI-powered learning analytics represents a major advancement
            in modern education. By leveraging machine learning,
            predictive analytics, and intelligent automation,
            universities can improve student success,
            optimize institutional operations,
            and deliver highly personalized educational experiences.
        </p>

        <p>
            Despite challenges related to privacy, ethics,
            and technical complexity,
            AI continues to play an increasingly important role
            in shaping the future of higher education.
            Institutions that strategically adopt AI technologies
            will be better positioned to meet the evolving demands
            of digital learning environments.
        </p>

        <hr />

        <p>
            <strong>Keywords:</strong>
            Artificial Intelligence,
            Learning Analytics,
            Higher Education,
            Machine Learning,
            Predictive Analytics,
            Educational Technology,
            Student Performance,
            Personalized Learning
        </p>
    `,
};
