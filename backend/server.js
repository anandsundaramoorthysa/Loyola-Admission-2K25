require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    let client;
    try {
        client = await pool.connect();

        const userResult = await client.query(`SELECT * FROM users WHERE username = $1`, [ username ]);
        const user = userResult.rows[ 0 ];

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return res.status(200).json({ message: 'Login successful!' });
        } else {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: 'Login failed due to server error.' });
    } finally {
        if (client) {
            client.release();
        }
    }
});

// ---------------------- ADMISSIONS API ENDPOINTS  ----------------------
app.post('/api/admissions', async (req, res) => {
    const formData = req.body;
    let client;
    try {
        client = await pool.connect();

        const query = `
            INSERT INTO admissions (
            application_number, name_english, course_applied, dob, gender, blood_group, community, religion, religion_specify, caste, dalit_catholic, parish_priest_letter,
            nationality, mother_tongue, nri_foreign_country, nri_foreign_visa_no, nri_foreign_passport_no, nri_foreign_passport_validity,
            differently_abled, disability_type, disability_specify, special_category, special_category_options, ex_serviceman_no, ex_serviceman_regiment, ex_serviceman_rank,
            co_curricular_activities, co_curricular_specify, first_generation_graduate, school_name, school_location, medium_of_instruction, tc_no, tc_date, board_of_exam, other_board_state, year_of_passing, exam_reg_no, emis_no, aadhar_no,
            hostel_accommodation, college_bus, communication_address, student_pin, student_mobile_no, student_email_id, bus_zone, starting_point,
            language1_marks, language2_marks, subject1_marks, subject2_marks, subject3_marks, subject4_marks, total_marks_with_language, total_marks_without_language,
            living_with, father_name, father_education, father_occupation, father_annual_income, father_mobile_no, father_email_id, mother_name, mother_education, mother_occupation, mother_annual_income, mother_mobile_no, mother_email_id,
            guardian_name, guardian_education, guardian_occupation, guardian_annual_income, guardian_mobile_no, guardian_email_id
            ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
            $13, $14, $15, $16, $17, $18,
            $19, $20, $21, $22, $23, $24, $25, $26,
            $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40,
            $41, $42, $43, $44, $45, $46, $47, $48, 
            $49, $50, $51, $52, $53, $54, $55, $56,
            $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68, $69,
            $70, $71, $72, $73, $74, $75
            ) RETURNING application_number;
        `;

        const values = [
            formData.applNo, formData.nameEnglish, formData.courseApplied, formData.dob, formData.gender, formData.bloodGroup, formData.community, formData.religion, formData.religionSpecify, formData.caste, formData.dalitCatholic, formData.parishPriestLetter,
            formData.nationality, formData.motherTongue, formData.nriForeignerCountry, formData.nriForeignerVisaNo, formData.nriForeignerPassportNo, formData.nriForeignerPassportValidity || null,
            formData.differentlyAbled, formData.disabilityType, formData.disabilitySpecify, formData.specialCategory, formData.specialCategoryOptions, formData.exServicemanNo, formData.exServicemanRegiment, formData.exServicemanRank,
            formData.coCurricularActivities, formData.coCurricularSpecify, formData.firstGenerationGraduate, formData.schoolName, formData.schoolLocation, formData.mediumOfInstruction, formData.tcNo, formData.tcDate, formData.boardOfExam, formData.otherBoardState, formData.yearOfPassing, formData.examRegNo, formData.emisNo, formData.aadharNo,
            formData.hostelAccommodation, formData.collegeBus, formData.communicationAddress, formData.studentPin, formData.studentMobileNo, formData.studentEmailId, formData.busZone, formData.startingPoint,
            formData.language1Marks, formData.language2Marks, formData.subject1Marks, formData.subject2Marks, formData.subject3Marks, formData.subject4Marks, formData.totalMarksObtainedWithLanguage, formData.totalMarksObtainedWithoutLanguage,
            formData.livingWith, formData.fatherName, formData.fatherEducation, formData.fatherOccupation, formData.fatherAnnualIncome, formData.fatherMobileNo, formData.fatherEmailId, formData.motherName, formData.motherEducation, formData.motherOccupation, formData.motherAnnualIncome, formData.motherMobileNo, formData.motherEmailId,
            formData.guardianName, formData.guardianEducation, formData.guardianOccupation, formData.guardianAnnualIncome, formData.guardianMobileNo, formData.guardianEmailId
        ];

        const result = await client.query(query, values);
        res.status(201).json({ message: 'Admission application submitted successfully!', applicationNumber: result.rows[ 0 ].application_number });

    } catch (error) {
        console.error("Admission data insertion error:", error);
        res.status(500).json({ error: 'Failed to submit admission application.', details: error.message });
    } finally {
        if (client) {
            client.release();
        }
    }
});

app.get("/api/admissions", async (req, res) => {
    try {
        const result = await pool.query("SELECT application_number, name_english, course_applied, dob, gender, blood_group, community, religion, religion_specify, caste, dalit_catholic, parish_priest_letter, nationality, mother_tongue, nri_foreign_country, nri_foreign_visa_no, nri_foreign_passport_no, nri_foreign_passport_validity, differently_abled, disability_type, disability_specify, special_category, special_category_options, ex_serviceman_no, ex_serviceman_regiment, ex_serviceman_rank, co_curricular_activities, co_curricular_specify, first_generation_graduate, school_name, school_location, medium_of_instruction, tc_no, tc_date, board_of_exam, other_board_state, year_of_passing, exam_reg_no, emis_no, aadhar_no, hostel_accommodation, college_bus, communication_address, student_pin, student_mobile_no, student_email_id, bus_zone, starting_point, language1_marks, language2_marks, subject1_marks, subject2_marks, subject3_marks, subject4_marks, total_marks_with_language, total_marks_without_language, living_with, father_name, father_education, father_occupation, father_annual_income, father_mobile_no, father_email_id, mother_name, mother_education, mother_occupation, mother_annual_income, mother_mobile_no, mother_email_id, guardian_name, guardian_education, guardian_occupation, guardian_annual_income, guardian_mobile_no, guardian_email_id FROM admissions");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching student data:", error);
        res.status(500).json({ message: "Error retrieving student data" });
    }
});
// React frontend serving
const path = require('path');
app.use(express.static(path.join(__dirname, 'client')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${ port }`);
});

// ---------------------- ADMISSIONS API ENDPOINTS  ----------------------