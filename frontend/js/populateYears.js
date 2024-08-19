// populateYears.js

(function() {
    function populateYearDropdown(selectElementId) {
        // Get the current year
        const currentYear = new Date().getFullYear();
        // Set the start year (e.g., 1900)
        const startYear = 1900;

        // Get the select element
        const yearSelect = document.getElementById(selectElementId);
        if (yearSelect) {
            // Populate the select element with year options
            for (let year = currentYear; year >= startYear; year--) {
                let option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            }
        }
    }

    // Call the function for both the add and edit modals
    document.addEventListener('DOMContentLoaded', () => {
        populateYearDropdown('release_year');  // For add-movie-modal
        populateYearDropdown('edit-release_year');  // For edit-movie-modal
    });
})();
