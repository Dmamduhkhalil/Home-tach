// دالة لتحميل البيانات من LocalStorage
function loadProjects() {
    return JSON.parse(localStorage.getItem('projects')) || [];
}

// دالة لحفظ البيانات في LocalStorage
function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// دالة لعرض المشاريع في الصفحة الرئيسية
function displayProjects() {
    const projects = loadProjects();
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';

    projects.forEach((project) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <p><strong>السعر:</strong> ${project.price}</p>
            <p><strong>الموقع:</strong> ${project.location}</p>
            <img src="${project.image}" alt="${project.title}">
        `;
        projectsList.appendChild(projectItem);
    });
}

// دالة لعرض المشاريع في لوحة التحكم
function displayAdminProjects() {
    const projects = loadProjects();
    const adminProjectsList = document.getElementById('admin-projects-list');
    adminProjectsList.innerHTML = '';

    projects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <p><strong>السعر:</strong> ${project.price}</p>
            <p><strong>الموقع:</strong> ${project.location}</p>
            <img src="${project.image}" alt="${project.title}">
            <button onclick="editProject(${index})">تعديل</button>
            <button onclick="deleteProject(${index})">حذف</button>
        `;
        adminProjectsList.appendChild(projectItem);
    });
}

// دالة لإضافة مشروع
document.getElementById('project-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const location = document.getElementById('location').value;
    const image = document.getElementById('image').files[0];

    if (title && description && price && location && image) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const projects = loadProjects();
            projects.push({
                title: title,
                description: description,
                price: price,
                location: location,
                image: e.target.result
            });
            saveProjects(projects);
            displayAdminProjects();
            document.getElementById('project-form').reset();
        };
        reader.readAsDataURL(image);
    }
});

// دالة لتعديل مشروع
function editProject(index) {
    const projects = loadProjects();
    const project = projects[index];

    document.getElementById('title').value = project.title;
    document.getElementById('description').value = project.description;
    document.getElementById('price').value = project.price;
    document.getElementById('location').value = project.location;

    // إزالة المشروع القديم
    projects.splice(index, 1);
    saveProjects(projects);
    displayAdminProjects();
}

// دالة لحذف مشروع
function deleteProject(index) {
    const projects = loadProjects();
    projects.splice(index, 1);
    saveProjects(projects);
    displayAdminProjects();
}

// عرض المشاريع عند تحميل الصفحة
if (document.getElementById('projects-list')) {
    displayProjects();
}

if (document.getElementById('admin-projects-list')) {
    displayAdminProjects();
}