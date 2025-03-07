import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const StudentList = () => {
    const [ students, setStudents ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${ day }-${ month }-${ year }`;
    };

    useEffect(() => {
        const fetchStudentData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/api/admissions`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${ response.status }`);
                }
                const data = await response.json();
                setStudents(data);
            } catch (e) {
                console.error('Error fetching student data:', e);
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    const handleDownloadExcel = async () => {
        if (students.length === 0) {
            alert("No student data available to export.");
            return;
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Student Admissions');

        const headerKeys = Object.keys(students[ 0 ]);
        const headerRow = worksheet.addRow(headerKeys.map(key => key.replace(/_/g, " ")));
        headerRow.eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF00008B' }
            };
            cell.font = {
                color: { argb: 'FFFFFFFF' }, 
                bold: true
            };
            cell.alignment = { horizontal: 'center' };
        });

        students.forEach(student => {
            const rowData = headerKeys.map(key => {
                let value = student[ key ];
                if ((key === 'dob' || key === 'tc_date') && value) {
                    value = formatDate(value);
                }
                return value;
            });
            worksheet.addRow(rowData);
        });

        worksheet.columns.forEach(column => {
            let maxLength = 0;
            column.eachCell({ includeEmpty: true }, (cell) => {
                const cellValue = cell.value ? cell.value.toString() : '';
                maxLength = Math.max(maxLength, cellValue.length);
            });
            column.width = maxLength < 20 ? 20 : maxLength;
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([ buffer ], { type: 'application/octet-stream' });
        saveAs(blob, 'Student_Admissions_Data_2025.xlsx');
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                Error fetching student data: {error.message}
            </div>
        );
    }

    return (
        <div className="container-fluid student-list-container">
            <h2 className="text-center mb-4">Student List</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>App No</th>
                            <th>Name (English)</th>
                            <th>Course Applied</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>Blood Group</th>
                            <th>Community</th>
                            <th>Religion</th>
                            <th>Religion Specify</th>
                            <th>Caste</th>
                            <th>Dalit Catholic</th>
                            <th>Parish Priest Letter</th>
                            <th>Nationality</th>
                            <th>Mother Tongue</th>
                            <th>NRI Country</th>
                            <th>NRI Visa No</th>
                            <th>NRI Passport No</th>
                            <th>NRI Passport Validity</th>
                            <th>Differently Abled</th>
                            <th>Disability Type</th>
                            <th>Disability Specify</th>
                            <th>Special Category</th>
                            <th>Special Category Options</th>
                            <th>Ex-Serviceman No</th>
                            <th>Ex-Serviceman Regiment</th>
                            <th>Ex-Serviceman Rank</th>
                            <th>Co-Curricular Activities</th>
                            <th>Co-Curricular Specify</th>
                            <th>First Gen Graduate</th>
                            <th>School Name</th>
                            <th>School Location</th>
                            <th>Medium of Instruction</th>
                            <th>TC No</th>
                            <th>TC Date</th>
                            <th>Board of Exam</th>
                            <th>Other Board State</th>
                            <th>Year of Passing</th>
                            <th>Exam Reg No</th>
                            <th>EMIS No</th>
                            <th>Aadhar No</th>
                            <th>Hostel Accommodation</th>
                            <th>College Bus</th>
                            <th>Communication Address</th>
                            <th>Student Pin</th>
                            <th>Student Mobile No</th>
                            <th>Student Email</th>
                            <th>Bus Zone</th>
                            <th>Starting Point</th>
                            <th>Language 1 Marks</th>
                            <th>Language 2 Marks</th>
                            <th>Subject 1 Marks</th>
                            <th>Subject 2 Marks</th>
                            <th>Subject 3 Marks</th>
                            <th>Subject 4 Marks</th>
                            <th>Total Marks (With Lang)</th>
                            <th>Total Marks (Without Lang)</th>
                            <th>Living With</th>
                            <th>Father Name</th>
                            <th>Father Education</th>
                            <th>Father Occupation</th>
                            <th>Father Annual Income</th>
                            <th>Father Mobile No</th>
                            <th>Father Email ID</th>
                            <th>Mother Name</th>
                            <th>Mother Education</th>
                            <th>Mother Occupation</th>
                            <th>Mother Annual Income</th>
                            <th>Mother Mobile No</th>
                            <th>Mother Email ID</th>
                            <th>Guardian Name</th>
                            <th>Guardian Education</th>
                            <th>Guardian Occupation</th>
                            <th>Guardian Annual Income</th>
                            <th>Guardian Mobile No</th>
                            <th>Guardian Email ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.application_number}>
                                <td>{student.application_number}</td>
                                <td>{student.name_english}</td>
                                <td>{student.course_applied}</td>
                                <td>{formatDate(student.dob)}</td>
                                <td>{student.gender}</td>
                                <td>{student.blood_group}</td>
                                <td>{student.community}</td>
                                <td>{student.religion}</td>
                                <td>{student.religion_specify}</td>
                                <td>{student.caste}</td>
                                <td>{student.dalit_catholic}</td>
                                <td>{student.parish_priest_letter}</td>
                                <td>{student.nationality}</td>
                                <td>{student.mother_tongue}</td>
                                <td>{student.nri_foreign_country}</td>
                                <td>{student.nri_foreign_visa_no}</td>
                                <td>{student.nri_foreign_passport_no}</td>
                                <td>{student.nri_foreign_passport_validity}</td>
                                <td>{student.differently_abled}</td>
                                <td>{student.disability_type}</td>
                                <td>{student.disability_specify}</td>
                                <td>{student.special_category}</td>
                                <td>{student.special_category_options}</td>
                                <td>{student.ex_serviceman_no}</td>
                                <td>{student.ex_serviceman_regiment}</td>
                                <td>{student.ex_serviceman_rank}</td>
                                <td>{student.co_curricular_activities}</td>
                                <td>{student.co_curricular_specify}</td>
                                <td>{student.first_generation_graduate}</td>
                                <td>{student.school_name}</td>
                                <td>{student.school_location}</td>
                                <td>{student.medium_of_instruction}</td>
                                <td>{student.tc_no}</td>
                                <td>{formatDate(student.tc_date)}</td>
                                <td>{student.board_of_exam}</td>
                                <td>{student.other_board_state}</td>
                                <td>{student.year_of_passing}</td>
                                <td>{student.exam_reg_no}</td>
                                <td>{student.emis_no}</td>
                                <td>{student.aadhar_no}</td>
                                <td>{student.hostel_accommodation}</td>
                                <td>{student.college_bus}</td>
                                <td>{student.communication_address}</td>
                                <td>{student.student_pin}</td>
                                <td>{student.student_mobile_no}</td>
                                <td>{student.student_email_id}</td>
                                <td>{student.bus_zone}</td>
                                <td>{student.starting_point}</td>
                                <td>{student.language1_marks}</td>
                                <td>{student.language2_marks}</td>
                                <td>{student.subject1_marks}</td>
                                <td>{student.subject2_marks}</td>
                                <td>{student.subject3_marks}</td>
                                <td>{student.subject4_marks}</td>
                                <td>{student.total_marks_with_language}</td>
                                <td>{student.total_marks_without_language}</td>
                                <td>{student.living_with}</td>
                                <td>{student.father_name}</td>
                                <td>{student.father_education}</td>
                                <td>{student.father_occupation}</td>
                                <td>{student.father_annual_income}</td>
                                <td>{student.father_mobile_no}</td>
                                <td>{student.father_email_id}</td>
                                <td>{student.mother_name}</td>
                                <td>{student.mother_education}</td>
                                <td>{student.mother_occupation}</td>
                                <td>{student.mother_annual_income}</td>
                                <td>{student.mother_mobile_no}</td>
                                <td>{student.mother_email_id}</td>
                                <td>{student.guardian_name}</td>
                                <td>{student.guardian_education}</td>
                                <td>{student.guardian_occupation}</td>
                                <td>{student.guardian_annual_income}</td>
                                <td>{student.guardian_mobile_no}</td>
                                <td>{student.guardian_email_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-grid gap-2 col-md-2 mx-auto mt-3 mb-5">
                <button
                    type="button"
                    className="btn btn-success btn-lg"
                    onClick={handleDownloadExcel}
                >
                    Download Excel
                </button>
            </div>
        </div>
    );
};

export default StudentList;
