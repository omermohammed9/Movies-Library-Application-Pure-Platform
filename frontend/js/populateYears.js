// populateYears.js

(function() {
    function populateYearDropdown() {
        // Get the current year
        const currentYear = new Date().getFullYear();
        // Set the start year (e.g., 1900)
        const startYear = 1900;

        // Get the select element
        const yearSelect = document.getElementById('release_year');

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

    // Call the function immediately when the script is loaded
    document.addEventListener('DOMContentLoaded', populateYearDropdown);
})();
