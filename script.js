const studentsData = {
    "Electrical Engineering": {
        "EE101": ["Alice Johnson", "Bob Smith", "Charlie Brown", "David Wilson", "Ella Thomas", "Fiona White", "George Harris", "Hannah Lee"],
        "EE102": ["Ivy Clark", "Jack Davis", "Katie Moore", "Liam Turner", "Mia Martin", "Noah Walker", "Olivia Young", "Peter King"],
        "EE103": ["Quinn Scott", "Ryan Hill", "Sophia Adams", "Thomas Baker", "Ursula Gray", "Victor Green", "Wendy Thompson", "Xander Parker"]
    },
    "Mechanical Engineering": {
        "ME101": ["Yara Evans", "Zachary Collins", "Amber Cook", "Blake Jenkins", "Carter Morgan", "Daisy Barnes", "Evan Bell", "Freya Shaw"],
        "ME102": ["Gavin Bennett", "Harper Hughes", "Isabel Ward", "Jacob Perez", "Kylie Reed", "Landon Foster", "Mason Brooks", "Nina Rivera"]
    },
    "Architecture": {
        "AR101": ["Owen Mitchell", "Piper Long", "Quincy Patterson", "Ruby Stone", "Sebastian Ray", "Tara Lane", "Ulysses Diaz", "Violet Alvarez"],
        "AR102": ["Wyatt Gomez", "Ximena Flores", "Yusuf Diaz", "Zoey Powell", "Aiden Jimenez", "Bella Sanders", "Caleb Ortiz", "Dylan Hunt"]
    },
    "Information Engineering": {
        "IE101": ["Avery Fisher", "Brody Gibson", "Carson Holmes", "Delilah Jones", "Ethan Kelly", "Faith Lewis", "Grayson Martinez", "Holly Nelson"],
        "IE102": ["Isla Owens", "Julian Parker", "Kendall Quinn", "Logan Robinson", "Mackenzie Scott", "Natalie Turner", "Owen Underwood", "Peyton Vargas"]
    },
    "Management": {
        "MG101": ["Quincy Walker", "Riley Young", "Sydney Adams", "Tyler Bennett", "Victoria Carter", "William Davis", "Xavier Edwards", "Yara Franklin"],
        "MG102": ["Zane Garcia", "Aiden Harris", "Brooke Jenkins", "Caleb King", "Diana Lee", "Eli Martin", "Fiona Nelson", "Gabriel Owens"]
    },
    "Cybersecurity": {
        "CS101": ["Hazel Phillips", "Ian Roberts", "Jade Smith", "Kai Thomas", "Luna White", "Milo Brown", "Nora Clark", "Oliver Davis"],
        "CS102": ["Paisley Evans", "Quentin Gonzalez", "Riley Hall", "Sawyer Johnson", "Talia Lewis", "Uriel Martinez", "Vera Nelson", "Willow Ortiz"]
    },
    "Law": {
        "LW101": ["Xander Perez", "Yara Quinn", "Zachary Roberts", "Aubrey Smith", "Bentley Turner", "Cora Underwood", "Dylan Vance", "Emery White"],
        "LW102": ["Finn Brown", "Gracie Clark", "Hudson Davis", "Ivy Evans", "Jasper Gonzalez", "Kaitlyn Hall", "Landon Jenkins", "Mila King"]
    }
};

const classList = {
    "Electrical Engineering": ["EE101", "EE102", "EE103"],
    "Mechanical Engineering": ["ME101", "ME102"],
    "Architecture": ["AR101", "AR102"],
    "Information Engineering": ["IE101", "IE102"],
    "Management": ["MG101", "MG102"],
    "Cybersecurity": ["CS101", "CS102"],
    "Law": ["LW101", "LW102"]
};

const subjectsList = {
    "Electrical Engineering": ["Circuit Analysis", "Electromagnetics", "Control Systems", "Digital Systems"],
    "Mechanical Engineering": ["Thermodynamics", "Fluid Mechanics", "Heat Transfer", "Machine Design"],
    "Architecture": ["Design Studio", "Building Construction", "Architectural History", "Structures"],
    "Information Engineering": ["Programming", "Data Structures", "Algorithms", "Databases"],
    "Management": ["Business Strategy", "Marketing", "Accounting", "Finance"],
    "Cybersecurity": ["Cryptography", "Network Security", "Information Assurance", "Ethical Hacking"],
    "Law": ["Constitutional Law", "Criminal Law", "Civil Procedure", "Property Law"]
};

const attendanceData = [];

function initializePage() {
    showSection('registeredStudents');
    document.getElementById('date').value = new Date().toISOString().split('T')[0];
    displayRegisteredStudents();
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function loadClasses() {
    const specialization = document.getElementById('specialization').value;
    const classSelect = document.getElementById('class');
    classSelect.innerHTML = '<option value="">Select Class</option>';
    if (specialization && classList[specialization]) {
        classList[specialization].forEach(classItem => {
            const option = document.createElement('option');
            option.value = classItem;
            option.textContent = classItem;
            classSelect.appendChild(option);
        });
    }
    document.getElementById('subject').innerHTML = '<option value="">Select Subject</option>';
    document.getElementById('studentList').innerHTML = '';
}

function loadSubjects() {
    const specialization = document.getElementById('specialization').value;
    const subjectSelect = document.getElementById('subject');
    subjectSelect.innerHTML = '<option value="">Select Subject</option>';
    if (specialization && subjectsList[specialization]) {
        subjectsList[specialization].forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject;
            subjectSelect.appendChild(option);
        });
    }
    loadStudents();
}

function loadStudents() {
    const specialization = document.getElementById('specialization').value;
    const classValue = document.getElementById('class').value;
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';

    if (specialization && classValue && studentsData[specialization][classValue]) {
        studentsData[specialization][classValue].forEach(studentName => {
            const studentDiv = document.createElement('div');
            studentDiv.className = 'student-entry';
            studentDiv.innerHTML = `
                <input type="checkbox" id="${studentName}" value="${studentName}">
                <label for="${studentName}">${studentName}</label>
            `;
            studentList.appendChild(studentDiv);
        });

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit Attendance';
        submitButton.onclick = submitAttendance;
        studentList.appendChild(submitButton);
    }
}

function submitAttendance() {
    const specialization = document.getElementById('specialization').value;
    const classValue = document.getElementById('class').value;
    const subject = document.getElementById('subject').value;
    const date = document.getElementById('date').value;
    const checkboxes = document.querySelectorAll('#studentList input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        attendanceData.push({
            studentId: Math.floor(Math.random() * 10000),
            studentName: checkbox.value,
            specialization: specialization,
            class: classValue,
            subject: subject,
            date: date,
            status: checkbox.checked ? 'Present' : 'Absent'
        });
    });
    alert('Attendance marked successfully!');
    showSection('attendanceList');
    displayAttendance();
    displayAbsentStudents();
    displayRegisteredStudents();
}

function displayAttendance() {
    const attendanceTable = document.getElementById('attendanceTable').querySelector('tbody');
    attendanceTable.innerHTML = '';

    attendanceData.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.studentId}</td>
            <td>${record.studentName}</td>
            <td>${record.specialization}</td>
            <td>${record.class}</td>
            <td>${record.subject}</td>
            <td>${record.date}</td>
            <td>${record.status}</td>
        `;
        attendanceTable.appendChild(row);
    });
}

function displayRegisteredStudents() {
    const studentsList = document.getElementById('studentsList');
    studentsList.innerHTML = '';

    for (const [specialization, classes] of Object.entries(studentsData)) {
        const div = document.createElement('div');
        div.className = 'specialization-box';
        div.innerHTML = `<h3>${specialization}</h3>`;
        
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>Attendance %</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        const tbody = table.querySelector('tbody');

        for (const [classValue, students] of Object.entries(classes)) {
            students.forEach(student => {
                subjectsList[specialization].forEach(subject => {
                    const attendancePercentage = calculateSubjectAttendancePercentage(student, specialization, subject);
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${student}</td>
                        <td>${classValue}</td>
                        <td>${subject}</td>
                        <td>${attendancePercentage.toFixed(2)}%</td>
                    `;
                    tbody.appendChild(row);
                });
            });
        }

        div.appendChild(table);
        studentsList.appendChild(div);
    }
}

function calculateSubjectAttendancePercentage(student, specialization, subject) {
    const studentRecords = attendanceData.filter(record => record.studentName === student && record.specialization === specialization && record.subject === subject);
    const presentRecords = studentRecords.filter(record => record.status === 'Present').length;
    return studentRecords.length > 0 ? (presentRecords / studentRecords.length) * 100 : Math.random() * 100;
}

function displayAbsentStudents() {
    const absentList = document.getElementById('absentList');
    absentList.innerHTML = '';

    const absentRecords = attendanceData.filter(record => record.status === 'Absent');
    absentRecords.forEach(record => {
        const div = document.createElement('div');
        div.className = 'absent-summary';
        div.innerHTML = `<strong>${record.studentName} (${record.studentId})</strong> - ${record.specialization}, ${record.class}, ${record.subject}<br>
            <em>Summary of the lesson:</em><br>
            - Main points covered in the course today.`;
        absentList.appendChild(div);
    });
}

function printAttendance() {
    const printContent = document.getElementById('attendanceList').innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    location.reload();
}