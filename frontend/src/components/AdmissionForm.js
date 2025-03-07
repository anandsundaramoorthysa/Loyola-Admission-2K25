import './AdmissionFormStyles.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const formatDateForDatabase = (dateString) => {
    return dateString; 
};


function AdmissionForm() {
    const generateApplicationNumber = () => {
        const prefix = 'LCM25AD'; 
        const timestamp = Date.now().toString().slice(-2); 
        const random = Math.floor(Math.random() * 100).toString().padStart(2, '0'); 
        return `${ prefix }${ timestamp }${ random }`;
    };
    const [ applicationNumber, setApplicationNumber ] = useState(generateApplicationNumber());

    const courseOptions = [
        'B.A. Tamil', 'B.Com', 'B.Sc. Physics', 'B.Sc. Computer Science', 'B.C.A.',
        'B.A. English', 'B.Sc. Chemistry', 'B.Sc. Maths', 'B. Com. (Accounting & Finance)',
        'B.B.A', 'M.Com', 'B.Sc. Computer Science (Data Science & AI)', 'B.Com CA'
    ];
    const genderOptions = [ 'Male', 'Female', 'Transgender' ];
    const bloodGroupOptions = [ '', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-' ];
    const communityOptions = [ 'OC', 'BC', 'OBC', 'MBC', 'DNC', 'SC', 'SCA', 'ST' ];
    const religionOptions = [ 'Roman Catholic (RC)', 'Christian', 'Hindu', 'Muslim', 'Other Specify' ];
    const nationalityOptions = [ 'Indian', 'NRI', 'Foreigner' ];
    const differentlyAbledOptions = [ 'Visually', 'Hearing', 'Orthopaedically', 'Dyslexia', 'Others' ];
    const specialCategoryOptionsList = [ 'Ex-Serviceman', 'Refugee', 'Orphan', 'Semi-Orphan' ];
    const coCurricularOptions = [ 'NSS', 'NCC', 'SPORTS', 'Others' ];
    const schoolLocationOptions = [ 'Urban', 'Rural' ];
    const mediumInstructionOptions = [ 'Tamil', 'English' ];
    const boardExamOptions = [ 'HSC', 'CBSE', 'ICSE', 'Other Board/State' ];
    const hostelOptions = [ 'Yes', 'No' ];
    const busOptions = [ 'Yes', 'No' ];
    const busZoneOptions = [ '', 'Attur', 'Vazhapadi', 'Salem', 'Thammampatti' ];
    const livingOptionsType = [ 'Parent', 'Guardian' ];
    const priestLetterOptions = [ 'Yes', 'No' ];
    const dalitCatholicOptions = [ 'Yes', 'No' ];
    const specialCategoryYesNoOptions = [ 'Yes', 'No' ];
    const differentlyAbledYesNoOptions = [ 'Yes', 'No' ];
    const firstGenerationGraduateOptions = [ 'Yes', 'No' ];
    const nationalityTypeOptions = [ 'Indian', 'NRI', 'Foreigner' ];
    const religionTypeOptions = [ 'Roman Catholic (RC)', 'Christian', 'Hindu', 'Muslim', 'Other Specify' ];


    const [ applNo, setApplNo ] = useState(applicationNumber);
    const [ courseApplied, setCourseApplied ] = useState('');
    const [ nameEnglish, setNameEnglish ] = useState('');
    const [ dob, setDob ] = useState('');
    const [ gender, setGender ] = useState('');
    const [ bloodGroup, setBloodGroup ] = useState('');
    const [ community, setCommunity ] = useState('');
    const [ caste, setCaste ] = useState('');
    const [ religion, setReligion ] = useState('');
    const [ religionSpecify, setReligionSpecify ] = useState('');
    const [ dalitCatholic, setDalitCatholic ] = useState('');
    const [ parishPriestLetter, setParishPriestLetter ] = useState('');
    const [ nationality, setNationality ] = useState('');
    const [ motherTongue, setMotherTongue ] = useState('');
    const [ nriForeignerCountry, setNriForeignerCountry ] = useState('');
    const [ nriForeignerVisaNo, setNriForeignerVisaNo ] = useState('');
    const [ nriForeignerPassportNo, setNriForeignerPassportNo ] = useState('');
    const [ nriForeignerPassportValidity, setNriForeignerPassportValidity ] = useState('');
    const [ differentlyAbled, setDifferentlyAbled ] = useState('');
    const [ disabilityType, setDisabilityType ] = useState([]);
    const [ disabilitySpecify, setDisabilitySpecify ] = useState('');
    const [ specialCategory, setSpecialCategory ] = useState('');
    const [ specialCategoryOptions, setSpecialCategoryOptions ] = useState([]);
    const [ exServicemanNo, setExServicemanNo ] = useState('');
    const [ exServicemanRegiment, setExServicemanRegiment ] = useState('');
    const [ exServicemanRank, setExServicemanRank ] = useState('');
    const [ coCurricularActivities, setCoCurricularActivities ] = useState([]);
    const [ coCurricularSpecify, setCoCurricularSpecify ] = useState('');
    const [ firstGenerationGraduate, setFirstGenerationGraduate ] = useState('');
    const [ schoolName, setSchoolName ] = useState('');
    const [ schoolLocation, setSchoolLocation ] = useState('');
    const [ mediumOfInstruction, setMediumOfInstruction ] = useState('');
    const [ tcNo, setTcNo ] = useState('');
    const [ tcDate, setTcDate ] = useState('');
    const [ boardOfExam, setBoardOfExam ] = useState('');
    const [ otherBoardState, setOtherBoardState ] = useState('');
    const [ yearOfPassing, setYearOfPassing ] = useState('');
    const [ examRegNo, setExamRegNo ] = useState('');
    const [ emisNo, setEmisNo ] = useState('');
    const [ aadharNo, setAadharNo ] = useState('');
    const [ hostelAccommodation, setHostelAccommodation ] = useState('');
    const [ collegeBus, setCollegeBus ] = useState('');
    const [ communicationAddress, setCommunicationAddress ] = useState('');
    const [ studentPin, setStudentPin ] = useState('');
    const [ studentMobileNo, setStudentMobileNo ] = useState('');
    const [ studentEmailId, setStudentEmailId ] = useState('');

    const [ livingWith, setLivingWith ] = useState('Parent');
    const [ fatherName, setFatherName ] = useState('');
    const [ fatherEducation, setFatherEducation ] = useState('');
    const [ fatherOccupation, setFatherOccupation ] = useState('');
    const [ fatherAnnualIncome, setFatherAnnualIncome ] = useState('');
    const [ fatherMobileNo, setFatherMobileNo ] = useState('');
    const [ fatherEmailId, setFatherEmailId ] = useState('');
    const [ motherName, setMotherName ] = useState('');
    const [ motherEducation, setMotherEducation ] = useState('');
    const [ motherOccupation, setMotherOccupation ] = useState('');
    const [ motherAnnualIncome, setMotherAnnualIncome ] = useState('');
    const [ motherMobileNo, setMotherMobileNo ] = useState('');
    const [ motherEmailId, setMotherEmailId ] = useState('');
    const [ guardianNameDetail, setGuardianNameDetail ] = useState('');
    const [ guardianEducationDetail, setGuardianEducationDetail ] = useState('');
    const [ guardianOccupationDetail, setGuardianOccupationDetail ] = useState('');
    const [ guardianAnnualIncomeDetail, setGuardianAnnualIncomeDetail ] = useState('');
    const [ guardianMobileNoDetail, setGuardianMobileNoDetail ] = useState('');
    const [ guardianEmailIdDetail, setGuardianEmailIdDetail ] = useState('');

    const [ language1Marks, setLanguage1Marks ] = useState('');
    const [ language2Marks, setLanguage2Marks ] = useState('');
    const [ subject1Marks, setSubject1Marks ] = useState('');
    const [ subject2Marks, setSubject2Marks ] = useState('');
    const [ subject3Marks, setSubject3Marks ] = useState('');
    const [ subject4Marks, setSubject4Marks ] = useState('');
    const [ totalMarksObtainedWithLanguage, setTotalMarksObtainedWithLanguage ] = useState(0); 
    const [ totalMarksObtainedWithoutLanguage, setTotalMarksObtainedWithoutLanguage ] = useState(0); 


    const [ showBusOptions, setShowBusOptions ] = useState(false);
    const [ busZone, setBusZone ] = useState('');
    const [ startingPoint, setStartingPoint ] = useState('');

    const [ declarationChecked, setDeclarationChecked ] = useState(false); 
    const [ undertakingChecked, setUndertakingChecked ] = useState(false); 

    useEffect(() => {
        if (hostelAccommodation === 'Yes') {
            setCollegeBus('No');
            setShowBusOptions(false);
        }
        if (collegeBus === 'Yes') {
            setHostelAccommodation('No');
            setShowBusOptions(true);
        } else if (collegeBus === 'No') {
            setShowBusOptions(false);
        }
        calculateTotalMarks(); 
    }, [ hostelAccommodation, collegeBus, language1Marks, language2Marks, subject1Marks, subject2Marks, subject3Marks, subject4Marks ]); 

    const calculateTotalMarks = () => {
        let totalWithLanguage = 0;
        let totalWithoutLanguage = 0;

        totalWithLanguage += parseInt(language1Marks || 0);
        totalWithLanguage += parseInt(language2Marks || 0);
        totalWithLanguage += parseInt(subject1Marks || 0);
        totalWithLanguage += parseInt(subject2Marks || 0);
        totalWithLanguage += parseInt(subject3Marks || 0);
        totalWithLanguage += parseInt(subject4Marks || 0);

        totalWithoutLanguage += parseInt(subject1Marks || 0);
        totalWithoutLanguage += parseInt(subject2Marks || 0);
        totalWithoutLanguage += parseInt(subject3Marks || 0);
        totalWithoutLanguage += parseInt(subject4Marks || 0);

        setTotalMarksObtainedWithLanguage(totalWithLanguage);
        setTotalMarksObtainedWithoutLanguage(totalWithoutLanguage);
    };


    const handleCollegeBusChange = (e) => {
        setCollegeBus(e.target.value);
        if (e.target.value === 'Yes') {
            setHostelAccommodation('No');
            setShowBusOptions(true);
        } else {
            setShowBusOptions(false);
        }
    };

    const handleHostelAccommodationChange = (e) => {
        setHostelAccommodation(e.target.value);
        if (e.target.value === 'Yes') {
            setCollegeBus('No');
            setShowBusOptions(false);
        }
    };

    const handleBusZoneChange = (e) => {
        setBusZone(e.target.value);
        document.getElementById('startingPointSection').style.display = e.target.value ? 'block' : 'none';
    };

    const handleReligionChange = (e) => {
        setReligion(e.target.value);
        if (e.target.value !== 'Other Specify') {
            setReligionSpecify(''); 
        }
    };
    const handleDifferentlyAbledChange = (e) => {
        setDifferentlyAbled(e.target.value);
        if (e.target.value === 'No') {
            setDisabilityType([]); 
            setDisabilitySpecify(''); 
        }
    };

    const handleDisabilityTypeChange = (e) => {
        if (e.target.checked) {
            setDisabilityType([ ...disabilityType, e.target.value ]);
        } else {
            setDisabilityType(disabilityType.filter(item => item !== e.target.value));
        }
    };
    const handleSpecialCategoryChange = (e) => {
        setSpecialCategory(e.target.value);
        if (e.target.value === 'No') {
            setSpecialCategoryOptions([]); 
            setExServicemanNo('');
            setExServicemanRegiment('');
            setExServicemanRank('');
        }
    };

    const handleSpecialCategoryOptionsChange = (e) => {
        if (e.target.checked) {
            setSpecialCategoryOptions([ ...specialCategoryOptions, e.target.value ]);
        } else {
            setSpecialCategoryOptions(specialCategoryOptions.filter(item => item !== e.target.value));
        }
    };

    const handleCoCurricularActivitiesChange = (e) => {
        if (e.target.checked) {
            setCoCurricularActivities([ ...coCurricularActivities, e.target.value ]);
        } else {
            setCoCurricularActivities(coCurricularActivities.filter(item => item !== e.target.value));
        }
    };

    const handleLivingWithChange = (e) => {
        setLivingWith(e.target.value);
    };

    const handleDeclarationCheckboxChange = (e) => {
        setDeclarationChecked(e.target.checked);
    };

    const handleUndertakingCheckboxChange = (e) => {
        setUndertakingChecked(e.target.checked);
    };
    
    const [dobError, setDobError] = useState('');

    const validateDOB = (dateString) => {
        if (!dateString) {
            setDobError('Date of Birth is required'); 
            return false;
        }

        const birthDate = new Date(dateString);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();

        if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    };

    const handleDobChange = (e) => {
        setDob(e.target.value);
        const age = validateDOB(e.target.value);
        if (age < 16) {
            setDobError('Applicant must be 16 years or older');
        } else {
            setDobError(''); 
        }
    };

    const handleTcDateChange = (e) => {
        setTcDate(e.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateDOB(dob) < 16) {
            alert("You must be at least 16 years old to apply for admission.");
            return;
        }


        const formattedDOBForSave = formatDateForDatabase(dob); 
        const formattedTCDateForSave = formatDateForDatabase(tcDate); 

        const formData = {
            applNo, nameEnglish, courseApplied, dob:formattedDOBForSave, gender, bloodGroup, community, religion, religionSpecify, caste, dalitCatholic, parishPriestLetter,
            nationality, motherTongue, nriForeignerCountry, nriForeignerVisaNo, nriForeignerPassportNo, nriForeignerPassportValidity,
            differentlyAbled, disabilityType, disabilitySpecify, specialCategory, specialCategoryOptions, exServicemanNo, exServicemanRegiment, exServicemanRank,
            coCurricularActivities, coCurricularSpecify, firstGenerationGraduate, schoolName, schoolLocation, mediumOfInstruction, tcNo, tcDate:formattedTCDateForSave, boardOfExam, otherBoardState, yearOfPassing, examRegNo, emisNo, aadharNo,
            hostelAccommodation, collegeBus, communicationAddress, studentPin, studentMobileNo, studentEmailId, busZone, startingPoint,
            language1Marks, language2Marks, subject1Marks, subject2Marks, subject3Marks, subject4Marks, totalMarksObtainedWithLanguage, totalMarksObtainedWithoutLanguage,
            livingWith,
            ...(livingWith === 'Parent' ? {
                fatherName, fatherEducation, fatherOccupation, fatherAnnualIncome, fatherMobileNo, fatherEmailId,
                motherName, motherEducation, motherOccupation, motherAnnualIncome, motherMobileNo, motherEmailId
            } : {
                guardianName: guardianNameDetail, guardianEducation: guardianEducationDetail, guardianOccupation: guardianOccupationDetail,
                guardianAnnualIncome: guardianAnnualIncomeDetail, guardianMobileNo: guardianMobileNoDetail, guardianEmailIdDetail,

            }),
        };

        if (!declarationChecked || !undertakingChecked) {
            alert("Please check both Declaration and Undertaking boxes to confirm your promises.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/admissions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Application Form Submitted!");
                console.log("Form Data Submitted:", formData);
            } else {
                alert("Failed to submit the form. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="card-body">
                <h2 className="card-title text-center fw-bold mb-5">ADMISSION FORM<br /> 2025-2026</h2>
                <form onSubmit={handleSubmit} className="row g-3">
                <p className="text-start fw-bold">Appl. No.: {applNo}</p>
                    <div className="col-12">
                        <label htmlFor="nameEnglish" className="form-label fw-bold">Name of the Applicant</label>
                        <input type="text" className="form-control form-control-lg" id="nameEnglish" value={nameEnglish} onChange={(e) => setNameEnglish(e.target.value)} style={{ textTransform: 'uppercase' }} required />
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-bold">Course Applied for</label>
                        <div className="d-flex flex-wrap">
                            {courseOptions.map(course => (
                                <div className="form-check me-4" key={course}>
                                    <input className="form-check-input" type="radio" name="courseApplied" id={`course${ course.replace(/\s+/g, '') }`} value={course} checked={courseApplied === course} onChange={(e) => setCourseApplied(e.target.value)} required />
                                    <label className="form-check-label" htmlFor={`course${ course.replace(/\s+/g, '') }`}>{course}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-md-4">
                            <label htmlFor="dob" className="form-label fw-bold">Date of Birth <span className="fst-italic">(DDMMYY)</span></label>
                            <input type="date" className="form-control" id="dob" value={dob} onChange={handleDobChange} placeholder="DDMMYY" required />
                            {dobError && <p className="text-danger">{dobError}</p>}
                    </div>
                    
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Gender</label>
                        <div className="d-flex">
                            {genderOptions.map(option => (
                                <div className="form-check me-4" key={option}>
                                    <input className="form-check-input" type="radio" name="gender" id={`gender${ option }`} value={option} checked={gender === option} onChange={(e) => setGender(e.target.value)} required />
                                    <label className="form-check-label" htmlFor={`gender${ option }`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="bloodGroup" className="form-label fw-bold">Blood Group</label>
                        <select className="form-select" id="bloodGroup" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} >
                            {bloodGroupOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-bold">Community</label>
                        <div className="d-flex flex-wrap">
                            {communityOptions.map(option => (
                                <div className="form-check me-4" key={option}>
                                    <input className="form-check-input" type="radio" name="community" id={`community${ option }`} value={option} checked={community === option} onChange={(e) => setCommunity(e.target.value)} required />
                                    <label className="form-check-label" htmlFor={`community${ option }`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-bold">Religion</label>
                        <div className="d-flex flex-wrap">
                            {religionOptions.map(option => (
                                <div className="form-check me-4" key={option}>
                                    <input className="form-check-input" type="radio" name="religion" id={`religion${ option.replace(/\s+/g, '') }`} value={option} checked={religion === option} onChange={handleReligionChange} required />
                                    <label className="form-check-label" htmlFor={`religion${ option.replace(/\s+/g, '') }`}>{option}</label>
                                </div>
                            ))}
                        </div>
                        {religion === 'Other Specify' && (
                            <input type="text" className="form-control mt-2" placeholder="Specify Religion" value={religionSpecify} onChange={(e) => setReligionSpecify(e.target.value)} required />
                        )}
                    </div>

                    <div className="col-12">
                        <label htmlFor="caste" className="form-label fw-bold">Caste</label>
                        <input type="text" className="form-control" id="caste" value={caste} onChange={(e) => setCaste(e.target.value)} required />
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-bold">Dalit Catholic/SC Converted Catholic</label>
                        <div className="d-flex">
                            {dalitCatholicOptions.map(option => (
                                <div className="form-check me-4" key={option}>
                                    <input className="form-check-input" type="radio" name="dalitCatholic" id={`dalitCatholic${ option }`} value={option} checked={dalitCatholic === option} onChange={(e) => setDalitCatholic(e.target.value)} required />
                                    <label className="form-check-label" htmlFor={`dalitCatholic${ option }`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {religion === 'Roman Catholic (RC)' && (
                        <div className="col-12">
                            <label className="form-label fw-bold">Letter from Parish Priest for RC only</label>
                            <div className="d-flex">
                                {priestLetterOptions.map(option => (
                                    <div className="form-check me-4" key={option}>
                                        <input className="form-check-input" type="radio" name="parishPriestLetter" id={`parishPriestLetter${ option }`} value={option} checked={parishPriestLetter === option} onChange={(e) => setParishPriestLetter(e.target.value)} />
                                        <label className="form-check-label" htmlFor={`parishPriestLetter${ option }`}>{option}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    <div className="col-12">
                        <label className="form-label fw-bold">Nationality</label>
                        <div className="d-flex">
                            {nationalityOptions.map(option => (
                                <div className="form-check me-4" key={option}>
                                    <input className="form-check-input" type="radio" name="nationality" id={`nationality${ option }`} value={option} checked={nationality === option} onChange={(e) => setNationality(e.target.value)} required />
                                    <label className="form-check-label" htmlFor={`nationality${ option }`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-12">
                        <label htmlFor="motherTongue" className="form-label fw-bold">Mother Tongue</label>
                        <input type="text" className="form-control" id="motherTongue" value={motherTongue} onChange={(e) => setMotherTongue(e.target.value)} required />
                    </div>

                    {(nationality === 'NRI' || nationality === 'Foreigner') && (
                        <div className="col-12">
                            <h5 className="fw-bold">NRI/Foreigner Details</h5>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label htmlFor="nriForeignerCountry" className="form-label">Country</label>
                                    <input type="text" className="form-control" id="nriForeignerCountry" value={nriForeignerCountry} onChange={(e) => setNriForeignerCountry(e.target.value)} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="nriForeignerVisaNo" className="form-label">Visa No.</label>
                                    <input type="text" className="form-control" id="nriForeignerVisaNo" value={nriForeignerVisaNo} onChange={(e) => setNriForeignerVisaNo(e.target.value)} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="nriForeignerPassportNo" className="form-label">Passport No.</label>
                                    <input type="text" className="form-control" id="nriForeignerPassportNo" value={nriForeignerPassportNo} onChange={(e) => setNriForeignerPassportNo(e.target.value)} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="nriForeignerPassportValidity" className="form-label">Passport Validity</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="nriForeignerPassportValidity"
                                        value={nriForeignerPassportValidity || ''} 
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setNriForeignerPassportValidity(value === '' ? null : value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="col-12">
                        <label className="form-label fw-bold">Differently Abled</label>
                        <div className="d-flex">
                            {differentlyAbledYesNoOptions.map(option => (
                                <div className="form-check me-4" key={option}>
                                    <input className="form-check-input" type="radio" name="differentlyAbled" id={`differentlyAbled${ option }`} value={option} checked={differentlyAbled === option} onChange={handleDifferentlyAbledChange} required />
                                    <label className="form-check-label" htmlFor={`differentlyAbled${ option }`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {differentlyAbled === 'Yes' && (
                        <div className="col-12">
                            <div className="mb-3">
                                <label className="form-label fw-bold">(If yes) Specify Disability</label>
                                <div className="d-flex flex-wrap">
                                    {differentlyAbledOptions.map(option => (
                                        <div className="form-check me-4" key={option}>
                                            <input className="form-check-input" type="checkbox" name="disabilityType" id={`disabilityType${ option.replace(/\s+/g, '') }`} value={option} checked={disabilityType.includes(option)} onChange={handleDisabilityTypeChange} />
                                            <label className="form-check-label" htmlFor={`disabilityType${ option.replace(/\s+/g, '') }`}>{option}</label>
                                        </div>
                                    ))}
                                </div>
                                {disabilityType.includes('Others') && (
                                    <input type="text" className="form-control mt-2" placeholder="Specify Other Disability" value={disabilitySpecify} onChange={(e) => setDisabilitySpecify(e.target.value)} required />
                                )}
                            </div>
                        </div>
                    )}


                    <div className="col-12">
                        <label className="form-label fw-bold">Special Category</label>
                        <div className="d-flex">
                            {specialCategoryYesNoOptions.map(option => (
                                <div className="form-check me-4" key={option}>
                                    <input className="form-check-input" type="radio" name="specialCategory" id={`specialCategory${ option }`} value={option} checked={specialCategory === option} onChange={handleSpecialCategoryChange} required />
                                    <label className="form-check-label" htmlFor={`specialCategory${ option }`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {specialCategory === 'Yes' && (
                        <div className="col-12">
                            <div className="mb-3">
                                <label className="form-label fw-bold">Special Category Options</label>
                                <div className="d-flex flex-wrap">
                                    {specialCategoryOptionsList.map(option => (
                                        <div className="form-check me-4" key={option}>
                                            <input className="form-check-input" type="checkbox" name="specialCategoryOptions" id={`specialCategoryOptions${ option.replace(/\s+/g, '') }`} value={option} checked={specialCategoryOptions.includes(option)} onChange={handleSpecialCategoryOptionsChange} />
                                            <label className="form-check-label" htmlFor={`specialCategoryOptions${ option.replace(/\s+/g, '') }`}>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {specialCategoryOptions.includes('Ex-Serviceman') && (
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label htmlFor="exServicemanNo" className="form-label">Ex-Serviceman No.</label>
                                        <input type="text" className="form-control" id="exServicemanNo" value={exServicemanNo} onChange={(e) => setExServicemanNo(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exServicemanRegiment" className="form-label">Ex-Serviceman Regiment</label>
                                        <input type="text" className="form-control" id="exServicemanRegiment" value={exServicemanRegiment} onChange={(e) => setExServicemanRegiment(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exServicemanRank" className="form-label">Ex-Serviceman Rank</label>
                                        <input type="text" className="form-control" id="exServicemanRank" value={exServicemanRank} onChange={(e) => setExServicemanRank(e.target.value)} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="col-12">
                        <label className="form-label fw-bold">Living With</label>
                        <div className="d-flex">
                            {livingOptionsType.map(option => (
                                <div className="form-check me-4" key={option}>
                                    <input className="form-check-input" type="radio" name="livingWith" id={`livingWith${ option }`} value={option} checked={livingWith === option} onChange={handleLivingWithChange} required />
                                    <label className="form-check-label" htmlFor={`livingWith${ option }`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {livingWith === 'Parent' ? (
                        <div className="col-12">
                            <h5 className="fw-bold">Parent Details</h5>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="fatherName" className="form-label fw-bold">Father's Name</label>
                                    <input type="text" className="form-control" id="fatherName" value={fatherName} onChange={(e) => setFatherName(e.target.value)} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="fatherEducation" className="form-label fw-bold">Father's Education</label>
                                    <input type="text" className="form-control" id="fatherEducation" value={fatherEducation} onChange={(e) => setFatherEducation(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="fatherOccupation" className="form-label fw-bold">Father's Occupation</label>
                                    <input type="text" className="form-control" id="fatherOccupation" value={fatherOccupation} onChange={(e) => setFatherOccupation(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="fatherAnnualIncome" className="form-label fw-bold">Father's Annual Income</label>
                                    <input type="number" className="form-control" id="fatherAnnualIncome" value={fatherAnnualIncome} onChange={(e) => setFatherAnnualIncome(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="fatherMobileNo" className="form-label fw-bold">Father's Mobile No.</label>
                                    <input type="number" className="form-control" id="fatherMobileNo" value={fatherMobileNo} onChange={(e) => setFatherMobileNo(e.target.value)}
                                        maxLength="10" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="fatherEmailId" className="form-label fw-bold">Father's Email ID</label>
                                    <input type="email" className="form-control" id="fatherEmailId" value={fatherEmailId} onChange={(e) => setFatherEmailId(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="motherName" className="form-label fw-bold">Mother's Name</label>
                                    <input type="text" className="form-control" id="motherName" value={motherName} onChange={(e) => setMotherName(e.target.value)} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="motherEducation" className="form-label fw-bold">Mother's Education</label>
                                    <input type="text" className="form-control" id="motherEducation" value={motherEducation} onChange={(e) => setMotherEducation(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="motherOccupation" className="form-label fw-bold">Mother's Occupation</label>
                                    <input type="text" className="form-control" id="motherOccupation" value={motherOccupation} onChange={(e) => setMotherOccupation(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="motherAnnualIncome" className="form-label fw-bold">Mother's Annual Income</label>
                                    <input type="number" className="form-control" id="motherAnnualIncome" value={motherAnnualIncome} onChange={(e) => setMotherAnnualIncome(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="motherMobileNo" className="form-label fw-bold">Mother's Mobile No.</label>
                                    <input type="number" className="form-control" id="motherMobileNo" value={motherMobileNo} onChange={(e) => setMotherMobileNo(e.target.value)}
                                        maxLength="10" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="motherEmailId" className="form-label fw-bold">Mother's Email ID</label>
                                    <input type="email" className="form-control" id="motherEmailId" value={motherEmailId} onChange={(e) => setMotherEmailId(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="col-12">
                            <h5 className="fw-bold">Guardian Details</h5>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label htmlFor="guardianNameDetail" className="form-label fw-bold">Guardian's Name</label>
                                    <input type="text" className="form-control" id="guardianNameDetail" value={guardianNameDetail} onChange={(e) => setGuardianNameDetail(e.target.value)} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="guardianEducationDetail" className="form-label fw-bold">Guardian's Education</label>
                                    <input type="text" className="form-control" id="guardianEducationDetail" value={guardianEducationDetail} onChange={(e) => setGuardianEducationDetail(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="guardianOccupationDetail" className="form-label fw-bold">Guardian's Occupation</label>
                                    <input type="text" className="form-control" id="guardianOccupationDetail" value={guardianOccupationDetail} onChange={(e) => setGuardianOccupationDetail(e.target.value)} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="guardianAnnualIncomeDetail" className="form-label fw-bold">Guardian's Annual Income</label>
                                    <input type="number" className="form-control" id="guardianAnnualIncomeDetail" value={guardianAnnualIncomeDetail} onChange={(e) => setGuardianAnnualIncomeDetail(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="guardianMobileNoDetail" className="form-label fw-bold">Guardian's Mobile No.</label>
                                    <input type="number" className="form-control" id="guardianMobileNoDetail" value={guardianMobileNoDetail} onChange={(e) => setGuardianMobileNoDetail(e.target.value)}
                                        maxLength="10" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="guardianEmailIdDetail" className="form-label fw-bold">Guardian's Email ID</label>
                                    <input type="email" className="form-control" id="guardianEmailIdDetail" value={guardianEmailIdDetail} onChange={(e) => setGuardianEmailIdDetail(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="col-12">
                        <label className="form-label fw-bold">Co-curricular Activities</label>
                        <div className="d-flex flex-wrap">
                            {coCurricularOptions.map(option => (
                                <div className="form-check me-4" key={option}>
                                    <input className="form-check-input" type="checkbox" name="coCurricularActivities" id={`coCurricularActivities${ option.replace(/\s+/g, '') }`} value={option} checked={coCurricularActivities.includes(option)} onChange={handleCoCurricularActivitiesChange} />
                                    <label className="form-check-label" htmlFor={`coCurricularActivities${ option.replace(/\s+/g, '') }`}>{option}</label>
                                </div>
                            ))}
                        </div>
                        {coCurricularActivities.includes('Others') && (
                            <input type="text" className="form-control mt-2" placeholder="Specify Other Activity" value={coCurricularSpecify} onChange={(e) => setCoCurricularSpecify(e.target.value)} required />
                        )}
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-bold">First Generation Graduate in your family</label>
                        <div className="d-flex">
                            {firstGenerationGraduateOptions.map(option => (
                                <div className="form-check me-4" key={option}>
                                    <input className="form-check-input" type="radio" name="firstGenerationGraduate" id={`firstGenerationGraduate${ option }`} value={option} checked={firstGenerationGraduate === option} onChange={(e) => setFirstGenerationGraduate(e.target.value)} required />
                                    <label className="form-check-label" htmlFor={`firstGenerationGraduate${ option }`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-12">
                        <label htmlFor="schoolName" className="form-label fw-bold">Name of the School Place last studied</label>
                        <input type="text" className="form-control" id="schoolName" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} required />
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-bold">School Location</label>
                        <div className="d-flex">
                            {schoolLocationOptions.map(option => (
                                <div className="form-check me-4" key={option}>
                                    <input className="form-check-input" type="radio" name="schoolLocation" id={`schoolLocation${ option }`} value={option} checked={schoolLocation === option} onChange={(e) => setSchoolLocation(e.target.value)} required />
                                    <label className="form-check-label" htmlFor={`schoolLocation${ option }`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-bold">Medium of Instruction in +2</label>
                        <div className="d-flex">
                            {mediumInstructionOptions.map(option => (
                                <div className="form-check me-4" key={option}>
                                    <input className="form-check-input" type="radio" name="mediumOfInstruction" id={`mediumOfInstruction${ option }`} value={option} checked={mediumOfInstruction === option} onChange={(e) => setMediumOfInstruction(e.target.value)} required />
                                    <label className="form-check-label" htmlFor={`mediumOfInstruction${ option }`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="tcNo" className="form-label fw-bold">T.C. No.</label>
                        <input type="text" className="form-control" id="tcNo" value={tcNo} onChange={(e) => setTcNo(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                            <label htmlFor="tcDate" className="form-label fw-bold">T.C. Date</label>
                            <input type="date" className="form-control" id="tcDate" value={tcDate} onChange={handleTcDateChange} />
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-bold">Board of Examination Passed</label>
                        <div className="d-flex flex-wrap">
                            {boardExamOptions.map(option => (
                                <div className="form-check me-4" key={option}>
                                    <input className="form-check-input" type="radio" name="boardOfExam" id={`boardOfExam${ option.replace(/\s+/g, '') }`} value={option} checked={boardOfExam === option} onChange={(e) => setBoardOfExam(e.target.value)} required />
                                    <label className="form-check-label" htmlFor={`boardOfExam${ option.replace(/\s+/g, '') }`}>{option}</label>
                                </div>
                            ))}
                        </div>
                        {boardOfExam === 'Other Board/State' && (
                            <input type="text" className="form-control mt-2" placeholder="Specify Other Board/State" value={otherBoardState} onChange={(e) => setOtherBoardState(e.target.value)} required />
                        )}
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="yearOfPassing" className="form-label fw-bold">Year of Passing</label>
                        <input type="number" className="form-control" id="yearOfPassing" value={yearOfPassing} onChange={(e) => setYearOfPassing(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="examRegNo" className="form-label fw-bold">Exam. Registration No.</label>
                        <input type="text" className="form-control" id="examRegNo" value={examRegNo} onChange={(e) => setExamRegNo(e.target.value)} required />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="emisNo" className="form-label fw-bold">EMIS No.</label>
                        <input type="text" className="form-control" id="emisNo" value={emisNo} onChange={(e) => setEmisNo(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="aadharNo" className="form-label fw-bold">Aadhar No.</label>
                        <input type="text" className="form-control" id="aadharNo" value={aadharNo} onChange={(e) => setAadharNo(e.target.value)} />
                    </div>

                    <div className="col-12">
                        <h4 className="mt-4 mb-3 fw-bold">12th Standard Marks</h4>
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label htmlFor="language1Marks" className="form-label fw-bold">Language 1 Marks</label>
                                <input type="number" className="form-control" id="language1Marks" value={language1Marks} onChange={(e) => setLanguage1Marks(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="language2Marks" className="form-label fw-bold">Language 2 Marks</label>
                                <input type="number" className="form-control" id="language2Marks" value={language2Marks} onChange={(e) => setLanguage2Marks(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="subject1Marks" className="form-label fw-bold">Subject 1 Marks</label>
                                <input type="number" className="form-control" id="subject1Marks" value={subject1Marks} onChange={(e) => setSubject1Marks(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="subject2Marks" className="form-label fw-bold">Subject 2 Marks</label>
                                <input type="number" className="form-control" id="subject2Marks" value={subject2Marks} onChange={(e) => setSubject2Marks(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="subject3Marks" className="form-label fw-bold">Subject 3 Marks</label>
                                <input type="number" className="form-control" id="subject3Marks" value={subject3Marks} onChange={(e) => setSubject3Marks(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="subject4Marks" className="form-label fw-bold">Subject 4 Marks</label>
                                <input type="number" className="form-control" id="subject4Marks" value={subject4Marks} onChange={(e) => setSubject4Marks(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="totalMarksObtainedWithLanguage" className="form-label fw-bold">Total Marks Obtained (All Subjects)</label>
                                <input type="text" className="form-control fw-bold" id="totalMarksObtainedWithLanguage" value={totalMarksObtainedWithLanguage} readOnly />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="totalMarksObtainedWithoutLanguage" className="form-label fw-bold">Total Marks Obtained (without Language)</label>
                                <input type="text" className="form-control fw-bold" id="totalMarksObtainedWithoutLanguage" value={totalMarksObtainedWithoutLanguage} readOnly />
                            </div>
                        </div>
                    </div>


                    <div className="col-md-12">
                        <label htmlFor="communicationAddress" className="form-label fw-bold">Address for Communication/Present Address</label>
                        <textarea className="form-control" id="communicationAddress" rows="3" value={communicationAddress} onChange={(e) => setCommunicationAddress(e.target.value)} required></textarea>
                        <div className="row gx-2">
                            <div className="col-md-6">
                                <label htmlFor="studentPin" className="form-label fw-bold">PIN:</label>
                                <input type="text" className="form-control" id="studentPin" value={studentPin} onChange={(e) => setStudentPin(e.target.value)} required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="studentMobileNo" className="form-label fw-bold">Student's Mobile No.:</label>
                                <input type="number" className="form-control" id="studentMobileNo" value={studentMobileNo} onChange={(e) => setStudentMobileNo(e.target.value)} required
                                    maxLength="10" />
                            </div>
                        </div>
                        <label htmlFor="studentEmailId" className="form-label fw-bold">Student's Email ID:</label>
                        <input type="email" className="form-control" id="studentEmailId" value={studentEmailId} onChange={(e) => setStudentEmailId(e.target.value)} required />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-bold">Do you need hostel accommodation?</label>
                        <div className="d-flex">
                            {hostelOptions.map(option => (
                                <div className="form-check me-4" key={option}>
                                    <input className="form-check-input" type="radio" name="hostelAccommodation" id={`hostelAccommodation${ option }`} value={option} checked={hostelAccommodation === option} onChange={handleHostelAccommodationChange} required />
                                    <label className="form-check-label" htmlFor={`hostelAccommodation${ option }`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="college-bus">
                            <label className="form-label fw-bold">Do you like to travel to our College by College bus?</label><br />
                            <div className="form-check form-check-inline me-3">
                                <input className="form-check-input" type="radio" name="collegeBus" id="busYes" value="Yes" checked={collegeBus === 'Yes'} onChange={handleCollegeBusChange} />
                                <label className="form-check-label" htmlFor="busYes">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="collegeBus" id="busNo" value="No" checked={collegeBus === 'No'} onChange={handleCollegeBusChange} />
                                <label className="form-check-label" htmlFor="busNo">No</label>
                            </div>
                        </div>
                    </div>

                    {showBusOptions && (
                        <div className="col-12 bus-options">
                            <div className="mb-3">
                                <label htmlFor="busZone" className="form-label fw-bold">Select your Zone:</label>
                                <select className="form-select" id="busZone" name="busZone" value={busZone} onChange={handleBusZoneChange}>
                                    {busZoneOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 input-section" id="startingPointSection" style={{ display: busZone ? 'block' : 'none' }}>
                                <label htmlFor="startingPoint" className="form-label fw-bold">Input your starting point place:</label>
                                <input type="text" className="form-control" id="startingPoint" name="startingPoint" placeholder="Starting Point Place" value={startingPoint} onChange={(e) => setStartingPoint(e.target.value)} required />
                            </div>
                        </div>
                    )}

                    <div className="col-12 mt-5">
                        <div className="text-center mb-3 fw-bold">
                            <div className="form-check d-inline-block">
                                <input className="form-check-input" type="checkbox" id="declarationCheckbox" checked={declarationChecked} onChange={handleDeclarationCheckboxChange} required />
                                <label className="form-check-label fw-bold" htmlFor="declarationCheckbox"><b>DECLARATION</b> - I Promise </label>
                            </div>
                        </div>
                        <div className="text-center small">to abide by the rules and regulations of the College explained in the Academic Calendar.
                            All the particulars stated in this Application Form are true to the best of my knowledge and belief.</div>

                        <div className="text-center mt-3 mb-3 fw-bold">
                            <div className="form-check d-inline-block">
                                <input className="form-check-input" type="checkbox" id="undertakingCheckbox" checked={undertakingChecked} onChange={handleUndertakingCheckboxChange} required />
                                <label className="form-check-label fw-bold" htmlFor="undertakingCheckbox"><b>UNDERTAKING BY PARENT OR GUARDIAN</b> - I Promise </label>
                            </div>
                        </div>
                        <div className="text-center small">to pay my ward's fee to the College and I take responsibility for his/her progress in studies and regular attendance.</div>
                    </div>


                    <div className="col-12 d-grid gap-2 mt-4">
                        <button type="submit" className="btn btn-primary btn-lg">Submit Application</button>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default AdmissionForm;