document.addEventListener('DOMContentLoaded', () => {
    // Sample resource data
    const resources = [
        { name: "Community Food Bank", description: "Provides free food and meals to families in need.", category: "non-profits" },
        { name: "Mental Health Support Hotline", description: "A 24/7 hotline for mental health crises and support.", category: "support-services" },
        { name: "Summer Youth Program", description: "Educational and recreational programs for kids aged 8-16.", category: "events" },
        { name: "Elderly Care Services", description: "Offers in-home care and companionship for senior residents.", category: "support-services" },
        { name: "Local Community Garden", description: "A volunteer-run garden where residents can grow their own food.", category: "non-profits" },
        { name: "Annual Neighborhood Festival", description: "A yearly event celebrating local culture with music, food, and games.", category: "events" },
    ];

    const resourceList = document.getElementById('resource-list');
    const searchBar = document.getElementById('search-bar');
    const filterDropdown = document.getElementById('filter-dropdown');
    const resourceForm = document.getElementById('resource-form');

    // Function to render resources
    const renderResources = (filteredResources) => {
        resourceList.innerHTML = '';
        if (filteredResources.length === 0) {
            resourceList.innerHTML = '<p>No resources found.</p>';
            return;
        }

        filteredResources.forEach(resource => {
            const card = document.createElement('div');
            card.className = 'resource-card';
            card.innerHTML = `
                <h3>${resource.name}</h3>
                <p><strong>Category:</strong> ${resource.category.replace(/-/g, ' ')}</p>
                <p>${resource.description}</p>
            `;
            resourceList.appendChild(card);
        });
    };

    // Filter and search logic
    const filterAndSearch = () => {
        const searchTerm = searchBar.value.toLowerCase();
        const category = filterDropdown.value;

        const filtered = resources.filter(resource => {
            const matchesSearch = resource.name.toLowerCase().includes(searchTerm) || resource.description.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || resource.category === category;
            return matchesSearch && matchesCategory;
        });

        renderResources(filtered);
    };

    // Event listeners for search and filter
    searchBar.addEventListener('input', filterAndSearch);
    filterDropdown.addEventListener('change', filterAndSearch);

    // Initial render of all resources
    renderResources(resources);

    // Handle form submission
    resourceForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents the default form refresh

        // In a real-world scenario, you would send this data to a server.
        // For this project, you can log it to the console to show it works.
        const newResource = {
            name: document.getElementById('resource-name').value,
            description: document.getElementById('resource-description').value,
            category: document.getElementById('resource-category').value,
            contact: document.getElementById('resource-contact').value
        };

        console.log("New Resource Submitted:", newResource);
        alert('Thank you! Your resource has been submitted for review.');

        // Optionally, add the new resource to the list for immediate visibility
        // resources.push({ name: newResource.name, description: newResource.description, category: newResource.category });
        // renderResources(resources);

        resourceForm.reset(); // Clear the form
    });
});
