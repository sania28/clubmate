document.addEventListener('DOMContentLoaded', () => {
    const teamGrid = document.getElementById('teamGrid');
    const addMemberBtn = document.getElementById('addMemberBtn');
    const memberModal = document.getElementById('memberModal');
    const closeModalBtn = document.querySelector('.close-btn');
    const memberForm = document.getElementById('memberForm');

    // Dummy data for initial team members
    let teamMembers = [
        {
            name: 'Sania Mujtaba',
            role: 'Project Admin',
            img: 'https://avatars.githubusercontent.com/u/1024025?v=4',
            bio: 'Lead developer and project manager for ClubMate.'
        },
        {
            name: 'Alex Doe',
            role: 'Frontend Developer',
            img: 'https://i.pravatar.cc/150?img=11',
            bio: 'Specializes in creating responsive and intuitive user interfaces.'
        },
        {
            name: 'Jane Smith',
            role: 'Backend Developer',
            img: 'https://i.pravatar.cc/150?img=12',
            bio: 'Manages the server-side logic and database integration.'
        }
    ];

    // Function to render team members
    const renderTeam = () => {
        teamGrid.innerHTML = '';
        teamMembers.forEach((member, index) => {
            const memberCard = `
                <div class="team-card" data-index="${index}">
                    <img src="${member.img}" alt="${member.name}" class="team-card-img">
                    <h3 class="team-card-name">${member.name}</h3>
                    <p class="team-card-role">${member.role}</p>
                    <div class="team-card-actions">
                        <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete-btn"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;
            teamGrid.innerHTML += memberCard;
        });
    };

    // Show modal
    addMemberBtn.addEventListener('click', () => {
        memberModal.style.display = 'block';
        document.getElementById('modalTitle').innerText = 'Add New Member';
        memberForm.reset();
    });

    // Hide modal
    closeModalBtn.addEventListener('click', () => {
        memberModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == memberModal) {
            memberModal.style.display = 'none';
        }
    });

    // Handle form submission
    memberForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newMember = {
            name: document.getElementById('memberName').value,
            role: document.getElementById('memberRole').value,
            img: document.getElementById('memberImg').value || 'https://i.pravatar.cc/150',
            bio: document.getElementById('memberBio').value
        };
        teamMembers.push(newMember);
        renderTeam();
        memberModal.style.display = 'none';
    });

    // Initial render
    renderTeam();
});
