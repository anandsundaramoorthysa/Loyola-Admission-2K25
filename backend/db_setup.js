require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

const dropAdmissionsTableQuery = `
    DROP TABLE IF EXISTS admissions CASCADE;
`;

const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin'
    );`;

const createAdmissionsTableQuery = `
    CREATE TABLE IF NOT EXISTS admissions (
        application_number VARCHAR(25) PRIMARY KEY,    
        name_english VARCHAR(255) NOT NULL, 
        course_applied VARCHAR(50) NOT NULL, 
        dob DATE NOT NULL, 
        gender VARCHAR(20) NOT NULL, 
        blood_group VARCHAR(10) NOT NULL, 
        community VARCHAR(50) NOT NULL,
        religion VARCHAR(50) NOT NULL, 
        religion_specify VARCHAR(255), 
        caste VARCHAR(100) NOT NULL, 
        dalit_catholic VARCHAR(25) NOT NULL,
        parish_priest_letter VARCHAR(25) NOT NULL, 
        nationality VARCHAR(50) NOT NULL,
        mother_tongue VARCHAR(50) NOT NULL, 
        nri_foreign_country VARCHAR(100),
        nri_foreign_visa_no VARCHAR(100),   
        nri_foreign_passport_no VARCHAR(100),
        nri_foreign_passport_validity DATE, 
        differently_abled VARCHAR(25) NOT NULL, 
        disability_type VARCHAR(50) NOT NULL,
        disability_specify VARCHAR(255), 
        special_category VARCHAR(25) NOT NULL, 
        special_category_options VARCHAR(255), 
        ex_serviceman_no VARCHAR(100),
        ex_serviceman_regiment VARCHAR(100), 
        ex_serviceman_rank VARCHAR(100),
        co_curricular_activities VARCHAR(255) NOT NULL,
        co_curricular_specify VARCHAR(255), 
        first_generation_graduate VARCHAR(25) NOT NULL, 
        school_name VARCHAR(255) NOT NULL,
        school_location VARCHAR(255) NOT NULL,
        medium_of_instruction VARCHAR(25) NOT NULL, 
        tc_no VARCHAR(100) NOT NULL, 
        tc_date DATE NOT NULL, 
        board_of_exam VARCHAR(100) NOT NULL, 
        other_board_state VARCHAR(100), 
        year_of_passing INTEGER NOT NULL, 
        exam_reg_no VARCHAR(100) NOT NULL, 
        emis_no VARCHAR(100) NOT NULL,
        aadhar_no VARCHAR(16) NOT NULL, 
        hostel_accommodation VARCHAR(25) NOT NULL, 
        college_bus VARCHAR(25) NOT NULL, 
        communication_address TEXT NOT NULL, 
        student_pin VARCHAR(6) NOT NULL, 
        student_mobile_no VARCHAR(10) NOT NULL, 
        student_email_id VARCHAR(255) NOT NULL,
        bus_zone VARCHAR(50), 
        starting_point VARCHAR(50),
        language1_marks INTEGER,
        language2_marks INTEGER, 
        subject1_marks INTEGER,
        subject2_marks INTEGER, 
        subject3_marks INTEGER, 
        subject4_marks INTEGER, 
        total_marks_with_language INTEGER, 
        total_marks_without_language INTEGER,
        living_with VARCHAR(50) NOT NULL, 
        father_name VARCHAR(255),
        father_education VARCHAR(255), 
        father_occupation VARCHAR(255),
        father_annual_income DECIMAL, 
        father_mobile_no VARCHAR(10),
        father_email_id VARCHAR(255), 
        mother_name VARCHAR(255),
        mother_education VARCHAR(255), 
        mother_occupation VARCHAR(255),
        mother_annual_income DECIMAL, 
        mother_mobile_no VARCHAR(10),
        mother_email_id VARCHAR(255), 
        guardian_name VARCHAR(255),
        guardian_education VARCHAR(255),
        guardian_occupation VARCHAR(255),
        guardian_annual_income DECIMAL, 
        guardian_mobile_no VARCHAR(10),
        guardian_email_id VARCHAR(255)
    );`;

async function setupDatabase() {
    let client;
    try {
        client = await pool.connect();
        console.log("Connected to PostgreSQL database");

        // --- ADDED DROP TABLE QUERY HERE ---
        await client.query(dropAdmissionsTableQuery);
        console.log("Admissions table dropped (if it existed)");

        await client.query(createUsersTableQuery);
        console.log("Users table created or already exists");

        await client.query(createAdmissionsTableQuery);
        console.log("Admissions table created or already exists");

        console.log("Database setup completed successfully");

    } catch (err) {
        console.error("Database setup failed:", err);
    } finally {
        if (client) {
            client.release();
        }
        pool.end(); 
    }
}

setupDatabase();