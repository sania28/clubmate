document.addEventListener('DOMContentLoaded', () => {
    const teamGrid = document.getElementById('teamGrid');
    const addMemberBtn = document.getElementById('addMemberBtn');
    const memberModal = document.getElementById('memberModal');
    const closeModalBtn = document.querySelector('.close-btn');
    const memberForm = document.getElementById('memberForm');
    const modalTitle = document.getElementById('modalTitle');
    const memberIndexInput = document.getElementById('memberIndex');

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

    // Open Modal for adding a new member
    addMemberBtn.addEventListener('click', () => {
        memberModal.style.display = 'block';
        modalTitle.innerText = 'Add New Member';
        memberForm.reset();
        memberIndexInput.value = '';
    });

    // Hide modal
    const closeModal = () => {
        memberModal.style.display = 'none';
    };
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target == memberModal) {
            closeModal();
        }
    });

    // Handle form submission for both add and edit
    memberForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const memberData = {
            name: document.getElementById('memberName').value,
            role: document.getElementById('memberRole').value,
            img: document.getElementById('memberImg').value || 'https://i.pravatar.cc/150',
            bio: document.getElementById('memberBio').value
        };

        const index = memberIndexInput.value;
        if (index) {
            // Editing existing member
            teamMembers[index] = memberData;
        } else {
            // Adding new member
            teamMembers.push(memberData);
        }

        renderTeam();
        closeModal();
    });

    // Event delegation for edit and delete buttons
    teamGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.team-card');
        if (!card) return;

        const index = card.dataset.index;

        // Handle Edit
        if (e.target.closest('.edit-btn')) {
            const member = teamMembers[index];
            modalTitle.innerText = 'Edit Member';
            document.getElementById('memberName').value = member.name;
            document.getElementById('memberRole').value = member.role;
            document.getElementById('memberImg').value = member.img;
            document.getElementById('memberBio').value = member.bio;
            memberIndexInput.value = index;
            memberModal.style.display = 'block';
        }

        // Handle Delete
        if (e.target.closest('.delete-btn')) {
            if (confirm(`Are you sure you want to delete ${teamMembers[index].name}?`)) {
                teamMembers.splice(index, 1);
                renderTeam();
            }
        }
    });

    // Initial render
    renderTeam();
});
